export function readTransforms(t) {
  const transformSplit = /(.*?\(.*?\))/;
  const transformRules = t.split(transformSplit).filter((v) => !!v);

  const transforms = {};
  const transformPattern = /(.*?)\((.*?)\)\s*/;

  transformRules.forEach((rule) => {
    const matches = transformPattern.exec(rule.trim());

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
  });

  return transforms;
}

export function combineTransforms(transformObj) {
  let transformStr = '';

  for (const t in transformObj) {
    if (transformObj.hasOwnProperty(t)) {
      const values = transformObj[t].join(', ');
      transformStr += `${t}(${values})`;
    }
  }

  return transformStr;
}
