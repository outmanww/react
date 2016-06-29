import {
  REQUEST_CHARTS_TEST,
  REQUEST_CHARTS_TEST_SUCCESS,
  REQUEST_CHARTS_TEST_FAIL,
} from '../constants/DashboardActionTypes';

const initialState = {
  reactions: null,
  room: null,
  isFetching: false,
  didInvalidate: false
};

export default function dashboardCharts(state = initialState, action) {
  switch (action.type) {
  case REQUEST_CHARTS_TEST:
    return Object.assign({}, state, {
      isFetching: true,
      didInvalidate: false
    });

  case REQUEST_CHARTS_TEST_SUCCESS:
    return Object.assign({}, state, {
      reactions: action.payload.reactions,
      room: action.payload.room,
      isFetching: false,
      didInvalidate: false
    });

  case REQUEST_CHARTS_TEST_FAIL:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: true
    });

  default:
    return state;
  }
}
