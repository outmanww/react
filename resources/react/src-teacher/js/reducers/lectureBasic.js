import {
  REQUEST_LECTURE_BASIC,
  REQUEST_LECTURE_BASIC_SUCCESS,
  REQUEST_LECTURE_BASIC_FAIL
} from '../constants/LectureActionTypes';

const initialState = {
  lectureBasic: null,
  isFetching: false,
  didInvalidate: false
};

export default function lectureBasic(state = initialState, action) {
  switch (action.type) {
  case REQUEST_LECTURE_BASIC:
    return Object.assign({}, state, {
      isFetching: true,
      didInvalidate: false
    });

  case REQUEST_LECTURE_BASIC_SUCCESS:
    return Object.assign({}, state, {
      lectureBasic: action.payload,
      isFetching: false,
      didInvalidate: false
    });

  case REQUEST_LECTURE_BASIC_FAIL:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: true
    });

  default:
    return state;
  }
}
