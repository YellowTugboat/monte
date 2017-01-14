import { ENTER, EXIT, UPDATE } from '../../const/d3';
import { AxesChart } from './AxesChart';
import { MonteOptionError } from '../../support/MonteOptionError';
import { commonEventNames } from '../../tools/commonEventNames';
import { extentBalanced } from '../../util/extents';
import { noop } from '../../tools/noop';
import { resetScaleDomain } from '../../tools/resetScaleDomain';
import { upperFirst } from '../../tools/string';

export const SEGMENT_BAR_MODE = {
  GROUPED: 'grouped',
  STACKED: 'stacked',
};

export const SEGMENT_BAR_MODE_CSS_MAP = {
  [SEGMENT_BAR_MODE.GROUPED]: 'monte-segment-mode-grouped',
  [SEGMENT_BAR_MODE.STACKED]: 'monte-segment-mode-stacked',
};

const EVENT_MODE_CHANGING = 'modeChanging';
const EVENT_MODE_CHANGED = 'modeChanged';
const EVENTS = [EVENT_MODE_CHANGING, EVENT_MODE_CHANGED];

const BARSEG = 'barseg';
const BARGRP = 'bargrp';
const LABEL = 'label';

const SEGMENT_BAR_CHART_DEFAULTS = {
  chartCss: 'monte-segment-bar-chart',
  barSegmentCss: 'bar-segment',

  margin: {
    top: 10,
    right: 0,
    bottom: 30,
    left: 40,
  },

  segmentBarMode: SEGMENT_BAR_MODE.STACKED,

  xProp: 'id',
  yProp: 'values',
  xInnerProp: 'type',
  yInnerProp: 'value',

  xInnerScale: function() {
    return d3.scaleBand().paddingInner(0.1).paddingOuter(0.1).round(true);
  },

  barSegCssScale: noop,
  barSegCssScaleAccessor: AxesChart.generateScaleAccessor('barSegCssScale', 'x'),
  barSegFillScale: noop,
  barSegFillScaleAccessor: AxesChart.generateScaleAccessor('barSegFillScale', 'x'),

  xScale: function() {
    return d3.scaleBand().paddingInner(0.1).round(true);
  },

  yDomainCustomize: extentBalanced,

  includeLabels: false,

  labelProp: 'value',
  labelFillScale: noop,
  labelFillScaleAccessor: AxesChart.generateScaleAccessor('labelFillScale', 'label'),
  label: function(d) {
    return this.getProp('label', d);
  },
  labelXAdjust: '',
  labelX: function(d) {
    const mode = this.option('segmentBarMode');

    if (mode === SEGMENT_BAR_MODE.STACKED) {
      return this.x.bandwidth() / 2;
    }
    else if (mode === SEGMENT_BAR_MODE.GROUPED) {
      return this._barXInnerGrouped(d) + this.xInner.bandwidth() / 2;
    }
  },
  labelYAdjust: '1.05em',
  labelY: function(d, i, nodes) {
    const mode = this.option('segmentBarMode');

    if (mode === SEGMENT_BAR_MODE.STACKED) {
      return this._barYInnerStacked(d, i, nodes); // + this._barHeightStacked(d, i, nodes);
    }
    else if (mode === SEGMENT_BAR_MODE.GROUPED) {
      return this._barYInnerGrouped(d);
    }
  },
};

export class SegmentBarChart extends AxesChart {
  _initOptions(...options) {
    super._initOptions(...options, SEGMENT_BAR_CHART_DEFAULTS);
  }

  _initPublicEvents(...events) {
    super._initPublicEvents(...events,
      ...commonEventNames(BARGRP),  // Bar group events
      ...commonEventNames(BARSEG),  // Bar segment events
      ...EVENTS
    );
  }

  _initCore() {
    super._initCore();
    this._initInnerScales();
  }

  _initInnerScales() {
    this.xInner = this.opts.xInnerScale();
  }

  // Extent of the inner values across all groups
  _extentInner(data, baseProp) {
    const vals = [];
    data.forEach((d) => {
      this.getProp(baseProp, d).forEach((d1) => vals.push(this.getProp(`${baseProp}Inner`, d1)));
    });

    return d3.extent(vals);
  }

