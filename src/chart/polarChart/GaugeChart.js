import { ENTER, EXIT, UPDATE } from '../../const/d3';
import { ArcChart } from './ArcChart';
import { HALF_PI } from '../../const/math';
import { UNDEF } from '../../const/undef';
import { needleRoundedEnd } from '../../util/needle';
import { noop } from '../../tools/noop';
import { polarLabelInner } from '../../util/polarLabels';
import { radiusContrain } from '../../util/dimension';

const EVENT_UPDATING_BACKGROUND_ARC = 'updatingBackgroundArc';
const EVENT_UPDATED_BACKGROUND_ARC = 'updatedBackgroundArc';
const EVENT_UPDATING_NEEDLE = 'updatingNeedle';
const EVENT_UPDATED_NEEDLE = 'updatedNeedle';

const EVENTS = [
  EVENT_UPDATING_BACKGROUND_ARC, EVENT_UPDATED_BACKGROUND_ARC,
  EVENT_UPDATING_NEEDLE, EVENT_UPDATED_NEEDLE,
];

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
  labelPlacement: polarLabelInner,

  segmentsProp: 'segments',
  itemValueProp: 'interval',
  startValueProp: 'start',
  startLabelProp: 'startLabel',
  needleValueProp: 'value',
  labelProp: 'label',
  labelAngle: (d) => d.endAngle,
  suppressLabels: false,
  includeLabels: function() { return !this.tryInvoke(this.opts.suppressLabels); },
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
      ...EVENTS // Gauge events
    );
  }

  _getLayerTranslate() {
    const or = this.tryInvoke(this.opts.outerRadius, this.width, this.height);
    const l = this.width / 2 + this.margin.left;
    const t = this.height - (this.height - or) + this.margin.top;
    return `translate(${l}, ${t})`;
  }

  _data(data) {
    this.rawData = data;

    const segmentsProp = this.tryInvoke(this.opts.segmentsProp);
    const startProp = this.tryInvoke(this.opts.startValueProp);
    const startLabelProp = this.tryInvoke(this.opts.startLabelProp);
    const itemValueProp = this.tryInvoke(this.opts.itemValueProp);
    const needleValueProp = this.tryInvoke(this.opts.needleValueProp);

    // Insert starting label item
    if (startLabelProp) {
      data[segmentsProp].unshift({
        interval: 0,
        label: data[startLabelProp],
      });
    }

    super._data(data[segmentsProp]);
    const intervalSum = this.displayData.reduce((acc, d) => acc + Math.abs(d[itemValueProp]), 0);
    const start = data[startProp] || 0;

    this.angleScale.domain([start, start + intervalSum]);
    this.needleValue(data[needleValueProp], true);
  }

  needleValue(value, suppressUpdate = false) {
    if (value === UNDEF) {
      return this.needleValueData;
    }

    this._prevNeedleAngleValueData = this.needleValueAngleData;
    this.needleValueData = value;
    this.needleValueAngleData = this.angleScale(value);

    if (!suppressUpdate) { this.update(); }

    return this;
  }

  needleValueAngle(angle) {
    if (angle === UNDEF) {
      return this.needleValueAngleData;
    }

    this.needleValue(this.angleScale.invert(angle));
    return this;
  }

  _render() {
    if (!this.hasRendered) {
      super._render();
      this._updateBackgroundArc();
    }
  }

  _update() {
    super._update();

    this._updateLabels();
    this._updateNeedle();
  }

  _updateBackgroundArc() {
    this.emit(EVENT_UPDATING_BACKGROUND_ARC);

    this.bg.append('path')
      .attr('fill', this.opts.arcBgFillScale)
      .attr('class', (d, i) => this._buildCss(
        ['monte-gauge-bg',
          this.opts.arcBgCssScale], d, i))
      .attr('d', this.bgArc());

    this.emit(EVENT_UPDATED_BACKGROUND_ARC);
  }

  _updateNeedle() {
    const baseWidth = this.tryInvoke(this.opts.needleBase);
    const or = this.tryInvoke(this.opts.outerRadius, this.width, this.height);
    const ir = this.tryInvoke(this.opts.innerRadius, this.width, this.height);
    const height = this.tryInvoke(this.opts.needleHeight, or, ir);
    const path = this.tryInvoke(this.opts.needlePath, height, baseWidth);

    const needle = this.overlay.selectAll('.monte-gauge-needle').data([this.needleValueAngleData || 0]);

    this.emit(EVENT_UPDATING_NEEDLE);

    needle.enter().append('path')
      .attr('class', 'monte-gauge-needle')
      .attr('d', path)
      .transition()
        .call(this._transitionSetup('needle', ENTER))
        .style('transform', (d) => 'rotate(' + d + 'rad)');

    needle.transition()
      .call(this._transitionSetup('needle', UPDATE))
      .styleTween('transform', (d) => {
        const a = this._prevNeedleAngleValueData;
        const b = d;

        return function(t) {
          const r = a * (1 - t) + b * t;
          return 'rotate(' + r + 'rad)';
        };
      });

    needle.exit()
      .transition()
        .call(this._transitionSetup('needle', EXIT))
        .remove();

    this.emit(EVENT_UPDATED_NEEDLE);
  }

  static createInstanceGroup(charts, ...additionalMethodsToProxy) {
    additionalMethodsToProxy.push(GROUP_PROXY_METHODS);
    return super.createInstanceGroup(charts, ...additionalMethodsToProxy);
  }
}

GaugeChart.EVENTS = EVENTS;

export const GROUP_PROXY_METHODS = [ 'needleValue' ];
