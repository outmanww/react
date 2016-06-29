import * as types from '../constants/ActionTypes';

export function deleteSideAlerts(keys) {
  return {
    type: types.DELETE_SIDE_ALERT,
    keys
  };
}

export function clearDisposable() {
  return {
    type: types.CLEAR_DISPOSABLE,
  };
}
