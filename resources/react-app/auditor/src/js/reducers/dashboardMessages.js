import {
  REQUEST_MESSAGES,
  REQUEST_MESSAGES_SUCCESS,
  REQUEST_MESSAGES_FAIL,
} from '../constants/DashboardActionTypes';

const initialState = {
  dashboardMessages: [],
  isFetching: false,
  didInvalidate: false
};

export default function dashboardMessages(state = initialState, action) {
  switch (action.type) {
  case REQUEST_MESSAGES:
    return Object.assign({}, state, {
      isFetching: true,
      didInvalidate: false
    });

  case REQUEST_MESSAGES_SUCCESS:
    return Object.assign({}, state, {
      dashboardMessages: Object.values(action.payload),
      isFetching: false,
      didInvalidate: false
    });

  case REQUEST_MESSAGES_FAIL:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: true
    });

  default:
    return state;
  }
}
