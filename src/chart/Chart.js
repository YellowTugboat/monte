import { CHART_LIFECYCLE_EVENTS, CHART_SUPPORT_EVENTS, INTERACTION_EVENTS, INTERACTION_EVENT_CSS_MAP } from '../const/events';
import { get as _get, set as _set } from '../external/lodash';
import { isDefined, isFunc, isObject } from '../tools/is';
import { EventWatcher } from '../support/EventWatcher';
import { MonteError } from '../support/MonteError';
import { MonteOptionError } from '../support/MonteOptionError';
import { TRANSITION_DURATION_MS } from '../const/d3';
import { UNDEF } from '../const/undef';
import { mergeOptions } from '../tools/mergeOptions';
import { noop } from '../tools/noop';

const global = window ? window.MonteGlobals = {} : {};

// TODO: Begin adoption of generic scale accessors. Every scale should be accompained with a property
//       `<scaleProperty>Accessor` that translates which value to pass to the scale.

const CLIP_PATH_ID = 'drawPath';

const DEFAULTS = {
  css: '',
  boundingWidth: 800,
  boundingHeight: 450,
  margin: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },

  customEvents: [],
  extensions: [],

  // TODO: Rework transition features to support the various Update pattern stages.
  transitionDuration: TRANSITION_DURATION_MS,
  ease: d3.easeCubic,
  delay: 0,

  resize: null,

  /*************************************************************************************************
   *
   * Misc. options
   *
   ************************************************************************************************/

  // When a `clear` occurs (by direct invocation or via `data` (without an update)) the domain is
  // automatically reset.
  autoResetCssDomains: true,

  // Indicates that the chart base is being used directly in a client script chart (an "on the
  // fly" chart). The assumption is most of the time other classes will extend and implement
  // required features (such as '_update') and the checks for those features should be enforced.
  directUse: false,
};

/*
  Data Format:

  Single Line Format
  {
    values: [{ x: <date>, y: 300 }, { x: <date>, y: 500 }, { x: <date>, y: 600 }],
    css: 'fill brand-blue',
  }

  Multiple lines
  [<single line format>, <single line format>, ...]

 */

export class Chart {
  constructor(parentSelector, options, data) { // eslint-disable-line max-statements
    this._constructed = false;
    this._optsSet = false;
    this.parentSelector = parentSelector;
    this.hasRendered = false;
    this.layers = [];
    this.extensions = [];
    this._optionReaderCache = {};

    // Configure the data options.
    this._initOptions(options);

    // Setup the Public events.
    this._initPublicEvents(
      ...INTERACTION_EVENTS,
      ...CHART_SUPPORT_EVENTS,
      ...CHART_LIFECYCLE_EVENTS,

      // Custom events provided by the user
      ...this.opts.customEvents);

    // Put chart in developer mode if opted into on a chart or global basis
    if (this.opts.developerMode || global.developerMode) { this._initDeveloperMode(); }

    // Bind initial extensions to this chart instance.
    this._bindExt(this.opts.extensions);

    // Setup the core infastructure.
    this._initCore();

    // Customize configuration
    this._initCustomize();

    // Update the bounding box and layout basics.
    this._updateBounds();

    // Do the various setup rendering (Axis, BG, etc...)
    this._initRender();

    this._constructed = true;

    // Trigger a resize if everything is ready.
    if (this._resizeHandler && global.resizeWatch.documentReady) { this._resizeHandler(); }

    // First full draw cycle
    if (data) { this.data(data); }
  }

  _initOptions(...options) {
    this.opts = {};
    const opts = mergeOptions(...options, DEFAULTS);
    for (let key in opts) {
      if (opts.hasOwnProperty(key)) {
        this.option(key, opts[key]);
      }
    }

    this._optsSet = true;
  }

