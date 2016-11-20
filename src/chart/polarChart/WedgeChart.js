import { ArcChart } from './ArcChart';
import { UNDEF } from '../../const/undef';

const WEDGE_CHART_DEFAULTS = {
  chartCss: 'monte-arc-chart monte-wedge-chart',
  piePadAngle: 0,

  // NOTE: Wedge's use startAngle for the preset angle positions. (ArcChart uses endAngle)
  arcWedgeEnter: (d) => ({
    startAngle: d.startAngle,
    endAngle: d.startAngle,
    value: d.value,
    padAngle: d.padAngle,
    index: d.index,
  }),
};

export class WedgeChart extends ArcChart {
  _initOptions(...options) {
    super._initOptions(...options, WEDGE_CHART_DEFAULTS);
  }

  _initCore() {
    super._initCore();

    this.pie.sortValues((a, b) => a.value - b.value);
  }

  _data(data, ...tail) {
    this.wedgeValueData = data;
    this.rawData = data;
    const itemValueProp = this.tryInvoke(this.opts.itemValueProp);

    // Data is expected to be a single value between 0 & 100.
    const pieData = [
       // Wrapped value to
      { [itemValueProp]: data, css: 'monte-wedge' },

      // The special case wedge to scale
      { [itemValueProp]: 100 - data, css: 'monte-arc-placeholder' },
    ];

    return super._data(pieData, ...tail);
  }

  wedgeValue(value) {
    if (value === UNDEF) {
      return this.wedgeValueData;
    }

    this.data(value);
    return this;
  }

  static createInstanceGroup(charts, ...additionalMethodsToProxy) {
    additionalMethodsToProxy.push(GROUP_PROXY_METHODS);
    return super.createInstanceGroup(charts, ...additionalMethodsToProxy);
  }
}

export const GROUP_PROXY_METHODS = [ 'wedgeValue' ];
