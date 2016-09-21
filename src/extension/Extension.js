import { MonteError } from '../support/MonteError';
import { isFunc } from '../tools/is';
import { mergeOptions } from '../tools/mergeOptions';

const DEFAULTS = {
  // The layer for drawing operations
  layer: 'bg',

  // The chart events to listen for.
  binding: ['rendered', 'updateBounds'],

  // Flag for global updates for any option change.
  // Subclasses can override `_shouldOptionUpdate` for nuanced behavior.
  optionsTriggerUpdate: false,
};

export class Extension {
  constructor(options) {
    // Configure the data options.
    this._initOptions(options);
  }

  _initOptions(...options) {
    this.opts = mergeOptions(...options, DEFAULTS);
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

  update(...args) {
    // Cache chart for use on  option update.
    this.cachedChart = args[1];
    this._update(...args);
  }

  _update(binding, chart) { // eslint-disable-line no-unused-vars
    // throw new MonteError('Update (`_update`) needs to be defined in order for the extension to be useful.');
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

  // Build a string of CSS classes that may include invokable options.
  _buildCss(cssSources, d, i) {
    const cssClasses = [];
    const sources = Array.isArray(cssSources) ? cssSources : [cssSources];

    sources.forEach((source) => {
      cssClasses.push(this.optInvoke(source, d.id || i));
    });

    return cssClasses.join(' ');
  }
}
