import {
  ADD_EDITING_USER,
  ADD_EDITING_ROLE,
  ADD_ADDRESS,
  ADD_VALIDATION,
  CLEAR_DISPOSABLE
} from '../constants/ActionTypes';

import {
  REQUEST_CLOSED_PLACES,
  REQUEST_CLOSED_PLACES_SUCCESS,
  REQUEST_CLOSED_PLACES_FAIL,
} from '../constants/PlanActionTypes';


function change(state = {}, key, type, payload) {
  switch (type) {
    case 'REQUEST':
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });

    case 'REQUEST_SUCCESS':
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        [key]: payload[key]
      });

    case 'REQUEST_FAIL':
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: true
      });

    default:
      return state;
  }
}

const initialState = {
  editingUser: null,
  editingRole: null,
  plan: {},
  closedPlaces: {},
  address: null,
  validation: null
};

export default function disposable(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    // case REQUEST_PLAN:
    // case REQUEST_PLAN_SUCCESS:
    // case REQUEST_PLAN_FAIL:
    //   return Object.assign({}, state, {
    //     plan: change(state.plan, 'plan', type.replace( /_PLAN/g , "" ), payload)
    //   });

    case REQUEST_CLOSED_PLACES:
    case REQUEST_CLOSED_PLACES_SUCCESS:
    case REQUEST_CLOSED_PLACES_FAIL:
      return Object.assign({}, state, {
        closedPlaces: change(state.plan, 'closedPlaces', type.replace(/_CLOSED_PLACES/g, ''), payload)
      });

    case ADD_EDITING_USER:
      return Object.assign({}, state, {
        editingUser: Object.assign(action.user,
        { assigneesRoles: action.user.roles.map(role => role.id) }
      )
      });

    case ADD_EDITING_ROLE:
      return Object.assign({}, state, {
        editingRole: Object.assign(action.role,
        { permissions: action.role.permissions.map(p => p.id) }
      )
      });

    case ADD_ADDRESS:
      {
        const { stateName, city, street } = action.address;
        return Object.assign({}, state, {
          address: { state: stateName, city, street }
        });
      }

    case ADD_VALIDATION:
      return Object.assign({}, state, {
        validation: action.validation
      });

    case CLEAR_DISPOSABLE:
      return initialState;

    default:
      return state;
  }
}
