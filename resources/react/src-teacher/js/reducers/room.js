import {
  OPEN_ROOM,
  OPEN_ROOM_SUCCESS,
  OPEN_ROOM_FAIL
} from '../constants/LectureActionTypes';

const initialState = {
  room: null,
  isFetching: false,
  didInvalidate: false
};

export default function room(state = initialState, action) {
  switch (action.type) {
  case OPEN_ROOM:
    return Object.assign({}, state, {
      isFetching: true,
      didInvalidate: false
    });

  case OPEN_ROOM_SUCCESS:
    return Object.assign({}, state, {
      room: action.payload,
      isFetching: false,
      didInvalidate: false
    });

  case OPEN_ROOM_FAIL:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: true
    });

  default:
    return state;
  }
}
