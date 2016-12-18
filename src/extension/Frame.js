import { AXIS_SHIFT, UPDATE } from '../const/d3';
import { Extension } from './Extension';

const FRAME_DEFAULTS = {
  eventPrefix: 'frame',
  frameLineCss: 'monte-ext-frame-line',
  edges: ['top', 'right', 'bottom', 'left'],
  alignmentShift: AXIS_SHIFT, // Use a slight shift to match default d3-axis drawing.
};

// BG Frame (drawn by edges) and observes the "Margin Convention".
export class Frame extends Extension {
  _initOptions(...options) {
    super._initOptions(...options, FRAME_DEFAULTS);
  }

  _shouldOptionUpdate(prop) {
    return prop === 'edges' || prop === 'alignmentShift';
  }

  _update() {
    const chart = this.chart;
    const css = this.tryInvoke(this.opts.frameLineCss);
    const edgesToDraw = this.tryInvoke(this.opts.edges);
    const edges = this._extCreateSelection().data(edgesToDraw).order();
    const shift = this.tryInvoke(this.opts.alignmentShift);
    const coords = {
      top: [[0 + shift, 0 + shift], [chart.width + shift, 0 + shift]],
      right: [[chart.width + shift, 0 + shift], [chart.width + shift, chart.height + shift]],
      bottom: [[0 + shift, chart.height + shift], [chart.width + shift, chart.height + shift]],
      left: [[0 + shift, 0 + shift], [0 + shift, chart.height + shift]],
    };

    edges.enter().append('line')
        .call(this._setExtAttrs.bind(this))
        .attr('class', css)
        .attr('x1', (d) => coords[d][0][0])
        .attr('y1', (d) => coords[d][0][1])
        .attr('x2', (d) => coords[d][1][0])
        .attr('y2', (d) => coords[d][1][1]);

    edges.transition()
      .call(this.chart._transitionSetup('extFrame', UPDATE))
      .attr('x1', (d) => coords[d][0][0])
      .attr('y1', (d) => coords[d][0][1])
      .attr('x2', (d) => coords[d][1][0])
      .attr('y2', (d) => coords[d][1][1]);

    edges.exit().remove();
  }
}