  // Intialize the vis.
  _initCore() {
    // Create SVG element and drawing area setup
    const parent = d3.select(this.parentSelector);
    if (parent.node().tagName.toLowerCase() === 'svg') {
      this.bound = parent;
    }
    else {
      this.bound = parent.append('svg');
    }

    this.bound.attr('class', this._buildCss(['monte-chart', this.opts.css, this.opts.chartCss]));

    // SVG Defs element
    this.defs = this.bound.append('defs');

    // Drawing area path clipping
    this.clip = this.defs.append('clipPath')
        .attr('id', CLIP_PATH_ID);

    this.clipRect = this.clip.append('rect');

    // Create a background area.
    this.addLayer('bg');

    // Create the support area.
    this.addLayer('support');

    // Create the primary drawing area.
    this.addLayer('draw');

    // Top layer
    this.addLayer('overlay');

    const chart = this;

    // Setup interaction events for the overall chart.
    INTERACTION_EVENTS.forEach((ev) => {
      this.bound.on(ev, function(...args) { chart.__notify(ev, this, ...args); });
    });

    // Bind resize function if given.
    if (this.opts.resize) {
      if (!global.resizeWatch) { global.resizeWatch = new EventWatcher(); }

      const resizer = this.opts.resize;
      this._resizeHandler = resizer.resize.bind(resizer, this);
      global.resizeWatch.add(this._resizeHandler);
    }
  }

  _initPublicEvents(...events) {
    this._events = events;
    this.dispatch = d3.dispatch(...events);
  }

  _initDeveloperMode() {
    const echo = (eventName, ...args) => {
      let a = '(no arguments)';

      if (args && args.length > 0) {
        a = '\n';

        args.forEach((v, i) => a += `\t${i}: ${v}\n`);
      }

      console.log(`[${this}] "${eventName}": ${a}`); // eslint-disable-line no-console
    };

    this._events.forEach((eventName) => this.on(eventName, echo.bind(this, eventName)));
  }

  _initCustomize() {}

  _initRender() {}

  _updateBounds(suppressNotify=false, suppressUpdate=false) {
    this.__notify('updatingBounds');

    // Margin Convention and calculate drawing area size
    this.margin = this.opts.margin;
    this.width = this.opts.boundingWidth - this.margin.left - this.margin.right;
    this.height = this.opts.boundingHeight - this.margin.top - this.margin.bottom;

    // Apply margins to layers
    this.layers.forEach((l) => l.attr('transform', this._getLayerTranslate()));

    // Update sizing attributes
    if (this.bound) {
      this.bound.attr('width', this.opts.boundingWidthAttr || this.opts.boundingWidth)
        .attr('height', this.opts.boundingHeightAttr || this.opts.boundingHeight);
    }

    // Update drawing clip
    if (this.clipRect) {
      this.clipRect.attr('width', this.width)
        .attr('height', this.height);
    }

    const notify = () => { if (this._constructed) { this.__notify('updatedBounds'); } };
    const update = () => { if (this.hasRendered) { this.update(); } };

    if (!suppressNotify) { notify(); }
    if (!suppressUpdate) { update(); }

    return {
      notify,
      update,
    };
  }

  // Manually invoke the resize strategy (if any).
  checkSize() {
    if (this._resizeHandler) {
      this._resizeHandler();
    }

    return this;
  }

  destroy() {
    this.__notify('destroying');

    if (this._resizeHandler) {
      global.resizeWatch.remove(this._resizeHandler);
    }

    this._destroy();

    // Handle case where parentSelector and bound are the same and only remove internal elements.
    if (this.bound.node() === d3.select(this.parentSelector).node()) {
      this.bound.node().innerHTML = '';
    }
    else {
      this.bound.remove();
    }

    this.__notify('destroyed');
  }

  _destroy() {}

  /*
   * Adds a layer to the chart. The layer is the top most by default.
   *
   * @Chainable
   */
  addLayer(layerName) {
    const layer = this.bound.append('g').attr('class', `monte-${layerName}`);

    this[layerName] = layer;
    this.layers.push(layer);

    return this;
  }

