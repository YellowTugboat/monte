import { ENTER, EXIT, UPDATE } from '../../const/d3';
import { polarLabelCssPrefix, polarLabelOuter } from '../../util/polarLabels';
import { MonteOptionError } from '../../support/MonteOptionError';
import { PolarChart } from './PolarChart';
import { TAU } from '../../const/math';
import { arcLabelTween } from '../../util/tween';
import { commonEventNames } from '../../tools/commonEventNames';
import { gaugeLabelRotateTangentFlip } from '../../util/polarLabelRotations';
import { getPolarCoord } from '../../tools/polar';
import { isDefined } from '../../tools/is';
import { noop } from '../../tools/noop';
import { radiansToDegrees } from '../../tools/polar';
import { radiusContrain } from '../../util/dimension';
import { readTransforms } from '../../tools/transform';
import { removeClassByPattern } from '../../tools/css';
import { resetScaleDomain } from '../../tools/resetScaleDomain';
import { upperFirst } from '../../tools/string';

const LABEL_CSS_PATTERN = new RegExp(`^${polarLabelCssPrefix}*`);

const EVENT_UPDATING_LABELS = 'updatingLabels';
const EVENT_UPDATED_LABELS = 'updatedLabels';
const EVENTS = [ EVENT_UPDATING_LABELS, EVENT_UPDATED_LABELS ];

const LABEL = 'label';
const AREA = 'area';
const POINT = 'point';
const RAY = 'ray';
const WEB = 'web';

const WEB_MODE_LINE = 'line';
const WEB_MODE_ARC = 'arc';
export const WEB_MODES = [ WEB_MODE_LINE, WEB_MODE_ARC ];

const RADAR_CHART_DEFAULTS = {
  chartCss: 'monte-radar-chart',

  outerRadius: radiusContrain,

  // The properties to display
  displayProps: function(data) {
    const keys = Object.keys(data[0]);
    const idIndex = keys.indexOf('id');
    if (idIndex > -1) { keys.splice(idIndex, 1); }

    const cssIndex = keys.indexOf('css');
    if (cssIndex > -1) { keys.splice(cssIndex, 1); }

    return keys;
  },

  // Callback function to customize the area generator.
  areaCustomize: null,
  areaProp: 'value',
  areaCssScale: noop,
  areaCssScaleAccessor: PolarChart.generateScaleAccessor('areaCssScale', 'area'),
  areaFillScale: noop,
  areaFillScaleAccessor: PolarChart.generateScaleAccessor('areaFillScale', 'area'),
  areaStrokeScale: noop,
  areaStrokeScaleAccessor: PolarChart.generateScaleAccessor('areaStrokeScale', 'area'),

  startAngle: 0,
  endAngle: TAU,

  // Radius Labels
  suppressRadiusLabels: false, // TODO: Always place along the start angle?
  radiusScale: d3.scaleLinear,
  radiusDomainCustomize: null,

  // Web
  suppressWeb: false,
  webArcCustomize: null,
  webLevels: function() {
    return this.radius.ticks();
  },
  webInnerLevels: [],
  webMode: WEB_MODE_LINE,

  // Ray Labels
  suppressLabels: false,
  labelPlacement: polarLabelOuter,
  labelRotation: gaugeLabelRotateTangentFlip,
  labelAngle: (d) => d.startAngle + (d.endAngle - d.startAngle) / 2,

  labelProp: 'value',
  labelFillScale: noop,
  labelFillScaleAccessor: PolarChart.generateScaleAccessor('labelFillScale', 'label'),
  label: function(d) {
    return d.prop;
  },
  labelXAdjust: '',
  labelYAdjust: '0.35em',

  suppressPoints: false,

  pointProp: '',
  pointFillScale: noop,
  pointFillScaleAccessor: PolarChart.generateScaleAccessor('pointFillScale', 'pointProp'),

  pointStrokeScale: noop,
  pointStrokeScaleAccessor: PolarChart.generateScaleAccessor('pointStrokeScale', 'pointProp'),

  // Scale function for CSS class to apply per line. Input: line index, Output: String of CSS Class.
  pointCssScale: noop,
  pointCssScaleAccessor: PolarChart.generateScaleAccessor('pointCssScale', 'pointProp'),

  // Static CSS class(es) to apply to every line.
  pointCss: 'point',
  pointSize: 64,
  pointSymbol: (symbol) => symbol.type(d3.symbolCircle),
};

