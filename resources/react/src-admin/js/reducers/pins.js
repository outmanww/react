import {
  REQUEST_PINS,
  REQUEST_PINS_SUCCESS,
  REQUEST_PINS_FAIL,
  DO_ASYNC_GENERATE_PINS,
  DONE_ASYNC_GENERATE_PINS
} from '../constants/ActionTypes';

const initialState = {
  pins: [],
  isFetching: false,
  didInvalidate: false,
  isGenerationg: false
};

export default function roles(state = initialState, action) {
  switch (action.type) {
    case REQUEST_PINS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });

    case REQUEST_PINS_SUCCESS:
      return Object.assign({}, state, {
        pins: action.pins,
        isFetching: false
      });

    case REQUEST_PINS_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: true
      });

    case DO_ASYNC_GENERATE_PINS:
      return Object.assign({}, state, {
        isGenerationg: true
      });

    case DONE_ASYNC_GENERATE_PINS:
      return Object.assign({}, state, {
        isGenerationg: false
      });

    default:
      return state;
  }
}
