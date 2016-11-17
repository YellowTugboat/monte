import { isArray, isDefined } from '../tools/is';
import { Extension } from './Extension';
import { noop } from '../tools/noop';

const REF_LINE_DEFAULTS = {
  eventPrefix: 'refline',
  css: 'monte-ext-ref-line-grp',
  data: noop,
  layer: 'overlay',
  labelPlacement: 'nw',
  textAnchor: 'start',
  textProp: 'text',
  x1Prop: 'x1',
  x2Prop: 'x2',
  y1Prop: 'y1',
  y2Prop: 'y2',
};

// Strategies for placing labels.
const LABEL_PLACEMENT = {
  'nw': (text, c) => {
    text.attr('dy', '-0.35em').attr('x', c.x1).attr('y', c.y1);
  },

  'n': (text, c) => {
    text.attr('dy', '-0.35em').attr('x', (c.x2 - c.x1) / 2 + c.x1).attr('y', c.y2);
  },

  'ne': (text, c) => {
    text.attr('dy', '-0.35em').attr('x', c.x2).attr('y', c.y2);
  },

  'w': (text, c) => {
    text.attr('dy', '0.35em').attr('x', c.x1).attr('y', c.y1);
  },

  'e': (text, c) => {
    text.attr('dy', '0.35em').attr('x', c.x2).attr('y', c.y2);
  },

  'sw': (text, c) => {
    text.attr('dy', '1em').attr('x', c.x1).attr('y', c.y1);
  },

  's': (text, c) => {
    text.attr('dy', '1em').attr('x', (c.x2 - c.x1) / 2 + c.x1).attr('y', c.y2);
  },

  'se': (text, c) => {
    text.attr('dy', '1em').attr('x', c.x2).attr('y', c.y2);
  },
};

// A static line with an optional label.
export class ReferenceLine extends Extension {
  constructor(options) {
    super(options);

    this.lineData = [];
  }

  _initOptions(...options) {
    super._initOptions(...options, REF_LINE_DEFAULTS);
  }

  _update() {
    this.lineData = this.tryInvoke(this.opts.data, this.chart.data());

    if (!isArray(this.lineData) && isDefined(this.lineData)) {
      this.lineData = [this.lineData];
    }
    else if (!isDefined(this.lineData)) {
      this.lineData = [];
    }

    const lines = this.layer.selectAll(`.${this.opts.css}`).data(this.lineData);

    // Enter
    const enter = lines.enter().append('g').attr('class', this.opts.css);
    enter.append('text');
    enter.append('line');

    // Update + Enter
    const update = enter.merge(lines);
    update.select('line')
      .attr('x1', (d) => this.getProp('x1', d))
      .attr('x2', (d) => this.getProp('x2', d))
      .attr('y1', (d) => this.getProp('y1', d))
      .attr('y2', (d) => this.getProp('y2', d));

    update.select('text')
      .attr('text-anchor', this.opts.textAnchor)
      .text((d) => this.getProp('text', d))
      .each(this._placeLabel.bind(this));

    // Exit
    lines.exit().remove();
  }

  _placeLabel(d, i, nodes) {
    const text = d3.select(nodes[i]);
    const labelPlacement = this.tryInvoke(this.opts.labelPlacement, d, i, nodes);
    const placement = LABEL_PLACEMENT[labelPlacement];
    const coords = {
      x1: this.getProp('x1', d),
      x2: this.getProp('x2', d),
      y1: this.getProp('y1', d),
      y2: this.getProp('y2', d),
    };

    placement.call(this, text, coords);
  }
}
