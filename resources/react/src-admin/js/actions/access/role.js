import * as types from '../../constants/ActionTypes';
import { customFetch } from '../../utils/FetchUtils';
import { keyToCamel } from '../../utils/ChangeCaseUtils';

export function addSideAlert(status, messageId, value) {
  return {
    type: types.ADD_SIDE_ALERT,
    status,
    messageId,
    value
  };
}

function requestRoles() {
  return {
    type: types.REQUEST_ROLES
  };
}

function requestRolesSuccess(roles) {
  return {
    type: types.REQUEST_ROLES_SUCCESS,
    roles
  };
}

function requestRolesFail() {
  return {
    type: types.REQUEST_ROLES_FAIL,
  };
}

export function fetchRoles() {
  return (dispatch) => {
    dispatch(requestRoles());
    customFetch('access/roles/fetch', 'GET')
    .then(result => {
      dispatch(requestRolesSuccess(result.map(role => keyToCamel(role))));
    })
    .catch(ex => {
      dispatch(requestRolesFail());
      dispatch(addSideAlert('danger', `server.${ex.status}`));
    });
  };
}

function requestRoleSuccess(role) {
  return {
    type: types.ADD_EDITING_ROLE,
    role
  };
}

export function fetchRole(id) {
  return (dispatch) => {
    customFetch(`access/roles/${id}/fetch`, 'GET')
    .then(result => {
      dispatch(requestRoleSuccess(keyToCamel(result)));
    })
    .catch(ex => {
      dispatch(addSideAlert('danger', `server.${ex.status}`));
    });
  };
}

function doRoleAsyncAction(id, action) {
  return {
    type: types.DO_ROLE_ASYNC_ACTION,
    id,
    action
  };
}

function doneRoleAsyncAction(id) {
  return {
    type: types.DONE_ROLE_ASYNC_ACTION,
    id
  };
}

export function deleteRole(id) {
  return (dispatch) => {
    dispatch(doRoleAsyncAction(id, 'destroy'));
    customFetch(`access/roles/${id}`, 'DELETE')
    .then(result => {
      dispatch(doneRoleAsyncAction(id));
      dispatch(addSideAlert('success', 'alert.access.roles.destroySuccess'));
      dispatch(requestRolesSuccess(result.map(role => keyToCamel(role))));
    })
    .catch(ex => {
      dispatch(requestRolesFail());
      dispatch(addSideAlert('danger', `server.${ex.status}`));
    });
  };
}

export function storeRole(body) {
  return (dispatch) => {
    customFetch(`access/roles`, 'POST', body)
    .then(() => {
      dispatch(addSideAlert('success', 'alert.access.roles.storeSuccess'));
    })
    .catch(ex => {
      dispatch(addSideAlert('danger', `server.${ex.status}`));
    });
  };
}

export function updateRole(id, body) {
  return (dispatch) => {
    customFetch(`access/roles/${id}`, 'PUT', body)
    .then(() => {
      dispatch(addSideAlert('success', 'alert.access.roles.updateSuccess'));
    })
    .catch(ex => {
      dispatch(addSideAlert('danger', `server.${ex.status}`));
    });
  };
}

function addValidation(validation) {
  return {
    type: types.ADD_VALIDATION,
    validation
  };
}

export function validateRoleName(name) {
  return (dispatch) => {
    customFetch('validation/role', 'POST', { name })
    .then(result => {
      if (result !== 'ok') {
        dispatch(addValidation({
          name: {
            value: name,
            status: 'error',
            message: 'validation.name.alreadyExists'
          }
        }));
      }
    })
    .catch(ex => {
      dispatch(addSideAlert('danger', `server.${ex.status}`));
    });
  };
}
