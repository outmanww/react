import * as types from '../constants/UserActionTypes';
import { CALL_API } from '../middleware/fetchMiddleware';
import { push } from 'react-router-redux';

export function fetchInfo() {
  return {
    [CALL_API]: {
      types: [
        types.REQUEST_USER_INFORMATION,
        types.REQUEST_USER_INFORMATION_SUCCESS,
        types.REQUEST_USER_INFORMATION_FAIL
      ],
      endpoint: 'user/info',
      method: 'GET',
      body: null
    }
  };
}
