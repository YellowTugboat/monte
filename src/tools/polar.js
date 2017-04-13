import { HALF_PI, PI, TAU } from '../const/math';

// https://sites.google.com/site/mymathclassroom/testing-if-two-angles-are-coterminal
export function areCoterminalAngles(a1, a2) {
  const n = (a1 - a2) / TAU;

  // Angles are coterminal if n is an integer; otherwise not.
  return Number.isInteger(n);
}

// Placement on an arc given an radius and angle, (cos(a) * r, sin(a) * r)
export function getPolarCoord(radius, angle) {
  // In d3-shape the arc `centroid` function uses a 1/2 PI adjustment to account for the starting
  // angle differences between SVG (top) vs traditional polar coordinates (right). The adjustment
  // is repeated here for coordinate consistency.
  const a = angle - HALF_PI;
  return [Math.cos(a) * radius, Math.sin(a) * radius];
}

// * conversion between Radians (rad) and Degrees (deg)
//    -- Also add support for CSS values like `turn` and `grad` (gradians)???

export function degreesToRadians(deg) {
  // radians = degrees * (pi/180)
  return deg * (PI / 180);
}

export function radiansToDegrees(rad) {
  // degrees = radians * (180/pi)
  return rad * (180 / PI);
}

export function arcBisect(startAngle, endAngle) {
  return (startAngle + endAngle) / 2;
}

// Like `arcBisect`, but takes a datum with the fields of `startAngle` and `endAngle`.
export function wedgeBisect(d) {
  return arcBisect(d.startAngle, d.endAngle);
}
