import {
  CLEAR_DISPOSABLE
} from '../constants/ActionTypes';

import {
  REQUEST_LECTURE,
  REQUEST_LECTURE_SUCCESS,
  REQUEST_LECTURE_FAIL,
  REQUEST_ROOM,
  REQUEST_ROOM_SUCCESS,
  REQUEST_ROOM_FAIL,
  REQUEST_SEARCH_LECTURE,
  REQUEST_SEARCH_LECTURE_SUCCESS,
  REQUEST_SEARCH_LECTURE_FAIL,
  STORE_LECTURE,
  STORE_LECTURE_SUCCESS,
  STORE_LECTURE_FAIL,
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

const initialState = {};

export default function disposable(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case REQUEST_LECTURE:
    case REQUEST_LECTURE_SUCCESS:
    case REQUEST_LECTURE_FAIL:
      return Object.assign({}, state, {
        lecture: change(state.lecture, 'lecture', type.replace(/_LECTURE/g, ''), payload)
      });

    case REQUEST_ROOM:
    case REQUEST_ROOM_SUCCESS:
    case REQUEST_ROOM_FAIL:
      return Object.assign({}, state, {
        room: change(state.room, 'room', type.replace(/_ROOM/g, ''), payload)
      });

    case REQUEST_SEARCH_LECTURE:
    case REQUEST_SEARCH_LECTURE_SUCCESS:
    case REQUEST_SEARCH_LECTURE_FAIL:
      return Object.assign({}, state, {
        overlappedLecture: change(state.overlappedLecture, 'overlappedLecture', type.replace(/_SEARCH_LECTURE/g, ''), payload)
      });

    case STORE_LECTURE:
    case STORE_LECTURE_SUCCESS:
    case STORE_LECTURE_FAIL:
      return Object.assign({}, state, {
        storeLecture: change(state.storeLecture, 'storeLecture', type.replace(/STORE_LECTURE/g, 'REQUEST'), payload)
      });

    case CLEAR_DISPOSABLE:
      return initialState;

    default:
      return state;
  }
}
