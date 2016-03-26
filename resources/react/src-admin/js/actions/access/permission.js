import * as types from '../../constants/ActionTypes';
import { customFetch } from '../../utils/FetchUtils';
import { keyToCamel } from '../../utils/ChangeCaseUtils';

function addAccessAlert(status, msg) {
  return {
    type: types.ADD_ACCESS_ALERT,
    status,
    msg
  };
}

function requestPermissions() {
  return {
    type: types.REQUEST_PERMISSIONS
  };
}

function requestPermissionsSuccess(permissions) {
  return {
    type: types.REQUEST_PERMISSIONS_SUCCESS,
    permissions
  };
}

function requestPermissionsFail() {
  return {
    type: types.REQUEST_PERMISSIONS_FAIL,
  };
}

export function fetchPermissions() {
  return (dispatch) => {
    dispatch(requestPermissions());
    customFetch('access/permissions/fetch', 'GET')
    .then(result => {
      dispatch(requestPermissionsSuccess(result.map(role => keyToCamel(role))));
    })
    .catch(ex => {
      dispatch(requestPermissionsFail());
      dispatch(addAccessAlert('danger', `server.${ex.status}`));
    });
  };
}

function requestPermissionDependencySuccess(dependency) {
  return {
    type: types.ADD_DEPENDENCY,
    dependency
  };
}

function requestPermissionDependencyFail() {
  return {
    type: types.REQUEST_PERMISSION_DEPENDENCY_FAIL,
  };
}

export function fetchPermissionDependency(id) {
  return (dispatch) => {
    customFetch(`access/permissions/${id}/dependency`, 'GET')
    .then(result => {
      dispatch(requestPermissionDependencySuccess(result.map(d => keyToCamel(d))));
    })
    .catch(ex => {
      dispatch(requestPermissionDependencyFail());
      dispatch(addAccessAlert('danger', `server.${ex.status}`));
    });
  };
}
