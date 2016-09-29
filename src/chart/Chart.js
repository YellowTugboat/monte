import { get as getOpt, set as setOpt } from '../external/lodash';
import { isDefined, isFunc } from '../tools/is';
import { EventWatcher } from '../support/EventWatcher';
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
    this._initPublicEvents('rendered', 'updated', 'updateBounds', 'click', 'cssDomainsReset',
      'suppressedError', 'destroy');

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
    this.bound.on('click', function(...args) {
      const svg = this;
      chart.__notify('click', svg, ...args);
    });

    if (this.opts.resize) {
      if (!global.resizeWatch) { global.resizeWatch = new EventWatcher(); }

      const resizer = this.opts.resize;
      // resizer.option('chart', this);
      this._resizeHandler = resizer.resize.bind(resizer, this);
      global.resizeWatch.add(this._resizeHandler);
    }
  }

  _initPublicEvents(...events) {
    this.dispatch = d3.dispatch(...events);
  }

  _initCustomize() {}

  _initRender() {}

  _updateBounds(suppressNotify=false, suppressUpdate=false) {
    // Margin Convention and calculate drawing area size
    this.margin = this.opts.margin;
    this.width = this.opts.boundingWidth - this.margin.left - this.margin.right;
    this.height = this.opts.boundingHeight - this.margin.top - this.margin.bottom;

    // Apply margins to bg and draw area
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

    const notify = () => { if (this._constructed) { this.__notify('updateBounds'); } };
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
  }

  destroy() {
    if (this._resizeHandler) {
      global.resizeWatch.remove(this._resizeHandler);
    }

    this.__notify('destroy');

    // TODO: Handle case where parentSelector and bound are the same and only remove internal elements.
    this.bound.remove();
  }

  _destroy() {}

  addLayer(layerName) {
    const layer = this.bound.append('g').attr('class', `monte-${layerName}`);

    this[layerName] = layer;
    this.layers.push(layer);
  }

  _getLayerTranslate() { return `translate(${this.margin.left}, ${this.margin.top})`; }

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

  on(typenames, callback) {
    if (callback) {
      this.dispatch.on(typenames, callback);
      return this;
    }

    return this.dispatch.on(typenames);
  }

  option(prop, value) {
    if (value === undefined) {
      return getOpt(this.opts, prop);
    }

    setOpt(this.opts, prop, value);

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

  _clearDataElements() {}

  clear() {
    this.displayData = null;
    this._clearDataElements();

    if (this.opts.autoResetCssDomains) { this.resetCssDomains(); }
  }

  resetCssDomains() {
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

  classed(...args) {
    this.bound.classed(...args);

    return this;
  }

  call(...args) {
    this.bound.call(...args);

    return this;
  }

  updateData(data) {
    this.data(data, true);
  }

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

  addExt(...exts) {
    this._bindExt(exts);
  }

  _bindExt(exts) {
    // Bind extension to this chart instance.
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

  __updateExt(bindingName, ...extArgs) {
    this.extensions.forEach((ext) => {
      if (ext.opts.binding.indexOf(bindingName) > -1) { ext.update(bindingName, ...extArgs); }
    });
  }

  replaceScale(scaleName, newScaleConstructor) {
    const scale = newScaleConstructor();
    scale.range(this[scaleName].range())
      .domain(this[scaleName].domain());
    this[scaleName] = scale;
    this.update();
  }

  // Render the vis.
  update() {
    this._update();

    // Notify if first rendered
    if (!this.hasRendered) {
      this.hasRendered = true;
      this.__notify('rendered');
    }

    this.__notify('updated');
  }

  _update() {
    if (!this.opts.directUse) {
      // throw new MonteError('Update (`_update`) needs to be defined in order for the chart to be useful.');
      throw MonteError.UnimplementedMethod('Update', '_update');
    }
  }

  __bindCommonEvents(lead) {
    const chart = this;

    return function(sel) {
      sel.on('mouseover', (d, i, nodes) => chart.__elemEvent('mouseover', `${lead}:mouseover`, d, i, nodes))
        .on('mouseout', (d, i, nodes) => chart.__elemEvent('mouseout', `${lead}:mouseout`, d, i, nodes))
        .on('click', (d, i, nodes) => chart.__elemEvent('click', `${lead}:click`, d, i, nodes))
        .on('touchstart', (d, i, nodes) => chart.__elemEvent('touchstart', `${lead}:touchstart`, d, i, nodes));
    };
  }

  // Using notify ensures that extensions are notified before outside listeners are.
  __notify(eventName, ...args) {
    this.__updateExt(eventName, this, ...args);
    this.dispatch.call(eventName, this, ...args);
  }

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

    this.__notify(eventNameFull, node, d, i, nodes);
  }
}
