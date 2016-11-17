// External LoDash dependencies must be loaded through this file in order to easily track which
// specific features are used.
import _ from 'lodash-es';

// Used for deep merging of options
export const defaultsDeep = _.defaultsDeep;

// Used for deep setting/getting of values in nested objects
export const set = _.set;
export const get = _.get;

export const flattenDeep = _.flattenDeep;
