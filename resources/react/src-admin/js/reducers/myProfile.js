import {
  REQUEST_MY_PROFILE,
  REQUEST_MY_PROFILE_SUCCESS,
  REQUEST_MY_PROFILE_FAIL,
} from '../constants/ActionTypes';

const initialState = {
  isFetching: false,
  didInvalidate: false
};

export default function myProfile(state = initialState, action) {
  switch (action.type) {
    case REQUEST_MY_PROFILE:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });

    case REQUEST_MY_PROFILE_SUCCESS:
      return Object.assign({}, state, action.profile, {
        isFetching: false,
        didInvalidate: false
      }, {
        assigneesRoles: action.profile.roles.map(role => role.name),
        assigneesPermissions: action.profile.roles.map(role =>
        role.permissions.map(permission =>
          permission.name)).toString().split(',').filter((x, i, self) =>
            self.indexOf(x) === i)
      });

    case REQUEST_MY_PROFILE_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: true
      });

    default:
      return state;
  }
}
