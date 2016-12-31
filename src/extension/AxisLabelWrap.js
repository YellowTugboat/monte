import { Extension } from './Extension';
import { ReplacePreceding } from '../tools/mergeOptions';
import { noop } from '../tools';

const AXIS_LABEL_DEFAULTS = {
  binding: new ReplacePreceding(['axisRendered']),
  layer: 'support',
  eventPrefix: 'axislabelwrap',
  axis: 'x',
  labelCustomize: noop,
  lineHeightEm: 1.1,
  maxWidth: Number.POSITIVE_INFINITY,
};

export class AxisLabelWrap extends Extension {
  _initOptions(...options) {
    super._initOptions(...options, AXIS_LABEL_DEFAULTS);
  }

  _update() {
    const axis = this.tryInvoke(this.opts.axis);
    const lineHeightEm = +this.tryInvoke(this.opts.lineHeightEm);
    const maxWidth = this.tryInvoke(this.opts.maxWidth);
    const lbls = this.layer.selectAll(`.${axis}-axis.axis .tick text`);

    this.layer.select(`.${axis}-axis`).transition()
      .on('end', () => {
        lbls.call(wrap, maxWidth, lineHeightEm)
          .call((...args) => this.tryInvoke(this.opts.labelCustomize, ...args));
      });
  }
}

// Based on Mike Bostock's example at: https://bl.ocks.org/mbostock/7555321
function wrap(text, width, lineHeightEm) {
  text.each(function() {
    const text = d3.select(this);
    const words = text.text().split(/\s+/).reverse();
    const y = text.attr('y');
    const dy = parseFloat(text.attr('dy'));
    let line = [];
    let tspan = text.text(null).append('tspan').attr('x', 0).attr('y', y).attr('dy', dy + 'em');
    let lineNumber = 0;
    let word = words.pop();

    while (word) {
      line.push(word);
      tspan.text(line.join(' '));

      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(' '));
        line = [word];

        ++lineNumber;
        tspan = text.append('tspan')
          .attr('x', 0)
          .attr('y', y)
          .attr('dy', lineNumber * lineHeightEm + dy + 'em')
          .text(word);
      }

      word = words.pop();
    }
  });
}
