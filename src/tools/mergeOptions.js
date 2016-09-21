import { defaultsDeep } from '../external/lodash';

class OptionValueWrap {
  constructor(value) {
    this.value = value;
  }
}

export class ReplacePreceding extends OptionValueWrap {}

function unpack(checkValue) {
  return (checkValue instanceof OptionValueWrap) ?
    checkValue.value :
    checkValue;
}

function replaceCheck(checkValue) {
  let out = null;

  // Check arrays for values that clear proceeding values.
  if (Array.isArray(checkValue)) {
    let sliceIndex = -1;

    // Look from right to left.
    // _.forEachRight(checkValue, function(item, i) {
    for (let i = checkValue.length - 1; i >= 0; i--) {
      const item = checkValue[i];

      if (item instanceof ReplacePreceding) {
        sliceIndex = i;
        break;
      }
    }

    out = (sliceIndex !== -1) ?
      checkValue.slice(sliceIndex) :
      checkValue;

    for (let i = 0; i < out.length; i++) {
      out[i] = unpack(out[i]);
    }
  }

  // Unpack any wrapped values.
  else {
    out = unpack(checkValue);
  }

  return out;
}

export function mergeOptions(...options) {
  const opts = defaultsDeep({}, ...options);

  for (let prop in opts) {
    if (opts.hasOwnProperty(prop)) {
      opts[prop] = replaceCheck(opts[prop]);
    }
  }

  return opts;
}
