import { AxesChart } from './AxesChart';
import { commonEventNames } from '../../tools/commonEventNames';
import { extentBalanced } from '../../util/extents';
import { noop } from '../../tools/noop';
import { resetScaleDomain } from '../../tools/resetScaleDomain';

const BAR_CHART_DEFAULTS = {
  chartCss: 'monte-bar-chart',

  margin: {
    top: 0,
    right: 0,
    bottom: 30,
    left: 40,
  },

  // Scale function for CSS class to apply per line. Input: line index, Output: String of CSS Class.
  barCssScale: noop,

  barFillScale: noop,

  // Static CSS class(es) to apply to every line.
  barCss: 'bar',

  xProp: 'id',
  yProp: 'value',

  xScale: function() {
    return d3.scaleBand().paddingInner(0.1).round(true);
  },

  yDomainCustomize: extentBalanced,
};

export class BarChart extends AxesChart {
  _initOptions(...options) {
    super._initOptions(...options, BAR_CHART_DEFAULTS);
  }

  _initPublicEvents(...events) {
    super._initPublicEvents(...events,
      ...commonEventNames('bar')   // Bar events
    );
  }

  _domainExtent(data, scaleName) {
    let extent = null;

    if (scaleName === 'y') {
      extent = d3.extent(data, (d) => d[this.opts.yProp]);
    }
    else if (scaleName === 'x') {
      extent = data.map((d) => d[this.opts.xProp]);
    }

    return extent;
  }

  _resetCssDomains() {
    super._resetCssDomains();

    resetScaleDomain(this.opts.barCssScale);

    return this;
  }

  // Render the vis.
  _update() {
    this._updateBars();

    // TODO: Implement?
    // if (this.opts.includeLabels) {
    //   const vis = this;
    //
    //   barGrps.each((d, i, nodes) => vis._updateBarLabels(nodes[i], d, i));
    // }
  }

  _updateBars() {
    // Data join for the lines
    const barGrps = this.draw.selectAll('.monte-bar-grp')
      .data(this.displayData, (d, i) => d.id || i);

    const barX = this._barX.bind(this);
    const barY = this._barY.bind(this);
    const barWidth = this._barWidth.bind(this);
    const barHeight = this._barHeight.bind(this);

    // Create new lines
    barGrps.enter().append('g')
      .attr('class', 'monte-bar-grp')
      .append('rect')
        .attr('x', barX)
        .attr('y', barY)
        .attr('width', barWidth)
        .attr('height', barHeight)
        .call(this.__bindCommonEvents('bar'))
      .merge(barGrps.select('rect')) // Update existing lines and set values on new lines.
        .attr('class', (d, i) =>
          [this.opts.barCss,
           this.opts.barCssScale(d.id || i),
           d.css].join(' ')
        )
      .transition()
        .duration(this.opts.transitionDuration)
        .attr('fill', (d, i) => this.opts.barFillScale(d.id || i));

    barGrps.select('rect')
      .transition()
        .duration(this.opts.transitionDuration)
        .attr('x', barX)
        .attr('y', barY)
        .attr('width', barWidth)
        .attr('height', barHeight);

    // Fade out removed lines.
    barGrps.exit()
      .transition()
        .duration(this.opts.transitionDuration)
        .style('opacity', 0)
      .remove();

    // Here the order is important. Merging the line groups when only an update occurs results in an
    // empty selection if the command was lineGrps.enter().selectAll('.grp-line').merge(lineGrps);
    return barGrps.merge(barGrps.enter().selectAll('.monte-bar-grp'));
  }

  _barX(d) { return this.xGet(d); }
  _barWidth() { return this.x.bandwidth(); }
  _barY(d) { return this.yGet(d); }
  _barHeight(d) { return this.height - this.yGet(d); }
}
