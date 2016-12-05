import { ENTER, EXIT, UPDATE } from '../../const/d3';
import { polarLabelCentroid, polarLabelCssPrefix } from '../../util/polarLabels';
import { PolarChart } from './PolarChart';
import { TAU } from '../../const/math';
import { arcSimpleTween } from '../../util/tween';
import { classedPattern } from '../../util/css';
import { commonEventNames } from '../../tools/commonEventNames';
import { getCoord } from '../../util/polar';
import { noop } from '../../tools/noop';
import { radiusContrain } from '../../util/dimension';
import { resetScaleDomain } from '../../tools/resetScaleDomain';

const LABEL_CSS_PATTERN = new RegExp(`^${polarLabelCssPrefix}*`);

const EVENT_UPDATING_LABELS = 'updatingLabels';
const EVENT_UPDATED_LABELS = 'updatedLabels';

const EVENTS = [
  EVENT_UPDATING_LABELS, EVENT_UPDATED_LABELS,
];

const ARC_CHART_DEFAULTS = {
  chartCss: 'monte-arc-chart',

  cornerRadius: 0,
  innerRadius: 0,
  outerRadius: radiusContrain,

  arcCustomize: null,
  arcCss: 'arc',
  arcWedgeCss: 'wedge',
  arcWedgeCssScale: noop,
  arcWedgeCssScaleAccessor: PolarChart.generateScaleAccessor('arcWedgeCssScale', 'itemValue'),
  arcWedgeFillScale: noop,
  arcWedgeFillScaleAccessor: PolarChart.generateScaleAccessor('arcWedgeFillScale', 'itemValue'),
  arcWedgeStrokeScale: noop,
  arcWedgeStrokeScaleAccessor: PolarChart.generateScaleAccessor('arcWedgeStrokeScale', 'itemValue'),

  arcWedgeEnter: (d) => ({
    startAngle: d.endAngle,
    endAngle: d.endAngle,
    value: d.value,
    padAngle: d.padAngle,
    index: d.index,
  }),

  // Background css and fill scales.
  arcBgWedgeCssScale: noop,
  arcBgWedgeCssScaleAccessor: PolarChart.generateScaleAccessor('arcBgWedgeCssScale', 'itemValue'),
  arcBgWedgeFillScale: noop,
  arcBgWedgeFillScaleAccessor: PolarChart.generateScaleAccessor('arcBgWedgeFillScale', 'itemValue'),

  itemValueProp: 'value',
  pieStartAngle: 0,
  pieEndAngle: TAU,
  piePadAngle: 0.02,

  includeLabels: false,
  labelPlacement: polarLabelCentroid,
  labelAngle: (d) => d.startAngle + (d.endAngle - d.startAngle) / 2,

  labelProp: 'value',
  labelFillScale: noop,
  labelFillScaleAccessor: PolarChart.generateScaleAccessor('labelFillScale', 'label'),
  label: function(d) {
    return this.getProp('label', d.data);
  },
  labelXAdjust: '',
  labelYAdjust: '0.35em',
};

export class ArcChart extends PolarChart {
  _initOptions(...options) {
    super._initOptions(...options, ARC_CHART_DEFAULTS);
  }

  _initCore() {
    super._initCore();

    // Initialize the arc generator
    this.arc = d3.arc()
      .cornerRadius(this.opts.cornerRadius);

    this.pie = d3.pie().value((d) => d[this.opts.itemValueProp])
      .sortValues(null)
      .startAngle(this.opts.pieStartAngle)
      .endAngle(this.opts.pieEndAngle)
      .padAngle(this.opts.piePadAngle);
  }

  _initCustomize() {
    super._initCustomize();
    if (this.opts.arcCustomize) { this.opts.arcCustomize(this.arc); }
    if (this.opts.pieCustomize) { this.opts.pieCustomize(this.pie); }
  }

  _initPublicEvents(...events) {
    super._initPublicEvents(...events,
      ...commonEventNames('wedge'),   // Wedge events
      ...EVENTS
    );
  }

  _resetCssDomains() {
    super._resetCssDomains();

    resetScaleDomain(this.opts.arcWedgeCssScale);
    resetScaleDomain(this.opts.arcWedgeFillScale);
    resetScaleDomain(this.opts.arcWedgeStrokeScale);
    resetScaleDomain(this.opts.arcBgWedgeCssScaleAccessor);
    resetScaleDomain(this.opts.arcBgWedgeFillScaleAccessor);
    resetScaleDomain(this.opts.labelFillScaleAccessor);
  }

  _updateBounds() {
    super._updateBounds();

    this.arc
      .innerRadius(this.tryInvoke(this.opts.innerRadius, this.width, this.height))
      .outerRadius(this.tryInvoke(this.opts.outerRadius, this.width, this.height));
  }

  _data(data) {
    this.pieDisplayData = this.pie(data);
    super._data(data);
  }

  _render() {
    if (!this.hasRendered) {
      super._render();
      this._updateBackground();
    }
  }