export class RadarChart extends PolarChart {
  _initOptions(...options) {
    super._initOptions(...options, RADAR_CHART_DEFAULTS);
  }

  _initCore() {
    super._initCore();

    this.radius = this.tryInvoke(this.opts.radiusScale);

    this.areaRadialLine = d3.radialLine()
      .radius((d) => this.radius(d.radius))
      .angle((d) => d.angle)
      .curve(d3.curveLinearClosed);

    this.webArc = d3.arc()
      .innerRadius((d) => this.radius(d.radius))
      .outerRadius((d) => this.radius(d.radius));
  }

  _initCustomize() {
    super._initCustomize();
    if (this.opts.webArcCustomize) {
      this.fnInvoke(this.opts.webArcCustomize, this.webArc);
    }

    if (this.opts.areaRadialLineCustomize) {
      this.fnInvoke(this.opts.areaRadialLineCustomize, this.areaRadialLine);
    }
  }

  _initPublicEvents(...events) {
    super._initPublicEvents(...events,
      ...commonEventNames(AREA), // Area events
      ...commonEventNames(POINT), // POINT events
      ...EVENTS
    );
  }

  _resetStyleDomains() {
    super._resetStyleDomains();

    resetScaleDomain(this.opts.areaCssScale);
    resetScaleDomain(this.opts.areaFillScale);
    resetScaleDomain(this.opts.areaStrokeScale);
    resetScaleDomain(this.opts.labelFillScale);
    resetScaleDomain(this.opts.pointFillScale);
    resetScaleDomain(this.opts.pointStrokeScale);
    resetScaleDomain(this.opts.pointCssScale);
  }

  _updateBounds() {
    super._updateBounds();

    const or = this.tryInvoke(this.opts.outerRadius, this.width, this.height);
    this.radius.range([0, or]);
  }

  _data(data) {
    super._data(data);

    const props = this.tryInvoke(this.opts.displayProps, this.displayData);
    let currentMax = 0;

    // Find max across all properties
    props.forEach((prop) => {
      data.forEach((d) => {
        if (currentMax < d[prop]) {
          currentMax = d[prop];
        }
      });
    });

    const domain = isDefined(this.opts.radiusDomainCustomize) ?
      this.tryInvoke(this.opts.radiusDomainCustomize, [0, currentMax]) :
      [0, currentMax];
    this.radius.domain(domain);

    const startAngle = this.tryInvoke(this.opts.startAngle);
    const endAngle = this.tryInvoke(this.opts.endAngle);
    const rayCount = props.length;
    const rayInterval = (endAngle - startAngle) / rayCount;
    const rayAngleMap = {};
    const rayData = [];
    let activeAngle = startAngle;

    for (let i = 0; i < rayCount; i++) {
      rayAngleMap[props[i]] = activeAngle;
      rayData.push({
        prop: props[i],
        angle: activeAngle,
      });

      activeAngle += rayInterval;
    }

    this.rayAngleMap = rayAngleMap;
    this.rayData = rayData;
    this.props = props;
  }

  _update() {
    const rayGrps = this._updateRays();
    const areaGrps = this._updateAreas();
    this._updateWeb();

    const suppressPoints = this.tryInvoke(this.opts.suppressPoints);
    if (!suppressPoints) {
      this._updatePoints(areaGrps);
    }

    if (!this.opts.suppressLabels) {
      this._updateRayLabels(rayGrps);
    }

    if (!this.opts.suppressRadiusLabels) {
      this._updateRadiusLabels(rayGrps);
    }
  }

