import {
  REQUEST_TYPES,
  REQUEST_TYPES_SUCCESS,
  REQUEST_TYPES_FAIL,
  UPDATE_TYPES,
  UPDATE_TYPES_SUCCESS,
  UPDATE_TYPES_FAIL,
  CREATE_TYPES,
  CREATE_TYPES_SUCCESS,
  CREATE_TYPES_FAIL,
  DELETE_TYPES,
  DELETE_TYPES_SUCCESS,
  DELETE_TYPES_FAIL,
} from '../../constants/ActionTypes';

const initialState = {
  types: [],
  isFetching: false,
  didInvalidate: false,
  updatedAt: 0
};

export default function types(state = initialState, action) {
  switch (action.type) {
    case REQUEST_TYPES:
    case UPDATE_TYPES:
    case CREATE_TYPES:
    case DELETE_TYPES:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });

    case REQUEST_TYPES_SUCCESS:
    case CREATE_TYPES_SUCCESS:
    case UPDATE_TYPES_SUCCESS:
    case DELETE_TYPES_SUCCESS:
      return Object.assign({}, state, {
        types: action.payload.types,
        isFetching: false,
        didInvalidate: false,
        updatedAt: action.meta.timestamp
      });

    case REQUEST_TYPES_FAIL:
    case UPDATE_TYPES_FAIL:
    case CREATE_TYPES_FAIL:
    case DELETE_TYPES_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: true
      });

    default:
      return state;
  }
}
