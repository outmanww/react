import * as types from '../../constants/ActionTypes';
import { customFetch } from '../../utils/FetchUtils';
import { keyToCamel } from '../../utils/ChangeCaseUtils';
//import {} from '../../../config/url';
import { routeActions } from 'react-router-redux';

export function addSideAlert(status, messageId, value) {
  return {
    type: types.ADD_SIDE_ALERT,
    status,
    messageId,
    value
  };
}

function doAsyncAction(id, action) {
  return {
    type: types.DO_ASYNC_ACTION,
    id,
    action
  };
}

function doneAsyncAction(id) {
  return {
    type: types.DONE_ASYNC_ACTION,
    id
  };
}

function requestUsers() {
  return {
    type: types.REQUEST_USERS,
  };
}

function requestUsersSuccess(total, users) {
  return {
    type: types.REQUEST_USERS_SUCCESS,
    total,
    users
  };
}

function requestUsersFail() {
  return {
    type: types.REQUEST_USERS_FAIL,
  };
}

export function fetchUsers() {
  return (dispatch, getState) => {
    const url = `access/users/fetch${getState().routing.location.search}`;
    dispatch(requestUsers());
    customFetch(url, 'GET')
    .then(result => {
      dispatch(requestUsersSuccess(
        result.total,
        result.users.map(user => keyToCamel(user))
      ));
    })
    .catch(ex => {
      dispatch(requestUsersFail());
      dispatch(addSideAlert('danger', `server.${ex.status}`));
    });
  };
}

function addEditingUser(user) {
  return {
    type: types.ADD_EDITING_USER,
    user
  };
}

export function fetchUser(id) {
  return (dispatch) => {
    customFetch(`access/user/${id}/fetch`, 'GET')
    .then(result => {
      dispatch(addEditingUser(keyToCamel(result)));
    })
    .catch(ex => {
      dispatch(addSideAlert('danger', `server.${ex.status}`));
    });
  };
}

export function storeUser(body) {
  return (dispatch) => {
    customFetch(`access/user`, 'POST', body)
    .then(result => {
      dispatch(addSideAlert(
        'success',
        'user.store.success'
      ));
      dispatch(routeActions.push(
        `/admin/single/access/users/?filter=all&skip=${Math.floor(result / 10) * 10}&take=10`
      ));
    })
    .catch(ex => {
      dispatch(addSideAlert('danger', `server.${ex.status}`));
    });
  };
}

export function updateUser(id, body) {
  return (dispatch) => {
    customFetch(`access/user/${id}`, 'PUT', body)
    .then(() => {
      dispatch(addSideAlert(
        'success',
        'user.update.success'
      ));
      history.back();
    })
    .catch(ex => {
      dispatch(addSideAlert('danger', `server.${ex.status}`));
    });
  };
}

export function changePassword(id, body) {
  return (dispatch) => {
    customFetch(`access/user/${id}/password/change`, 'POST', body)
    .then(() => {
      dispatch(addSideAlert(
        'success',
        'user.changePassword.success'
      ));
    })
    .catch(ex => {
      dispatch(addSideAlert('danger', `server.${ex.status}`));
    });
  };
}

export function activateUser(id) {
  return (dispatch, getState) => {
    const { query } = getState().routing.location;
    dispatch(doAsyncAction(id, 'activate'));
    customFetch(`access/user/${id}/activate`, 'PATCH', query)
    .then(result => {
      dispatch(doneAsyncAction(id));
      dispatch(addSideAlert(
        'success',
        'user.activate.success'
      ));
      dispatch(requestUsersSuccess(
        result.total,
        result.users.map(user => keyToCamel(user))
      ));
    })
    .catch(ex => {
      dispatch(doneAsyncAction(id));
      dispatch(addSideAlert('danger', `server.${ex.status}`));
    });
  };
}

