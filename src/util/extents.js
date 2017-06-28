// Create an extent that begins at zero and extends to the max value.
export function extentFromZero(extent) {
  return [0, extent[1]];
}

// Create an extent that chooses the maximum using absolute value and
export function extentBalanced(extent) {
  const min = extent[0];
  const max = extent[1];

  if (min >= 0) {
    return [0, max];
  }
  else if (min < 0 && max < 0) {
    return [min, 0];
  }

  const absMin = Math.abs(min);
  const absMax = Math.abs(max);
  const extreme = absMax > absMin ? absMax : absMin;

  return [-extreme, extreme];
}

// Create a fixed extent from zero to a given `max`.
export function extentGeneratorZeroToMax(max) {
  return function() {
    return [0, max];
  };
}

// Offset at each end of the extent by an absolute value.
export function extentGeneratorValueOffset(minOffset, maxOffset) {
  if (maxOffset == null) { maxOffset = minOffset; }

  return function(extent) {
    return [extent[0] - minOffset, extent[1] + maxOffset];
  };
}

// Offset by % of total value range.
export function extentGeneratorPercentOffset(percent) {
  return function(extent) {
    const adjust = Math.abs(extent[1] - extent[0]) * percent;

    return [extent[0] - adjust, extent[1] + adjust];
  };
}
