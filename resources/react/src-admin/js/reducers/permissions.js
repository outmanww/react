import {
  REQUEST_PERMISSIONS,
  REQUEST_PERMISSIONS_SUCCESS,
  REQUEST_PERMISSIONS_FAIL,
  DO_PERMISSION_ASYNC_ACTION,
  DONE_PERMISSION_ASYNC_ACTION,
} from '../constants/ActionTypes';

const initialState = {
  permissions: [],
  isFetching: false,
  didInvalidate: false,
  asyncStatus: {}
};

export default function permissions(state = initialState, action) {
  switch (action.type) {
    case REQUEST_PERMISSIONS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });

    case REQUEST_PERMISSIONS_SUCCESS:
      return Object.assign({}, state, {
        permissions: action.permissions.map(p =>
        Object.assign({}, p, {
          dependencies: p.dependencies.map(d => d.permission.display_name),
          roles: p.roles.map(r => r.name)
        })
      ),
        isFetching: false
      });

    case REQUEST_PERMISSIONS_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: true
      });

    case DO_PERMISSION_ASYNC_ACTION:
      return Object.assign({}, state, {
        asyncStatus: Object.assign({}, state.asyncStatus, { [action.id]: action.action })
      });

    case DONE_PERMISSION_ASYNC_ACTION:
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
