import { AxesChart } from './AxesChart';
import { commonEventNames } from '../../tools/commonEventNames';
import { noop } from '../../tools/noop';
import { resetScaleDomain } from '../../tools/resetScaleDomain';

const SCATTER_PLOT_DEFAULTS = {
  chartCss: 'monte-scatter-plot',

  margin: {
    top: 10,
    right: 10,
    bottom: 30,
    left: 40,
  },

  // The size of each point
  pointSize: 64,

  pointFillScale: noop,

  pointStrokeScale: noop,

  // Scale function for CSS class to apply per line. Input: line index, Output: String of CSS Class.
  pointCssScale: noop,

  // Static CSS class(es) to apply to every line.
  pointCss: 'monte-point',

  pointSymbol: (symbol) => symbol.type(d3.symbolCircle),

  pointEnterStart: noop,
  pointEnterEnd: noop,
  pointExitStart: noop,
  pointExitEnd: noop,
};

export class ScatterPlot extends AxesChart {
  _initOptions(...options) {
    super._initOptions(...options, SCATTER_PLOT_DEFAULTS);
  }

  _initCore() {
    super._initCore();

    this.symbol = d3.symbol();
  }

  _initPublicEvents(...events) {
    super._initPublicEvents(...events,
      ...commonEventNames('point') // Point events
    );
  }

  _domainExtent(data, scaleName) {
    const itemProp = this.opts[scaleName + 'Prop'];
    const extent = d3.extent(data, (d) => d[itemProp]);

    return extent;
  }

  _resetCssDomains() {
    super._resetCssDomains();

    resetScaleDomain(this.opts.pointCssScale);

    return this;
  }

  // Render the vis.
  _update() {
    const points = this._updatePoints();

    return points;
  }

  _updatePoints() {
    // Data join for the points
    const points = this.draw.selectAll('.monte-point').data(this.displayData); // , (d, i) => d.id || i);

    // Create new points
    points.enter().append('path')
        .call(this.__bindCommonEvents('point'))
      .merge(points) // Update existing points and set values on new points.
        .attr('d', (d, i) => {
          const symbase = d3.symbol().size(this.opts.pointSize);
          const symbol = this.opts.pointSymbol(symbase, d, i);
          return symbol(d, i);
        })
        .attr('fill', (d, i) => this.opts.pointFillScale(d.id || i))
        .attr('stroke', (d, i) => this.opts.pointStrokeScale(d.id || i))
        .attr('class', (d, i) => this._buildCss(
           ['monte-point',
            this.opts.pointCss,
            this.opts.pointCssScale,
            d.css], d, i))
      .transition()
        .duration(this.opts.transitionDuration)
        .call(this.opts.pointEnterStart)
        .attr('transform', (d) => `translate(${this.getScaledProp('x', d)}, ${this.getScaledProp('y', d)})`)
        .call(this.opts.pointEnterEnd);

    // Fade out removed points.
    points.exit()
      .transition()
      .duration(this.opts.transitionDuration)
      .call(this.opts.pointExitStart)
      .style('opacity', 0)
      .call(this.opts.pointExitEnd)
      .remove();

    return points.merge(points.enter().selectAll('.point'));
  }
}
