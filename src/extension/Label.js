import { isDefined, isNumeric, noop } from '../tools';
import { Extension } from './Extension';

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
  maxWidth: Number.POSITIVE_INFINITY,
};

export class Label extends Extension {
  _initOptions(...options) {
    super._initOptions(...options, LABEL_DEFAULTS);
  }

  _update() {
    const labelCss = this.tryInvoke(this.opts.labelCss);
    const text = this.tryInvoke(this.opts.text);
    const maxWidth = +this.tryInvoke(this.opts.maxWidth);

    const lbl = this._extCreateSelection().data([text]);

    lbl.enter().append('text')
      .call(this._setExtAttrs.bind(this))
      .attr('class', labelCss)
      .merge(lbl)
        .html((d) => d)
        .attr('text-anchor', this.tryInvoke(this.opts.anchor))
        .call((lblSel) => this._checkMaxWidth(lblSel, maxWidth))
        .attr('x', this.tryInvoke(this.opts.x))
        .attr('y', this.tryInvoke(this.opts.y))
        .attr('dx', this.tryInvoke(this.opts.dx))
        .attr('dy', this.tryInvoke(this.opts.dy))
        .call((...args) => this.tryInvoke(this.opts.labelCustomize, ...args));

    lbl.exit().remove();
  }

  _checkMaxWidth(lblSel, maxWidth) {
    if (isNumeric(maxWidth) && maxWidth > 0) {
      const el = lblSel.node();
      const currentWidth = el.getBBox().width;

      if (currentWidth > maxWidth) {
        const currentFontSize = getFontSize(el);
        const newFontSize = currentFontSize * maxWidth / currentWidth;

        // Store original font size to be potentially restored later.
        if (!this.origFontSize) { this.origFontSize = currentFontSize; }

        lblSel.style('font-size', newFontSize + 'px');
      }
      else if (isDefined(this.origFontSize) && currentWidth < maxWidth) {
        // The font size has been changed and no longer needs to be scaled down
        const currentFontSize = getFontSize(el);
        const newFontSize = currentFontSize * maxWidth / currentWidth;

        if (newFontSize > this.origFontSize) {
          // New font would be larger than the original, don't grow but use restore original font size
          lblSel.style('font-size', this.origFontSize + 'px');
        }
        else {
          // Use new intermediate font size
          lblSel.style('font-size', newFontSize + 'px');
        }
      }
    }
  }
}

function getFontSize(el) {
  const style = window.getComputedStyle(el, null);
  return parseFloat(style.getPropertyValue('font-size'), 10);
}
