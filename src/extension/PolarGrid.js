import { Extension } from './Extension';
import { TAU } from '../const/math';
import { isDefined } from '../tools/is';

const POLAR_GRID_DEFAULTS = {
  eventPrefix: 'polargrid',
  startAngle: 0,
  endAngle: TAU,
  arcRadii: [100],
  arcCss: 'monte-ext-polar-grid-arc',
  arcSpecificCss: null,
  arcSort: (a, b) => b - a,
  arcDepth: 0,
  cornerRadius: 0,
};

/**
 * Creates a set of concentric arcs with the given `arcRadii` that start and end at `startAngle` and
 * `endAngle` respectively.
 */
export class PolarGrid extends Extension {
  _initOptions(...options) {
    super._initOptions(...options, POLAR_GRID_DEFAULTS);

    const arcDepth = this.tryInvoke(this.opts.arcDepth);
    this.arc = d3.arc()
      .innerRadius(function(d) { return d.radius; })
      .outerRadius(function(d) { return d.radius + arcDepth; })
      .cornerRadius(this.tryInvoke(this.opts.cornerRadius));
  }

  _update() {
    const radii = this.tryInvoke(this.opts.arcRadii);
    const data = radii.sort(this.opts.arcSort);
    const arcs = this._extCreateSelection().data(data);
    const startAngle = this.tryInvoke(this.opts.startAngle);
    const endAngle = this.tryInvoke(this.opts.endAngle);
    const arcAngles = (isDefined(startAngle) && isDefined(endAngle)) ? {
      startAngle: startAngle,
      endAngle: endAngle,
    } : {
      startAngle: isDefined(startAngle) ? startAngle : endAngle,
      endAngle: isDefined(startAngle) ? startAngle : endAngle,
    };

    arcs.enter().append('path')
      .call(this._setExtAttrs.bind(this))
      .merge(arcs)
        .attr('class', this.tryInvoke(this.opts.arcCss))
        .attr('d', (d) => {
          arcAngles.radius = d;
          return this.arc(arcAngles);
        });

    arcs.exit().remove();
  }
}
