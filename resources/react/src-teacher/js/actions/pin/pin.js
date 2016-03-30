import * as types from '../../constants/ActionTypes';
import { customFetch } from '../../utils/FetchUtils';
import { keyToCamel } from '../../utils/ChangeCaseUtils';

function addSideAlert(status, messageId, value) {
  return {
    type: types.ADD_SIDE_ALERT,
    status,
    messageId,
    value
  };
}

function requestPins() {
  return {
    type: types.REQUEST_PINS
  };
}

function requestPinsSuccess(pins) {
  return {
    type: types.REQUEST_PINS_SUCCESS,
    pins
  };
}

function requestPinsFail() {
  return {
    type: types.REQUEST_PINS_FAIL,
  };
}

export function fetchPins() {
  return (dispatch) => {
    dispatch(requestPins());
    customFetch('pins/fetch', 'GET')
    .then(result => {
      dispatch(requestPinsSuccess(result.map(pin => keyToCamel(pin))));
    })
    .catch(ex => {
      dispatch(requestPinsFail());
      dispatch(addSideAlert('danger', `server.${ex.status}`));
    });
  };
}

function doGenerate() {
  return {
    type: types.DO_ASYNC_GENERATE_PINS,
  };
}

function doneGenerate() {
  return {
    type: types.DONE_ASYNC_GENERATE_PINS,
  };
}

export function generatePins(request) {
  return (dispatch) => {
    dispatch(doGenerate());
    customFetch('pins/generate', 'POST', request)
    .then(() => {
      dispatch(doneGenerate());
      dispatch(addSideAlert('success', 'generatePin.success'));
    })
    .catch(ex => {
      dispatch(doneGenerate());
      dispatch(addSideAlert('danger', `server.${ex.status}`));
    });
  };
}
