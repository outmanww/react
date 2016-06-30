import {
  CLEAR_DISPOSABLE
} from '../constants/ActionTypes';

function change(state = {}, key, type, payload) {
  switch (type) {
    case 'REQUEST':
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });

    case 'REQUEST_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        [key]: Object.assign({}, state[key], payload[key])
      });

    case 'REQUEST_FAIL':
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: true
      });

    default:
      return state;
  }
}

const initialState = {};

export default function disposable(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    default:
      return state;
  }
}
