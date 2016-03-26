import {
  ADD_DEPENDENCY,
  CLEAR_DEPENDENCY,
} from '../constants/ActionTypes';

export default function dependency(state = null, action) {
  switch (action.type) {
    case ADD_DEPENDENCY:
      return action.dependency.map(d => d.dependencyId);

    case CLEAR_DEPENDENCY:
      return null;

    default:
      return state;
  }
}
