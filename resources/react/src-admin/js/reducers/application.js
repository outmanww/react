import { _LOCALE } from '../../config/env';
import {
  CANGE_LOCALE
} from '../constants/ActionTypes';

const initialState = {
  locale: _LOCALE,
};

export default function application(state = initialState, action) {
  switch (action.type) {
    case CANGE_LOCALE:
      return Object.assign({}, state, {
        locale: action.locale
      });

    default:
      return state;
  }
}
