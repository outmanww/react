import {
  REQUEST_CONFERENCE,
  REQUEST_CONFERENCE_SUCCESS,
  REQUEST_CONFERENCE_FAIL,
} from '../constants/DashboardActionTypes';

const initialState = {
  conference: null,
  isFetching: false,
  didInvalidate: false
};

export default function conference(state = initialState, action) {
  switch (action.type) {
    case REQUEST_CONFERENCE:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });

    case REQUEST_CONFERENCE_SUCCESS:
      return Object.assign({}, state, {
        conference: action.payload.conference,
        isFetching: false,
        didInvalidate: false
      });

    case REQUEST_CONFERENCE_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: true
      });

    default:
      return state;
  }
}