  /*
   * Makes a layer use a defined `clipPath`.
   *
   * @Chainable
   */
  layerUseClipPath(layerName, pathId=CLIP_PATH_ID) {
    this[layerName].attr('clip-path', `url(#${pathId})`);

    return this;
  }

  _getLayerTranslate() { return `translate(${this.margin.left}, ${this.margin.top})`; }

  /**
   * Sets the external dimensions on the SVG element.
   *
   * @Chainable
   */
  boundingRect(width, height) {
    if (arguments.length === 0) {
      return [this.opts.boundingWidth, this.opts.boundingHeight];
    }

    const minWidth = this.option('margin.left') + this.option('margin.right');
    if (width < minWidth) { width = minWidth; }
    this.opts.boundingWidth = width;

    if (arguments.length === 2) {
      const minHeight = this.option('margin.top') + this.option('margin.bottom');
      if (height < minHeight) { height = minHeight; }
      this.opts.boundingHeight = height;
    }

    this._updateBounds();
    this.update();

    return this;
  }

  /**
   * Binds an event to a given `callback`. If no `callback` is provided it returns the callback.
   *
   * @Chainable <setter>
   */
  on(typenames, callback) {
    if (callback) {
      this.dispatch.on(typenames, callback);
      return this;
    }

    return this.dispatch.on(typenames);
  }

  /**
   * Force the triggering of an event with the given arguments. The `on` callbacks are invoked in
   * the context of the chart.
   *
   * Uses:
   *  + Trigger event for listeners as needed such as force an extension to update.
   *
   * @Chainable
   */
  emit(eventName, ...args) {
    if (!eventName) {
      return;
    }
    else if (!this.dispatch._[eventName]) {
      // Check that dispatch has a registered event
      const msg = `Unknown event ${eventName}. Double check the spelling or register the event. Custom events must registered at chart creation.`;
      throw new MonteError(msg);
    }

    this.__notify(eventName, ...args);

    return this;
  }

  /**
   * Get or set a chart option.
   *
   * NOTE: Does not invoke the "Update cycle". To apply option changes call `update`.
   *
   * @Chainable
   */
  option(key, value) {
    let updateBounds = false;

    if (value === UNDEF) {
      return _get(this.opts, key);
    }

    _set(this.opts, key, value);

    // Margins cause changes to the internal sizes.
    if (key === 'margin') {
      if (typeof value !== 'object') {
        this.opts.margin = { top: value, left: value, right: value, bottom: value };
      }

      updateBounds = true;
    }
    else if (/^margin\./.test(key)) {
      // Check if key is a 'deep' margin value (ex. 'margin.left')
      updateBounds = true;
    }

    // Margins affect the drawing area size so various updates are required.
    if (this._optsSet && updateBounds) {
      this._updateBounds();
    }

    return this;
  }

  /**
   * Generates a function (or uses and existing one from cache) for a given option property. The
   * generated function attempts to access the property (uses `tryInvoke`). If the property is a
   * function it invokes the function with all parameters passed at the time on invocation.
   *
   * Generally this is good allowing D3 Selection chain methods (`attr`, `style`, etc...) to
   * directly read chart options.
   *
   * For example:
   *  `.attr('fill', (d, i, nodes) => this.tryInvoke(this.opts.fillScale, d, i, nodes))`
   * is equvilient to
   *  `.attr('fill', this.optionReaderFunc('fillScale')')`
   */
  optionReaderFunc(optionKey) {
    if (!this._optionReaderCache[optionKey]) {
      this._optionReaderCache[optionKey] = (...args) =>
        this.tryInvoke(this.opts[optionKey], ...args);
    }

    return this._optionReaderCache[optionKey];
  }

  /**
   * Invoke a `value` (generally from the chart options) with the given arguments. Static values
   * are returned directly.
   */
  tryInvoke(value, ...args) {
    if (value === null) {
      return null;
    }
    else if (value === UNDEF) {
      throw new MonteOptionError('Value not initialized.');
    }

    try {
      return isFunc(value) ? value.call(this, ...args) : value;
    }
    catch (e) {
      this.__notify('suppressedError', e);
      return null;
    }
  }

