import { Extension } from './Extension';
import { TAU } from '../const/math';
import { areCoterminalAngles } from '../util/polar';

const POLAR_TICKS_DEFAULTS = {
  eventPrefix: 'polarticks',
  startAngle: 0,
  endAngle: TAU,
  tickInterval: 1/8 * TAU, // 8 ticks, one every 45 deg
  innerRadius: 0,
  outerRadius: 100,
  tickCss: 'monte-ext-polar-tick',
  suppressEnd: false,
};

export class PolarTicks extends Extension {
  _initOptions(...options) {
    super._initOptions(...options, POLAR_TICKS_DEFAULTS);

    const innerRadius = this.tryInvoke(this.opts.innerRadius);
    const outerRadius = this.tryInvoke(this.opts.outerRadius);
    this.innerArc = d3.arc().innerRadius(innerRadius).outerRadius(innerRadius);
    this.outerArc = d3.arc().innerRadius(outerRadius).outerRadius(outerRadius);
  }

  _update() {
    const data = [];
    const startAngle = this.tryInvoke(this.opts.startAngle);
    const endAngle = this.tryInvoke(this.opts.endAngle);
    const tickInterval = this.tryInvoke(this.opts.tickInterval);
    const suppressEnd = this.tryInvoke(this.opts.suppressEnd);
    const tickCss = this.tryInvoke(this.opts.tickCss);

    let tickCount = Math.abs(endAngle - startAngle) / tickInterval;

    // Include every tick, within the arc unless they would overlap at the start and end (such as
    // start (0) and end of a circle (2Pi)).
    if (!suppressEnd && !areCoterminalAngles(startAngle, endAngle)) {
      tickCount++;
    }

    for (let i = 0; i < tickCount; i++) {
      const angle = startAngle + (i * tickInterval);

      // Create data structure that `arc` handles.
      data.push({
        startAngle: angle,
        endAngle: angle,
        value: i,
      });
    }

    const ticks = this._extCreateSelection().data(data);

    ticks.enter().append('line')
      .call(this._setExtAttrs.bind(this))
      .merge(ticks)
        .attr('class', tickCss)
        .attr('x1', (d) => this.innerArc.centroid(d)[0])
        .attr('y1', (d) => this.innerArc.centroid(d)[1])
        .attr('x2', (d) => this.outerArc.centroid(d)[0])
        .attr('y2', (d) => this.outerArc.centroid(d)[1]);

    ticks.exit().remove();
  }
}
