import { Extension } from './Extension';
import { PolarTicks as PolarTicksDraw } from '../util/polarTicks';
import { tau } from '../const/math';

const POLAR_TICKS_DEFAULTS = {
  startAngle: 0,
  endAngle: tau,
  tickInterval: 1/8 * tau, // 8 ticks, one every 45 deg
  innerRadius: 0,
  outerRadius: 100,
  tickCss: 'monte-polar-tick',
};

export class PolarTicks extends Extension {
  _initOptions(...options) {
    super._initOptions(...options, POLAR_TICKS_DEFAULTS);
  }

  _update(binding, polarChart) {
    if (!this.polarTicksDraw) {
      this.polarTicksDraw = new PolarTicksDraw(this.opts);
    }

    const layer = polarChart[this.opts.layer];
    this.polarTicksDraw.update(layer);
  }
}