  _updateAreas() {
    // Data join for the area
    const areaGrps = this.draw.selectAll('.monte-radar-area-grp').data(this.displayData);

    // Create new area and update existing
    const enterAreas = areaGrps.enter().append('g').classed('monte-radar-area-grp', true)
      .append('path')
      .classed('monte-radar-area', true)
      .call(this.__bindCommonEvents(AREA));
    this._updateAreaSelections(enterAreas, ENTER);
    this._updateAreaSelections(areaGrps.selectAll('.monte-radar-area'), UPDATE);

    // Fade out removed area
    areaGrps.exit()
      .call((sel) => this.fnInvoke(this.opts.areaExitSelectionCustomize, sel))
      .transition()
        .call(this._transitionSetup(AREA, EXIT))
        .style('opacity', 0)
        .call((t) => this.fnInvoke(this.opts.areaExitTransitionCustomize, t))
        .remove();

    return areaGrps.merge(areaGrps.enter().selectAll('.monte-radar-area-grp'));
  }

  _updateAreaSelections(sel, stage) {
    const selectionFnName = AREA + upperFirst(stage) + 'SelectionCustomize';
    const transitionFnName = AREA + upperFirst(stage) + 'TransitionCustomize';

    sel.attr('class', (d, i) => this._buildCss(
      ['monte-radar-area',
        this.opts.areaCss,
        this.opts.areaCssScaleAccessor,
        d.css], d, i))
      .call((sel) => this.fnInvoke(this.opts[selectionFnName], sel))
      .transition()
        .call(this._transitionSetup(AREA, stage))
        .attr('d', (d) => {
          const values = [];

          this.props.forEach((p) => {
            values.push({
              radius: d[p],
              angle: this.rayAngleMap[p],
            });
          });

          return this.areaRadialLine(values);
        })
        .style('fill', this.optionReaderFunc('areaFillScaleAccessor'))
        .call((t) => this.fnInvoke(this.opts[transitionFnName], t));
  }

  _updateRays() {
    const or = this.tryInvoke(this.opts.outerRadius, this.width, this.height);
    const rayGrps = this.support.selectAll('.monte-radar-ray-grp').data(this.rayData);

    rayGrps.enter().append('g').classed('monte-radar-ray-grp', true)
      .append('line')
        .classed('monte-radar-ray', true)
        .attr('x0', 0)
        .attr('y0', 0)
        .attr('x1', (d) => getPolarCoord(or, d.angle)[0])
        .attr('y1', (d) => getPolarCoord(or, d.angle)[1])
        .attr('opacity', 0)
        .call((sel) => this.fnInvoke(this.opts.rayEnterSelectionCustomize, sel))
        .transition()
          .call(this._transitionSetup(RAY, ENTER))
          .attr('opacity', 1)
          .call((t) => this.fnInvoke(this.opts.rayEnterTransitionCustomize, t));

    rayGrps.select('.monte-radar-ray')
      .call((sel) => this.fnInvoke(this.opts.rayUpdateSelectionCustomize, sel))
      .transition()
        .call(this._transitionSetup(RAY, UPDATE))
        .attr('x1', (d) => getPolarCoord(or, d.angle)[0])
        .attr('y1', (d) => getPolarCoord(or, d.angle)[1])
        .attr('opacity', 1)
        .call((t) => this.fnInvoke(this.opts.rayUpdateTransitionCustomize, t));

    rayGrps.call((sel) => this.fnInvoke(this.opts.rayExitSelectionCustomize, sel))
      .transition()
        .call(this._transitionSetup(RAY, EXIT))
        .attr('opacity', 0)
        .call((t) => this.fnInvoke(this.opts.rayExitTransitionCustomize, t));

    return rayGrps.merge(rayGrps.enter().selectAll('.monte-radar-ray-grp'));
  }

