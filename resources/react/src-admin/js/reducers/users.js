import {
  REQUEST_USERS,
  REQUEST_USERS_SUCCESS,
  REQUEST_USERS_FAIL,
  DO_ASYNC_ACTION,
  DONE_ASYNC_ACTION
} from '../constants/ActionTypes';

const initialState = {
  total: 0,
  users: null,
  isFetching: false,
  didInvalidate: false,
  asyncStatus: {}
};

export default function users(state = initialState, action) {
  switch (action.type) {
    case REQUEST_USERS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });

    case REQUEST_USERS_SUCCESS:
      return Object.assign({}, state, {
        total: action.total,
        users: action.users.map(user =>
        Object.assign({}, user, {
          assigneesRoles: user.roles.map(role => role.name)
        })
      ),
        isFetching: false
      });

    case REQUEST_USERS_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: true
      });

    case DO_ASYNC_ACTION:
      return Object.assign({}, state, {
        asyncStatus: Object.assign({}, state.asyncStatus, { [action.id]: action.action })
      });

    case DONE_ASYNC_ACTION:
      {
        const copy = Object.assign({}, state.asyncStatus);
        delete copy[action.id];
        return Object.assign({}, state, {
          asyncStatus: copy
        });
      }

    default:
      return state;
  }
}
