import { Extension } from './Extension';
// import { mergeOptions } from '../tools/mergeOptions';

const FRAME_DEFAULTS = {
  frameLineCss: 'monte-frame-line',
  // layer: 'bg',
  // binding: ['rendered', 'updateBounds'],
  edges: ['top', 'right', 'bottom', 'left'],
  alignmentShift: 0.5, // Use a slight shift to match default d3-axis drawing.
};

// BG Frame (drawn by edges) and observes the "Margin Convention".
export class Frame extends Extension {
  _initOptions(...options) {
    super._initOptions(...options, FRAME_DEFAULTS);
  }

  _shouldOptionUpdate(prop) {
    return prop === 'edges' || prop === 'alignmentShift';
  }

  clear() {
    // Remove all elements
    const layer = this.cachedChart[this.opts.layer];
    const css = this.opts.frameLineCss;
    const edges = layer.selectAll(`.${css}`);
    edges.remove();
  }

  _update(binding, chart) {
    const layer = chart[this.opts.layer];
    const css = this.opts.frameLineCss;
    const edges = layer.selectAll(`.${css}`).data(this.opts.edges).order();
    const shift = this.opts.alignmentShift;
    const coords = {
      top: [[0 + shift, 0 + shift], [chart.width + shift, 0 + shift]],
      right: [[chart.width + shift, 0 + shift], [chart.width + shift, chart.height + shift]],
      bottom: [[0 + shift, chart.height + shift], [chart.width + shift, chart.height + shift]],
      left: [[0 + shift, 0 + shift], [0 + shift, chart.height + shift]],
    };

    edges.enter().append('line')
        .attr('class', css)
        .attr('x1', (d) => coords[d][0][0])
        .attr('y1', (d) => coords[d][0][1])
        .attr('x2', (d) => coords[d][1][0])
        .attr('y2', (d) => coords[d][1][1]);

    edges.transition()
      .duration(chart.option('transitionDuration'))
      .attr('x1', (d) => coords[d][0][0])
      .attr('y1', (d) => coords[d][0][1])
      .attr('x2', (d) => coords[d][1][0])
      .attr('y2', (d) => coords[d][1][1]);

    edges.exit().remove();
  }
}
