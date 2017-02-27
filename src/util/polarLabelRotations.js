import { HALF_PI, PI } from '../const/math';
import { isNumeric } from '../tools/is';
import { wedgeBisect } from '../tools/polar';

// Return the datum if it is an object, but if the value is a number (or coercible to a number) than
// create a new object with the expected `startAngle` and `endAngle` properties.
function getDatum(d) {
  return (isNumeric(+d)) ? { startAngle: d, endAngle: d } : d;
}


//
//
// Base Rotations
//
//
function baseLabelRotateTangentOrigin(angle) { return angle; }

function baseLabelRotateTangentFlip(angle) {
  const absAngle = Math.abs(angle);

  if (absAngle > HALF_PI && absAngle <= 3 * HALF_PI) {
    angle -= PI;
  }

  return angle;
}

function baseLabelRotateRay(angle) { return angle - HALF_PI; }
function baseLabelRotateRayOpposite(angle) { return angle - HALF_PI - PI; }

function baseLabelRotateRayFlip(angle) {
  if ((angle <= 0 && angle >= -PI) || angle > PI) { // Right side of circle
    return angle + HALF_PI;
  }
  else if ((angle > 0 && angle <= PI) || angle < -PI) { // Left side of circle
    return angle - HALF_PI;
  }

  return angle;
}

function baseLabelRotateNone() { return 0; }

//
//
// Polar Chart Rotations
//
//
// TODO: Add `css` to all rotations
export function polarLabelRotateTangentOrigin(d) {
  return baseLabelRotateTangentOrigin(wedgeBisect(getDatum(d)));
}

export function polarLabelRotateTangentFlip(d) {
  return baseLabelRotateTangentFlip(wedgeBisect(getDatum(d)));
}

export function polarLabelRotateRay(d) {
  return baseLabelRotateRay(wedgeBisect(getDatum(d)));
}

export function polarLabelRotateRayOpposite(d) {
  return baseLabelRotateRayOpposite(wedgeBisect(getDatum(d)));
}

export function polarLabelRotateRayFlip(d) {
  return baseLabelRotateRayFlip(wedgeBisect(getDatum(d)));
}

export function polarLabelRotateNone() {
  return baseLabelRotateNone();
}


//
//
// Gauge Chart Rotations
//
//
export function gaugeLabelRotateTangentOrigin(d) {
  return baseLabelRotateTangentOrigin(getDatum(d).endAngle);
}

export function gaugeLabelRotateTangentFlip(d) {
  return baseLabelRotateTangentFlip(getDatum(d).endAngle);
}

export function gaugeLabelRotateRay(d) {
  return baseLabelRotateRay(getDatum(d).endAngle);
}

export function gaugeLabelRotateRayOpposite(d) {
  return baseLabelRotateRayOpposite(getDatum(d).endAngle);
}

export function gaugeLabelRotateRayFlip(d) {
  return baseLabelRotateRayFlip(getDatum(d).endAngle);
}

export function gaugeLabelRotateNone() {
  return baseLabelRotateNone();
}
