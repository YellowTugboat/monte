export function readTransforms(t) {
  const transformPattern = /(.*?)\((.*?)\)\s*/g;
  const matches = transformPattern.exec(t);
  let transforms = {};

  if (matches) {
    for (let i = 1; i < matches.length; i += 2) {
      const k = matches[i];
      let v = matches[i+1].trim();

      if (v.indexOf(' ') > -1 || v.indexOf(',') > -1) {
        v = v.split(/,\s*|\s+/);
      }

      transforms[k] = v;
    }
  }

  return transforms;
}
