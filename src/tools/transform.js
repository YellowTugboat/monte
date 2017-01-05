import { isArray, isDefined } from './is';

// Processes the transform string value from a DOM element and returns an object where the keys are
// the transform type and the value the transform value.
//
// TODO: Accept DOM elements and D3 selections?
export function readTransforms(t) {
  if (!isDefined(t)) { t = ''; }

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

// Takes an object describing transformations where the keys the transform type and the value the
// transform value and returns a string that can be applied to the DOM node.
export function combineTransforms(transformObj) {
  let transformStr = '';

  for (const t in transformObj) {
    if (transformObj.hasOwnProperty(t)) {
      const values = isArray(transformObj[t]) ? transformObj[t].join(', ') : transformObj[t];
      transformStr += `${t}(${values})`;
    }
  }

  return transformStr;
}
