import { MonteError } from '../support/MonteError';

function readStyleProp(style, prop) {
  const val = parseFloat(style.getPropertyValue(prop), 10);
  return isNaN(val) ? 0 : val;
}

function getStyle(el) {
  const s = window.getComputedStyle(el, null);

  return {
    rect: el.getBoundingClientRect(),
    style: s,
    pl: readStyleProp(s, 'padding-left'),
    pr: readStyleProp(s, 'padding-right'),
    pt: readStyleProp(s, 'padding-top'),
    pb: readStyleProp(s, 'padding-bottom'),
  };
}

export class Resizer {
  constructor(options) {
    this.opts = options || {};
  }

  option(prop, value) {
    this.opts[prop] = value;
  }

  resize() {
    throw MonteError.UnimplementedMethod('Resize', 'resize');
  }
}

export class HorizontalResizer extends Resizer {
  resize(chart) {
    const el = chart.bound.node().parentElement;
    const s = getStyle(el);

    chart.boundingRect(s.rect.width - s.pl - s.pr, chart.opts.boundingHeight);
  }
}

export class HorizontalRatioResizer extends Resizer {
  resize(chart) {
    const el = chart.bound.node().parentElement;
    const s = getStyle(el);
    const width = s.rect.width - s.pl - s.pr;
    const ratio = this.opts.ratio || 1;

    chart.boundingRect(width, width / ratio);
  }
}

export class AutoResizer extends Resizer {
  resize(chart) {
    const el = chart.bound.node().parentElement;
    const s = getStyle(el);

    chart.boundingRect(s.rect.width - s.pl - s.pr, s.rect.height - s.pt - s.pb);
  }
}

export class VerticalResizer extends Resizer {
  resize(chart) {
    const el = chart.bound.node().parentElement;
    const s = getStyle(el);

    chart.boundingRect(chart.opts.boundingHeight, s.rect.height - s.pt - s.pb);
  }
}
