import { ArcChart } from './ArcChart';
import { HALF_PI } from '../../const/math';
import { noop } from '../../tools/noop';

const SEGMENT_CHART_DEFAULTS = {
  chartCss: 'monte-arc-chart monte-segment-chart',
  piePadAngle: 0,
  pieStartAngle: HALF_PI,
  pieEndAngle: -HALF_PI,

  arcBgCssScale: noop,
  arcBgFillScale: noop,
};

export class SegmentChart extends ArcChart {
  _initOptions(...options) {
    super._initOptions(...options, SEGMENT_CHART_DEFAULTS);
  }

  _initCore() {
    super._initCore();

    this.pie.sortValues((a, b) => b.value - a.value);
  }

  _updateBounds() {
    super._updateBounds();

    this.layers.forEach((l) =>
      l.attr('transform', `translate(${this.width / 2 + this.margin.left}, ${this.height - (this.height - this.opts.outerRadius) + this.margin.top})`));
  }

  _update() {
    super._update();

    this._updateBackgroundArc();
  }

  _updateBackgroundArc() {
    const bg = this.support.selectAll('.monte-segment-bg').data(this.pie([{
      [this.opts.value]: 100,
    }])); // 100 as in 100%

    bg.enter()
        .append('path')
      .merge(bg)
        .attr('d', (d) =>
          this.arc(d))
        .attr('fill', (d, i) => this.opts.arcBgFillScale(d.id || i))
        .attr('class', (d, i) =>
           ['monte-segment-bg',
             this.opts.arcBgCssScale(d.id || i),
           ].join(' '));
  }
}
