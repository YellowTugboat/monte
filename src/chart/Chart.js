import * as EV from '../const/events';
import { TRANSITION_DELAY_MS, TRANSITION_DURATION_MS, TRANSITION_EASE } from '../const/d3';
import { get as _get, set as _set, isEqual } from '../external/lodash';
import { isArray, isDefined, isFunc, isObject, isString } from '../tools/is';
import { InstanceGroup } from '../support/InstanceGroup';
import { MonteError } from '../support/MonteError';
import { MonteOptionError } from '../support/MonteOptionError';
import { UNDEF } from '../const/undef';
import { getTreeSetting } from '../tools/getTreeSetting';
import { global } from '../support/MonteGlobal';
import { mergeOptions } from '../tools/mergeOptions';
import { noop } from '../tools/noop';

const CLIP_PATH_ID = 'drawPath';

export function defaultDataKey(d, i) {
  return (d && d.id) || i;
}

const DEFAULTS = {
  css: '',
  boundingWidth: 250,
  boundingHeight: 250,
  margin: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
  },

  customEvents: [],
  extensions: [],

  transition: {
    duration: TRANSITION_DURATION_MS,
    ease: TRANSITION_EASE,
    delay: TRANSITION_DELAY_MS,
  },

  resize: null,

  // Data key for all draw layer and feature level selections in all charts.
  dataKey: defaultDataKey,

  /*************************************************************************************************
   *
   * Misc. options
   *
   ************************************************************************************************/

  // When a `clear` occurs (by direct invocation or via `data` (without an update)) the domain is
  // automatically reset.
  autoResetStyleDomains: true,

  // Indicates that the chart base is being used directly in a client script chart (an "on the
  // fly" chart). The assumption is most of the time other classes will extend and implement
  // required features (such as '_update') and the checks for those features should be enforced.
  directUse: false,

  developerOptions: {
    scales: false,  // Log generated scale accessor details
    transitions: false, // Log transition configuration details
    listeners: false, // Log which event listeners are setup during developer mode
  },
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
      ...EV.INTERACTION_EVENTS,
      ...EV.CHART_SUPPORT_EVENTS,
      ...EV.CHART_LIFECYCLE_EVENTS,

      // Custom events provided by the user
      ...this.opts.customEvents);

    // Put chart in developer mode if opted into on a chart or global basis
    if (this.opts.developerMode || global.isDeveloperMode()) { this._initDeveloperMode(); }

    // Setup the core infastructure.
    this._initCore();

    // Customize configuration
    this._initCustomize();

    // Update the bounding box and layout basics.
    this._updateBounds();

    // Bind initial extensions to this chart instance.
    this._bindExt(this.tryInvoke(this.opts.extensions));

    // Do the various setup rendering (Axis, BG, etc...)
    this._initRender();

    this._constructed = true;

    // Trigger a resize if everything is ready.
    if (this._resizeHandler && global.getResizeWatcher().documentReady) { this._resizeHandler(); }

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

    if (parent.node() === null) {
      throw new MonteError(`Invalid selector. "${this.parentSelector}" did not match any element."`);
    }

    if (parent.node().tagName.toLowerCase() === 'svg') {
      this.bound = parent;
    }
    else {
      this.bound = parent.append('svg');
    }

    // Add reference of chart to the node for flexibility of access.
    this.bound.node().monteChart = this;
    this.bound.attr('class', this._buildCss(['monte-chart', this.opts.css, this.opts.chartCss]));

    // SVG Defs element
    this.defs = this.bound.append('defs');

    // Drawing area path clipping
    this.clip = this.defs.append('clipPath').attr('id', CLIP_PATH_ID);

    this.clipRect = this.clip.append('rect').attr('x', 0).attr('y', 0);

    this._initLayers();

    const chart = this;

    // Setup interaction events for the overall chart.
    EV.INTERACTION_EVENTS.forEach((ev) => {
      this.bound.on(ev, function(...args) { chart.__notify(ev, this, ...args); });
    });

    // Bind resize function if given.
    const resizer = this.tryInvoke(this.opts.resize);
    if (resizer) {
      this._resizeHandler = resizer.resize.bind(resizer, this);
      global.getResizeWatcher().add(this._resizeHandler);
    }
  }

  _initLayers() {
    // Create a background area.
    this.addLayer('bg');

    // Create the support area.
    this.addLayer('support');

    // Create the selection area.
    this.addLayer('selection');

    // Create the primary drawing area.
    this.addLayer('draw');

    // Create the overlay area.
    this.addLayer('overlay');
  }

  _initPublicEvents(...events) {
    this._events = events;
    this.dispatch = d3.dispatch(...events);
  }

  // TODO: Allow enabling/disabling of developerMode from `option`.
  _initDeveloperMode() {
    const echo = (eventName, ...args) => {
      let a = '(no arguments)';

      if (args && args.length > 0) {
        a = '\n';

        args.forEach((v, i) => {
          if (isDefined(v)) {
            const s = isFunc(v) ? `func: '${v.name || 'anonymous'}'` : v;
            a += `\t${i}: ${s}\n`;
          }
        });
      }

      console.log(`[${this}] "${eventName}": ${a}`); // eslint-disable-line no-console
    };

    this.developerMode = true;

    // Determine events to watch in developer mode. If `developerMode` is an array use the provided
    // events; otherwise use all registered events.
    const events = (isArray(this.opts.developerMode) || global.getDeveloperModeEvents()) ?
      (this.opts.developerMode || global.getDeveloperModeEvents()) :
      this._events;

    events.forEach((eventName) => {
      if (this.opts.developerOptions.listeners) {
        console.log(`[${this}] Adding listener for "${eventName}"`); // eslint-disable-line no-console
      }

      this.on(`${eventName}.developerMode`, echo.bind(this, eventName));
    });
  }

  _initCustomize() {}

  _initRender() {}

  _updateBounds(suppressNotify=false, suppressUpdate=false) {
    this.__notify(EV.UPDATING_BOUNDS);

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

    const notify = () => { if (this._constructed) { this.__notify(EV.UPDATED_BOUNDS); } };
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
    this.__notify(EV.DESTROYING);

    if (this._resizeHandler) {
      global.getResizeWatcher().remove(this._resizeHandler);
    }

    this._destroy();

    // Handle case where parentSelector and bound are the same and only remove internal elements.
    if (this.bound.node() === d3.select(this.parentSelector).node()) {
      this.bound.node().innerHTML = '';
    }
    else {
      this.bound.remove();
    }

    this.__notify(EV.DESTROYED);
  }

  _destroy() {}

  /*
   * Adds a layer to the chart. The layer is the top most by default.
   *
   * @Chainable
   */
  addLayer(layerName, elementType = 'g') {
    const layer = this.bound.append(elementType).attr('class', `monte-${layerName}`);

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
   * Passing null removes the callback.
   *
   * See https://github.com/d3/d3-dispatch#dispatch_on
   *
   * @Chainable <setter>
   */
  on(typenames, callback) {
    if (arguments.length < 2) {
      return this.dispatch.on(typenames);
    }

    this.dispatch.on(typenames, callback);
    return this;
  }

  /**
   * Binds an extension event (filtered by `eventLead`) to a given `callback`. The `eventLead` is a
   * string that matches the *beginning* of the extention specific event name including prefix.
   *
   * For example, to match all SelectionRect events (including updated, rendered, etc...) use
   * 'selectionrect:'; to match all selection events to match only selection events (including
   * selectionStart, selectionMove, etc...) use 'selectionrect:selection'; to match the changed
   * event use 'selectionrect:selectionChanged'.
   */
  onExt(eventLead, callback) {
    if (arguments.length < 2) {
      return this.on(eventLead);
    }

    const typename = `extension.${eventLead}`;
    if (callback === null) {
      this.on(typename, null);
    }
    else {
      this.on(typename, function(ev, ...args) {
        if (ev.indexOf(eventLead) === 0) {
          callback.call(this, ev, ...args);
        }
      });
    }

    return this;
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
    const current = _get(this.opts, key);

    if (value === UNDEF) {
      return current;
    }

    if (this._optsSet) {
      this.__notify(EV.OPTION_CHANGING, key);
    }

    _set(this.opts, key, value);

    const updateBounds = this.__handleMarginOptions(key, value, current);
    if (this._optsSet) {
      // Margins affect the drawing area size so various updates are required.
      if (updateBounds) {
        this._updateBounds();
      }

      this.__notify(EV.OPTION_CHANGED, key);
    }

    return this;
  }

  /**
   * Provides extra checks for margin related options and checks if they should modify the bounds
   * calculations of the chart.
   */
  __handleMarginOptions(key, value, current) {
    let updateBounds = false;

    // Margins cause changes to the internal sizes.
    // If the new margin values match the old margin values do not update bounds. This will help
    // prevent an infinite loop if the margin is adjusted in the update cycle.
    if (key === 'margin') {
      if (!isObject(value)) {
        const newVal = { top: value, left: value, right: value, bottom: value };

        if (!isEqual(current, newVal)) {
          this.opts.margin = newVal;
          updateBounds = true;
        }
      }
      else if (!isEqual(current, value)) {
        updateBounds = true;
      }
    }

    // Check if key is a 'deep' margin value (ex. 'margin.left')
    else if (/^margin\./.test(key) && current !== value) {
      updateBounds = true;
    }

    return updateBounds;
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
   *  `.attr('fill', (d, i, nodes) => this.tryInvoke(this.opts.fillScaleAccessor, d, i, nodes))`
   * is equivalent to
   *  `.attr('fill', this.optionReaderFunc('fillScaleAccessor')')`
   */
  optionReaderFunc(optionKey) {
    if (!isString(optionKey)) {
      throw MonteError.InvalidArgumentType('optionReaderFunc', 'optionKey', 'string', optionKey);
    }

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
      if (console && console.error) { console.error(e); } // eslint-disable-line no-console
      this.__notify(EV.SUPPRESSED_ERROR, e);
      return null;
    }
  }

  /**
   * Invoke a function (`fn`) (generally from the chart options) with the given arguments. If the
   * `fn` is a non-function value (static values including undefined and null) then null is returned.
   */
  fnInvoke(fn, ...args) {
    if (fn == null || !isFunc(fn)) {
      return null;
    }

    try {
      return fn.call(this, ...args);
    }
    catch (e) {
      this.__notify(EV.SUPPRESSED_ERROR, e);
      return null;
    }
  }

  /**
   * Gets the object key bound to the property of a datum.
   */
  getPropKey(propShortName) {
    const propFullName = `${propShortName}Prop`;

    if (this.opts[propFullName]) {
      return this.opts[propFullName];
    }
    else if (this.opts[propShortName]) {
      const propIndex = propShortName.indexOf('Prop');

      if (propIndex > -1) {
        const expected = propShortName.substring(0, propIndex);
        throw new MonteError(`Property options should be accessed using short names without the "Prop" suffix. Given ${propShortName}, but expected ${expected}.`);
      }
    }

    return null;
  }

  /**
   * Reads a property from a datum and returns the raw (unscaled) value.
   */
  getProp(propShortName, d, defaultValue=null) {
    const dataPropName = this.getPropKey(propShortName);

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
    this.__notify(EV.CLEARING);

    this.displayData = null;
    this._clearDataElements();

    if (this.opts.autoResetStyleDomains) { this.resetStyleDomains(); }

    this.__notify(EV.CLEARED);
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
  resetStyleDomains() {
    this.__notify(EV.CSS_DOMAINS_RESETTING);
    this._resetStyleDomains();
    this.__notify(EV.CSS_DOMAINS_RESET);

    return this;
  }

  /**
   * Internal implementation of the `resetStyleDomains` method.
   */
  _resetStyleDomains() {}

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

    return cssClasses.join(' ').replace(/\s+/, ' ');
  }

  /**
   * Apply the transition settings (duration, delay, and ease). Attempt to match specfic settings
   * based on the provided levels.
   *
   * For example given the levels `['line', 'update']` the transition settings will first be read:
   * + `transitionSettings.line.update.<property>` then
   * + `transitionSettings.update.<property>` then
   * + `transitionSettings.<property>` then
   * + `<propertDefaultValue>`
   *
   * @param {...string} levels The transition depths to load settings for.
   */
  _transitionSetup(...levels) {
    return (transition, ...args) => {
      const { duration, delay, ease } = this._transitionSettings(...levels);

      this._transitionConfigureDuration(transition, duration, ...args);
      this._transitionConfigureDelay(transition, delay, ...args);
      transition.ease(ease);
    };
  }

  _transitionConfigureDuration(transition, duration, ...args) {
    let durationWrap = null;

    if (isFunc(duration) && args && args.length) {
      durationWrap = function(d, i, nodes) {
        return duration(d, i, nodes, ...args);
      };
    }

    transition.duration(durationWrap || duration);
  }

  _transitionConfigureDelay(transition, delay, ...args) {
    let delayWrap = null;

    if (isFunc(delay) && args && args.length) {
      delayWrap = function(d, i, nodes) {
        return delay(d, i, nodes, ...args);
      };
    }

    transition.delay(delayWrap || delay);
  }

  _transitionConfigure(transition, transitionSettings, d, i, nodes, ...args) {
    const { duration, delay, ease } = transitionSettings;

    transition.duration(this.tryInvoke(duration, d, i, nodes, ...args))
      .delay(this.tryInvoke(delay, d, i, nodes, ...args))
      .ease(ease);
  }

  _transitionSettings(...levels) {
    const transitionSettings = this.tryInvoke(this.opts.transition);
    const duration = getTreeSetting(transitionSettings, levels, 'duration', TRANSITION_DURATION_MS);
    const delay = getTreeSetting(transitionSettings, levels, 'delay', TRANSITION_DELAY_MS);
    const ease = getTreeSetting(transitionSettings, levels, 'ease', TRANSITION_EASE);

    if (this.developerMode && this.opts.developerOptions.transitions) {
      console.log('Transition: ' + levels.join('.')); // eslint-disable-line no-console
      console.log({ levels: levels, duration, delay, ease }); // eslint-disable-line no-console
    }

    return { duration, delay, ease };
  }

  /**
   * Get / set an attribute of the bounding element.
   *
   * A convenience method that is roughly equivalent to `<chart>.bound.attr(<name>, <value>)`,
   * but returns the chart instead of the `<chart>.bound` selection.
   *
   * @Chainable
   */
  attr(name, value) {
    if (value === UNDEF) {
      return this.bound.attr(name);
    }

    this.bound.attr(name, value);

    return this;
  }

  /**
   * Get / set a style of the bounding element.
   *
   * A convenience method that is roughly equivalent to `<chart>.bound.style(<name>, <value>)`,
   * but returns the chart instead of the `<chart>.bound` selection.
   *
   * @Chainable
   */
  style(name, value) {
    if (value === UNDEF) {
      return this.bound.style(name);
    }

    this.bound.style(name, value);

    return this;
  }

  /**
   * Set the CSS classes on the SVG element.
   *
   * A convenience method that is roughly equivalent to `<chart>.bound.classed(<names>, <value>)`,
   * but returns the chart instead of the `<chart>.bound` selection.
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

  /**
   * Internal method to manage assignment of data.
   */
  _data(data) {
    this.displayData = data;
  }

  /**
   * Gets the original data if the chart modified the structure; otherwise returns the same as
   * `<chart>.data()`;
   */
  getRawData() {
    // TODO: When assigning data make sure new data is a deep copy.
    if (this.rawData) {
      return this.rawData;
    }

    return this.displayData;
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
        this.__notify(EV.SUPPRESSED_ERROR, 'Extensions must have the `binding` option specified.');
      }
    });
  }

  /**
   * Invokes all extensions "Update Cycle" if bound to the given event (binding) name.
   */
  __updateExt(bindingName, ...extArgs) {
    this.extensions.forEach((ext) => {
      if (ext.opts.binding.indexOf(bindingName) > -1) { ext.fire(bindingName, ...extArgs); }
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
      this.__notify(EV.RENDERING);
      this._render();
      this.hasRendered = true;
      this.__notify(EV.RENDERED);
    }

    this.__notify(EV.UPDATING);
    this._update();
    this.__notify(EV.UPDATED);

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
      EV.INTERACTION_EVENTS.forEach((ev) =>
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
    const cssAction = EV.INTERACTION_EVENT_CSS_MAP[eventType];

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

  static generateScaleAccessor(scaleName, propPrefix) {
    if (propPrefix) {
      return function(d) {
        const scalePath = `opts.${scaleName}`;
        const v = this.getScaledProp(scalePath, propPrefix, d);

        if (this.developerMode && this.opts.developerOptions.scales && v !== UNDEF) {
          console.log(scalePath, v); // eslint-disable-line no-console
        }

        return v;
      };
    }

    // If the `propPrefix` is blank than default to index counting.
    return function(d, i) {
      const v = _get(this, `opts.${scaleName}`)(i);

      if (this.developerMode) {
        console.log(v); // eslint-disable-line no-console
      }

      return v;
    };
  }

  static createInstanceGroup(charts, ...additionalMethodsToProxy) {
    return new InstanceGroup(charts, GROUP_PROXY_METHODS, additionalMethodsToProxy);
  }
}

// The public methods from the base chart available for use in `ChartGroup`.
export const GROUP_PROXY_METHODS = [
  'addExt', 'addLayer', 'boundingRect', 'call', 'checkSize', 'classed', 'clear', 'data', 'emit',
  'layerUseClipPath', 'on', 'option', 'replaceScale', 'resetStyleDomains', 'update', 'updateData',
];