export function deactivateUser(id) {
  return (dispatch, getState) => {
    const { query } = getState().routing.location;
    dispatch(doAsyncAction(id, 'deactivate'));
    customFetch(`access/user/${id}/deactivate`, 'PATCH', query)
    .then(result => {
      dispatch(doneAsyncAction(id));
      dispatch(addSideAlert(
        'success',
        'user.deactivate.success'
      ));
      dispatch(requestUsersSuccess(
        result.total,
        result.users.map(user => keyToCamel(user))
      ));
    })
    .catch(ex => {
      dispatch(doneAsyncAction(id));
      dispatch(addSideAlert('danger', `server.${ex.status}`));
    });
  };
}

export function restoreUser(id) {
  return (dispatch, getState) => {
    const { query } = getState().routing.location;
    dispatch(doAsyncAction(id, 'restore'));
    customFetch(`access/user/${id}/restore`, 'PATCH', query)
    .then(result => {
      dispatch(doneAsyncAction(id));
      dispatch(addSideAlert(
        'success',
        'user.restore.success'
      ));
      dispatch(requestUsersSuccess(
        result.total,
        result.users.map(user => keyToCamel(user))
      ));
    })
    .catch(ex => {
      dispatch(doneAsyncAction(id));
      dispatch(addSideAlert('danger', `server.${ex.status}`));
    });
  };
}

export function destroyUser(id) {
  return (dispatch, getState) => {
    const { query } = getState().routing.location;
    dispatch(doAsyncAction(id, 'destroy'));
    customFetch(`access/user/${id}`, 'DELETE', query)
    .then(result => {
      dispatch(doneAsyncAction(id));
      dispatch(addSideAlert(
        'success',
        'user.destroy.success'
      ));
      dispatch(requestUsersSuccess(
        result.total,
        result.users.map(user => keyToCamel(user))
      ));
    })
    .catch(ex => {
      dispatch(doneAsyncAction(id));
      dispatch(addSideAlert('danger', `server.${ex.status}`));
    });
  };
}

export function deleteUser(id) {
  return (dispatch, getState) => {
    const { query } = getState().routing.location;
    dispatch(doAsyncAction(id, 'delete'));
    customFetch(`access/user/${id}/hard`, 'DELETE', query)
    .then(result => {
      dispatch(doneAsyncAction(id));
      dispatch(addSideAlert(
        'success',
        'user.delete.success'
      ));
      dispatch(requestUsersSuccess(
        result.total,
        result.users.map(user => keyToCamel(user))
      ));
    })
    .catch(ex => {
      dispatch(doneAsyncAction(id));
      dispatch(addSideAlert('danger', `server.${ex.status}`));
    });
  };
}

export function resendUser(id) {
  return (dispatch, getState) => {
    const { query } = getState().routing.location;
    dispatch(doAsyncAction(id, 'resend'));
    customFetch(`access/user/${id}/confirm/resend`, 'GET', query)
    .then(result => {
      dispatch(doneAsyncAction(id));
      dispatch(addSideAlert(
        'success',
        'user.resend.success'
      ));
      dispatch(requestUsersSuccess(
        result.total,
        result.users.map(user => keyToCamel(user))
      ));
    })
    .catch(ex => {
      dispatch(doneAsyncAction(id));
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

function addAddress(address) {
  return {
    type: types.ADD_ADDRESS,
    address
  };
}

export function fetchAddress(code) {
  return (dispatch) => {
    customFetch(`getAddress/${code.slice(0, 3)}/${code.slice(3, 7)}`, 'GET')
    .then(result => {
      dispatch(addAddress(result));
    })
    .catch(() => {
      dispatch(addValidation({
        postalCode: {
          value: code,
          status: 'error',
          message: 'validation.postalCode.notValid'
        }
      }));
    });
  };
}

export function validateEmail(email) {
  return (dispatch) => {
    customFetch('validation/user', 'POST', { email })
    .then(result => {
      if (result !== 'ok') {
        dispatch(addValidation({
          email: {
            value: email,
            status: 'error',
            message: 'validation.email.alreadyExists'
          }
        }));
      }
    })
    .catch(ex => {
      dispatch(addSideAlert('danger', `server.${ex.status}`));
    });
  };
}
