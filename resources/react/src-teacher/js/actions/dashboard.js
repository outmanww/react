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

export function fetchMessages() {
  return {
    [CALL_API]: {
      types: [
        types.REQUEST_MESSAGES,
        types.REQUEST_MESSAGES_SUCCESS,
        types.REQUEST_MESSAGES_FAIL
      ],
      endpoint: (state) => {
        const messages = state.dashboardMessages.dashboardMessages;
        if (messages === []) {
          return 'messages/?latest=0'
        } else {
          console.log('messages =', messages, )
          return `messages/?latest=${messages[0].time}`
        }
      },
      method: 'GET',
      body: null
    }
  };
}
