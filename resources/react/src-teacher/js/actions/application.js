import * as types from '../constants/ActionTypes';

export function changeLocale(locale) {
  return {
    type: types.CANGE_LOCALE,
    locale
  };
}
