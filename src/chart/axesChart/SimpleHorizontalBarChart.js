import { HorizontalBarChart } from './HorizontalBarChart';
import { isObject } from '../../tools/is';

const SIMPLE_HORT_BAR_CHART_DEFAULTS = {
  chartCss: 'monte-simple-hort-bar-chart',
  boundingWidth: 100,
  boundingHeight: 10,

  margin: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },

  suppressAxes: true,

  xDomainCustomize: [0, 100],
  yScale: function() {
    return d3.scaleBand().paddingInner(0).round(true);
  },
};

export class HorizontalSimpleBarChart extends HorizontalBarChart {
  _initOptions(...options) {
    super._initOptions(...options, SIMPLE_HORT_BAR_CHART_DEFAULTS);
  }

  _data(data, ...tail) {
    const valueProp = this.tryInvoke(this.opts.xProp);
    const datum = isObject(data) ? data: {
      [valueProp]: data,
    };

    if (!datum.css) { datum.css = 'monte-simple-hort-bar-value'; }

    super._data([datum], ...tail);
  }
}
