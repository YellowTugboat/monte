import { ENTER, EXIT, UPDATE } from '../../const/d3';
import { AxesChart } from './AxesChart';
import { commonEventNames } from '../../tools/commonEventNames';
import { noop } from '../../tools/noop';
import { resetScaleDomain } from '../../tools/resetScaleDomain';
import { upperFirst } from '../../tools/string';

const POINT = 'point';

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
      ...commonEventNames(POINT) // Point events
    );
  }

  _domainExtent(data, scaleName) {
    const itemProp = this.opts[scaleName + 'Prop'];
    const extent = d3.extent(data, (d) => d[itemProp]);

    return extent;
  }

  _resetStyleDomains() {
    super._resetStyleDomains();

    resetScaleDomain(this.opts.pointCssScale);
    resetScaleDomain(this.opts.pointFillScale);
    resetScaleDomain(this.opts.pointStrokeScale);
  }

  // Render the vis.
  _update() {
    const points = this._updatePoints();

    return points;
  }

  _updatePoints() {
    // Data join for the points
    const points = this.draw.selectAll('.monte-point').data(this.displayData, this.opts.dataKey);

    // Create new points and update existing
    const pointsEnter = points.enter().append('path')
        .call(this.__bindCommonEvents(POINT));
    this._updatePointsSelection(pointsEnter, ENTER);
    this._updatePointsSelection(points, UPDATE);

    // Fade out removed points.
    points.exit()
      .call((sel) => this.fnInvoke(this.opts.pointExitSelectionCustomize, sel))
      .transition()
        .call(this._transitionSetup(POINT, EXIT))
        .style('opacity', 0)
        .call((t) => this.fnInvoke(this.opts.pointExitTransitionCustomize, t))
      .remove();

    return points.merge(points.enter().selectAll('.point'));
  }

  _updatePointsSelection(sel, stage) {
    const selectionFnName = POINT + upperFirst(stage) + 'SelectionCustomize';
    const transitionFnName = POINT + upperFirst(stage) + 'TransitionCustomize';

    sel.attr('d', (d, i) => {
      const symbase = d3.symbol().size(this.opts.pointSize);
      const symbol = this.opts.pointSymbol(symbase, d, i);
      return symbol(d, i);
    })
    .attr('class', (d, i) => this._buildCss(
      ['monte-point',
        this.opts.pointCss,
        this.opts.pointCssScaleAccessor,
        d.css], d, i))
    .style('fill', this.optionReaderFunc('pointFillScaleAccessor'))
    .style('stroke', this.optionReaderFunc('pointStrokeScaleAccessor'))
    .call((sel) => this.fnInvoke(this.opts[selectionFnName], sel))
    .transition()
      .call(this._transitionSetup(POINT, stage))
      .style('fill', this.optionReaderFunc('pointFillScaleAccessor'))
      .style('stroke', this.optionReaderFunc('pointStrokeScaleAccessor'))
      .attr('transform', (d) => `translate(${this.getScaledProp('x', d)}, ${this.getScaledProp('y', d)})`)
      .call((t) => this.fnInvoke(this.opts[transitionFnName], t));
  }
}
