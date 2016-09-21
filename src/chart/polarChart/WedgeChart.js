import { ArcChart } from './ArcChart';
// import { noop } from '../tools/noop';

const WEDGE_CHART_DEFAULTS = {
  chartCss: 'monte-arc-chart monte-wedge-chart',
  piePadAngle: 0,

  // // Background css and fill scales.
  // arcBgWedgeCssScale: noop,
  // arcBgWedgeFillScale: noop,
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

    // Data is expected to be a single value between 0 & 100.
    const pieData = [
       // Wrapped value to
      { value: data, css: 'monte-wedge' },

      // The special case wedge to scale
      { value: 100 - data, css: 'monte-arc-placeholder' },
    ];

    return super._data(pieData, ...tail);
  }

  wedgeValue(value) {
    if (value === undefined) {
      return this.wedgeValueData;
    }

    this.data(value);
    return this;
  }

  // _update() {
  //   super._update();
  //
  //   this._updateBackgroundCircle();
  // }

  // _updateBackgroundCircle() {
  //   const or = this.optInvoke(this.opts.outerRadius, this.width, this.height);
  //   const wedge = this.bg.selectAll('.monte-wedge-bg').data([or]);
  //
  //   wedge.enter()
  //       .append('circle')
  //     .merge(wedge)
  //       .attr('r', (d) => d)
  //       .attr('fill', (d, i) => this.opts.arcBgWedgeFillScale(d.id || i))
  //       .attr('class', (d, i) =>
  //          ['monte-wedge-bg',
  //           this.opts.arcBgWedgeCssScale(d.id || i),
  //           ].join(' '));
  // }
}
