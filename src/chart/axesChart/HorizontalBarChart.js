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

  xProp: 'value',
  yProp: 'id',

  xScale: d3.scaleLinear,
  yScale: function() {
    return d3.scaleBand().paddingInner(0.1).round(true);
  },

  xDomainCustomize: extentBalanced,
  yDomainCustomize: null,

  labelX: function(d) {
    return this._barWidth(d);
  },
  labelXAdjust: '',
  labelY: function(d) {
    return this._barY(d) + this.y.bandwidth() / 2;
  },
  labelYAdjust: '0.5em',
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

  _barX() { return 0; }
  _barWidth(d) { return this.getScaledProp('x', d); }
  _barY(d) { return this.getScaledProp('y', d); }
  _barHeight() { return this.y.bandwidth(); }
}
