import { VerticalSpanChart } from './VerticalSpanChart';
import { extentBalanced } from '../../util/extents';

const HSPAN_CHART_DEFAULTS = {
  chartCss: 'monte-horizontal-span-chart',

  margin: {
    top: 0,
    right: 0,
    bottom: 40,
    left: 40,
  },

  spanCssScaleAccessor: VerticalSpanChart.generateScaleAccessor('spanCssScale', 'y'),
  spanFillScaleAccessor: VerticalSpanChart.generateScaleAccessor('spanFillScale', 'y'),

  x1Prop: 'startValue',
  x2Prop: 'endValue',
  yProp: 'id',

  // Clear VerticalSpanChart's inherited values
  yProp1: null,
  yProp2: null,

  xScale: d3.scaleLinear,
  yScale: function() {
    return d3.scaleBand().paddingInner(0.1).round(true);
  },

  xDomainCustomize: extentBalanced,
  yDomainCustomize: null,

  labelStartX: function(d, i, node, catDatum) {
    const value = this.getProp('x', d);

    return value > 0 ?
      this._spanWidth(catDatum, d) + this._spanX(catDatum, d) :
      this._spanX(catDatum, d);
  },
  labelStartXAdjust: '',
  labelStartY: function(d, i, node, catDatum) {
    return this._spanY(catDatum, d) + this.y.bandwidth() / 2;
  },
  labelStartYAdjust: '0.35em',

  labelEndX: function(d, i, node, catDatum) {
    const value = this.getProp('x', d);

    return value > 0 ?
      this._spanX(catDatum, d) :
      this._spanWidth(catDatum, d) + this._spanX(catDatum, d);
  },
  labelEndXAdjust: '',
  labelEndY: function(d, i, node, catDatum) {
    return this._spanY(catDatum, d) + this.y.bandwidth() / 2;
  },
  labelEndYAdjust: '0.35em',
};

export class HorizontalSpanChart extends VerticalSpanChart {
  _initOptions(...options) {
    super._initOptions(...options, HSPAN_CHART_DEFAULTS);
  }

  _domainExtent(data, scaleName) {
    let extent = null;

    if (scaleName === 'x') {
      const x1Values = [];
      const x2Values = [];

      data.forEach((d) => this.getProp('values', d).forEach((v) => {
        x1Values.push(this.getProp('x1', v));
        x2Values.push(this.getProp('x2', v));
      }));

      extent = d3.extent([
        d3.min(x1Values),
        d3.min(x1Values),
        d3.max(x2Values),
        d3.max(x2Values),
      ]);
    }
    else if (scaleName === 'y') {
      extent = data.map((d) => this.getProp('y', d));
    }

    return extent;
  }

  _spanX(catDatum, d) { return this.getScaledProp('x', 'x1', d); }
  _spanWidth(catDatum, d) { return this.getScaledProp('x', 'x2', d) - this.getScaledProp('x', 'x1', d); }
  _spanY(catDatum) { return this.getScaledProp('y', catDatum); }
  _spanHeight() { return this.y.bandwidth(); }
}