  _updateRayLabels(rayGrps) {
    this.emit(EVENT_UPDATING_LABELS);

    const labelPlacement = this.tryInvoke(this.opts.labelPlacement);
    const css = this.tryInvoke(labelPlacement.css);

    // Clear old label CSS from chart and add new.
    removeClassByPattern(this.bound, LABEL_CSS_PATTERN);
    this.classed(css, true);

    rayGrps.each((d, i, nodes) => {
      const node = d3.select(nodes[i]);
      this._updateRayLabel(node, d, i, nodes);
    });

    this.emit(EVENT_UPDATED_LABELS);
  }

  _updateRayLabel(rayGrp, d, i, nodes) {
    const lbl = rayGrp.selectAll('.monte-radar-ray-label').data([d]);
    const labelPlacement = this.tryInvoke(this.opts.labelPlacement);
    const labelRadius = this.tryInvoke(labelPlacement.radius, this.width, this.height);
    const radius = this.tryInvoke(labelRadius, d, i, nodes);
    const angle = d.angle; // this.tryInvoke(this.opts.labelAngle, d, i, nodes);
    const rotate = radiansToDegrees(this.tryInvoke(this.opts.labelRotation, d.angle, i, nodes));
    const coord = getPolarCoord(radius, angle);

    lbl.enter().append('text')
      .attr('class', 'monte-radar-ray-label')
      .attr('dx', (d1) => this.tryInvoke(this.opts.labelXAdjust, d1, i, nodes))
      .attr('dy', (d1) => this.tryInvoke(this.opts.labelYAdjust, d1, i, nodes))
      .attr('transform', () => `translate(${coord}) rotate(${rotate})`)
      .attr('angle', angle)
      .attr('radius', labelRadius)
      .style('opacity', 0)
      .style('fill', this.optionReaderFunc('labelFillScaleAccessor'))
      .text((d1) => this.tryInvoke(this.opts.label, d1, i, nodes))
      .call((sel) => this.fnInvoke(this.opts.labelEnterSelectionCustomize, sel))
      .transition()
        .call((t) => {
          const ts = this._transitionSettings(LABEL, ENTER);
          this._transitionConfigure(t, ts, d, i, nodes);
        })
        .style('opacity', 1)
        .call((t) => this.fnInvoke(this.opts.labelEnterTransitionCustomize, t));

    lbl.style('fill', this.optionReaderFunc('labelFillScaleAccessor'))
        .style('opacity', 1)
        .attr('dx', (d1) => this.tryInvoke(this.opts.labelXAdjust, d1, i, nodes))
        .attr('dy', (d1) => this.tryInvoke(this.opts.labelYAdjust, d1, i, nodes))
        .call((sel) => this.fnInvoke(this.opts.labelUpdateSelectionCustomize, sel))
        .transition()
          .call((t) => {
            const ts = this._transitionSettings(LABEL, UPDATE);
            this._transitionConfigure(t, ts, d, i, nodes);
          })
          .attrTween('transform', () => {
            const currentTransforms = readTransforms(lbl.attr('transform'));
            const from = {
              angle: +lbl.attr('angle'),
              radius: +lbl.attr('radius'),
              rotate: currentTransforms.rotate || 0,
            };
            const to = { angle, radius, rotate };

            return arcLabelTween(from, to, radius);
          })
          .attr('angle', angle)
          .attr('radius', labelRadius)
          .text((d1) => this.tryInvoke(this.opts.label, d1, i, nodes))
          .call((sel) => this.fnInvoke(this.opts.labelUpdateTransitionCustomize, sel));

    lbl.exit()
      .call((sel) => this.fnInvoke(this.opts.labelExitSelectionCustomize, sel))
      .transition()
        .call((t) => {
          const ts = this._transitionSettings(LABEL, EXIT);
          this._transitionConfigure(t, ts, d, i, nodes);
        })
        .attr('opacity', 0)
        .call((sel) => this.fnInvoke(this.opts.labelExitTransitionCustomize, sel))
      .remove();
  }

