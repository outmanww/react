import {
  REQUEST_ROLES,
  REQUEST_ROLES_SUCCESS,
  REQUEST_ROLES_FAIL,
  DO_ROLE_ASYNC_ACTION,
  DONE_ROLE_ASYNC_ACTION
} from '../constants/ActionTypes';

const initialState = {
  roles: [],
  isFetching: false,
  didInvalidate: false,
  asyncStatus: {}
};

export default function roles(state = initialState, action) {
  switch (action.type) {
    case REQUEST_ROLES:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });

    case REQUEST_ROLES_SUCCESS:
      return Object.assign({}, state, {
        roles: action.roles.map(r =>
        Object.assign({}, r, {
          permissions: r.permissions.map(p => p.display_name),
          numberOfUsers: r.users.length
        })
      ),
        isFetching: false
      });

    case REQUEST_ROLES_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: true
      });

    case DO_ROLE_ASYNC_ACTION:
      return Object.assign({}, state, {
        asyncStatus: Object.assign({}, state.asyncStatus, { [action.id]: action.action })
      });

    case DONE_ROLE_ASYNC_ACTION:
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
