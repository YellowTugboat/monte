import { Extension } from './Extension';
import { TAU } from '../const/math';
import { arcSimpleTween } from '../util/tween';
import { isDefined } from '../tools/is';

const ARC_DEFAULTS = {
  eventPrefix: 'arc',
  startAngle: 0,
  endAngle: TAU,
  arcCss: 'monte-ext-arc',
  innerRadius: 0,
  outerRadius: 100,
  cornerRadius: 0,
};

export class Arc extends Extension {
  _initOptions(...options) {
    super._initOptions(...options, ARC_DEFAULTS);

    this.arc = d3.arc()
      .innerRadius(this.tryInvoke(this.opts.innerRadius))
      .outerRadius(this.tryInvoke(this.opts.outerRadius))
      .cornerRadius(this.tryInvoke(this.opts.cornerRadius));
  }

  _update() {
    const css = this.tryInvoke(this.opts.arcCss);
    const startAngle = this.tryInvoke(this.opts.startAngle);
    const endAngle = this.tryInvoke(this.opts.endAngle);
    const arcAngles = (isDefined(startAngle) && isDefined(endAngle)) ? {
      startAngle: startAngle,
      endAngle: endAngle,
    } : {
      startAngle: isDefined(startAngle) ? startAngle : endAngle,
      endAngle: isDefined(startAngle) ? startAngle : endAngle,
    };

    const segment = this.layer.selectAll(`.${css}`).data([arcAngles]);
    const duration = this.tryInvoke(this.chart.opts.transitionDuration);
    const ease = this.chart.opts.ease;
    segment.enter().append('path')
      .attr('class', css)
      .attr('d', (d) => this.arc(d));

    segment.transition()
      .duration(duration)
      .ease(ease)
      .attrTween('d', (d) => arcSimpleTween(this.arc, this.prev, d))
      .on('end', (d) => this.prev = d);

    segment.exit()
      .transition()
        .duration(duration)
        .ease(ease)
        .style('opacity', 0.01)
        .remove();
  }
}
