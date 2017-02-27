// Constrain to smallest draw-area dimension
export function radiusContrain(width, height) {
  const wr = width / 2;
  const hr = height / 2;

  return wr < hr ? wr : hr;
}
