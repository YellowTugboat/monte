import { Extension } from './Extension';
import { isDefined } from '../tools/is';

const POLAR_LINE_DEFAULTS = {
  eventPrefix: 'polarline',
  layer: 'overlay',
  angle: 0, // Straight up
  lineCss: 'monte-ext-polar-line',
  innerRadius: 0,
  outerRadius: 100,
};

export class PolarLine extends Extension {
  _initOptions(...options) {
    super._initOptions(...options, POLAR_LINE_DEFAULTS);

    this.innerArc = d3.arc().innerRadius(this.opts.innerRadius).outerRadius(this.opts.innerRadius);
    this.outerArc = d3.arc().innerRadius(this.opts.outerRadius).outerRadius(this.opts.outerRadius);
  }

  _update() {
    const css = this.tryInvoke(this.opts.lineCss);
    const angle = this.tryInvoke(this.opts.angle);
    const line = this.layer.selectAll(`.${css}`).data([{ startAngle: angle, endAngle: angle}]);
    const newLine = line.enter().append('line').attr('class', css);
    const duration = this.tryInvoke(this.chart.opts.transitionDuration);

    if (isDefined(angle)) {
      newLine.merge(line)
        .transition()
          .duration(duration)
          .attr('x1', (d) => this.innerArc.centroid(d)[0])
          .attr('y1', (d) => this.innerArc.centroid(d)[1])
          .attr('x2', (d) => this.outerArc.centroid(d)[0])
          .attr('y2', (d) => this.outerArc.centroid(d)[1]);
    }
    else {
      newLine.merge(line)
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', 0)
        .attr('y2', 0);
    }

    line.exit().remove();
  }
}
