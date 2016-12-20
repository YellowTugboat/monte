import { getPolarCoord } from '../tools/polar';

// Arc is a `d3.arc()` object.
// Expects `from` and `to` to be `{ startAngle: <number>, endAngle: <number> }`
export function arcSimpleTween(arc, from, to) {
  const i = d3.interpolate(from, to);

  return (t) => arc(i(t));
}

// Expects `from` and `to` to be `{ angle: <number>, radius: <number>, rotate: <number> }`
export function arcLabelTween(from, to, defaultRadius = 0) {
  if (!from) {
    from = { angle: 0, radius: defaultRadius, rotate: 0 };
  }
  const i = d3.interpolateObject(from, to);

  return function(t) {
    const v = i(t);
    const coord = getPolarCoord(v.radius, v.angle);
    const rotate = v.rotate || 0;

    return `translate(${coord}) rotate(${rotate})`;
  };
}
