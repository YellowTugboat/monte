import { MonteError } from '../support/MonteError';
import { MonteOptionError } from '../support/MonteOptionError';
import { isFunc } from '../tools/is';
import { mergeOptions } from '../tools/mergeOptions';

const DEFAULTS = {
  // The layer for drawing operations
  layer: 'bg',

  // The chart events to listen for.
  binding: ['rendered', 'updatedBounds'],

  // Flag for global updates for any option change.
  // Subclasses can override `_shouldOptionUpdate` for nuanced behavior.
  optionsTriggerUpdate: false,

  eventPrefix: null,
};

export class Extension {
  constructor(options) {
    // Configure the data options.
    this._initOptions(options);
  }

  _initOptions(...options) {
    this.opts = mergeOptions(...options, DEFAULTS);

    if (!this.opts.eventPrefix) {
      throw MonteOptionError.RequiredOption('eventPrefix');
    }
  }

  setChart(chart) {
    this.chart = chart;
    this.layer = chart[this.opts.layer];
  }

  option(prop, value) {
    if (value === undefined) {
      return this.opts[prop];
    }

    this.opts[prop] = value;
    if (this._shouldOptionUpdate(prop) && this.cachedChart) {
      this.update('optionChanged', this.cachedChart);
    }

    return this;
  }

  // Indicates whether an option change should cause an update to occur.
  _shouldOptionUpdate() { return this.opts.optionsTriggerUpdate; }

  emit(eventName, ...args) {
    this.chart.emit('extension', `${this.opts.eventPrefix}:${eventName}`, this, ...args);
  }

  update(...args) {
    // Cache chart for use on option update.
    const event = args[0];

    if (!this.layer) { this.layer = this.chart[this.opts.layer]; }

    if (event === 'destroy') {
      this._destroy();
    }
    else {
      this._update(...args);
      this.emit('updated');
    }
  }

  _update(binding, chart) { // eslint-disable-line no-unused-vars
    throw MonteError.UnimplementedMethod('Update', '_update');
  }

  // Access an option that may need to be invoked as a function or that may be a literal value.
  optInvoke(value, ...args) {
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
  _buildCss(cssSources, d, i) {
    const cssClasses = [];
    const sources = Array.isArray(cssSources) ? cssSources : [cssSources];

    sources.forEach((source) => {
      cssClasses.push(this.optInvoke(source, d.id || i));
    });

    return cssClasses.join(' ');
  }

  // Clean up if necessary.
  _destroy() {}

  toString() {
    return this.constructor.name;
  }
}