  /**
   * Reads a property from a datum and returns the raw (unscaled) value.
   */
  getProp(propShortName, d, defaultValue=null) {
    const propFullName = `${propShortName}Prop`;
    const dataPropName = this.opts[propFullName];

    if (dataPropName) {
      return d[dataPropName];
    }

    return defaultValue;
  }

  /**
   * Reads a scale bound property from a datum and returns the scaled value.
   *
   * @param {string} scaleName The scale used for scaling
   * @param {string} [propPrefix=<scaleName>] The property to be scaled. Defaults to the scale's property.
   * @param {any}    datum The data to scale.
   */
  getScaledProp(scaleName, propPrefix, datum) {
    let val;
    let propPre;
    let d;

    if (arguments.length === 2) {
      propPre = scaleName;
      d = propPrefix;
    }
    else if (arguments.length === 3) {
      propPre = propPrefix;
      d = datum;
    }
    else {
      throw new MonteError(`Incorrect number of arguments. Expected 2 or 3 recieved ${arguments.length}`);
    }

    const scale = _get(this, scaleName);
    if (!scale) {
      throw new MonteError(`Scale "${scaleName}" is not defined.`);
    }
    else if (scale === noop) {
      // A noop function means no possible return value.
      return UNDEF;
    }
    else if (!isFunc(scale)) {
      // Treat scale like a static value (likely string or number) and return early.
      return scale;
    }
    else if (isObject(d)) {
      // Assume `d` is a datum related to the chart data.
      val = d[this.opts[`${propPre}Prop`]];
    }
    else {
      // Assume `d` is a value the scale can process.
      val = d;
    }

    return scale(val);
  }

  /**
   * Remove the data, remove the data elements, and clear the CSS domains.
   *
   * @Chainable
   */
  clear() {
    this.__notify('clearing');

    this.displayData = null;
    this._clearDataElements();

    if (this.opts.autoResetCssDomains) { this.resetCssDomains(); }

    this.__notify('cleared');
    return this;
  }

  /**
   * Internal implementation of the `clear` method.
   */
  _clearDataElements() {}

  /**
   * Resets domains related to CSS scales.
   *
   * @Chainable
   */
  resetCssDomains() {
    this.__notify('cssDomainsReseting');

    this._resetCssDomains();

    this.__notify('cssDomainsReset');
    return this;
  }

  /**
   * Internal implementation of the `resetCssDomains` method.
   */
  _resetCssDomains() {}

  /**
   * Builds a string of class names to insert into a `class` attribute on a DOM element (typically
   * SVG). The strings are inidividual class names and *not* selectors (no `.` or compound class
   * names).
   *
   * @param {array} cssSources The sources (strings or functions) for inidividual class names.
   * @param {object} d The datum to pass to function sources.
   * @param {object} i The node index to pass to function sources.
   * @param {array} nodes The node list to pass to function sources.
   */
  _buildCss(cssSources, d, i, nodes) {
    const cssClasses = [];
    const sources = Array.isArray(cssSources) ? cssSources : [cssSources];

    sources.forEach((source) => {
      if (isDefined(source)) {
        cssClasses.push(this.tryInvoke(source, d, i, nodes));
      }
    });

    return cssClasses.join(' ');
  }

  /**
   * Set the CSS classes on the SVG element.
   *
   * @Chainable
   */
  classed(...args) {
    this.bound.classed(...args);

    return this;
  }

  /**
   * Invokes a function in the context of the chart with the given arguments.
   *
   * @Chainable
   */
  call(f, ...args) {
    f.call(this, ...args);

    return this;
  }

  /**
   * Update the existing data of the chart to display and trigger the "Update cycle".
   *
   * @Chainable
   */
  updateData(data) {
    this.data(data, true);

    return this;
  }

