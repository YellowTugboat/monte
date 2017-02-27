import { HorizontalBarChart } from './HorizontalBarChart';
import { isObject } from '../../tools/is';

const SIMPLE_HORT_BAR_CHART_DEFAULTS = {
  chartCss: 'monte-simple-horizontal-bar-chart',
  boundingWidth: 100,
  boundingHeight: 10,

  margin: {
    top: 1,
    right: 1,
    bottom: 1,
    left: 1,
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

    this.rawData = data;
    super._data([datum], ...tail);
  }

  _update() {
    super._update();

    this._updateSupport();
  }

  _updateSupport() {
    const barSupport = { left: this.x.domain()[0], right: this.x.domain()[1] };
    const bgBar = this.bg.selectAll('.monte-bar-bg').data([barSupport]);
    const frame = this.draw.selectAll('.monte-frame').data([barSupport]);

    bgBar.enter().append('rect')
        .attr('class', 'monte-simple-bar-bg')
      .merge(bgBar)
        .attr('x', (d) => this.y(d.left))
        .attr('y', 0)
        .attr('width', (d) => this.x(d.right))
        .attr('height', this.y.bandwidth());

    bgBar.exit().remove();

    frame.enter().append('rect')
        .attr('class', 'monte-simple-bar-frame')
      .merge(frame)
        .attr('x', (d) => this.y(d.left))
        .attr('y', 0)
        .attr('width', (d) => this.x(d.right))
        .attr('height', this.y.bandwidth());

    frame.exit().remove();
  }
}
