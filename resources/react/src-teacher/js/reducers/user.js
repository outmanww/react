import {
  REQUEST_USER_INFORMATION,
  REQUEST_USER_INFORMATION_SUCCESS,
  REQUEST_USER_INFORMATION_FAIL,
  // UPDATE_USERINFO_TICKETS,
  // UPDATE_USERINFO_RESERVATION
} from '../constants/UserActionTypes';

const initialState = {
  user: null,
  isFetching: false,
  didInvalidate: false
};

export default function user(state = initialState, action) {
  switch (action.type) {
  case REQUEST_USER_INFORMATION:
    return Object.assign({}, state, {
      isFetching: true,
      didInvalidate: false
    });

  case REQUEST_USER_INFORMATION_SUCCESS:
    return Object.assign({}, state, {
      user: action.payload,
      isFetching: false,
      didInvalidate: false
    });

  case REQUEST_USER_INFORMATION_FAIL:
    return Object.assign({}, state, {
      isFetching: false,
      didInvalidate: true
    });

  // case UPDATE_USERINFO_TICKETS:
  //   return Object.assign({}, state, {
  //     status: {
  //       reservations: state.status.reservations,
  //       remainingTickets: action.num
  //     }});

  // case UPDATE_USERINFO_RESERVATION:
  //   return Object.assign({}, state, {
  //     status: {
  //       reservations: action.num,
  //       remainingTickets: state.status.remainingTickets
  //     }});

  default:
    return state;
  }
}
