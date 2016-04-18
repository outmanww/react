import * as types from '../constants/DashboardActionTypes';
import { ADD_SIDE_ALERT } from '../constants/ActionTypes';
import { CALL_API } from '../middleware/fetchMiddleware';
import { push } from 'react-router-redux';

export function fetchCharts() {
  return {
    [CALL_API]: {
      types: [
        types.REQUEST_CHARTS,
        types.REQUEST_CHARTS_SUCCESS,
        types.REQUEST_CHARTS_FAIL
      ],
      endpoint: 'test',
      method: 'GET',
      body: null
    }
  };
}
