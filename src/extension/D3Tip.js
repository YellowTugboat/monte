import { isArray, isFunc, isNumeric, isObject } from '../tools/is';
import { Extension } from './Extension';
import { MonteOptionError } from '../support/MonteOptionError';

const TIP_DEFAULTS = {
  binding: ['rendered', 'destroy'],
  css: 'd3-tip',
  direction: 'n',
  offset: {},
  html: (d, i) => d.value || d || i,
  featurePrefix: null,
  showEvents: ['mouseover', 'touchstart'],
  hideEvents: ['mouseout'],
};

export class D3Tip extends Extension {
  _initOptions(...options) {
    super._initOptions(...options, TIP_DEFAULTS);
  }

  _update(binding, chart) {
    // Throw option error if `featurePrefix` is left blank
    if (!this.opts.featurePrefix) {
      throw MonteOptionError.RequiredOption('featurePrefix');
    }

    if (binding === 'rendered') {
      const tip = d3.tip().attr('class', this.opts.css)
        .direction(this.opts.direction)
        .html(this.opts.html);

      if (isFunc(this.opts.offset)) {
        tip.offset(this.opts.offset);
      }
      else if (isObject(this.opts.offset)) {
        tip.offset([
          this.opts.offset.y || this.opts.offset.top || 0,
          this.opts.offset.x || this.opts.offset.left || 0,
        ]);
      }
      else if (isNumeric(this.opts.offset)) {
        // If a single number is provided assume that only a vertical shift is intended.
        tip.offset([+this.opts.offset, 0]);
      }
      else {
        throw new MonteOptionError(`Check the "offset" option value. A function, object, or number is expected. Received: ${this.opts.offset}`);
      }

      chart.call(tip);

      this.opts.showEvents.forEach((ev) =>
        chart.on(`${this.opts.featurePrefix}:${ev}`, tip.show));

      this.opts.hideEvents.forEach((ev) =>
        chart.on(`${this.opts.featurePrefix}:${ev}`, tip.hide));

      this.tip = tip;
    }
    else if (binding === 'destroy') {
      this.tip.destroy();
    }
  }
}

const ANNOTATE_DEFAULTS = {
  binding: ['updated', 'destroy'],
  css: 'd3-tip',
  direction: 'n',
  offset: {},
  html: (d, i) => d.value || d || i,
  selectDatum: function(node, data) { // eslint-disable-line no-unused-vars
    return node.datum();
  },
  selectNode: function(chart) { // eslint-disable-line no-unused-vars
    throw MonteOptionError.RequiredOption('selectNode');
  },
  //featurePrefix: null,
  //showEvents: ['mouseover', 'touchstart'],
  //hideEvents: ['mouseout'],
  // margin: {
  //   left: 10,
  // }
};

export class D3TipAnnotate extends Extension {
  _initOptions(...options) {
    super._initOptions(...options, ANNOTATE_DEFAULTS);
  }

  _update(binding, chart) {
    if (binding === 'destroy') {
      this.tip.destroy();
      return;
    }

    const tip = this.tip || d3.tip();
    const nodeSelection = this.opts.selectNode(chart);
    const tipDatum = this.opts.selectDatum(nodeSelection, chart.data());

    tip.attr('class', this.opts.css)
      .direction(this.opts.direction)
      .html(this.opts.html);

    if (nodeSelection && tipDatum) {
      chart.call(tip);

      if (isFunc(this.opts.offset)) {
        const offset = this.opts.offset(tipDatum, nodeSelection);
        this._offsetSetup(tip, offset);
      }
      else {
        this._offsetSetup(tip, this.opts.offset);
      }


      const delay = chart.option('transitionDuration');
      d3.timeout(() => tip.show(tipDatum, nodeSelection.node()), delay);
    }

    this.tip = tip;
  }

  _offsetFromObj(offset) {
    return [
      offset.y || offset.top || 0,
      offset.x || offset.left || 0,
    ];
  }

  _offsetSetup(tip, offset) {
    if (isObject(offset)) {
      tip.offset(this._offsetFromObj(offset));
    }
    else if (isNumeric(offset)) {
      // If a single number is provided assume that only a vertical shift is intended.
      tip.offset([+offset, 0]);
    }
    else if (isArray(offset)) {
      tip.offset(offset);
    }
    else {
      throw new MonteOptionError(`Check the "offset" option value. A function, object, or number is expected. Received: ${this.opts.offset}`);
    }
  }
}
