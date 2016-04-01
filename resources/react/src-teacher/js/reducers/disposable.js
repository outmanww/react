import {
  CLEAR_DISPOSABLE
} from '../constants/ActionTypes';

import {
  REQUEST_LECTURE,
  REQUEST_LECTURE_SUCCESS,
  REQUEST_LECTURE_FAIL,
} from '../constants/LectureActionTypes';

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
        [key]: payload[key]
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

const initialState = {
  lecture: {},
};

export default function disposable(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REQUEST_LECTURE:
    case REQUEST_LECTURE_SUCCESS:
    case REQUEST_LECTURE_FAIL:
      return Object.assign({}, state, {
        lecture: change(state.lecture, 'lecture', type.replace(/_LECTURE/g, ''), payload)
      });

    case CLEAR_DISPOSABLE:
      return initialState;

    default:
      return state;
  }
}
