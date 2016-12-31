import * as EV from '../const/events';
import { isDefined, isFunc } from '../tools/is';
import { MonteError } from '../support/MonteError';
import { MonteOptionError } from '../support/MonteOptionError';
import { UNDEF } from '../const/undef';
import { global } from '../support/MonteGlobal';
import { mergeOptions } from '../tools/mergeOptions';
import { pascalCase } from '../tools/string';

const DEFAULTS = {
  // The layer for drawing operations
  layer: 'bg',

  // The chart events to listen for.
  binding: [EV.DESTROYING, EV.RENDERED, EV.UPDATED, EV.UPDATED_BOUNDS],

  // Flag for global updates for any option change.
  // Subclasses can override `_shouldOptionUpdate` for nuanced behavior.
  optionsTriggerUpdate: false,

  // Special prefix for all events originating *from* the extension.
  eventPrefix: null,

  customEvents: [],
};

export class Extension {
  constructor(options) {
    // Configure the data options.
    this._initOptions(options);

    this._initPublicEvents(
      ...EV.EXTENSION_LIFECYCLE_EVENTS,

      // Custom events provided by the user
      ...this.opts.customEvents);

    this.lastUpdateEvent = '';
  }

  _initOptions(...options) {
    this.opts = mergeOptions(...options, DEFAULTS);

    if (!this.opts.eventPrefix) {
      throw MonteOptionError.RequiredOption('eventPrefix');
    }

    // Always require the "destroying" event to ensure extension clean up.
    if (this.opts.binding.indexOf(EV.DESTROYING) === -1) {
      this.opts.binding.push(EV.DESTROYING);
    }
  }

  _initPublicEvents(...events) {
    this._events = events;
  }

  /**
   * Associate a chart instance with the extension. The chart instance will be acted upon by the
   * extension instance.
   *
   * @Chainable
   */
  setChart(chart) {
    // Prevent setting chart more than once.
    if (this.chart && this.chart !== chart) {
      throw new MonteError('An extension should only have the chart set once.');
    }

    this.chart = chart;

    const layerName = this.tryInvoke(this.opts.layer);
    if (layerName) { this.layer = this.chart[layerName]; }

    // Get and store extension ID from MonteGlobal
    this.__extId = global.getNextExtensionId();

    return this;
  }

  option(prop, value) {
    if (value === UNDEF) {
      return this.opts[prop];
    }

    this.opts[prop] = value;
    if (this._shouldOptionUpdate(prop) && this.cachedChart) {
      this.fire(EV.OPTION_CHANGED, prop);
    }

    return this;
  }

  // Indicates whether an option change should cause an update to occur.
  _shouldOptionUpdate(prop) { // eslint-disable-line no-unused-vars
    return this.opts.optionsTriggerUpdate;
  }

  /**
   * Binds an event to a given `callback`. If no `callback` is provided it returns the callback.
   *
   * @Chainable <setter>
   */
  on(typenames, callback) {
    if (!this.dispatch) { // Lazy construct the dispatcher.
      this.dispatch = d3.dispatch(...this.events);
    }

    if (callback) {
      this.dispatch.on(typenames, callback);
      return this;
    }

    return this.dispatch.on(typenames);
  }

  /**
   * Force the triggering of an event with the given arguments. The event is notified through the
   * extension's dispatcher and the parent chart's dispatcher. The `on` callbacks are invoked in
   * the context of the extension for the extension's dispatcher and in the context of the chart
   * for the chart's dispatcher.
   *
   * Uses:
   *  + Trigger event for listeners as needed such as force an extension to update.
   *
   * @Chainable
   */
  __notify(eventName, ...args) {
    if (this.dispatch) {
      this.dispatch.call(eventName, this, ...args);
    }

    this.chart.emit('extension', `${this.opts.eventPrefix}:${eventName}`, this, ...args);
  }

  emit(eventName, ...args) {
    this.__notify(eventName, ...args);
  }

  /**
   * Remove the data elements.
   *
   * @Chainable
   */
  clear() {
    this.__notify(EV.CLEARING);
    this._clearDataElements();
    this.__notify(EV.CLEARED);

    return this;
  }

