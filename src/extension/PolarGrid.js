import { Extension } from './Extension';
import { tau } from '../const/math';

const POLAR_GRID_DEFAULTS = {
  startAngle: 0,
  endAngle: tau,
  ringRadii: [100],
  ringCss: 'monte-polar-ring',
  ringSpecificCss: null,
  ringSort: (a, b) => b - a,
};

export class PolarGrid extends Extension {
  _initOptions(...options) {
    super._initOptions(...options, POLAR_GRID_DEFAULTS);
  }

  _update(binding, polarChart) {
    const layer = polarChart[this.opts.layer];
    const data = this.opts.ringRadii.sort(this.opts.ringSort);
    const rings = layer.selectAll(`.${this.opts.ringCss}`).data(data);

    rings.enter().append('circle')
      .merge(rings)
        .attr('class', this.opts.ringCss)
        .attr('r', (d) => d);
  }
}
