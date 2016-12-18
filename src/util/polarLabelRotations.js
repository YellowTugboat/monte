import { HALF_PI, PI } from '../const/math';
import { isNumeric } from '../tools/is';

function getDatum(d) {
  return (isNumeric(+d)) ? { startAngle: d, endAngle: d } : d;
}


//
//
// Base Rotations
//
//
function baseLabelRotateTangentOrigin(angle) {
  // const datum = getDatum(d);
  // const angle = datum.endAngle; // ((datum.endAngle - datum.startAngle) / 2 + datum.startAngle);

  return angle;
}

function baseLabelRotateTangentFlip(angle) {
  // const datum = getDatum(d);
  // let angle = datum.endAngle; // ((datum.endAngle - datum.startAngle) / 2 + datum.startAngle);

  const absAngle = Math.abs(angle);
  if (absAngle > HALF_PI && absAngle <= 3 * HALF_PI) {
    angle -= PI;
  }

  return angle;
}

function baseLabelRotateRay(angle) {
  // const datum = getDatum(d);
  // const angle = datum.endAngle; // ((datum.endAngle - d.startAngle) / 2 + datum.startAngle) - HALF_PI;

  return angle;
}

function baseLabelRotateRayOpposite(angle) {
  // const datum = getDatum(d);
  // const angle = datum.endAngle; // ((datum.endAngle - d.startAngle) / 2 + datum.startAngle) - HALF_PI - PI;

  return angle;
}

function baseLabelRotateRayFlip(angle) {
  // const datum = getDatum(d);
  // const angle = datum.endAngle; // ((datum.endAngle - datum.startAngle) / 2 + datum.startAngle);

  if ((angle <= 0 && angle >= -PI) || angle > PI) { // Right side of circle
    return angle + HALF_PI;
  }
  else if ((angle > 0 && angle <= PI) || angle < -PI) { // Left side of circle
    return angle - HALF_PI;
  }

  return angle;
}

function baseLabelRotateNone() {
  return 0;
}

//
//
// Gauge Chart Rotations
//
//
// TODO: Add `css` to all rotations
export function polarLabelRotateTangentOrigin(d) {
  const datum = getDatum(d);
  const angle = ((datum.endAngle - datum.startAngle) / 2 + datum.startAngle);

  return baseLabelRotateTangentOrigin(angle);
}

export function polarLabelRotateTangentFlip(d) {
  const datum = getDatum(d);
  let angle = ((datum.endAngle - datum.startAngle) / 2 + datum.startAngle);

  // const absAngle = Math.abs(angle);
  // if (absAngle > HALF_PI && absAngle <= 3 * HALF_PI) {
  //   angle -= PI;
  // }

  return baseLabelRotateTangentFlip(angle);
}

export function polarLabelRotateRay(d) {
  const datum = getDatum(d);
  const angle = ((datum.endAngle - d.startAngle) / 2 + datum.startAngle) - HALF_PI;

  return baseLabelRotateRay(angle);
}

export function polarLabelRotateRayOpposite(d) {
  const datum = getDatum(d);
  const angle = ((datum.endAngle - d.startAngle) / 2 + datum.startAngle) - HALF_PI - PI;

  return baseLabelRotateRayOpposite(angle);
}

export function polarLabelRotateRayFlip(d) {
  const datum = getDatum(d);
  const angle = ((datum.endAngle - datum.startAngle) / 2 + datum.startAngle);

  // if ((angle <= 0 && angle >= -PI) || angle > PI) { // Right side of circle
  //   return angle + HALF_PI;
  // }
  // else if ((angle > 0 && angle <= PI) || angle < -PI) { // Left side of circle
  //   return angle - HALF_PI;
  // }

  return baseLabelRotateRayFlip(angle);
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
  const datum = getDatum(d);
  const angle = datum.endAngle; // ((datum.endAngle - datum.startAngle) / 2 + datum.startAngle);

  return baseLabelRotateTangentOrigin(angle);
}

export function gaugeLabelRotateTangentFlip(d) {
  const datum = getDatum(d);
  let angle = datum.endAngle; // ((datum.endAngle - datum.startAngle) / 2 + datum.startAngle);

  // const absAngle = Math.abs(angle);
  // if (absAngle > HALF_PI && absAngle <= 3 * HALF_PI) {
  //   angle -= PI;
  // }

  return baseLabelRotateTangentFlip(angle);
}

export function gaugeLabelRotateRay(d) {
  const datum = getDatum(d);
  const angle = datum.endAngle; // ((datum.endAngle - d.startAngle) / 2 + datum.startAngle) - HALF_PI;

  return baseLabelRotateRay(angle);
}

export function gaugeLabelRotateRayOpposite(d) {
  const datum = getDatum(d);
  const angle = datum.endAngle; // ((datum.endAngle - d.startAngle) / 2 + datum.startAngle) - HALF_PI - PI;

  return baseLabelRotateRayOpposite(angle);
}

export function gaugeLabelRotateRayFlip(d) {
  const datum = getDatum(d);
  const angle = datum.endAngle; // ((datum.endAngle - datum.startAngle) / 2 + datum.startAngle);

  // if ((angle <= 0 && angle >= -PI) || angle > PI) { // Right side of circle
  //   return angle + HALF_PI;
  // }
  // else if ((angle > 0 && angle <= PI) || angle < -PI) { // Left side of circle
  //   return angle - HALF_PI;
  // }

  return baseLabelRotateRayFlip(angle);
}

export function gaugeLabelRotateNone() {
  return baseLabelRotateNone();
}
