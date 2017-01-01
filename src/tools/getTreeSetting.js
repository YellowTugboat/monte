import { get, has } from '../external/lodash';

// A deep-first object property getter that falls back to parent and sibling levels if the expected
// property is not present.
//
// For example on a generic 3-level object, attempts to access:
//   (Primary)
//   obj.levels[0].levels[1].levels[2].prop, then
//   obj.levels[0].levels[1].prop, then
//   obj.levels[0].prop, then
//
//   (Secondary)
//   obj.levels[1].levels[2].prop, then
//   obj.levels[2].prop, then
//   obj.prop, then falls back to the
//   defaultValue.
//
// More concretely if the object is transition settings, `level`s are 'line' and 'update', the
// `property` is 'duration', and the `defaultValue` is 250 the attempts are:
//   transitionSettings.line.update.duration,then
//   transitionSettings.update.duration, then
//   transitionSettings.duration, then
//   defaultValue.
export function getTreeSetting(obj, levels, property, defaultValue) {
  if (obj) {
    // Primary chain (deep)
    for (let i = levels.length - 1; i >= 0; i--) {
      let propPath = levels.slice(0, i + 1).join('.');
      if (propPath) { propPath += '.'; }
      propPath += property;

      if (has(obj, propPath)) {
        return get(obj, propPath);
      }
    }

    // Scondary chain (shallow and siblings)
    for (let i = 0; i < levels.length; i++) {
      let propPath = levels.slice(i + 1).join('.');
      if (propPath) { propPath += '.'; }
      propPath += property;

      if (has(obj, propPath)) {
        return get(obj, propPath);
      }
    }
  }

  return defaultValue;
}
