import { snakeCase, camelCase } from 'change-case';

export function keyToCamel(object) {
  return Object.keys(object).reduce((result, key) => {
    result[camelCase(key)] = object[key];
    return result;
  }, {});
}

export function keyToSnake(object) {
  return Object.keys(object).reduce((result, key) => {
    result[snakeCase(key)] = object[key];
    return result;
  }, {});
}
