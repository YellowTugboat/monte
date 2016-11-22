import { ENTER, UPDATE } from '../../const/d3';
import { isArray, isDefined, isFunc } from '../../tools/is';
import { Chart } from '../Chart';
import { MonteError } from '../../support/MonteError';
import { noop } from '../../tools/noop';

const EVENT_AXIS_RENDERED = 'axisRendered';
const EVENT_AXIS_RENDERING = 'axisRendering';
const EVENTS = [EVENT_AXIS_RENDERED, EVENT_AXIS_RENDERING];

const AXES_CHART_DEFAULTS = {
  // The axes X and Y are generally assumed. In some cases it may be desirable to add an additional
  // axis such as 'Y2'.
  axes: ['x', 'y'], // The scale names to create axes for.

  suppressAxes: false, // Suppress the display of the axes.

  /*************************************************************************************************
   *
   * "X"-related Options
   *
   ************************************************************************************************/

  // The property name of the value for the X coordinate passed to the scale function.
  xProp: 'x',

  // The scale function for X values.
  xScale: d3.scaleLinear,

  // Callback function to customize the X axis, such as tick count and format.
  xAxisCustomize: null,

  // Callback function to customize the X extent.
  xDomainCustomize: null,

  xRange: (w, h) => [0, w], // eslint-disable-line no-unused-vars

  xAxisConstructor: d3.axisBottom,

  xAxisTransform: (w, h) => `translate(0,${h})`,

  xLabel: null,

  xLabelCustomize: noop,

  /*************************************************************************************************
   *
   * "Y"-related Options
   *
   ************************************************************************************************/

  // The property name of the value for the X coordinate passed to the scale function.
  yProp: 'y',

  // The scale function for Y values.
  yScale: d3.scaleLinear,

  // Callback function to customize the X axis, such as tick count and format.
  yAxisCustomize: null,

  // Callback function to customize the Y extent.
  yDomainCustomize: null,

  yRange: (w, h) => [h, 0],

  yAxisConstructor: d3.axisLeft,

  yAxisTransform: null,

  yLabel: null,

  yLabelCustomize: noop,
};

export class AxesChart extends Chart {
  __axisOpt(scaleName, option) {
    return this.opts[`${scaleName}${option}`];
  }

  _initOptions(...options) {
    super._initOptions(...options, AXES_CHART_DEFAULTS);

    if (!isDefined(this.opts.axes)) {
      // Set empty array to ease assumptions (i.e. avoid null checks) in later code.
      this.opts.axes = [];
    }

    this.axes = this.tryInvoke(this.opts.axes);
  }

  _initPublicEvents(...events) {
    super._initPublicEvents(...events,
      ...EVENTS // Axis events
    );
  }

  _initCore() {
    super._initCore();

    this.forEachAxisScale((scaleName) => {
      // Create scale
      const range = this.__axisOpt(scaleName, 'Range')(this.width, this.height);
      const scale = this.__axisOpt(scaleName, 'Scale')().range(range);
      this[scaleName] = scale;

      // Setup axes
      this[`${scaleName}Axis`] = this.__axisOpt(scaleName, 'AxisConstructor')(scale);
    });
  }

  _initCustomize() {
    this.forEachAxisScale((scaleName) => {
      const customize = this.__axisOpt(scaleName, 'AxisCustomize');

      if (isArray(customize)) {
        const axis = this[`${scaleName}Axis`];
        customize.forEach((customFunc) => customFunc(axis));
      }
      else if (isFunc(customize)) {
        customize(this[`${scaleName}Axis`]);
      }
    });
  }

  _initRender() {
    // Attach axes
    this.forEachAxisScale((scaleName) => {
      this.support.append('g').attr('class', `${scaleName}-axis axis`);
    });
    this.updateAxesTransforms();

    super._initRender();
  }

  _updateBounds() {
    const actions = super._updateBounds(true, true);

    this.updateAxesRanges();
    this.updateAxesTransforms();
    this.renderAxes();

    actions.notify();
    actions.update();
  }

  _data(data) {
    super._data(data);
    this.updateAxesDomains();
    this.renderAxes();
  }

  replaceScale(scaleName, newScaleConstructor) {
    super.replaceScale(scaleName, newScaleConstructor);
    this[`${scaleName}Axis`].scale(this[scaleName]);
    this.renderAxes();
  }

  updateAxesTransforms() {
    this.forEachAxisScale((scaleName) => {
      const axisGrp = this.support.select(`.${scaleName}-axis`);
      const trans = this.__axisOpt(scaleName, 'AxisTransform');

      if (trans) { axisGrp.attr('transform', trans(this.width, this.height)); }
    });
  }

  updateAxesRanges() {
    this.forEachAxisScale((scaleName) => {
      const range = this.__axisOpt(scaleName, 'Range')(this.width, this.height);
      this[scaleName].range(range);
    });
  }

  updateAxesDomains() {
    const data = this.data();

    this.forEachAxisScale((scaleName) => {
      const customize = this.opts[scaleName + 'DomainCustomize'];
      let extent = data ? this._domainExtent(data, scaleName) : [];

      if (customize) { extent = this.tryInvoke(customize, extent); }

      this[scaleName].domain(extent);
    });
  }

  renderAxes() {
    // Only suppress all if a literal boolean is given.
    const suppressAxes = this.tryInvoke(this.opts.suppressAxes);
    if (suppressAxes === true) { return; }

    const isSuppressArray = isArray(suppressAxes);
    const action = this.hasRendered ? UPDATE : ENTER;
    const t = this.bound.transition().call(this._transitionSetup('axis', action));

    // (Re)render axes
    this.forEachAxisScale((scaleName) => {
      if (isSuppressArray && suppressAxes.indexOf(scaleName) > -1) { return; }

      this.support.select(`.${scaleName}-axis`)
        .transition(t)
          .on('start', () => this.emit(EVENT_AXIS_RENDERING))
          .call(this[`${scaleName}Axis`])
          .call(this._setLabel.bind(this, scaleName))
          .call((t) => this.emit(EVENT_AXIS_RENDERED, t));
    });
  }

  _domainExtent(data, scaleName) { // eslint-disable-line no-unused-vars
    throw MonteError.UnimplementedMethod('Domain Extent', '_domainExtent');
  }

  // Loops over each scale name that is bound to an axis.
  forEachAxisScale(f) {
    this.axes.forEach(f);
  }

  _setLabel(scaleName, transition) { // eslint-disable-line no-unused-vars
    const label = this.tryInvoke(this.opts[`${scaleName}Label`]);
    const data = label === null ? [] : [label];
    const lbl = this.support.select(`.${scaleName}-axis`).selectAll('.monte-axis-label').data(data);

    lbl.enter().append('text')
      .merge(lbl)
        .attr('class', 'monte-axis-label')
        .text((d) => d)
        .call(() => this.tryInvoke(this.opts[`${scaleName}LabelCustomize`], lbl));

    lbl.exit().remove();
  }

  static createInstanceGroup(charts, ...additionalMethodsToProxy) {
    additionalMethodsToProxy.push(GROUP_PROXY_METHODS);
    return super.createInstanceGroup(charts, ...additionalMethodsToProxy);
  }
}

AxesChart.EVENTS = EVENTS;

export const GROUP_PROXY_METHODS = [
  'forEachAxisScale', 'renderAxes', 'replaceScale', 'updateAxesDomains', 'updateAxesRanges',
  'updateAxesTransforms',
];
