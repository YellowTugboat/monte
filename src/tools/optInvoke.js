import { isFunc } from './is';

// Attempts to invoke a value as a function if a
export default function optInvoke(value, that, ...args) {
  return isFunc(value) ? value.call(that, ...args) : value;
}
