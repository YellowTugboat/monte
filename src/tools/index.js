import { isArray, isFunc, isNumeric, isObject } from './is';
import { compose } from './compose';
import { mergeOptions } from './mergeOptions';
import { noop } from './noop';
import { resetScaleDomain } from './resetScaleDomain';
// export { readTransforms } from './transform';

export const tools = {
  compose,
  isNumeric, isObject, isArray, isFunc,
  mergeOptions,
  noop,
  resetScaleDomain,
  //readTransforms,
};
