import * as types from '../constants/LectureActionTypes';
import { ADD_SIDE_ALERT } from '../constants/ActionTypes';
import { REQUEST_CHARTS_SUCCESS } from '../constants/DashboardActionTypes';
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

export function storeLecture(body) {
  return {
    [CALL_API]: {
      types: [
        types.STORE_LECTURE,
        types.STORE_LECTURE_SUCCESS,
        types.STORE_LECTURE_FAIL
      ],
      endpoint: `lectures/store`,
      method: 'POST',
      body: body
    },
    meta: {
      actionsOnSuccess: [
        () => ({
          type: ADD_SIDE_ALERT,
          status: 'success',
          messageId: 'lecture.store.success',
          value: ''
        })
      ]
    }
  };
}

export function joinLecture(id) {
  return {
    [CALL_API]: {
      types: [
        types.JOIN_LECTURE,
        types.JOIN_LECTURE_SUCCESS,
        types.JOIN_LECTURE_FAIL
      ],
      endpoint: `lectures/join`,
      method: 'POST',
      body: {id: id}
    },
    meta: {
      actionsOnSuccess: [
        () => ({
          type: ADD_SIDE_ALERT,
          status: 'success',
          messageId: 'lecture.join.success',
          value: ''
        })
      ]
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

export function openRoom(id, length) {
  return {
    [CALL_API]: {
      types: [
        types.OPEN_ROOM,
        types.OPEN_ROOM_SUCCESS,
        types.OPEN_ROOM_FAIL
      ],
      endpoint: `lectures/${id}/open`,
      method: 'POST',
      body: {length}
    },
    meta: {
      actionsOnSuccess: [
        () => ({
          type: ADD_SIDE_ALERT,
          status: 'success',
          messageId: 'room.open.success',
          value: ''
        })
      ]
    }
  };
}

export function closeRoom(id) {
  return {
    [CALL_API]: {
      types: [
        types.CLOSE_ROOM,
        types.CLOSE_ROOM_SUCCESS,
        types.CLOSE_ROOM_FAIL
      ],
      endpoint: `room/${id}/close`,
      method: 'PATCH',
      body: null
    },
    meta: {
      actionsOnSuccess: [
        () => ({
          type: REQUEST_CHARTS_SUCCESS,
          payload: {
            exist: false,
            room: null,
            charts: { line: null, pie: null }
          }
        }),
        () => ({
          type: ADD_SIDE_ALERT,
          status: 'success',
          messageId: 'room.close.success',
          value: ''
        })
      ]
    }
  };
}
