import * as types from '../constants/ActionTypes';
//import { routeActions } from 'react-router-redux';

export function changeLocale(locale) {
  return {
    type: types.CANGE_LOCALE,
    locale
  };
}