  /**
   * Set the data for the chart to display and trigger the "Update cycle".
   *
   * @Chainable
   */
  data(data, isUpdate=false, suppressUpdate=false) {
    if (data === UNDEF) {
      // No data to assign return the current data.
      return this.displayData;
    }

    if (!isUpdate) { this.clear(); }
    this._data(data);
    if (!suppressUpdate) { this.update(); }

    return this;
  }

  _data(data) {
    this.displayData = data;
  }

  /**
   * Add an extension instance to the chart instance.
   *
   * @Chainable
   */
  addExt(...exts) {
    this._bindExt(exts);

    return this;
  }

  /**
   * Binds a given extension instance to the chart instance.
   */
  _bindExt(exts) {
    exts.forEach((ext) => {
      if (ext.opts.binding) {
        ext.setChart(this);
        this.extensions.push(ext);
      }
      else {
        this.__notify('suppressedError', 'Extensions must have the `binding` option specified.');
      }
    });
  }

  /**
   * Invokes all extensions "Update Cycle" if bound to the given event (binding) name.
   */
  __updateExt(bindingName, ...extArgs) {
    this.extensions.forEach((ext) => {
      if (ext.opts.binding.indexOf(bindingName) > -1) { ext.update(bindingName, ...extArgs); }
    });
  }

  /**
   * Replaces one scale with another. The new scale `range` and `domain` are set to match the
   * previous scale.
   *
   * For example: changing between a linear and logarithmic scale to allow users to identify trends.
   *
   * @Chainable
   */
  replaceScale(scaleName, newScaleConstructor) {
    const scale = newScaleConstructor();
    scale.range(this[scaleName].range())
      .domain(this[scaleName].domain());
    this[scaleName] = scale;
    this.update();

    return this;
  }

  /**
   * (Re)renders the chart by invoking the "Update cycle" which is consistent with the D3
   * "Enter-Update-Exit" pattern.
   *
   * @Chainable
   */
  update() {
    if (!this.data()) { return; } // Don't allow update if data has not been set.
    if (!this.hasRendered) {
      this.__notify('rendering');
      this._render();
    }

    this.__notify('updating');
    this._update();

    // Notify if first rendered
    if (!this.hasRendered) {
      this.hasRendered = true;
      this.__notify('rendered');
    }

    this.__notify('updated');

    return this;
  }

  /**
   * A specific chart's one-time only setup drawing pass.
   */
  _render() {}

  /**
   * A specific chart's implementation of the "Update cycle"
   */
  _update() {
    if (!this.opts.directUse) {
      throw MonteError.UnimplementedMethod('Update', '_update');
    }
  }

  /**
   * Generates a function to bind the "common" element events to an event handler.
   */
  __bindCommonEvents(lead) {
    const chart = this;

    return function(sel) {
      INTERACTION_EVENTS.forEach((ev) =>
        sel.on(ev, (d, i, nodes) => chart.__elemEvent(ev, `${lead}:${ev}`, d, i, nodes)));
    };
  }

  /**
   * Notify all listeners, extensions and those bound through `on`, of an event.
   * Using notify ensures that extensions are notified before outside listeners are.
   */
  __notify(eventName, ...args) {
    this.__updateExt(eventName, ...args);
    this.dispatch.call(eventName, this, ...args);
  }

  /**
   * Handles an event generated through element interaction (i.e. click, mouseover, etc...).
   */
  __elemEvent(eventType, eventNameFull, d, i, nodes) {
    const node = nodes[i];
    const cssAction = INTERACTION_EVENT_CSS_MAP[eventType];

    if (cssAction) {
      if (cssAction.action === 'add') {
        node.classList.add(cssAction.css);
      }
      else if (cssAction.action === 'remove') {
        node.classList.remove(cssAction.css);
      }
    }

    this.__notify(eventNameFull, d, i, nodes);
  }

  /**
   * Give the chart type name as the identifier.
   */
  toString() {
    return this.constructor.name;
  }
}
