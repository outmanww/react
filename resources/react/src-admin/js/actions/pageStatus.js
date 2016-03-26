import * as types from '../constants/ActionTypes';

export function sidebarOn() {
  return {
    type: types.SIDEVAR_ON,
  };
}

export function sidebarOff() {
  return {
    type: types.SIDEVAR_OFF
  };
}

export function changeSidebar() {
  return {
    type: types.CHANGE_SIDEVAR
  };
}
