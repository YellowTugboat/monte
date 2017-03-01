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

const BAR = 'bar';
const LABEL = 'label';

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
      ...commonEventNames(BAR),   // Bar events
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

  _resetStyleDomains() {
    super._resetStyleDomains();

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
      .data(this.displayData, this.opts.dataKey); // TODO: Add custom key function support.

    const barX = this._barX.bind(this);
    const barY = this._barY.bind(this);
    const barWidth = this._barWidth.bind(this);
    const barHeight = this._barHeight.bind(this);

    // Create new bar groups
    barGrps.enter().append('g')
      .attr('class', (d, i) => this._buildCss([
        'monte-bar-grp',
        this.opts.barGrpCss], d, i))
      .append('rect')
        .call(this.__bindCommonEvents(BAR))
        .style('opacity', 0)
        .attr('x', barX)
        .attr('y', barY)
        .attr('width', barWidth)
        .attr('height', barHeight)
        .style('fill', this.optionReaderFunc('barFillScaleAccessor'))
        .attr('class', (d, i) => this._buildCss([
          'monte-bar',
          this.opts.barCss,
          this.opts.barCssScaleAccessor,
          d.css], d, i))
        .call((sel) => this.fnInvoke(this.opts.barEnterSelectionCustomize, sel))
        .transition()
          .call(this._transitionSetup(BAR, ENTER))
          .style('opacity', 1)
          .attr('x', barX)
          .attr('y', barY)
          .attr('width', barWidth)
          .attr('height', barHeight)
          .call((t) => this.fnInvoke(this.opts.barEnterTransitionCustomize, t));

    // Update existing bar groups
    barGrps.select('rect')
      .style('fill', this.optionReaderFunc('barFillScaleAccessor'))
      .attr('class', (d, i) => this._buildCss([
        'monte-bar',
        this.opts.barCss,
        this.opts.barCssScaleAccessor,
        d.css], d, i))
      .call((sel) => this.fnInvoke(this.opts.barUpdateSelectionCustomize, sel))
      .transition()
        .call(this._transitionSetup(BAR, UPDATE))
        .attr('x', barX)
        .attr('y', barY)
        .attr('width', barWidth)
        .attr('height', barHeight)
        .style('opacity', 1)
        .call((t) => this.fnInvoke(this.opts.barUpdateTransitionCustomize, t));

    // Fade out removed lines.
    barGrps.exit()
      .call((sel) => this.fnInvoke(this.opts.barExitSelectionCustomize, sel))
      .transition()
        .call(this._transitionSetup(BAR, EXIT))
        .style('opacity', 0)
        .call((t) => this.fnInvoke(this.opts.barExitTransitionCustomize, t))
      .remove();

    // Here the order is important. Merging the line groups when only an update occurs results in an
    // empty selection if the command was lineGrps.enter().selectAll('.grp-line').merge(lineGrps);
    return barGrps.merge(barGrps.enter().selectAll('.monte-bar-grp'));
  }

  _updateBarLabel(barGrp, d, i, nodes) {
    const lbl = barGrp.selectAll('.monte-bar-label').data([d]);

    lbl.enter().append('text')
      .attr('class', 'monte-bar-label')
      .style('opacity', 0)
      .style('fill', (d1) => this.tryInvoke(this.opts.labelFillScaleAccessor, d1, i, nodes))
      .attr('x', (d1) => this.tryInvoke(this.opts.labelX, d1, i, nodes))
      .attr('dx', (d1) => this.tryInvoke(this.opts.labelXAdjust, d1, i, nodes))
      .attr('y', (d1) => this.tryInvoke(this.opts.labelY, d1, i, nodes))
      .attr('dy', (d1) => this.tryInvoke(this.opts.labelYAdjust, d1, i, nodes))
      .text((d1) => this.tryInvoke(this.opts.label, d1, i, nodes))
      .call((sel) => this.fnInvoke(this.opts.labelEnterSelectionCustomize, sel))
      .transition()
        .call((t) => {
          const ts = this._transitionSettings(LABEL, ENTER);
          this._transitionConfigure(t, ts, d, i, nodes);
        })
        .style('opacity', 1)
        .call((t) => this.fnInvoke(this.opts.labelEnterTransitionCustomize, t));

    lbl.style('fill', (d1) => this.tryInvoke(this.opts.labelFillScaleAccessor, d1, i, nodes))
      .attr('x', (d1) => this.tryInvoke(this.opts.labelX, d1, i, nodes))
      .attr('dx', (d1) => this.tryInvoke(this.opts.labelXAdjust, d1, i, nodes))
      .attr('y', (d1) => this.tryInvoke(this.opts.labelY, d1, i, nodes))
      .attr('dy', (d1) => this.tryInvoke(this.opts.labelYAdjust, d1, i, nodes))
      .text((d1) => this.tryInvoke(this.opts.label, d1, i, nodes))
      .call((sel) => this.fnInvoke(this.opts.labelUpdateSelectionCustomize, sel))
      .transition()
        .call((t) => {
          const ts = this._transitionSettings(LABEL, UPDATE);
          this._transitionConfigure(t, ts, d, i, nodes);
        })
        .style('opacity', 1)
        .call((t) => this.fnInvoke(this.opts.labelUpdateTransitionCustomize, t));

    lbl.exit()
      .call((sel) => this.fnInvoke(this.opts.labelExitSelectionCustomize, sel))
      .transition()
        .call(this._transitionSetup(LABEL, EXIT))
        .call((t) => this.fnInvoke(this.opts.labelExitTransitionCustomize, t))
      .remove();
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