  // Sum the inner values within groups, take max of sums
  _extentMaxes(data, baseProp) {
    const maxes = data.map((d) =>
      d3.sum(this.getProp(baseProp, d), (d1) => this.getProp(`${baseProp}Inner`, d1)));

    return [0, d3.max(maxes)];
  }

  _domainExtent(data, scaleName) {
    let extent = null;

    if (scaleName === 'x') {
      extent = data.map((d) => this.getProp('x', d));
    }
    else if (scaleName === 'y') {
      const mode = this.tryInvoke(this.opts.segmentBarMode);

      if (mode === SEGMENT_BAR_MODE.GROUPED) {
        extent = this._extentInner(data, 'y');
      }
      else if (mode === SEGMENT_BAR_MODE.STACKED) {
        extent = this._extentMaxes(data, 'y');
      }
      else {
        throw MonteOptionError.InvalidEnumOption('segmentBarMode', mode);
      }
    }

    return extent;
  }

  _resetStyleDomains() {
    super._resetStyleDomains();

    resetScaleDomain(this.opts.barSegCssScale);
    resetScaleDomain(this.opts.barSegFillScale);
    resetScaleDomain(this.opts.labelFillScale);
  }

  setMode(mode) {
    this.option('segmentBarMode', mode);
    this.emit(EVENT_MODE_CHANGING);
    this.updateAxesDomains();
    this.renderAxes();
    this.update();
    this.emit(EVENT_MODE_CHANGED);
  }

  mode(mode) {
    if (mode) {
      this.setMode();
    }

    return this.tryInvoke(this.opts.segmentBarMode);
  }

  updateAxesRanges() {
    super.updateAxesRanges();
    this._updateXInnerRange();
    this._updateYInnerRange();
  }

  _updateXInnerRange() {
    this.xInner.range([0, this.x.bandwidth()]);
  }

  _updateXInnerDomain() {
    const data = this.data();
    const yProp = this.tryInvoke(this.opts.yProp);
    const xInnerProp = this.tryInvoke(this.opts.xInnerProp);
    const xInnerDomain = data[0][yProp].map((d) => d[xInnerProp]);
    this.xInner.domain(xInnerDomain);
  }

  _updateYInnerRange() {}

  _updateYInnerDomain() {}

  _data(data) {
    super._data(data);

    this._updateXInnerDomain();
    this._updateXInnerRange();
    this._updateYInnerDomain();
    this._updateYInnerRange();
  }

  _render() {
    const mode = this.tryInvoke(this.opts.segmentBarMode);
    const classToAdd = SEGMENT_BAR_MODE_CSS_MAP[mode];

    this.classed(classToAdd, true);
  }

  // Render the vis.
  _update() {
    const mode = this.tryInvoke(this.opts.segmentBarMode);
    const classesToRemove = nonMatchingMapValues(SEGMENT_BAR_MODE_CSS_MAP, mode);
    const classToAdd = SEGMENT_BAR_MODE_CSS_MAP[mode];
    let barGrps, enterTransition, updateTransition;

    this.classed(classToAdd, true);

    if (mode === SEGMENT_BAR_MODE.STACKED) {
      ({ barGrps, enterTransition, updateTransition } = this._updateStackedBars());
    }
    else if (mode === SEGMENT_BAR_MODE.GROUPED) {
      ({ barGrps, enterTransition, updateTransition } = this._updateGroupedBars());
    }
    else {
      throw MonteOptionError.InvalidEnumOption('segmentBarMode', mode);
    }

    if (this.opts.includeLabels && barGrps) {
      if (barGrps.size()) {
        this._updateLabels(barGrps, enterTransition, updateTransition);
      }
      else {
        enterTransition.on('end.labels', () => {
          const g = this.draw.selectAll('.monte-segment-bar-grp');
          this._updateLabels(g, enterTransition);
        });

        updateTransition.on('end.labels', () => {
          const g = this.draw.selectAll('.monte-segment-bar-grp');
          this._updateLabels(g, updateTransition);
        });
      }
    }

    if (enterTransition) {
      enterTransition.on('end.classes', () => {
        classesToRemove.forEach((classToRemove) => this.classed(classToRemove, false));
      });
    }

    if (updateTransition) {
      updateTransition.on('end.classes', () => {
        classesToRemove.forEach((classToRemove) => this.classed(classToRemove, false));
      });
    }
  }

