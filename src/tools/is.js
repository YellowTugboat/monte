export const undef = void 0;

export function isNumeric(v) {
  return typeof v === 'number' && isFinite(v);
}

export function isString(v) {
  return typeof v === 'string';
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

export function isDefined(v) {
  return v !== null && v !== undef;
}
