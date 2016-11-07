export function arcSimpleTween(arc, from, to) {
  const i = d3.interpolate(from, to);

  return (t) => arc(i(t));
}
