import { ArcChart } from './ArcChart';
import { needleRoundedEnd } from '../../util/needle';
import { noop } from '../../tools/noop';
import { pi } from '../../const/math';

const GAUGE_CHART_DEFAULTS = {
  chartCss: 'monte-arc-chart monte-gauge-chart',
  piePadAngle: 0,
  pieStartAngle: pi * -0.55,
  pieEndAngle: pi * 0.55,

  // TODO: Add bg wedge css and fill scales.
  arcBgCssScale: noop,
  arcBgFillScale: noop,

  needleBase: 20,
  needleHeight: function(outerRadius, innerRadius) {
    return (outerRadius - innerRadius) / 2 + innerRadius;
  },
  needlePath: needleRoundedEnd(),

  cornerRadius: 0,
  outerRadius: 180,
  innerRadius: 160,
  labelRadius: 140,

  segmentsProp: 'segments',
  itemValueProp: 'interval',
  segmentLabelProp: 'label',
};

export class GaugeChart extends ArcChart {
  _initOptions(...options) {
    super._initOptions(...options, GAUGE_CHART_DEFAULTS);
  }

  _initCore() {
    super._initCore();

    this.needleValueData = 0;
    this.needleValueAngleData = 0;

    this.bgArc = d3.arc()
      .startAngle(this.opts.pieStartAngle)
      .endAngle(this.opts.pieEndAngle)
      .innerRadius(0)
      .outerRadius(this.opts.outerRadius)
      .cornerRadius(this.opts.cornerRadius);

    this.angleScale = d3.scaleLinear().range([this.opts.pieStartAngle, this.opts.pieEndAngle]);
  }

  _initPublicEvents(...events) {
    super._initPublicEvents(...events,
      'updateNeedle', 'updateBackgroundArc', 'updateLabels'   // Gauge events
    );
  }

  _getLayerTranslate() {
    const l = this.width / 2 + this.margin.left;
    const t = this.height - (this.height - this.opts.outerRadius) + this.margin.top;
    return `translate(${l}, ${t})`;
  }

  _data(data) {
    this.needleValue(data[this.opts.itemValueProp]);
    super._data(data[this.opts.segmentsProp]);

    const intervalSum = this.displayData.reduce((acc, d) => acc + d[this.opts.itemValueProp], 0);
    this.angleScale.domain([0, intervalSum]);
  }

  needleValue(value) {
    if (value === undefined) {
      return this.needleValueData;
    }

    this.needleValueData = value;
    this.needleValueAngleData = this.angleScale(value);
    this.update();

    return this;
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
      .attr('class', (d, i) =>
        ['monte-gauge-bg',
          this.opts.arcBgCssScale(d, i),
        ].join(' '))
      .attr('d', this.bgArc());

    this.__notify('updateBackgroundArc');
  }

  _updateLabels() {
    const labels = this.support.selectAll('.monte-gauge-label').data(this.pieDisplayData);

    labels.enter().append('text')
        .attr('class', 'monte-gauge-label')
        .attr('text-anchor', 'middle')
        .attr('dy', '0.35em')
      .merge(labels)
        .attr('transform', (d) =>
          'translate(' + GaugeChart.getCoord(this.opts.labelRadius, d.endAngle) +')')
        .text((d) => d.data[this.opts.segmentLabelProp]);

    this.__notify('updateLabels');
  }

  _updateNeedle() {
    const baseWidth = this.opts.needleBase;
    const height = this.optInvoke(this.opts.needleHeight, this.opts.outerRadius, this.opts.innerRadius);
    const path = this.optInvoke(this.opts.needlePath, height, baseWidth);

    const needle = this.overlay.selectAll('.monte-gauge-needle').data([this.needleValueAngleData || 0]);

    needle.enter().append('path')
      .attr('class', 'monte-gauge-needle')
      .attr('d', path)
      .style('transform', (d) => 'rotate(' + d + 'rad)');

    needle
      .transition()
        .duration(this.opts.transitionDuration)
        .style('transform', (d) => 'rotate(' + d + 'rad)');

    this.__notify('updateNeedle');
  }
}
