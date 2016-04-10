import * as types from '../constants/LectureActionTypes';
import { CALL_API } from '../middleware/fetchMiddleware';
import { push } from 'react-router-redux';

export function fetchLectures() {
  return {
    [CALL_API]: {
      types: [
        types.REQUEST_LECTURES,
        types.REQUEST_LECTURES_SUCCESS,
        types.REQUEST_LECTURES_FAIL
      ],
      endpoint: 'lectures',
      method: 'GET',
      body: null
    }
  };
}

export function fetchLectureBasic() {
  return {
    [CALL_API]: {
      types: [
        types.REQUEST_LECTURE_BASIC,
        types.REQUEST_LECTURE_BASIC_SUCCESS,
        types.REQUEST_LECTURE_BASIC_FAIL
      ],
      endpoint: `lectures/basic`,
      method: 'GET',
      body: null
    }
  };
}

export function searchLecture(body) {
  return {
    [CALL_API]: {
      types: [
        types.REQUEST_SEARCH_LECTURE,
        types.REQUEST_SEARCH_LECTURE_SUCCESS,
        types.REQUEST_SEARCH_LECTURE_FAIL
      ],
      endpoint: `lectures/search`,
      method: 'POST',
      body: body
    }
  };
}

export function fetchLecture(id) {
  return {
    [CALL_API]: {
      types: [
        types.REQUEST_LECTURE,
        types.REQUEST_LECTURE_SUCCESS,
        types.REQUEST_LECTURE_FAIL
      ],
      endpoint: `lectures/${id}`,
      method: 'GET',
      body: null
    }
  };
}

export function fetchRoom(id) {
  return {
    [CALL_API]: {
      types: [
        types.REQUEST_ROOM,
        types.REQUEST_ROOM_SUCCESS,
        types.REQUEST_ROOM_FAIL
      ],
      endpoint: `room/${id}`,
      method: 'GET',
      body: null
    }
  };
}
