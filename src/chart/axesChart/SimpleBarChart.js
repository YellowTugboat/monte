import { BarChart } from './BarChart';
import { isObject } from '../../tools/is';

const SIMPLE_BAR_CHART_DEFAULTS = {
  chartCss: 'monte-simple-bar-chart',
  boundingWidth: 10,
  boundingHeight: 100,

  margin: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },

  suppressAxes: true,

  xScale: function() {
    return d3.scaleBand().paddingInner(0).round(true);
  },
  yDomainCustomize: [0, 100],
};

export class SimpleBarChart extends BarChart {
  _initOptions(...options) {
    super._initOptions(...options, SIMPLE_BAR_CHART_DEFAULTS);
  }

  _data(data, ...tail) {
    const valueProp = this.tryInvoke(this.opts.yProp);
    const datum = isObject(data) ? data: {
      [valueProp]: data,
    };

    if (!datum.css) { datum.css = 'monte-simple-bar-value'; }

    super._data([datum], ...tail);
  }
}
