export function resetScaleDomain(scale) {
  if (scale && scale.domain) { scale.domain([]); }
}