  _updateRadiusLabels() {
    const levels = this.tryInvoke(this.opts.webLevels);
    const lbls = this.support.selectAll('.monte-radar-radius-label').data(levels);

    lbls.enter().append('text').classed('monte-radar-radius-label', true)
      .attr('transform', 'translate(0, 0)')
      .text((d) => d)
      .attr('dy', '0.35em')
      .call((sel) => this.fnInvoke(this.opts.radiusLabelEnterSelectionCustomize, sel))
      .transition()
        .call(this._transitionSetup(LABEL, ENTER))
        .attr('transform', (d) => `translate(0, -${this.radius(d)})`)
        .call((t) => this.fnInvoke(this.opts.radiusLabelEnterTransitionCustomize, t));

    lbls.text((d) => d)
      .call((sel) => this.fnInvoke(this.opts.radiusLabelUpdateSelectionCustomize, sel))
      .transition()
        .call(this._transitionSetup(LABEL, UPDATE))
        .attr('transform', (d) => `translate(0, -${this.radius(d)})`)
        .call((t) => this.fnInvoke(this.opts.radiusLabelUpdateTransitionCustomize, t));

    lbls.exit()
      .call((sel) => this.fnInvoke(this.opts.radiusLabelExitSelectionCustomize, sel))
      .transition()
        .call(this._transitionSetup(LABEL, EXIT))
        .call((t) => this.fnInvoke(this.opts.radiusLabelExitTransitionCustomize, t))
      .remove();
  }

  _updateWeb() {
    const mode = this.tryInvoke(this.opts.webMode);

    if (mode === WEB_MODE_ARC) {
      this._updateWebArc();
    }
    else if (mode === WEB_MODE_LINE) {
      this._updateWebLine();
    }
    else {
      throw MonteOptionError.InvalidEnumOption('webMode', mode);
    }
  }

  _updateWebArc() {
    const minorLevels = this.tryInvoke(this.opts.webInnerLevels);
    const levels = this.tryInvoke(this.opts.webLevels);
    const startAngle = this.tryInvoke(this.opts.startAngle);
    const endAngle = this.tryInvoke(this.opts.endAngle);
    const arcs = minorLevels.map((d) => ({
      radius: d,
      startAngle,
      endAngle,
      type: 'minor',
    }));

    levels.forEach((d) => {
      arcs.push({
        radius: d,
        startAngle,
        endAngle,
        type: 'major',
      });
    });

    const webs = this.bg.selectAll('.monte-radar-web').data(arcs);

    webs.enter().append('path')
      .attr('class', (d) => d.type)
      .classed('monte-radar-web', true)
      .attr('d', (d) => this.webArc(d))
      .call((sel) => this.fnInvoke(this.opts.webEnterSelectionCustomize, sel))
      .transition()
        .call(this._transitionSetup(WEB, ENTER))
        .call((t) => this.fnInvoke(this.opts.webEnterTransitionCustomize, t));

    webs.call((sel) => this.fnInvoke(this.opts.webUpdateSelectionCustomize, sel))
      .transition()
        .call(this._transitionSetup(WEB, UPDATE))
        .attr('d', (d) => this.webArc(d))
        .call((t) => this.fnInvoke(this.opts.webUpdateTransitionCustomize, t));

    webs.exit()
      .call((sel) => this.fnInvoke(this.opts.webExitSelectionCustomize, sel))
      .transition()
        .call(this._transitionSetup(WEB, EXIT))
        .call((t) => this.fnInvoke(this.opts.webExitTransitionCustomize, t))
      .remove();
  }

