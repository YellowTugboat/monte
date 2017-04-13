import { UNDEF } from '../const/undef';
import { noop } from './noop';

export function isNumeric(v) {
  return typeof v === 'number' && isFinite(v);
}

export function isNumberLike(v) {
  return isNumeric(v) || (isString(v) && isNumeric(+v));
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
  return v !== null && typeof v === 'object' && !isArray(v);
}

export function isArray(v) {
  return Array.isArray(v);
}

export function isDefined(v) {
  return v !== null && v !== UNDEF;
}

export function isFuncDefined(v) {
  return isDefined(v) && isFunc(v) && !isNoop(v);
}
