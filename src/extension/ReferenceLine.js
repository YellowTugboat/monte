import { Extension } from './Extension';
import { isArray } from '../tools/is';
import { noop } from '../tools/noop';

const REF_LINE_DEFAULTS = {
  css: 'monte-ref-line-grp',
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
  'nw': (text, d) => {
    text.attr('dy', '-0.35em').attr('x', d.x1).attr('y', d.y1);
  },

  'n': (text, d) => {
    text.attr('dy', '-0.35em').attr('x', (d.x2 - d.x1) / 2 + d.x1).attr('y', d.y2);
  },

  'ne': (text, d) => {
    text.attr('dy', '-0.35em').attr('x', d.x2).attr('y', d.y2);
  },

  'w': (text, d) => {
    text.attr('dy', '0.35em').attr('x', d.x1).attr('y', d.y1);
  },

  'e': (text, d) => {
    text.attr('dy', '0.35em').attr('x', d.x2).attr('y', d.y2);
  },

  'sw': (text, d) => {
    text.attr('dy', '1em').attr('x', d.x1).attr('y', d.y1);
  },

  's': (text, d) => {
    text.attr('dy', '1em').attr('x', (d.x2 - d.x1) / 2 + d.x1).attr('y', d.y2);
  },

  'se': (text, d) => {
    text.attr('dy', '1em').attr('x', d.x2).attr('y', d.y2);
  },
};

// A static line with an optional label.
export class ReferenceLine extends Extension {
  _initOptions(...options) {
    super._initOptions(...options, REF_LINE_DEFAULTS);
  }

  _update() {
    let lineData = this.optInvoke(this.opts.data, this.chart.data());

    if (!isArray(lineData)) { lineData = [lineData]; }

    const lines = this.layer.selectAll(`.${this.opts.css}`).data(lineData);

    // Enter
    const enter = lines.enter().append('g').attr('class', this.opts.css);
    enter.append('text');
    enter.append('line');

    // Update + Enter
    const update = enter.merge(lines);
    update.select('line')
      .attr('x1', (d) => d[this.opts.x1Prop])
      .attr('x2', (d) => d[this.opts.x2Prop])
      .attr('y1', (d) => d[this.opts.y1Prop])
      .attr('y2', (d) => d[this.opts.y2Prop]);

    update.select('text')
      .attr('text-anchor', this.opts.textAnchor)
      .text((d) => d[this.opts.textProp])
      .each(this._placeLabel.bind(this));

    // Exit
    lines.exit().remove();
  }

  _placeLabel(d, i, nodes) {
    const text = d3.select(nodes[i]);
    const placement = LABEL_PLACEMENT[this.opts.labelPlacement];
    placement(text, d);
  }
}
