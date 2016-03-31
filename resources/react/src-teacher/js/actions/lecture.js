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