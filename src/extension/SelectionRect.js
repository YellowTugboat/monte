import { ANY, HORIZONTAL, NONE, VERTICAL } from '../const/direction';
import { isDefined, isFunc } from '../tools/is';
import { BRUSH_HANDLE_SIZE } from '../const/d3';
import { Extension } from './Extension';
import { MonteOptionError } from '../support/MonteOptionError';
import { noop } from '../tools';

const SELECTION_CHANGED = 'selectionChanged';
const SELECTION_MOVE = 'selectionMove';
const SELECTION_START ='selectionStart';
const SELECTION_END = 'selectionEnd';
const SELECTION_EVENTS = [ SELECTION_CHANGED, SELECTION_MOVE, SELECTION_START, SELECTION_END ];

const SELECTION_RECT_DEFAULTS = {
  css: '',
  layer: 'selection',
  eventPrefix: 'selectionRect',
  selectionDirection: null,
  handleSize: BRUSH_HANDLE_SIZE,

  extent: function(w, h, selectionDirection) { // eslint-disable-line no-unused-vars
    return [[0, 0], [w, h]];
  },

  initialSelection: function(w, h, selectionDirection) {
    if (this.isXYBrush(selectionDirection)) {
      return [[0, 0], [0, 0]]; // Select none and allow user to make a custom selection.
    }
    else if (this.isXBrush(selectionDirection)) {
      return [0, w]; // Select entire region, because no small generalization can be made.
    }
    else if (this.isYBrush(selectionDirection)) {
      return [0, h]; // Select entire region, because no small generalization can be made.
    }
  },

  filter: null,
  customHandlePath: null,
};

export class SelectionRect extends Extension {
  _initOptions(...options) {
    super._initOptions(...options, SELECTION_RECT_DEFAULTS);
  }

  _initPublicEvents(...events) {
    events.push(...SELECTION_EVENTS);
    super._initPublicEvents(events);
  }

  _brush(selectionDirection) {
    let brush;
    let css;

    if (this.isXYBrush(selectionDirection)) {
      brush = d3.brush();
      css = 'select-dir-all';
    }
    else if (this.isXBrush(selectionDirection)) {
      brush = d3.brushX();
      css = 'select-dir-x';
    }
    else if (this.isYBrush(selectionDirection)) {
      brush = d3.brushY();
      css = 'select-dir-y';
    }
    else {
      let msg = `The "selectionDirection" option must be a direction (${HORIZONTAL}, ${VERTICAL}, or ${NONE}), axis (x or y), or an unset value (null or undefined).`;
      throw new MonteOptionError(msg);
    }

    return { brush, css };
  }

  _handles(selectionDirection) {
    if (this.isXYBrush(selectionDirection)) {
      return [{ type: 'n' }, { type: 'e' }, { type: 's' }, { type: 'w' }];
    }
    else if (this.isXBrush(selectionDirection)) {
      return [{ type: 'e' }, { type: 'w' }];
    }
    else if (this.isYBrush(selectionDirection)) {
      return [{ type: 'n' }, { type: 's' }];
    }
  }

  _render() {
    const selectionDirection = this.tryInvoke(this.opts.selectionDirection);
    const handleSize = this.tryInvoke(this.opts.handleSize);
    const css = this.tryInvoke(this.opts.css);
    const w = this.chart.width;
    const h = this.chart.height;
    const extent = this.tryInvoke(this.opts.extent, w, h, selectionDirection);
    const initialSelection = this.tryInvoke(this.opts.initialSelection, w, h, selectionDirection);
    const brushDetails = this._brush(selectionDirection);

    this.selectionDirection = selectionDirection;
    this.extent = extent;
    this.brush = brushDetails.brush.extent(extent);
    this.brush.handleSize(handleSize)
      .on('start', this._brushMove.bind(this, SELECTION_START))
      .on('brush', this._brushMove.bind(this, SELECTION_MOVE))
      .on('end', this._brushMove.bind(this, SELECTION_END));

    // Setup brush / selection layer.
    this.brushSel = this.layer
      .classed('monte-ext-selection-rect', true)
      .classed(brushDetails.css, true)
      .classed(css, true)
      .call(this.brush);

    // Associate filter function if defined.
    if (isDefined(this.opts.filter) && isFunc(this.opts.filter)) {
      this.brush.filter(this.opts.filter);
    }

    // Draw custom handles
    if (isDefined(this.opts.customHandlePath) && this.opts.customHandlePath !== noop) {
      this._renderCustomHandles();
      this.brushSel.classed('custom-handles', true);
    }
    else {
      this.brushSel.classed('standard-handles', true);
    }

    // Break apart chain to ensure `brushSel` is assigned to before move and event listeners are
    // invoked.
    this.brush.move(this.brushSel, initialSelection);
  }

  _renderCustomHandles() {
    this.brushSel.selectAll('.handle--custom')
      .data(this._handles(this.selectionDirection))
      .enter().append('path')
        .attr('display', 'none')
        .attr('class', (d) => `handle--custom ${d.type}`)
        .attr('d', (d, i, nodes) => this.tryInvoke(this.opts.customHandlePath, d, i, nodes));

    this.usingCustomHandles = true;
  }

