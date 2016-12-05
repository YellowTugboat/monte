import { ENTER, EXIT, UPDATE } from '../../const/d3';
import { AxesChart } from './AxesChart';
import { commonEventNames } from '../../tools/commonEventNames';
import { extentBalanced } from '../../util/extents';
import { noop } from '../../tools/noop';
import { resetScaleDomain } from '../../tools/resetScaleDomain';

const EVENT_UPDATING_LABELS = 'updatingLabels';
const EVENT_UPDATED_LABELS = 'updatedLabels';

const EVENTS = [
  EVENT_UPDATING_LABELS, EVENT_UPDATED_LABELS,
];

const BAR_CHART_DEFAULTS = {
  chartCss: 'monte-bar-chart',

  margin: {
    top: 0,
    right: 0,
    bottom: 30,
    left: 40,
  },

  barCssScale: noop,
  barCssScaleAccessor: AxesChart.generateScaleAccessor('barCssScale', 'x'),

  barFillScale: noop,
  barFillScaleAccessor: AxesChart.generateScaleAccessor('barFillScale', 'x'),

  // Static CSS class(es) to apply to every line.
  barCss: 'bar',
  barGrpCss: function(d) {
    const value = this.getProp('y', d);
    let css = 'monte-bar-zero';

    if (value > 0) {
      css = 'monte-bar-pos';
    }
    else if (value < 0) {
      css = 'monte-bar-neg';
    }

    return css;
  },

  xProp: 'id',
  yProp: 'value',

  xScale: function() {
    return d3.scaleBand().paddingInner(0.1).round(true);
  },

  yDomainCustomize: extentBalanced,

  includeLabels: false,

  // TODO: Adopt label placement like arc charts?
  labelProp: 'value',
  labelFillScale: noop,
  labelFillScaleAccessor: AxesChart.generateScaleAccessor('labelFillScale', 'label'),
  label: function(d) {
    return this.getProp('label', d);
  },
  labelXAdjust: '',
  labelX: function(d) {
    return this._barX(d) + this.x.bandwidth() / 2;
  },
  labelYAdjust: function(d) {
    const value = this.getProp('y', d);

    return value > 0 ?
      '-0.05em' :
      '1.05em';
  },
  labelY: function(d) {
    const value = this.getProp('y', d);

    return value > 0 ?
      this._barY(d) :
      this._barY(d) + this._barHeight(d);
  },
};

export class BarChart extends AxesChart {
  _initOptions(...options) {
    super._initOptions(...options, BAR_CHART_DEFAULTS);
  }

  _initPublicEvents(...events) {
    super._initPublicEvents(...events,
      ...commonEventNames('bar'),   // Bar events
      ...EVENTS
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
    resetScaleDomain(this.opts.barFillScale);
    resetScaleDomain(this.opts.labelFillScale);
  }

  // Render the vis.
  _update() {
    const barGrps = this._updateBars();

    if (this.opts.includeLabels) {
      this.emit(EVENT_UPDATING_LABELS);

      barGrps.each((d, i, nodes) => {
        const node = d3.select(nodes[i]);
        this._updateBarLabel(node, d, i, nodes);
      });

      this.emit(EVENT_UPDATED_LABELS);
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
      .attr('class', (d, i) => this._buildCss([
        'monte-bar-grp',
        this.opts.barGrpCss], d, i))
      .append('rect')
        .attr('x', barX)
        .attr('y', barY)
        .attr('width', barWidth)
        .attr('height', barHeight)
        .style('fill', this.optionReaderFunc('barFillScaleAccessor'))
        .call(this.__bindCommonEvents('bar'))
      .merge(barGrps.select('rect')) // Update existing lines and set values on new lines.
        .attr('class', (d, i) => this._buildCss([
          this.opts.barCss,
          this.opts.barCssScale,
          d.css], d, i))
      .transition()
        .call(this._transitionSetup(ENTER));

    barGrps.select('rect')
      .style('fill', this.optionReaderFunc('barFillScaleAccessor'))
      .transition()
        .call(this._transitionSetup(UPDATE))
        .attr('x', barX)
        .attr('y', barY)
        .attr('width', barWidth)
        .attr('height', barHeight);

    // Fade out removed lines.
    barGrps.exit()
      .transition()
        .call(this._transitionSetup(EXIT))
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
        .style('fill', (d1) => this.tryInvoke(this.opts.labelFillScaleAccessor, d1, i, nodes))
        .attr('x', (d1) => this.tryInvoke(this.opts.labelX, d1, i, nodes))
        .attr('dx', (d1) => this.tryInvoke(this.opts.labelXAdjust, d1, i, nodes))
        .attr('y', (d1) => this.tryInvoke(this.opts.labelY, d1, i, nodes))
        .attr('dy', (d1) => this.tryInvoke(this.opts.labelYAdjust, d1, i, nodes))
        .text((d1) => this.tryInvoke(this.opts.label, d1, i, nodes));

    lbl.exit().remove();
  }

  _barX(d) { return this.getScaledProp('x', d); }
  _barWidth() { return this.x.bandwidth(); }
  _barY(d) {
    const value = this.getProp('y', d);

    return value < 0 ? this.y(0) : this.getScaledProp('y', d);
  }
  _barHeight(d) {
    if (this.y.domain()[0] < 0) {
      // extent includes negative values
      return Math.abs(this.height - this.getScaledProp('y', d) - this.y(0));
    }

    return this.height - this.getScaledProp('y', d);
  }
}

BarChart.EVENTS = EVENTS;
