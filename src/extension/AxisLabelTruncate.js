import { Extension } from './Extension';
import { ReplacePreceding } from '../tools/mergeOptions';
import { noop } from '../tools';

const AXIS_LABEL_DEFAULTS = {
  binding: new ReplacePreceding(['axisRendered']),
  layer: 'support',
  eventPrefix: 'axislabeltrunc',
  axis: 'x',
  labelCustomize: noop,
  maxWidth: Number.POSITIVE_INFINITY,
  indicator: '...',
};

export class AxisLabelTruncate extends Extension {
  _initOptions(...options) {
    super._initOptions(...options, AXIS_LABEL_DEFAULTS);
  }

  _update() {
    const axis = this.tryInvoke(this.opts.axis);
    const indicator = this.tryInvoke(this.opts.indicator);
    const maxWidth = this.tryInvoke(this.opts.maxWidth);
    const lbls = this.layer.selectAll(`.${axis}-axis.axis .tick text`);

    this.layer.select(`.${axis}-axis`).transition()
      .on('end', () => {
        lbls.call(limit, maxWidth, indicator)
          .call((...args) => this.tryInvoke(this.opts.labelCustomize, ...args));
      });
  }
}

// Based on Mike Bostock's wrapping example at: https://bl.ocks.org/mbostock/7555321
function limit(text, width, indicator) {
  text.each(function() {
    const textSel = d3.select(this);
    const node = textSel.node();
    const w = width < 1 ? 1 : width;
    const origText = textSel.text();
    let text = textSel.text();
    let wasTruncated = false;

    while (node.getComputedTextLength() > w) {
      text = text.slice(0, -1);
      textSel.text(text + indicator);
      wasTruncated = true;
    }

    // Set the original text as the "title" attribute on the axis text element.
    if (wasTruncated) {
      textSel.append('title').text(origText);
    }
  });
}
