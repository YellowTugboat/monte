import { get as _get, set as _set } from '../external/lodash';
import { isDefined, isFunc, isObject } from '../tools/is';
import { EventWatcher } from '../support/EventWatcher';
import { INTERACTION_EVENTS } from '../const/events';
import { MonteError } from '../support/MonteError';
import { MonteOptionError } from '../support/MonteOptionError';
import { mergeOptions } from '../tools/mergeOptions';

const global = window ? window.MonteGlobals = {} : {};

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

  transitionDuration: 250,

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

const EVENT_CSS_MAP = {
  'mouseover': { action: 'add', css: 'over' },
  'mouseout': { action: 'remove', css: 'over' },
  'touchstart': { action: 'add', css: 'touch' },
  'touchend': { action: 'remove', css: 'touch' },
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
  constructor(parentSelector, options, data) {
    this._constructed = false;
    this._optsSet = false;
    this.parentSelector = parentSelector;
    this.hasRendered = false;
    this.layers = [];
    this.extensions = [];

    // Configure the data options.
    this._initOptions(options);

    // Setup the Public events.
    this._initPublicEvents(
      // Interaction events
      ...INTERACTION_EVENTS,

      // Support events
      'suppressedError', 'extension',

      // Lifecycle event pairs
      'rendering', 'rendered',
      'updating', 'updated',
      'updatingBounds', 'updatedBounds',
      'cssDomainsReseting', 'cssDomainsReset',
      'destroying', 'destroyed',

      // Custom events
      ...this.opts.customEvents);

    if (this.opts.developerMode || global.developerMode) {
      this._initDeveloperMode();
    }

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
    for (let prop in opts) {
      if (opts.hasOwnProperty(prop)) {
        this.option(prop, opts[prop]);
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
        .attr('id', 'drawClip');

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

    INTERACTION_EVENTS.forEach((ev) => {
      this.bound.on(ev, function(...args) { chart.__notify(ev, this, ...args); });
    });

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

    // Update drawing clip // TODO: Apply translate?
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

    // TODO: Handle case where parentSelector and bound are the same and only remove internal
    //       elements.
    this.bound.remove();

    this.__notify('destroyed');
  }

  _destroy() {}

  addLayer(layerName) {
    const layer = this.bound.append('g').attr('class', `monte-${layerName}`);

    this[layerName] = layer;
    this.layers.push(layer);
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

    this.opts.boundingWidth = width;
    if (arguments.length === 2) { this.opts.boundingHeight = height; }

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
  option(prop, value) {
    if (value === undefined) {
      return _get(this.opts, prop);
    }

    _set(this.opts, prop, value);

    if (prop === 'margin') {
      if (typeof value !== 'object') {
        this.opts.margin = { top: value, left: value, right: value, bottom: value };
      }

      // Margins affect the drawing area size so various updates are required.
      if (this._optsSet) {
        this._updateBounds();
      }
    }

    return this;
  }

  /**
   * Invoke a `value` (generally from the chart options) with the given arguments. Static values
   * are returned directly.
   */
  optInvoke(value, ...args) {
    if (value == null) {
      throw new MonteOptionError('Option not initialized.');
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
   */
  getScaledProp(scaleName, d) {
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

  _clearDataElements() {}

  /**
   * Remove the data, remove the data elements, and clear the CSS domains.
   */
  clear() {
    this.displayData = null;
    this._clearDataElements();

    if (this.opts.autoResetCssDomains) { this.resetCssDomains(); }
  }

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

  _resetCssDomains() {}

  _buildCss(cssSources, d, i) {
    const cssClasses = [];
    const sources = Array.isArray(cssSources) ? cssSources : [cssSources];

    sources.forEach((source) => {
      if (isDefined(source)) {
        cssClasses.push(this.optInvoke(source, (d && d.id) || i));
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
   * Set the data for the chart to display and trigger the "Updtate cycle".
   *
   * @Chainable
   */
  data(data, isUpdate=false, suppressUpdate=false) {
    if (data === undefined) {
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
   */
  addExt(...exts) {
    this._bindExt(exts);
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
   */
  replaceScale(scaleName, newScaleConstructor) {
    const scale = newScaleConstructor();
    scale.range(this[scaleName].range())
      .domain(this[scaleName].domain());
    this[scaleName] = scale;
    this.update();
  }

  /**
   * (Re)renders the chart by invoking the "Update cycle" which is consistent with the D3
   * "Enter-Update-Exit" pattern.
   */
  update() {
    if (!this.data()) { return; } // Don't allow update if data has not been set.
    if (!this.hasRendered) { this.__notify('rendering'); }

    this.__notify('updating');
    this._update();

    // Notify if first rendered
    if (!this.hasRendered) {
      this.hasRendered = true;
      this.__notify('rendered');
    }

    this.__notify('updated');
  }

  /**
   * A specific charts implementation of the "Update cycle"
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
    this.__updateExt(eventName, this, ...args);
    this.dispatch.call(eventName, this, ...args);
  }

  /**
   * Handles an event generated through element interaction (i.e. click, mouseover, etc...).
   */
  __elemEvent(eventType, eventNameFull, d, i, nodes) {
    const node = nodes[i];
    const cssAction = EVENT_CSS_MAP[eventType];

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
