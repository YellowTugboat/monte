import { isArray, isDefined } from '../../tools/is';
import { ArcChart } from './ArcChart';

const POLAR_AREA_CHART_DEFAULTS = {
  chartCss: 'monte-arc-chart monte-polar-area-chart',

  innerRadius: 30,
  outerRadiusProp: '',
  outerRadiusScale: d3.scaleSqrt,
  outerRadiusRange: function (w, h) {
    const v = d3.min([w, h]); // Constrain to smaller value
    const maxOuterRadius = v / 2;
    const ir = this.tryInvoke(this.opts.innerRadius, w, h);

    return [ir, maxOuterRadius];
  },

  outerRadiusDomainCustomize: function(extent) {
    return [0, extent[1]];
  },

  outerRadius: function(/* w, h */) {
    const chart = this;

    return function(d) {
      return chart.getScaledProp('outerRadius', 'itemValue', d.data);
    };
  },
};

export class PolarAreaChart extends ArcChart {
  _initOptions(...options) {
    super._initOptions(...options, POLAR_AREA_CHART_DEFAULTS);
  }

  _initCore() {
    super._initCore();

    this.outerRadius = this.opts.outerRadiusScale();
    this.updateRadiusRange();

    // Force all wedges to be equally sized in terms of angle because radius will be sized to show
    // value.
    this.pie.value(() => 1);
  }

  _updateBounds() {
    super._updateBounds();
    this.updateRadiusRange();
  }

  _data(data) {
    super._data(data);
    this.updateRadiusDomain();
  }

  updateRadiusRange() {
    const range = this.tryInvoke(this.opts.outerRadiusRange, this.width, this.height);

    if (isDefined(range) && isArray(range)) {
      this.outerRadius.range(range);
    }
  }

  updateRadiusDomain() {
    const data = this.data();
    const customize = this.opts.outerRadiusDomainCustomize;
    let extent = data ? this._domainExtent(data) : [];

    if (customize) { extent = this.tryInvoke(customize, extent); }

    this.outerRadius.domain(extent);
  }

  _domainExtent(data) {
    return d3.extent(data, (d) => this.getProp('itemValue', d));
  }
}
