export function isNumeric(v) {
  return typeof v === 'number' &&
    isFinite(v);
}

export function isFunc(v) {
  return typeof v === 'function';
}

export function isObject(v) {
  return v !== null && typeof v === 'object';
}

export function isArray(v) {
  return Array.isArray(v);
}