  _updateWebLine() {
    const minorLevels = this.tryInvoke(this.opts.webInnerLevels);
    const levels = this.tryInvoke(this.opts.webLevels);
    const lines = minorLevels.map((d) => ({
      radius: d,
      values: this.rayData.map((r) => ({ radius: d, angle: r.angle })),
      type: 'minor',
    }));

    levels.forEach((d) => {
      lines.push({
        radius: d,
        values: this.rayData.map((r) => ({ radius: d, angle: r.angle })),
        type: 'major',
      });
    });

    const webs = this.bg.selectAll('.monte-radar-web').data(lines);

    webs.enter().append('path')
      .attr('class', (d) => d.type)
      .classed('monte-radar-web', true)
      .attr('d', (d) => this.areaRadialLine(d.values))
      .call((sel) => this.fnInvoke(this.opts.webEnterSelectionCustomize, sel))
      .transition()
        .call(this._transitionSetup(WEB, ENTER))
        .call((t) => this.fnInvoke(this.opts.webEnterTransitionCustomize, t));

    webs.call((sel) => this.fnInvoke(this.opts.webUpdateSelectionCustomize, sel))
      .transition()
        .call(this._transitionSetup(WEB, UPDATE))
        .attr('d', (d) => this.areaRadialLine(d.values))
        .call((t) => this.fnInvoke(this.opts.webUpdateTransitionCustomize, t));

    webs.exit()
      .call((sel) => this.fnInvoke(this.opts.webExitSelectionCustomize, sel))
      .transition()
        .call(this._transitionSetup(WEB, EXIT))
        .call((t) => this.fnInvoke(this.opts.webExitTransitionCustomize, t))
      .remove();
  }

  _updatePoints(areaGrps) {
    // TODO: Implement
    areaGrps.each((d, i, nodes) => this._updateAreaPoints(nodes[i], d, i));
  }

  _updateAreaPoints(areaNode, areaDatum, areaIndex) {
    const areaGrp = d3.select(areaNode);
    const pointsData = Object.keys(areaDatum).map((d) => ({ prop: d, value: areaDatum[d] }));

    // Data join for the points
    const points = areaGrp.selectAll('.monte-point').data(pointsData);

    const genSym = (d, i) => {
      const size = this.tryInvoke(this.opts.pointSize, d, i);
      const symbase = d3.symbol().size(size);
      const symbol = this.opts.pointSymbol(symbase, d, i);
      return symbol(d, i);
    };

    // Create new points
    points.enter().append('path')
        .call(this.__bindCommonEvents(POINT))
        .attr('d', genSym)
        .attr('transform', (d) => this._translatePoint(d))
        .attr('class', (d) => this._buildCss(
          ['monte-point',
            this.opts.pointCss,
            this.opts.pointCssScaleAccessor,
            d.css], areaDatum, areaIndex))
        .call((sel) => this.fnInvoke(this.opts.pointEnterSelectionCustomize, sel))
        .transition()
          .call(this._transitionSetup(POINT, ENTER))
          .style('fill', this.optionReaderFunc('pointFillScaleAccessor'))
          .style('stroke', this.optionReaderFunc('pointStrokeScaleAccessor'))
          .attr('transform', (d) => this._translatePoint(d))
          .call((sel) => this.fnInvoke(this.opts.pointEnterTransitionCustomize, sel));

    // Update existing points
    points.attr('class', (d) => this._buildCss(
      ['monte-point',
        this.opts.pointCss,
        this.opts.pointCssScaleAccessor,
        d.css], areaDatum, areaIndex))
      .call((sel) => this.fnInvoke(this.opts.pointUpdateSelectionCustomize, sel))
      .transition()
        .call(this._transitionSetup(POINT, UPDATE))
        .style('fill', this.optionReaderFunc('pointFillScaleAccessor'))
        .style('stroke', this.optionReaderFunc('pointStrokeScaleAccessor'))
        .attr('transform', (d) => this._translatePoint(d))
        .attr('d', genSym)
        .call((sel) => this.fnInvoke(this.opts.pointUpdateTransitionCustomize, sel));

    // Fade out removed points.
    points.exit()
    .call((sel) => this.fnInvoke(this.opts.pointExitSelectionCustomize, sel))
      .transition()
        .call(this._transitionSetup(POINT, EXIT))
        .style('opacity', 0)
        .call((sel) => this.fnInvoke(this.opts.pointExitTransitionCustomize, sel))
        .remove();
  }

  _translatePoint(d) {
    const angle = this.rayAngleMap[d.prop];
    const point = getPolarCoord(this.radius(d.value), angle);
    return `translate(${point[0]}, ${point[1]})`;
  }
}

RadarChart.EVENTS = EVENTS;