  _updateStackedBars() {
    const barXInner = this._barXInnerStacked.bind(this);
    const barYInner = this._barYInnerStacked.bind(this);
    const barWidth = this._barWidthStacked.bind(this);
    const barHeight = this._barHeightStacked.bind(this);

    return this._updateBars(barXInner, barYInner, barWidth, barHeight);
  }

  _updateGroupedBars() {
    const barXInner = this._barXInnerGrouped.bind(this);
    const barYInner = this._barYInnerGrouped.bind(this);
    const barWidth = this._barWidthGrouped.bind(this);
    const barHeight = this._barHeightGrouped.bind(this);

    return this._updateBars(barXInner, barYInner, barWidth, barHeight);
  }

  _updateBars(barXInner, barYInner, barWidth, barHeight) {
    const barGrps = this.draw.selectAll('.monte-segment-bar-grp')
      .data(this.displayData, this.opts.dataKey);

    const fns = {barXInner, barYInner, barWidth, barHeight};
    const barGrpsEnter = barGrps.enter().append('g')
      .attr('class', 'monte-segment-bar-grp')
      .call(this.__bindCommonEvents(BARGRP));
    const enterTrans = this._updateBarSelection(barGrpsEnter, ENTER, fns);
    const updateTrans = this._updateBarSelection(barGrps, UPDATE, fns);

    // TODO: Should this have transitions? Only have a delay?
    barGrps.exit()
      .call((sel) => this.fnInvoke(this.opts.bargrpExitSelectionCustomize, sel))
      .transition()
        .call(this._transitionSetup(BARGRP, EXIT))
        .call((t) => this.fnInvoke(this.opts.bargrpExitTransitionCustomize, t))
      .remove();

    return {
      barGrps: barGrps.merge(barGrps.enter().selectAll('.monte-bar-grp')),
      enterTransition: enterTrans,
      updateTransition: updateTrans,
    };
  }

  _updateBarSelection(sel, stage, fns) {
    const translate = this._barGroupTranslate.bind(this);
    const trans = this.draw.transition()
      .call(this._transitionSetup('bargrp', stage));

    const selectionFnName = BARSEG + upperFirst(stage) + 'SelectionCustomize';
    const transitionFnName = BARSEG + upperFirst(stage) + 'TransitionCustomize';

    sel.attr('transform', (d) => `translate(${translate(d)})`)
      .each((d, i, nodes) => {
        const prop = this._barProp();
        const nestedData = d[prop];
        const innerRects = d3.select(nodes[i]).selectAll('rect').data(nestedData); // TODO: Does this need a custom data key?

        innerRects.enter().append('rect')
          .call(this.__bindCommonEvents(BARSEG))
          .style('opacity', 0)
          .merge(innerRects)
            .attr('class', (d, i) => this._buildCss(
              ['monte-segment-bar-seg',
                this.opts.barSegCss,
                this.opts.barSegCssScaleAccessor,
                d.css], d, i))
            .call((sel) => this.fnInvoke(this.opts[selectionFnName], sel))
            .transition()
              .call(this._transitionSetup(BARSEG, stage), d, i, nodes)
              .style('fill', this.optionReaderFunc('barSegFillScaleAccessor'))
              .attr('x', fns.barXInner)
              .attr('y', fns.barYInner)
              .attr('width', fns.barWidth)
              .attr('height', fns.barHeight)
              .style('opacity', 1)
              .call((t) => this.fnInvoke(this.opts[transitionFnName], t));

        innerRects.exit()
          .call((sel) => this.fnInvoke(this.opts.barsegExitSelectionCustomize, sel))
          .transition()
            .call(this._transitionSetup(BARSEG, EXIT))
            .call((t) => this.fnInvoke(this.opts.barsegExitTransitionCustomize, t))
          .remove();
      });

    return trans;
  }

