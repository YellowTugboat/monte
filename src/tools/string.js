import { camelCase, kebabCase, snakeCase, upperFirst } from '../external/lodash';
export { camelCase, kebabCase, snakeCase, upperFirst };

export function pascalCase(str) {
  return upperFirst(camelCase(str));
}
