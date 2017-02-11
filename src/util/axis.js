import { mergeOptions } from '../tools/mergeOptions';

export function axisNoTicks(axis) {
  axis.tickSize(0);
  return axis;
}

export function axisWholeNumberFormat(axis) {
  axis.tickFormat(d3.format(',.0f'));
  return axis;
}

//--------------------------------------------------------------------------------------------------
//
//  Axis label placements
//
//--------------------------------------------------------------------------------------------------
const X_LABEL_DEFAULTS = {
  x: 0,
  y: 30,
  rotate: 0,
  textAnchor: 'middle',
};
export function axisXLabelGenerator(options) {
  const opts = mergeOptions(options, X_LABEL_DEFAULTS);

  // The `this` context is an `AxesChart`.
  return function(lbl) {
    const x = this.tryInvoke(opts.x);
    const y = this.tryInvoke(opts.y);
    const rotate = this.tryInvoke(opts.rotate);
    const textAnchor = this.tryInvoke(opts.textAnchor);

    lbl.attr('transform', `translate(${x}, ${y}), rotate(${rotate})`)
      .style('text-anchor', textAnchor);
  };
}

export function axisXLabelStart(lbl) {
  lbl.attr('transform', 'translate(0, 30)').style('text-anchor', 'start');
}

export function axisXLabelCenter(lbl) {
  const w = this.width || 0;
  lbl.attr('transform', `translate(${w/2}, 30)`).style('text-anchor', 'middle');
}
export { axisXLabelCenter as axisXLabelMiddle };

export function axisXLabelEnd(lbl) {
  const w = this.width || 0;
  lbl.attr('transform', `translate(${w}, 30)`).style('text-anchor', 'end');
}

const Y_LABEL_DEFAULTS = {
  x: -30,
  y: function(w, h) { return h / 2; },
  rotate: -90,
  textAnchor: 'middle',
};
export function axisYLabelGenerator(options) {
  const opts = mergeOptions(options, Y_LABEL_DEFAULTS);

  // The `this` context is an `AxesChart`.
  return function(lbl) {
    const x = this.tryInvoke(opts.x, this.width, this.height);
    const y = this.tryInvoke(opts.y, this.width, this.height);
    const rotate = this.tryInvoke(opts.rotate);
    const textAnchor = this.tryInvoke(opts.textAnchor);

    lbl.attr('transform', `translate(${x}, ${y}), rotate(${rotate})`)
      .style('text-anchor', textAnchor);
  };
}
export function axisYLabelStart(lbl) {
  const h = this.height || 0;
  lbl.attr('transform', `translate(-30, ${h}), rotate(-90)`).style('text-anchor', 'start');
}

export function axisYLabelCenter(lbl) {
  const h = this.height || 0;
  lbl.attr('transform', `translate(-30, ${h / 2}), rotate(-90)`).style('text-anchor', 'middle');
}
export { axisYLabelCenter as axisYLabelMiddle };

export function axisYLabelEnd(lbl) {
  lbl.attr('transform', 'translate(-30, 0), rotate(-90)').style('text-anchor', 'end');
}
