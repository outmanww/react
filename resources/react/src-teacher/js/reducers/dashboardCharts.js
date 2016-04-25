import {
  REQUEST_CHARTS,
  REQUEST_CHARTS_SUCCESS,
  REQUEST_CHARTS_FAIL,
} from '../constants/DashboardActionTypes';

const initialState = {
  room: null,
  line: null,
  pie: null,
  isFetching: false,
  didInvalidate: false
};

export default function dashboardCharts(state = initialState, action) {
  switch (action.type) {
  case REQUEST_CHARTS:
    return Object.assign({}, state, {
      isFetching: true,
      didInvalidate: false
    });

  case REQUEST_CHARTS_SUCCESS:
    return Object.assign({}, state, {
      room: action.payload.room,
      line: action.payload.charts.line,
      pie: action.payload.charts.pie,
      isFetching: false,
      didInvalidate: false
    });

  case REQUEST_CHARTS_FAIL:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: true
    });

  default:
    return state;
  }
}
