import { ArcChart } from './ArcChart';
import { HALF_PI } from '../../const/math';
import { needleRoundedEnd } from '../../util/needle';
import { noop } from '../../tools/noop';
import { radiusContrain } from '../../util/dimension';

const GAUGE_CHART_DEFAULTS = {
  chartCss: 'monte-arc-chart monte-gauge-chart',
  piePadAngle: 0,
  pieStartAngle: -HALF_PI,
  pieEndAngle: HALF_PI,

  arcBgCssScale: noop,
  arcBgFillScale: noop,

  needleBase: 20,
  needleHeight: function(outerRadius, innerRadius) {
    return (outerRadius - innerRadius) / 2 + innerRadius;
  },
  needlePath: needleRoundedEnd(),

  innerRadius: (w, h) => radiusContrain(w, h) * 0.9,
  labelRadius: (w, h) => radiusContrain(w, h) * 0.8,

  segmentsProp: 'segments',
  itemValueProp: 'interval',
  startValueProp: 'start',
  needleValueProp: 'value',
  segmentLabelProp: 'label',
};

export class GaugeChart extends ArcChart {
  _initOptions(...options) {
    super._initOptions(...options, GAUGE_CHART_DEFAULTS);
  }

  _initCore() {
    super._initCore();

    this._prevNeedleAngleValueData = 0;
    this.needleValueData = 0;
    this.needleValueAngleData = 0;
  }

  _initRender() {
    super._initRender();

    this.bgArc = d3.arc()
      .startAngle(this.tryInvoke(this.opts.pieStartAngle))
      .endAngle(this.tryInvoke(this.opts.pieEndAngle))
      .innerRadius(0)
      .outerRadius(this.tryInvoke(this.opts.outerRadius, this.width, this.height))
      .cornerRadius(this.tryInvoke(this.opts.cornerRadius));

    this.angleScale = d3.scaleLinear().range([this.opts.pieStartAngle, this.opts.pieEndAngle]);
  }

  _initPublicEvents(...events) {
    super._initPublicEvents(...events,
      'updateNeedle', 'updateBackgroundArc', 'updateLabels'   // Gauge events
    );
  }

  _getLayerTranslate() {
    const or = this.tryInvoke(this.opts.outerRadius, this.width, this.height);
    const l = this.width / 2 + this.margin.left;
    const t = this.height - (this.height - or) + this.margin.top;
    return `translate(${l}, ${t})`;
  }

  _data(data) {
    const segmentsProp = this.tryInvoke(this.opts.segmentsProp);
    const startProp = this.tryInvoke(this.opts.startValueProp);
    const itemValueProp = this.tryInvoke(this.opts.itemValueProp);
    const needleValueProp = this.tryInvoke(this.opts.needleValueProp);

    super._data(data[segmentsProp]);
    const intervalSum = this.displayData.reduce((acc, d) => acc + Math.abs(d[itemValueProp]), 0);
    const start = data[startProp] || 0;

    this.angleScale.domain([start, start + intervalSum]);
    this.needleValue(data[needleValueProp], true);
  }

  needleValue(value, suppressUpdate = false) {
    if (value === undefined) {
      return this.needleValueData;
    }

    this._prevNeedleAngleValueData = this.needleValueAngleData;
    this.needleValueData = value;
    this.needleValueAngleData = this.angleScale(value);

    if (!suppressUpdate) { this.update(); }

    return this;
  }

  needleValueAngle() {
    // TODO: Add support for directly setting the angle? (Use scale's `invert()`?)

    return this.needleValueAngleData;
  }

  _update() {
    super._update();

    if (!this.hasRendered) { this._updateBackgroundArc(); }
    this._updateLabels();
    this._updateNeedle();
  }

  _updateBackgroundArc() {
    this.bg.append('path')
      .attr('fill', this.opts.arcBgFillScale)
      .attr('class', (d, i) => this._buildCss(
        ['monte-gauge-bg',
          this.opts.arcBgCssScale], d, i))
      .attr('d', this.bgArc());

    this.emit('updateBackgroundArc');
  }

  _updateLabels() {
    const labels = this.support.selectAll('.monte-gauge-label').data(this.pieDisplayData);
    const labelRadius = this.tryInvoke(this.opts.labelRadius, this.width, this.height);

    labels.enter().append('text')
        .attr('class', 'monte-gauge-label')
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')
      .merge(labels)
        .attr('transform', (d) =>
          'translate(' + GaugeChart.getCoord(labelRadius, d.endAngle) +')')
        .text((d) => d.data[this.opts.segmentLabelProp]);

    this.emit('updateLabels');
  }

  _updateNeedle() {
    const baseWidth = this.tryInvoke(this.opts.needleBase);
    const or = this.tryInvoke(this.opts.outerRadius, this.width, this.height);
    const ir = this.tryInvoke(this.opts.innerRadius, this.width, this.height);
    const height = this.tryInvoke(this.opts.needleHeight, or, ir);
    const path = this.tryInvoke(this.opts.needlePath, height, baseWidth);

    const needle = this.overlay.selectAll('.monte-gauge-needle').data([this.needleValueAngleData || 0]);

    needle.enter().append('path')
      .attr('class', 'monte-gauge-needle')
      .attr('d', path)
      .style('transform', (d) => 'rotate(' + d + 'rad)');

    needle
      .transition()
        .duration(this.opts.transitionDuration)
        .ease(this.opts.ease)
        .styleTween('transform', (d) => {
          const a = this._prevNeedleAngleValueData;
          const b = d;

          return function(t) {
            const r = a * (1 - t) + b * t;
            return 'rotate(' + r + 'rad)';
          };
        });

    this.emit('updateNeedle');
  }
}
