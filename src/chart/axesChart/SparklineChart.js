import { LineChart } from './LineChart';

const SPARKLINE_CHART_DEFAULTS = {
  chartCss: 'monte-sparkline-chart',
  boundingWidth: 80,
  boundingHeight: 30,

  margin: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },

  suppressAxes: true,

  pointSize: 24,
};

export class SparklineChart extends LineChart {
  _initOptions(...options) {
    super._initOptions(...options, SPARKLINE_CHART_DEFAULTS);
  }

  _data(data, ...tail) {
    super._data([data], ...tail);
  }
}
