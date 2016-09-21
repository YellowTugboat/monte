import { mergeOptions } from '../tools/mergeOptions';
import { tau } from '../const/math';

const POLAR_TICKS_DEFAULTS = {
  startAngle: 0,
  endAngle: tau,
  tickInterval: 1/4 * tau, // Every 90deg
  innerRadius: 0,
  outerRadius: 100,
  tickCss: 'monte-polar-tick',
  includeEnd: true,
};

// https://sites.google.com/site/mymathclassroom/testing-if-two-angles-are-coterminal
function areCoterminalAngles(a1, a2) {
  const n = (a1 - a2) / tau;

  // Angles are coterminal if n is an integer; otherwise .
  return Number.isInteger(n);
}

export class PolarTicks {
  constructor(...options) {
    this.opts = mergeOptions(...options, POLAR_TICKS_DEFAULTS);

    this.innerArc = d3.arc().innerRadius(this.opts.innerRadius).outerRadius(this.opts.innerRadius);
    this.outerArc = d3.arc().innerRadius(this.opts.outerRadius).outerRadius(this.opts.outerRadius);
  }

  update(sel) {
    const data = [];
    let tickCount = Math.abs(this.opts.endAngle - this.opts.startAngle) / this.opts.tickInterval;

    // Include every tick, within the arc unless they would overlap at the start and end (such as
    // start (0) and end of a circle (2Pi)).
    if (this.opts.includeEnd && !areCoterminalAngles(this.opts.startAngle, this.opts.endAngle)) {
      tickCount++;
    }

    for (let i = 0; i < tickCount; i++) {
      const angle = this.opts.startAngle + (i * this.opts.tickInterval);

      // Create data structure that `arc` handles.
      data.push({
        startAngle: angle,
        endAngle: angle,
        value: i,
      });
    }

    const ticks = sel.selectAll(`.${this.opts.tickCss}`).data(data); // , (d, i) => d.startAngle);

    ticks.enter().append('line')
      .merge(ticks)
        .attr('class', this.opts.tickCss)
        .attr('x1', (d) => this.innerArc.centroid(d)[0])
        .attr('y1', (d) => this.innerArc.centroid(d)[1])
        .attr('x2', (d) => this.outerArc.centroid(d)[0])
        .attr('y2', (d) => this.outerArc.centroid(d)[1]);

    ticks.exit().remove();
  }
}
