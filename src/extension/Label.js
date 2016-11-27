import { Extension } from './Extension';
import { noop } from '../tools/noop';

const LABEL_DEFAULTS = {
  eventPrefix: 'label',
  labelCss: 'monte-ext-label',
  text: '',
  x: 0,
  y: 0,
  dy: '0.35em',
  dx: 0,
  anchor: 'start',
  labelCustomize: noop,
};

export class Label extends Extension {
  _initOptions(...options) {
    super._initOptions(...options, LABEL_DEFAULTS);
  }

  _update() {
    const labelCss = this.tryInvoke(this.opts.labelCss);
    const text = this.tryInvoke(this.opts.text);

    const lbl = this._extCreateSelection().data([text]);

    lbl.enter().append('text')
      .call(this._setExtAttrs.bind(this))
      .attr('class', labelCss)
      .merge(lbl)
        .attr('x', this.tryInvoke(this.opts.x))
        .attr('y', this.tryInvoke(this.opts.y))
        .attr('dx', this.tryInvoke(this.opts.dx))
        .attr('dy', this.tryInvoke(this.opts.dy))
        .attr('text-anchor', this.tryInvoke(this.opts.anchor))
        .text((d) => d)
        .call((...args) => this.tryInvoke(this.opts.labelCustomize, ...args));

    lbl.exit().remove();
  }
}
