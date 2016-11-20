import { AxesChart } from './AxesChart';
import { commonEventNames } from '../../tools/commonEventNames';
import { noop } from '../../tools/noop';
import { resetScaleDomain } from '../../tools/resetScaleDomain';

const LINE_CHART_DEFAULTS = {
  chartCss: 'monte-line-chart',

  margin: {
    top: 10,
    right: 10,
    bottom: 30,
    left: 40,
  },

  /***********************************************************************************************
   *
   * Line related options
   *
   **********************************************************************************************/

  valuesProp: 'values',

  // Callback function to customize the line generator, such as set the interpolate.
  lineCustomize: null,

  lineStrokeScale: noop,

  // Scale function for CSS class to apply per line. Input: line index, Output: String of CSS Class.
  lineCssScale: noop,

  // Static CSS class(es) to apply to every line.
  lineCss: 'line',

  /***********************************************************************************************
   *
   * Point related options
   *
   **********************************************************************************************/

  includePoints: true,

  pointFillScale: noop,

  pointStrokeScale: noop,

  // Scale function for CSS class to apply per line. Input: line index, Output: String of CSS Class.
  pointCssScale: noop,

  // Static CSS class(es) to apply to every line.
  pointCss: 'point',

  pointSize: 64,

  pointSymbol: (symbol) => symbol.type(d3.symbolCircle),
};

export class LineChart extends AxesChart {
  _initOptions(...options) {
    super._initOptions(...options, LINE_CHART_DEFAULTS);
  }

  _initCore() {
    super._initCore();

    // Initialize the line generator
    this.line = d3.line()
      .x((d) => this.getScaledProp('x', d))
      .y((d) => this.getScaledProp('y', d));
  }

  _initCustomize() {
    super._initCustomize();
    if (this.opts.lineCustomize) { this.opts.lineCustomize(this.line); }
  }

  _initPublicEvents(...events) {
    super._initPublicEvents(...events,
      ...commonEventNames('line'), // Line events
      ...commonEventNames('point') // Point events
    );
  }

  _domainExtent(data, scaleName) {
    const valuesProp = this.opts.valuesProp;
    const itemProp = this.opts[scaleName + 'Prop'];
    const extents = data.map((line) => d3.extent(line[valuesProp], (d) => d[itemProp]));
    const extent = [d3.min(extents, (d) => d[0]), d3.max(extents, (d) => d[1])];

    return extent;
  }

  _resetCssDomains() {
    super._resetCssDomains();

    resetScaleDomain(this.opts.lineCssScale);
    resetScaleDomain(this.opts.pointCssScale);

    return this;
  }

  // Render the vis.
  _update() {
    const lineGrps = this._updateLines();

    if (this.opts.includePoints) {
      lineGrps.each((d, i, nodes) => this._updateLinePoints(nodes[i], d, i));
    }

    return lineGrps;
  }

  _updateLines() {
    // Data join for the lines
    const lineGrps = this.draw.selectAll('.monte-line-grp')
      .data(this.displayData,
        (d, i) => d.id || i);

    // Create new lines
    lineGrps.enter().append('g')
      .attr('class', 'monte-line-grp')
      .append('path')
        .call(this.__bindCommonEvents('line'))
      .merge(lineGrps.select('.monte-line')) // Update existing lines and set values on new lines.
        .attr('class', (d, i) => this._buildCss(
          ['monte-line',
            this.opts.lineCss,
            this.opts.lineCssScale,
            d.css], d, i))
        .transition()
          .duration(this.opts.transitionDuration)
          .ease(this.opts.ease)
          .attr('d', (d) => this.line(d[this.opts.valuesProp]))
          .attr('stroke', this.opts.lineStrokeScale);

    // Fade out removed lines.
    lineGrps.exit()
      .transition()
        .duration(this.opts.transitionDuration)
        .style('opacity', 0)
      .remove();

    // Here the order is important. Merging the line groups when only an update occurs results in an
    // empty selection if the command was lineGrps.enter().selectAll('.grp-line').merge(lineGrps);
    return lineGrps.merge(lineGrps.enter().selectAll('.monte-line-grp'));
  }

  _updateLinePoints(node, lineDatum, lineIndex) {
    const lineGrp = d3.select(node);

    // Data join for the points
    const points = lineGrp.selectAll('.monte-point').data((d) => d[this.opts.valuesProp]);

    const genSym = (d, i) => {
      const size = this.tryInvoke(this.opts.pointSize, d, i);
      const symbase = d3.symbol().size(size);
      const symbol = this.opts.pointSymbol(symbase, d, i);
      return symbol(d, i);
    };

    // Create new points
    points.enter().append('path')
        .attr('d', genSym)
        .call(this.__bindCommonEvents('point'))
      .merge(points) // Update existing points and set values on new points.
        .attr('transform', (d) => `translate(${this.getScaledProp('x', d)}, ${this.getScaledProp('y', d)})`)
        .attr('class', (d) => this._buildCss(
          ['monte-point',
            lineDatum.css,
            this.opts.lineCssScale,
            this.opts.pointCss,
            this.opts.pointCssScale,
            d.css], lineDatum, lineIndex));

    points.transition()
        .duration(this.opts.transitionDuration)
        .ease(this.opts.ease)
        .attr('fill', this.opts.pointFillScale)
        .attr('stroke', this.opts.pointStrokeScale)
        .attr('transform', (d) => `translate(${this.getScaledProp('x', d)}, ${this.getScaledProp('y', d)})`)
        .attr('d', genSym);

    // Fade out removed points.
    points.exit()
      .transition()
        .duration(this.opts.transitionDuration)
        .ease(this.opts.ease)
        .style('opacity', 0)
        .remove();
  }
}
