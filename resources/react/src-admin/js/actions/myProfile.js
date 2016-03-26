import * as types from '../constants/ActionTypes';
import { customFetch } from '../utils/FetchUtils';
import { keyToCamel } from '../utils/ChangeCaseUtils';

export function addSideAlert(status, messageId, value) {
  return {
    type: types.ADD_SIDE_ALERT,
    status,
    messageId,
    value
  };
}

function requestMyProfile() {
  return {
    type: types.REQUEST_MY_PROFILE
  };
}

export function requestMyProfileSuccess(profile) {
  return {
    type: types.REQUEST_MY_PROFILE_SUCCESS,
    profile
  };
}

export function requestMyProfileFail() {
  return {
    type: types.REQUEST_MY_PROFILE_FAIL
  };
}

export function fetchMyProfile() {
  return dispatch => {
    dispatch(requestMyProfile());
    customFetch('api/getUserInfo', 'GET')
    .then(result => {
      dispatch(requestMyProfileSuccess(keyToCamel(result)));
    })
    .catch(ex => {
      dispatch(requestMyProfileFail());
      dispatch(addSideAlert('danger', `server.${ex.status}`));
    });
  };
}