  _updateBounds() {
    const w = this.chart.width;
    const h = this.chart.height;
    const extent = this.tryInvoke(this.opts.extent, w, h, this.selectionDirection);
    this.extent = extent;
    this.brush.extent(extent);
    this.brushSel.call(this.brush);

    // Update proper scale of rect if the chart is resized.
    this.brush.move(this.brushSel, this.unscaleSelection(this._selection.scaled));
  }

  _update() { }

  _brushMove(ev) {
    const s = this.selection();
    this._selection = s;

    if (this.usingCustomHandles) {
      const handle = this.brushSel.selectAll('.handle--custom');

      if (s.raw == null) {
        handle.attr('display', 'none');
      }
      else {
        handle.attr('display', null)
          .attr('transform', (d) => {
            const x = this._handleX(d.type, s.raw);
            const y = this._handleY(d.type, s.raw);
            return 'translate(' + x + ',' + y + ')';
          });
      }
    }

    this.emit(ev, s);
    this.emit(SELECTION_CHANGED, s);
  }

  // NOTE: The scaled y0 and y1 are flipped because height and origin are flipped by convention
  //       in the axes charts.
  scaleSelection(rawSelection) {
    const selectionDirection = this.selectionDirection;
    const s = rawSelection;

    if (!s) { return s; }

    if (this.isXYBrush(selectionDirection)) {
      // [[x0, y0], [x1, y1]]
      return [
        [this.chart.x.invert(s[0][0]), this.chart.y.invert(s[1][1])],
        [this.chart.x.invert(s[1][0]), this.chart.y.invert(s[0][1])],
      ];
    }
    else if (this.isXBrush(selectionDirection)) {
      // [x0, x1]
      return [this.chart.x.invert(s[0]), this.chart.x.invert(s[1])];
    }
    else if (this.isYBrush(selectionDirection)) {
      // [y0, y1]
      return [this.chart.y.invert(s[1]), this.chart.y.invert(s[0])];
    }
  }

  unscaleSelection(scaledSelection) {
    const selectionDirection = this.selectionDirection;
    const s = scaledSelection;

    if (!s) { return s; }

    if (this.isXYBrush(selectionDirection)) {
      // [[x0, y0], [x1, y1]]
      return [
        [this.chart.x(s[0][0]), this.chart.y(s[1][1])],
        [this.chart.x(s[1][0]), this.chart.y(s[0][1])],
      ];
    }
    else if (this.isXBrush(selectionDirection)) {
      // [x0, x1]
      return [this.chart.x(s[0]), this.chart.x(s[1])];
    }
    else if (this.isYBrush(selectionDirection)) {
      // [y0, y1]
      return [this.chart.y(s[1]), this.chart.y(s[0])];
    }
  }

  selection() {
    const raw = d3.brushSelection(this.brushSel.node());
    const scaled = this.scaleSelection(raw);

    return { raw, scaled };
  }

  clearSelection() {
    this.brushSel.call(this.brush.move, null);
  }

  destroy() { }

  isXYBrush(selectionDirection) {
    return !isDefined(selectionDirection) || selectionDirection === NONE ||
      selectionDirection === ANY;
  }

  isXBrush(selectionDirection) {
    selectionDirection = selectionDirection || '';
    return selectionDirection.toLowerCase() === 'x' || selectionDirection === HORIZONTAL;
  }

  isYBrush(selectionDirection) {
    selectionDirection = selectionDirection || '';
    return selectionDirection.toLowerCase() === 'y' || selectionDirection === VERTICAL;
  }

  _handleX(type, rawSelection) {
    const dir = this.selectionDirection;
    const s = rawSelection;
    const isX = this.isXBrush(dir);
    const isY = this.isYBrush(dir);

    if (!s) { return 0; }

    switch (type) {
    case 'n': return isY ? mid(this.extent[0][0], this.extent[1][0]) : mid(s[0][0], s[1][0]);
    case 's': return isY ? mid(this.extent[0][0], this.extent[1][0]) : mid(s[0][0], s[1][0]);
    case 'e': return isX ? s[1] : s[1][0];
    case 'w': return isX ? s[0] : s[0][0];
    }
  }

  _handleY(type, rawSelection) {
    const dir = this.selectionDirection;
    const s = rawSelection;
    const isX = this.isXBrush(dir);
    const isY = this.isYBrush(dir);

    if (!s) { return 0; }

    switch (type) {
    case 'n': return isY ? s[0] : s[0][1];
    case 's': return isY ? s[1] : s[1][1];
    case 'w': return isX ? mid(this.extent[0][1], this.extent[1][1]) : mid(s[0][1], s[1][1]);
    case 'e': return isX ? mid(this.extent[0][1], this.extent[1][1]) : mid(s[0][1], s[1][1]);
    }
  }
}

function mid(a, b) {
  return (a + b) / 2;
}
