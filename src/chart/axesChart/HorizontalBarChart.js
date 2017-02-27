import { BarChart } from './BarChart';
import { extentBalanced } from '../../util/extents';

const HBAR_CHART_DEFAULTS = {
  chartCss: 'monte-horizontal-bar-chart',

  margin: {
    top: 0,
    right: 0,
    bottom: 40,
    left: 40,
  },

  barCssScaleAccessor: BarChart.generateScaleAccessor('barCssScale', 'y'),
  barFillScaleAccessor: BarChart.generateScaleAccessor('barFillScale', 'y'),

  xProp: 'value',
  yProp: 'id',

  xScale: d3.scaleLinear,
  yScale: function() {
    return d3.scaleBand().paddingInner(0.1).round(true);
  },

  xDomainCustomize: extentBalanced,
  yDomainCustomize: null,

  barGrpCss: function(d) {
    const value = this.getProp('x', d);
    let css = 'monte-bar-zero';

    if (value > 0) {
      css = 'monte-bar-pos';
    }
    else if (value < 0) {
      css = 'monte-bar-neg';
    }

    return css;
  },

  labelX: function(d) {
    const value = this.getProp('x', d);

    return value > 0 ?
      this._barWidth(d) + this._barX(d) :
      this._barX(d);
  },
  labelXAdjust: '',
  labelY: function(d) {
    return this._barY(d) + this.y.bandwidth() / 2;
  },
  labelYAdjust: '0.35em',
};

export class HorizontalBarChart extends BarChart {
  _initOptions(...options) {
    super._initOptions(...options, HBAR_CHART_DEFAULTS);
  }

  _domainExtent(data, scaleName) {
    let extent = null;

    if (scaleName === 'x') {
      extent = d3.extent(data, (d) => d[this.opts.xProp]);
    }
    else if (scaleName === 'y') {
      extent = data.map((d) => d[this.opts.yProp]);
    }

    return extent;
  }

  _barX(d) {
    const value = this.getProp('x', d);

    return value > 0 ? this.x(0) : this.x(0) - this._barWidth(d);
  }
  _barWidth(d) {
    return Math.abs(this.getScaledProp('x', d) - this.x(0));
  }
  _barY(d) { return this.getScaledProp('y', d); }
  _barHeight() { return this.y.bandwidth(); }
}