  _update() {
    const arcGrps = this._updateArcs();

    if (this.opts.includeLabels) {
      this._updateLabels(arcGrps);
    }
  }

  _updateArcs() {
    const arcs = this.draw.selectAll('.monte-arc').data(this.pieDisplayData);
    const arc = this.arc;

    arcs.enter().append('g')
        .attr('class', `monte-arc ${this.opts.arcCss}`)
        .append('path')
          .attr('class', (d, i) => this._buildCss(
            ['monte-arc-wedge',
              this.opts.arcWedgeCss,
              this.opts.arcWedgeCssScaleAccessor,
              d.data.css], d, i))
          .call(this.__bindCommonEvents('wedge'))
          .transition()
            .call(this._transitionSetup('arc', ENTER))
            .attrTween('d', (d) => {
              const start = this.tryInvoke(this.opts.arcWedgeEnter, d);
              return arcSimpleTween(arc, start, d);
            })
            .style('stroke', this.optionReaderFunc('arcWedgeStrokeScaleAccessor'))
            .style('fill', this.optionReaderFunc('arcWedgeFillScaleAccessor'));

    arcs.selectAll('.monte-arc-wedge')
        .each(function() {
          // Sync data to containing element since it is not done automatically.
          const pd = d3.select(this.parentElement).datum();
          const n = d3.select(this);
          const nd = n.datum();
          pd.prev = nd;
          n.datum(pd);

          delete nd.prev; // Remove old records to prevent building a history tree.
        })
        .attr('class', (d, i) => this._buildCss(
          ['monte-arc-wedge',
            this.opts.arcWedgeCss,
            this.opts.arcWedgeCssScaleAccessor,
            d.data.css], d, i))
        .transition()
          .call(this._transitionSetup('arc', UPDATE))
          .attrTween('d', function(d) {
            return arcSimpleTween(arc, d.prev, d);
          })
          .style('stroke', this.optionReaderFunc('arcWedgeStrokeScaleAccessor'))
          .style('fill', this.optionReaderFunc('arcWedgeFillScaleAccessor'));

    arcs.exit()
      .transition()
        .call(this._transitionSetup('arc', EXIT))
        .style('opacity', 0.01)
        .remove();

    return arcs.merge(arcs.enter().selectAll('.monte-arc'));
  }

  _updateBackground() {
    const pieSum = this.displayData.reduce((accum, cur) => accum + cur.value, 0);
    const bgArc = this.arc({
      index: 0,
      startAngle: this.opts.pieStartAngle,
      endAngle: this.opts.pieEndAngle,
      value: pieSum,
    });
    const wedge = this.bg.selectAll('.monte-arc-bg').data([bgArc]);

    wedge.enter()
        .append('path')
      .merge(wedge)
        .attr('d', (d) => d)
        .style('fill', this.optionReaderFunc('arcBgWedgeFillScaleAccessor'))
        .attr('class', (d, i) => this._buildCss(
          ['monte-arc-bg',
            this.opts.arcBgWedgeCssScaleAccessor], d, i));
  }

  _updateLabels(arcGrps) {
    this.emit(EVENT_UPDATING_LABELS);

    const labelPlacement = this.tryInvoke(this.opts.labelPlacement);
    const css = this.tryInvoke(labelPlacement.css);

    // Clear old label CSS from chart and add new.
    classedPattern(this.bound, LABEL_CSS_PATTERN, false);
    this.classed(css, true);

    arcGrps.each((d, i, nodes) => {
      const node = d3.select(nodes[i]);
      this._updateArcLabel(node, d, i, nodes);
    });

    this.emit(EVENT_UPDATED_LABELS);
  }

  _updateArcLabel(arcGrp, d, i, nodes) {
    const lbl = arcGrp.selectAll('.monte-arc-label').data([d]);
    const labelPlacement = this.tryInvoke(this.opts.labelPlacement);
    const labelRadius = this.tryInvoke(labelPlacement.radius, this.width, this.height);

    lbl.enter().append('text')
      .attr('class', 'monte-arc-label')
      .merge(lbl)
        .attr('dx', (d1) => this.tryInvoke(this.opts.labelXAdjust, d1, i, nodes))
        .attr('dy', (d1) => this.tryInvoke(this.opts.labelYAdjust, d1, i, nodes))
        .attr('fill', this.optionReaderFunc('labelFillScaleAccessor'))
        .attr('transform', (d1) => {
          // TODO: Update to use `attrTween` and follow arc movement instead of direct translation.
          //       Stop the label drift through the
          const angle = this.tryInvoke(this.opts.labelAngle, d1, i, nodes);
          const coord = getCoord(labelRadius, angle);

          return `translate(${coord})`;
        })
        .text((d1) => this.tryInvoke(this.opts.label, d1, i, nodes));

    lbl.exit()
      .transition()
      .call(this._transitionSetup('label', EXIT))
      .remove();
  }
}

ArcChart.EVENTS = EVENTS;