  _clearDataElements() {
    // Clear elements based on extension ID.
    this._extCreateSelection.remove();
  }

  /**
   * Invokes a lifecycle event ('destroying', 'updatedBounds', 'rendered', 'optionChanged') with
   * all other events resulting in an 'updated' event and invoking the update-cycle.
   *
   * The 'updatedBounds' and 'rendered' chart events result in update-cycle invocation if the
   * extension does not override the event-bound methods (`_updateBounds`, `_render`).
   *
   * The 'optionChanged' extension event results in `_option<>`
   */
  fire(event, ...args) {
    if (!this.chart) {
      throw new MonteError('A chart must be associated with the extension prior to use.');
    }

    try {
      switch (event) {
      case EV.DESTROYING:
        this.destroy();
        break;

      case EV.UPDATED_BOUNDS:
        this.updateBounds(...args);
        break;

      case EV.RENDERED:
        this.render(...args);
        break;

      case EV.OPTION_CHANGED:
        this._optionChanged(...args);
        break;

      default:
        this.lastUpdateEvent = event;
        this.update(...args);
      }
    }
    catch (e) {
      if (console && console.error) { console.error(e); } // eslint-disable-line no-console
      this.__notify(EV.SUPPRESSED_ERROR, e, e.stack || 'No stack available.');
    }
  }

  /**
   * Invoke the extension update-cycle.
   */
  update(...args) {
    this.__notify(EV.UPDATING);
    this._update(...args);
    this.__notify(EV.UPDATED);
  }

  _update(binding, chart) { // eslint-disable-line no-unused-vars
    throw MonteError.UnimplementedMethod('Update', '_update', 'extension');
  }

  /**
   * Invoke `_render` if defined.
   */
  render(...args) {
    if (this._render) {
      this.__notify(EV.RENDERING);
      this._render(...args);
      this.__notify(EV.RENDERED);
    }

    this.rendered = true;
  }

  /**
   * Invoke `_updateBounds` if defined.
   */
  updateBounds(...args) {
    if (this._updateBounds) {
      this.__notify(EV.UPDATING_BOUNDS);
      this._updateBounds(...args);
      this.__notify(EV.UPDATED_BOUNDS);
    }
  }

  /**
   * Invoke the method related directly to the option (`_option<OptionName>`) if defined; otherwise
   * invoke the extension update-cycle.
   */
  _optionChanged(...args) {
    const prop = args[0];
    const optionMethodName = `_option${pascalCase(prop)}`;

    this.__notify(EV.OPTION_CHANGING, prop);

    if (this[optionMethodName]) {
      this[optionMethodName]();
    }
    else {
      this.update(...args);
    }

    this.__notify(EV.OPTION_CHANGED, prop);
  }

  // Access an option that may need to be invoked as a function or that may be a literal value.
  tryInvoke(value, ...args) {
    try {
      return isFunc(value) ? value.call(this, ...args) : value;
    }
    catch (e) {
      if (console && console.error) { console.error(e); } // eslint-disable-line no-console
      this.__notify(EV.SUPPRESSED_ERROR, e, e.stack || 'No stack available.');
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

  // Build a string of CSS classes that may include invokable options.
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

  getExtId() {
    return this.__extId;
  }

  _getExtAttr() {
    return `monte-ext-${this.getExtId()}`; // ID is stored on the element as an attribute.
  }

  // Sets the extension ID selector ('the ID attribute') on the element.
  _setExtAttrs(selection) {
    selection.attr(this._getExtAttr(), '');
  }

  _extCreateSelection(cssClass) {
    const extAttr = this._getExtAttr();
    let selector = `[${extAttr}]`;

    if (cssClass) {
      selector += `.${cssClass}`;
    }

    return this.layer.selectAll(selector);
  }

  /**
   * Invoke `_destroy`.
   */
  destroy() {
    this.__notify(EV.DESTROYING);
    this._destroy();
    this.__notify(EV.DESTROYED);
  }

  // Clean up if necessary.
  _destroy() {}

  toString() {
    return this.constructor.name;
  }

  static featureEventName(featurePrefix, eventName) {
    if (featurePrefix === 'chart') {
      return eventName;
    }

    return `${featurePrefix}:${eventName}`;
  }
}
