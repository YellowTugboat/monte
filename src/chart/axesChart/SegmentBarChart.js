import { ENTER, EXIT, UPDATE } from '../../const/d3';
import { AxesChart } from './AxesChart';
import { MonteOptionError } from '../../support/MonteOptionError';
import { commonEventNames } from '../../tools/commonEventNames';
import { defaultDataKey } from '../Chart';
import { extentBalanced } from '../../util/extents';
import { noop } from '../../tools/noop';
import { resetScaleDomain } from '../../tools/resetScaleDomain';

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
  xInnerProp: 'id',
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
  labelY: function(d, i, nodes, allNodes) {
    const mode = this.option('segmentBarMode');

    if (mode === SEGMENT_BAR_MODE.STACKED) {
      return this._barYInnerStacked(d, i, nodes, allNodes);
    }
    else if (mode === SEGMENT_BAR_MODE.GROUPED) {
      return this._barYInnerGrouped(d);
    }
  },

  innerDataKey: defaultDataKey,
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

    return this;
  }

  mode(mode) {
    if (mode) {
      return this.setMode(mode);
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
    let barGrps;

    this.classed(classToAdd, true);

    if (mode === SEGMENT_BAR_MODE.STACKED) {
      barGrps = this._updateStackedBars();
    }
    else if (mode === SEGMENT_BAR_MODE.GROUPED) {
      barGrps = this._updateGroupedBars();
    }
    else {
      throw MonteOptionError.InvalidEnumOption('segmentBarMode', mode);
    }

    if (this.opts.includeLabels && barGrps && barGrps.size()) {
      this._updateLabels(barGrps);
    }

    classesToRemove.forEach((classToRemove) => this.classed(classToRemove, false));
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
    this._updateBarSelection(barGrps.merge(barGrpsEnter), fns);

    // TODO: Should this have transitions? Only have a delay?
    barGrps.exit()
      .call((sel) => this.fnInvoke(this.opts.bargrpExitSelectionCustomize, sel))
      .transition()
        .call((t) => {
          const settings = this._transitionSettings(BARGRP, EXIT);
          t.delay(this.tryInvoke(settings.delay));
        })
        .call((t) => this.fnInvoke(this.opts.bargrpExitTransitionCustomize, t))
      .remove();

    return barGrps.merge(barGrps.enter().selectAll('.monte-segment-bar-grp'));
  }

  _updateBarSelection(barGrps, fns) {
    const translate = this._barGroupTranslate.bind(this);

    barGrps.attr('transform', (d) => `translate(${translate(d)})`)
      .each((d, i, nodes) => {
        const prop = this._barProp();
        const nestedData = d[prop];
        const n = d3.select(nodes[i]);
        const innerRects = n.selectAll('.monte-segment-bar-seg')
          .data(nestedData, this.opts.innerDataKey);

        const innerRectsEnter = innerRects.enter().append('rect');
        const innerRectsEnterUpdate = innerRects.merge(innerRectsEnter);

        // Enter
        innerRectsEnter
          .call(this.__bindCommonEvents(BARSEG))
          .style('opacity', 0)
          .style('fill', this.optionReaderFunc('barSegFillScaleAccessor'))
          .attr('class', (d, i) => this._buildCss([
            'monte-segment-bar-seg',
            this.opts.barSegCss,
            this.opts.barSegCssScaleAccessor,
            d.css], d, i))
          .attr('x', 0)
          .attr('y', 0)
          .attr('width', 0)
          .attr('height', 0)
          .call((sel) => this.fnInvoke(this.opts.barsegEnterSelectionCustomize, sel))
          .transition()
            .call(this._transitionSetup(BARSEG, ENTER), d, i, nodes)
            .attr('x', (d, i, nodes) => fns.barXInner(d, i, nodes, innerRectsEnterUpdate.nodes()))
            .attr('y', (d, i, nodes) => fns.barYInner(d, i, nodes, innerRectsEnterUpdate.nodes()))
            .attr('width', fns.barWidth)
            .attr('height', fns.barHeight)
            .style('opacity', 1)
            .call((t) => this.fnInvoke(this.opts.barsegEnterTransitionCustomize, t));

        // Update
        innerRects
          .attr('class', (d, i) => this._buildCss([
            'monte-segment-bar-seg',
            this.opts.barSegCss,
            this.opts.barSegCssScaleAccessor,
            d.css], d, i))
          .call((sel) => this.fnInvoke(this.opts.barsegUpdateSelectionCustomize, sel))
          .transition()
            .call(this._transitionSetup(BARSEG, UPDATE), d, i, nodes)
            .style('fill', this.optionReaderFunc('barSegFillScaleAccessor'))
            .attr('x', (d, i, nodes) => fns.barXInner(d, i, nodes, innerRectsEnterUpdate.nodes()))
            .attr('y', (d, i, nodes) => fns.barYInner(d, i, nodes, innerRectsEnterUpdate.nodes()))
            .attr('width', fns.barWidth)
            .attr('height', fns.barHeight)
            .style('opacity', 1)
            .call((t) => this.fnInvoke(this.opts.barsegUpdateTransitionCustomize, t));

        // Exit
        innerRects.exit()
          .call((sel) => this.fnInvoke(this.opts.barsegExitSelectionCustomize, sel))
          .transition()
            .call(this._transitionSetup(BARSEG, EXIT), d, i, nodes)
            .call((t) => this.fnInvoke(this.opts.barsegExitTransitionCustomize, t))
          .remove();
      });
  }

  _segLabels(d) {
    return this.getProp('y', d);
  }

  _updateLabels(barGrps) {
    barGrps.each((d, i, nodes) => {
      const barGrp = d3.select(nodes[i]);
      this._updateBarSegLabels(barGrp, d, i, nodes);
    });
  }

  // TODO: Move labels into segment bar grps (a new nested for the rect and label to live together)?
  _updateBarSegLabels(barGrp, barData, barIndex, barNodes) {
    const lbls = barGrp.selectAll('.monte-bar-label').data(this._segLabels(barData));
    const enterLbls = lbls.enter().append('text').attr('class', 'monte-bar-label');
    const allNodes = enterLbls.merge(lbls);

    const updateLabels = (sel, mode) => {
      sel.text((d, i, nodes) => this.tryInvoke(this.opts.label, d, i, nodes))
        .call((sel) => sel.raise())
        .call((sel) => this.fnInvoke(this.opts.labelUpdateSelectionCustomize, sel))
        .transition()
          .call(this._transitionSetup(LABEL, mode), barData, barIndex, barNodes)
          .style('fill', this.optionReaderFunc('labelFillScaleAccessor'))
          .attr('x', (d, i, nodes) => this.tryInvoke(this.opts.labelX, d, i, nodes, allNodes.nodes()))
          .attr('y', (d, i, nodes) => this.tryInvoke(this.opts.labelY, d, i, nodes, allNodes.nodes()))
          .attr('dx', this.optionReaderFunc('labelXAdjust'))
          .attr('dy', this.optionReaderFunc('labelYAdjust'))
          .call((t) => this.fnInvoke(this.opts.labelUpdateTransitionCustomize, t));
    };

    updateLabels(enterLbls, ENTER);
    updateLabels(lbls, UPDATE);

    lbls.exit()
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
  _barYInnerStacked(d, i, nodes, allNodes) {
    const baseY = this.getScaledProp('y', 'yInner', d);
    let yShift = 0;

    // New nodes have to account for the presence of old nodes therefore y-shifts are accounted for
    // using `allNodes`.
    for (let j = 0; j < i; j++) {
      const n = d3.select(allNodes[j]);
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