  _segLabels(d) {
    return this.getProp('y', d);
  }

  _updateLabels(barGrps, transition) {
    barGrps.each((d, i, nodes) => {
      const barGrp = d3.select(nodes[i]);
      this._updateBarSegLabel(barGrp, transition, d, i, nodes);
    });
  }

  // TODO: Move labels into segment bar grps (a new nested for the rect and label to live together)?
  _updateBarSegLabel(barGrp, transition, barData, barIndex, barNodes) {
    const lbl = barGrp.selectAll('.monte-bar-label').data(this._segLabels(barData));

    // TODO: Split enter and merge?
    lbl.enter().append('text')
      .attr('class', 'monte-bar-label')
      .merge(lbl)
        .text((d1, i, nodes) => this.tryInvoke(this.opts.label, d1, i, nodes))
        .call((sel) => this.fnInvoke(this.opts.labelUpdateSelectionCustomize, sel))
        .transition(transition)
          .call(this._transitionSetup(LABEL, UPDATE), barData, barIndex, barNodes)
          .style('fill', (d1, i, nodes) => this.tryInvoke(this.opts.labelFillScaleAccessor, d1, i, nodes))
          .attr('x', (d1, i, nodes) => this.tryInvoke(this.opts.labelX, d1, i, nodes))
          .attr('dx', (d1, i, nodes) => this.tryInvoke(this.opts.labelXAdjust, d1, i, nodes))
          .attr('y', (d1, i, nodes) => this.tryInvoke(this.opts.labelY, d1, i, nodes))
          .attr('dy', (d1, i, nodes) => this.tryInvoke(this.opts.labelYAdjust, d1, i, nodes))
          .call((t) => this.fnInvoke(this.opts.labelUpdateTransitionCustomize, t));

    lbl.exit()
      .call((sel) => this.fnInvoke(this.opts.labelUpdateSelectionCustomize, sel))
      .transition()
        .call(this._transitionSetup(LABEL, EXIT), barData, barIndex, barNodes)
        .style('opacity', 0)
        .call((t) => this.fnInvoke(this.opts.labelUpdateTransitionCustomize, t))
      .remove();
  }

  _barProp() { return this.tryInvoke(this.opts.yProp); }
  _barGroupTranslate(d) { return `${this._barX(d)}, 0`; }
  _barX(d) { return this.getScaledProp('x', d); }
  _barXInnerGrouped(d) { return this.getScaledProp('xInner', d); }
  _barXInnerStacked() { return 0; }
  _barWidthStacked() { return this.x.bandwidth(); }
  _barWidthGrouped() { return this.xInner.bandwidth(); }
  _barY(d) { return this.getScaledProp('y', d); }
  _barYInnerGrouped(d) { return this.height - this._barHeightGrouped(d); }
  _barYInnerStacked(d, i, nodes) {
    const baseY = this.getScaledProp('y', 'yInner', d);
    let yShift = 0;

    for (let j = 0; j < i; j++) {
      const n = d3.select(nodes[j]);
      const d1 = n.datum();
      yShift -= this._barHeightStacked(d1);
    }

    return baseY + yShift;
  }
  _barHeightGrouped(d) { return this.height - this.getScaledProp('y', 'yInner', d); }
  _barHeightStacked(d) { return this.height - this.getScaledProp('y', 'yInner', d); }

  static createInstanceGroup(charts, ...additionalMethodsToProxy) {
    additionalMethodsToProxy.push(GROUP_PROXY_METHODS);
    return super.createInstanceGroup(charts, ...additionalMethodsToProxy);
  }
}

SegmentBarChart.EVENTS = EVENTS;

export const GROUP_PROXY_METHODS = [ 'setMode', 'updateAxesRanges' ];

/**
 * Get the values of all the keys that don't match
 */
function nonMatchingMapValues(map, keyToExclude) {
  const values = [];

  for (const key in map) {
    if (map.hasOwnProperty(key)) {
      if (key !== keyToExclude) {
        values.push(map[key]);
      }
    }
  }

  return values;
}
