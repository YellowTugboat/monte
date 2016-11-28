import { EXIT, UPDATE } from '../../const/d3';
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

  pointProp: '',

  pointFillScale: noop,
  pointFillScaleAccessor: AxesChart.generateScaleAccessor('pointFillScale', 'point'),

  pointStrokeScale: noop,
  pointStrokeScaleAccessor: AxesChart.generateScaleAccessor('pointStrokeScale', 'point'),

  // Scale function for CSS class to apply per line. Input: line index, Output: String of CSS Class.
  pointCssScale: noop,
  pointCssScaleAccessor: AxesChart.generateScaleAccessor('pointCssScale', 'point'),

  // Static CSS class(es) to apply to every line.
  pointCss: 'monte-point',

  pointSymbol: (symbol) => symbol.type(d3.symbolCircle),
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
    resetScaleDomain(this.opts.pointFillScaleAccessor);
    resetScaleDomain(this.opts.pointStrokeScaleAccessor);
  }

  // Render the vis.
  _update() {
    const points = this._updatePoints();

    return points;
  }

  _updatePoints() {
    // Data join for the points
    const points = this.draw.selectAll('.monte-point').data(this.displayData);

    // Create new points
    points.enter().append('path')
        .call(this.__bindCommonEvents('point'))
      .merge(points) // Update existing points and set values on new points.
        .attr('d', (d, i) => {
          const symbase = d3.symbol().size(this.opts.pointSize);
          const symbol = this.opts.pointSymbol(symbase, d, i);
          return symbol(d, i);
        })
        .attr('class', (d, i) => this._buildCss(
          ['monte-point',
            this.opts.pointCss,
            this.opts.pointCssScaleAccessor,
            d.css], d, i))
      .transition()
        .call(this._transitionSetup('point', UPDATE))
        .attr('fill', this.optionReaderFunc('pointFillScaleAccessor'))
        .attr('stroke', this.optionReaderFunc('pointStrokeScaleAccessor'))
        .attr('transform', (d) => `translate(${this.getScaledProp('x', d)}, ${this.getScaledProp('y', d)})`);

    // Fade out removed points.
    points.exit()
      .transition()
      .call(this._transitionSetup('point', EXIT))
      .style('opacity', 0)
      .remove();

    return points.merge(points.enter().selectAll('.point'));
  }
}
