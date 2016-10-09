import { Chart } from '../Chart';
import { MonteError } from '../../support/MonteError';
import { isArray, isDefined, isFunc, isObject } from '../../tools/is';

const AXES_CHART_DEFAULTS = {
  // The axes X and Y are generally assumed. In some cases it may be desirable to add an additional
  // axis such as 'Y2'.
  axes: ['x', 'y'], // The scale names to create axes for.

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

  xLabel: '',

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

  yLabel: '',
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
    else {
      // Create convenient axes acessors.
      // A compromise is used for attaching the accessors: If 'x' or 'y' are given they are attached
      // to the prototype because they are so ubiquitous. Others are attached to the objects
      // directly to avoid touching class definitions globally.
      this.forEachAxisScale((scaleName) => {
        let obj;

        if (scaleName === 'x' || scaleName === 'y') {
          obj = AxesChart.prototype;
        }
        else {
          obj = this;
        }

        if (!obj[`${scaleName}Get`]) {
          obj[`${scaleName}Get`] = function scaleGetWrap(d) {
            return this.scaleGet(scaleName, d);
          };
        }
      });
    }
  }

  _initPublicEvents(...events) {
    super._initPublicEvents(...events,
      'axisRendered' // Axis events
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
    this.forEachAxisScale((scaleName) => {
      const cb = this.opts[scaleName + 'DomainCustomize'];
      let extent = data ? this._domainExtent(data, scaleName) : [];

      if (cb) { extent = cb(extent); }

      this[scaleName].domain(extent);
    });

    super._data(data);
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

  renderAxes() {
    // Only suppress all if a literal boolean is given.
    if (this.opts.suppressAxes === true) { return; }

    const isSuppressArray = isArray(this.opts.suppressAxes);

    // (Re)render axes
    this.forEachAxisScale((scaleName) => {
      if (isSuppressArray && this.opts.suppressAxes.indexOf(scaleName) > -1) { return; }

      this.support.select(`.${scaleName}-axis`)
        .transition()
          .duration(this.opts.transitionDuration)
          .call(this[`${scaleName}Axis`])
          .call(this._setLabel.bind(this, scaleName))
          .call((t) => this.__notify('axisRendered', t));
    });
  }

  _domainExtent(data, scaleName) { // eslint-disable-line no-unused-vars
    throw MonteError.UnimplementedMethod('Domain Extent', '_domainExtent');
  }

  // Loops over each scale name that is bound to an axis.
  forEachAxisScale(f) {
    this.opts.axes.forEach(f);
  }

  _setLabel(scaleName, transition) { // eslint-disable-line no-unused-vars
    const label = this.opts[`${scaleName}Label`];

    if (label) {
      this.support.select(`.${scaleName}-axis`).append('text')
        .attr('class', 'axis-label')
        .text(label);
    }
  }

  scaleGet(scaleName, d) {
    let val;

    if (!isFunc(this[scaleName])) {
      throw new MonteError(`Scale "${scaleName}" is not defined.`);
    }
    else if (isObject(d)) {
      // Assume `d` is a datum related to the chart data.
      val = d[this.opts[`${scaleName}Prop`]];
    }
    else {
      // Assume `d` is a value the scale can process.
      val = d;
    }

    return this[scaleName](val);
  }
}
