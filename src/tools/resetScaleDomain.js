// Clears the domain of a given scale.
export function resetScaleDomain(scale) {
  if (scale && scale.domain) { scale.domain([]); }
}
