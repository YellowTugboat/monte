// import isFunc from '../tools/is';

export function axisNoTicks(axis) {
  axis.tickSize(0);
  return axis;
}

export function axisWholeNumberFormat(axis) {
  axis.tickFormat(d3.format(',.0f'));
  return axis;
}
