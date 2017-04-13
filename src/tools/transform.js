import { isArray, isDefined, isNumberLike } from './is';

// Processes the transform string value from a DOM element and returns an object where the keys are
// the transform type and the value the transform value.
//
// NOTE:
// `readTransforms` is limited to having a single type of each transform though multiple are
// technically possible, but considered rare in the context of Monte. See the MDN documentation for
// workarounds if duplicate types are needed: https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/transform
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

        if (isArray(v)) {
          // Convert each array element to a number if possible
          for (let j = 0; j < v.length; j++) {
            v[j] = isNumberLike(v[j]) ? +v[j] : v[j];
          }
        }
        else if (isNumberLike(v)) {
          // Convert value to number if possible.
          v = +v;
        }

        transforms[k] = v;
      }
    }
  });

  return transforms;
}

// Takes an object describing transformations where the keys are the transform type and the value is
// the transform value and returns a string that can be applied to the DOM node. Transforms are
// sorted alphabetically for consistentcy.
//
// NOTE:
// Similar to `readTransforms`, `combineTransforms` can only support single occurrences of a particular
// transform type.
export function combineTransforms(transformObj) {
  const transformStrs = [];
  const keys = [];

  for (const t in transformObj) {
    if (transformObj.hasOwnProperty(t)) {
      keys.push(t);
    }
  }

  keys.sort();
  keys.forEach((t) => {
    const values = isArray(transformObj[t]) ? transformObj[t].join(', ') : transformObj[t];
    transformStrs.push(`${t}(${values})`);
  });

  return transformStrs.join(' ');
}
