export const undef = void 0;
import { noop } from './noop';

export function isNumeric(v) {
  return typeof v === 'number' && isFinite(v);
}

export function isString(v) {
  return typeof v === 'string';
}

export function isFunc(v) {
  return typeof v === 'function';
}

export function isNoop(v) {
  return v === noop;
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

export function isFuncDefined(v) {
  return isDefined(v) && isFunc(v) && !isNoop;
}
