import { BarChart } from './BarChart';
import { isObject } from '../../tools/is';

const SIMPLE_BAR_CHART_DEFAULTS = {
  chartCss: 'monte-simple-bar-chart',
  boundingWidth: 10,
  boundingHeight: 100,

  margin: {
    top: 1,
    right: 1,
    bottom: 1,
    left: 1,
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

    this.rawData = data;
    super._data([datum], ...tail);
  }

  _update() {
    super._update();

    this._updateSupport();
  }

  _updateSupport() {
    const barSupport = { bottom: this.y.domain()[1], top: this.y.domain()[0] };
    const bgBar = this.bg.selectAll('.monte-bar-bg').data([barSupport]);
    const frame = this.draw.selectAll('.monte-frame').data([barSupport]);

    bgBar.enter().append('rect')
        .attr('class', 'monte-simple-bar-bg')
      .merge(bgBar)
        .attr('x', 0)
        .attr('y', (d) => this.y(d.bottom))
        .attr('width', this.x.bandwidth())
        .attr('height', (d) => this.y(d.top));

    bgBar.exit().remove();

    frame.enter().append('rect')
        .attr('class', 'monte-simple-bar-frame')
      .merge(frame)
        .attr('x', 0)
        .attr('y', (d) => this.y(d.bottom))
        .attr('width', this.x.bandwidth())
        .attr('height', (d) => this.y(d.top));

    frame.exit().remove();
  }
}
