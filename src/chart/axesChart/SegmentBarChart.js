import { AxesChart } from './AxesChart';
import { MonteOptionError } from '../../support/MonteOptionError';
import { commonEventNames } from '../../tools/commonEventNames';
import { extentBalanced } from '../../util/extents';
import { noop } from '../../tools/noop';
import { resetScaleDomain } from '../../tools/resetScaleDomain';

export const SEGMENT_BAR_MODE = {
  GROUPED: 'grouped',
  STACKED: 'stacked',
};

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
  barSegFillScale: noop,

  // TODO: Begin adoption of generic scale accessors.
  barFillScaleAccessor: function(d) {
    return this.getScaledProp('opts.barFillScale', 'x', d);
  },

  xScale: function() {
    return d3.scaleBand().paddingInner(0.1).round(true);
  },

  yDomainCustomize: extentBalanced,

  includeLabels: false,

  labelProp: 'value',
  labelFillScale: noop,
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
      ...commonEventNames('bargrp'),  // Bar group events
      ...commonEventNames('barseg')   // Bar segment events
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

  _resetCssDomains() {
    super._resetCssDomains();

    resetScaleDomain(this.opts.barCssScale);
    resetScaleDomain(this.opts.barFillScale);

    return this;
  }

  setMode(mode) {
    this.option('segmentBarMode', mode);
    this.updateAxesDomains();
    this.renderAxes();
    this.update();
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

  // Render the vis.
  _update() {
    const mode = this.tryInvoke(this.opts.segmentBarMode);
    let barGrps, transition;

    if (mode === SEGMENT_BAR_MODE.STACKED) {
      ({ barGrps, transition } = this._updateStackedBars());
    }
    else if (mode === SEGMENT_BAR_MODE.GROUPED) {
      ({ barGrps, transition } = this._updateGroupedBars());
    }
    else {
      throw MonteOptionError.InvalidEnumOption('segmentBarMode', mode);
    }

    if (this.opts.includeLabels && barGrps) {
      if (barGrps.size()) {
        this._updateLabels(barGrps, transition);
      }
      else {
        transition.on('end', () => {
          this._updateLabels(this.draw.selectAll('.monte-segment-bar-grp'), d3.transition());
        });
      }
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
    const translate = this._barGroupTranslate.bind(this);
    const barGrps = this.draw.selectAll('.monte-segment-bar-grp')
      .data(this.displayData, (d, i) => d.id || i);

    const trans = d3.transition()
      .duration(this.opts.transitionDuration)
      .delay(this.opts.delay)
      .ease(this.opts.ease);

    barGrps.enter().append('g')
      .attr('class', 'monte-segment-bar-grp')
      .call(this.__bindCommonEvents('bargrp'))
      .merge(barGrps)
        .attr('transform', (d) => `translate(${translate(d)})`)
        .each((d, i, nodes) => {
          const prop = this._barProp();
          const nestedData = d[prop];
          const innerRects = d3.select(nodes[i]).selectAll('rect').data(nestedData);

          innerRects.enter().append('rect')
            .call(this.__bindCommonEvents('barseg'))
            .merge(innerRects)
              .attr('class', (d, i) => this._buildCss(
                ['monte-segment-bar-seg',
                  this.opts.barSegCss,
                  this.opts.barSegCssScale,
                  d.css], d, i))
              .transition(trans)
                .attr('x', barXInner)
                .attr('y', barYInner)
                .attr('width', barWidth)
                .attr('height', barHeight);
        });

    barGrps.exit().remove();

    return {
      barGrps: barGrps.merge(barGrps.enter().selectAll('.monte-bar-grp')),
      transition: trans,
    };
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

  _updateBarSegLabel(barGrp, transition, barData) {
    const lbl = barGrp.selectAll('.monte-bar-label').data(this._segLabels(barData));

    lbl.enter().append('text')
      .attr('class', 'monte-bar-label')
      .merge(lbl)
        .text((d1, i, nodes) => this.tryInvoke(this.opts.label, d1, i, nodes))
        .transition(transition)
          .attr('fill', (d1, i, nodes) => this.tryInvoke(this.opts.labelFillScale, d1, i, nodes))
          .attr('x', (d1, i, nodes) => this.tryInvoke(this.opts.labelX, d1, i, nodes))
          .attr('dx', (d1, i, nodes) => this.tryInvoke(this.opts.labelXAdjust, d1, i, nodes))
          .attr('y', (d1, i, nodes) => this.tryInvoke(this.opts.labelY, d1, i, nodes))
          .attr('dy', (d1, i, nodes) => this.tryInvoke(this.opts.labelYAdjust, d1, i, nodes));

    lbl.exit().remove();
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

export const GROUP_PROXY_METHODS = [ 'setMode', 'updateAxesRanges' ];
