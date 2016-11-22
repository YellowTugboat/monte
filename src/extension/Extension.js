import * as EV from '../const/events';
import { isDefined, isFunc } from '../tools/is';
import { MonteError } from '../support/MonteError';
import { MonteOptionError } from '../support/MonteOptionError';
import { UNDEF } from '../const/undef';
import { mergeOptions } from '../tools/mergeOptions';
import { pascalCase } from '../tools/string';

const DEFAULTS = {
  // The layer for drawing operations
  layer: 'bg',

  // The chart events to listen for.
  binding: [EV.RENDERED, EV.UPDATED_BOUNDS],

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
  }

  _initOptions(...options) {
    this.opts = mergeOptions(...options, DEFAULTS);

    if (!this.opts.eventPrefix) {
      throw MonteOptionError.RequiredOption('eventPrefix');
    }
  }

  _initPublicEvents(...events) {
    this._events = events;
  }

  setChart(chart) {
    this.chart = chart;
    this.layer = chart[this.opts.layer];

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

  fire(...args) {
    // Cache chart for use on option update.
    const event = args[0];

    if (!this.layer) { this.layer = this.chart[this.opts.layer]; }

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
        this._optionChanged(...args.slice(1));
        break;

      default:
        this.update(...args);
      }
    }
    catch (e) {
      if (console && console.error) { console.error(e); } // eslint-disable-line no-console
      this.chart.__notify(EV.SUPPRESSED_ERROR, e, e.stack || 'No stack available.');
    }
  }

  update(...args) {
    this.__notify(EV.UPDATING);
    this._update(...args);
    this.__notify(EV.UPDATED);
  }

  _update(binding, chart) { // eslint-disable-line no-unused-vars
    throw MonteError.UnimplementedMethod('Update', '_update');
  }

  render(...args) {
    if (this._render) {
      this.__notify(EV.RENDERING);
      this._render(...args);
      this.__notify(EV.RENDERED);
    }
    else {
      this.update(...args);
    }
  }

  updateBounds(...args) {
    if (this._updateBounds) {
      this.__notify(EV.UPDATING_BOUNDS);
      this._updateBounds(...args);
      this.__notify(EV.UPDATED_BOUNDS);
    }
    else {
      this.update(...args);
    }
  }

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
}
