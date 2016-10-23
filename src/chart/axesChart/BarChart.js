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

  includeLabels: false,

  labelProp: 'value',
  labelFillScale: noop,
  label: function(d) {
    return this.getProp('label', d);
  },
  labelXAdjust: '',
  labelX: function(d) {
    return this._barX(d) + this.x.bandwidth() / 2;
  },
  labelYAdjust: '-0.05em',
  labelY: function(d) {
    return this._barY(d);
  },
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
      extent = d3.extent(data, (d) => this.getProp('y', d));
    }
    else if (scaleName === 'x') {
      extent = data.map((d) => this.getProp('x', d));
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
    const barGrps = this._updateBars();

    if (this.opts.includeLabels) {
      barGrps.each((d, i, nodes) => {
        const node = d3.select(nodes[i]);
        this._updateBarLabel(node, d, i, nodes);
      });
    }
  }

  _updateBars() {
    const barGrps = this.draw.selectAll('.monte-bar-grp')
      .data(this.displayData, (d, i) => d.id || i);

    const barX = this._barX.bind(this);
    const barY = this._barY.bind(this);
    const barWidth = this._barWidth.bind(this);
    const barHeight = this._barHeight.bind(this);

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
        .attr('fill', (d, i, nodes) => this.optInvoke(this.opts.barFillScale, d, i, nodes));

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

  _updateBarLabel(barGrp, d, i, nodes) {
    const lbl = barGrp.selectAll('.monte-bar-label').data([d]);

    lbl.enter().append('text')
      .attr('class', 'monte-bar-label')
      .merge(lbl)
        .attr('fill', (d1) => this.optInvoke(this.opts.labelFillScale, d1, i, nodes))
        .attr('x', (d1) => this.optInvoke(this.opts.labelX, d1, i, nodes))
        .attr('dx', (d1) => this.optInvoke(this.opts.labelXAdjust, d1, i, nodes))
        .attr('y', (d1) => this.optInvoke(this.opts.labelY, d1, i, nodes))
        .attr('dy', (d1) => this.optInvoke(this.opts.labelYAdjust, d1, i, nodes))
        .text((d1) => this.optInvoke(this.opts.label, d1, i, nodes));

    lbl.exit().remove();
  }

  _barX(d) { return this.getScaledProp('x', d); }
  _barWidth() { return this.x.bandwidth(); }
  _barY(d) { return this.getScaledProp('y', d); }
  _barHeight(d) { return this.height - this.getScaledProp('y', d); }
}
