import { SEGMENT_BAR_MODE, SegmentBarChart } from './SegmentBarChart';
import { MonteOptionError } from '../../support/MonteOptionError';
import { extentBalanced } from '../../util/extents';

const HSEGMENT_BAR_CHART_DEFAULTS = {
  chartCss: 'monte-horizontal-segment-bar-chart',
  barSegmentCss: 'bar-segment',

  margin: {
    top: 0,
    right: 10,
    bottom: 20,
    left: 40,
  },

  segmentBarMode: SEGMENT_BAR_MODE.STACKED,

  barSegCssScaleAccessor: SegmentBarChart.generateScaleAccessor('barSegCssScale', 'y'),
  barSegFillScaleAccessor: SegmentBarChart.generateScaleAccessor('barSegFillScale', 'y'),

  yProp: 'id',
  xProp: 'values',
  yInnerProp: 'type',
  xInnerProp: 'value',

  xScale: d3.scaleLinear,

  yInnerScale: function() {
    return d3.scaleBand().paddingInner(0.1).paddingOuter(0.1).round(true);
  },

  yScale: function() {
    return d3.scaleBand().paddingInner(0.1).round(true);
  },

  xDomainCustomize: extentBalanced,
  yDomainCustomize: null,


  labelXAdjust: '-0.1em',
  labelX: function(d, i, nodes, allNodes) {
    const mode = this.option('segmentBarMode');

    if (mode === SEGMENT_BAR_MODE.STACKED) {
      return this._barXInnerStacked(d, i, nodes, allNodes) + this._barWidthStacked(d);
    }
    else if (mode === SEGMENT_BAR_MODE.GROUPED) {
      return this._barWidthGrouped(d);
    }
  },
  labelYAdjust: '0.35em',
  labelY: function(d) {
    const mode = this.option('segmentBarMode');

    if (mode === SEGMENT_BAR_MODE.STACKED) {
      return this.y.bandwidth() / 2;
    }
    else if (mode === SEGMENT_BAR_MODE.GROUPED) {
      return this._barYInnerGrouped(d) + this.yInner.bandwidth() / 2;
    }
  },
};

export class HorizontalSegmentBarChart extends SegmentBarChart {
  _initOptions(...options) {
    super._initOptions(...options, HSEGMENT_BAR_CHART_DEFAULTS);
  }

  _initInnerScales() {
    this.yInner = this.opts.yInnerScale();
  }

  _updateXInnerRange() {}

  _updateXInnerDomain() {}

  _updateYInnerRange() {
    this.yInner.range([0, this.y.bandwidth()]);
  }

  _updateYInnerDomain() {
    const data = this.data();
    const xProp = this.tryInvoke(this.opts.xProp);
    const yInnerProp = this.tryInvoke(this.opts.yInnerProp);
    const yInnerDomain = data[0][xProp].map((d) => d[yInnerProp]);
    this.yInner.domain(yInnerDomain);
  }

  _domainExtent(data, scaleName) {
    let extent = null;

    if (scaleName === 'y') {
      extent = data.map((d) => this.getProp('y', d));
    }
    else if (scaleName === 'x') {
      const mode = this.tryInvoke(this.opts.segmentBarMode);

      if (mode === SEGMENT_BAR_MODE.GROUPED) {
        extent = this._extentInner(data, 'x');
      }
      else if (mode === SEGMENT_BAR_MODE.STACKED) {
        extent = this._extentMaxes(data, 'x');
      }
      else {
        throw MonteOptionError.InvalidEnumOption('segmentBarMode', mode);
      }
    }

    return extent;
  }

  _segLabels(d) {
    return this.getProp('x', d);
  }

  _barProp() { return this.tryInvoke(this.opts.xProp); }
  _barGroupTranslate(d) { return `0, ${this._barY(d)}`; }
  _barX(d) { return this.getScaledProp('x', d); }
  _barXInnerGrouped() { return 0; }
  _barXInnerStacked(d, i, nodes, allNodes) {
    const baseX = 0;
    let xShift = 0;

    for (let j = 0; j < i; j++) {
      const n = d3.select(allNodes[j]);
      const d1 = n.datum();
      xShift += this._barWidthStacked(d1);
    }

    return baseX + xShift;
  }
  _barWidthGrouped(d) { return this.getScaledProp('x', 'xInner', d); }
  _barWidthStacked(d) { return this.getScaledProp('x', 'xInner', d); }
  _barY(d) { return this.getScaledProp('y', d); }
  _barYInnerGrouped(d) { return this.getScaledProp('yInner', d); }
  _barYInnerStacked() { return 0; }
  _barHeightGrouped() { return this.yInner.bandwidth(); }
  _barHeightStacked() { return this.y.bandwidth(); }
}
