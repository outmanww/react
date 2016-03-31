import {
  REQUEST_LECTURES,
  REQUEST_LECTURES_SUCCESS,
  REQUEST_LECTURES_FAIL
} from '../constants/LectureActionTypes';

const initialState = {
  lectures: null,
  isFetching: false,
  didInvalidate: false
};

export default function lectures(state = initialState, action) {
  switch (action.type) {
  case REQUEST_LECTURES:
    return Object.assign({}, state, {
      isFetching: true,
      didInvalidate: false
    });

  case REQUEST_LECTURES_SUCCESS:
    return Object.assign({}, state, {
      lectures: Object.values(action.payload),
      isFetching: false,
      didInvalidate: false
    });

  case REQUEST_LECTURES_FAIL:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: true
    });

  default:
    return state;
  }
}
