import {
  UPDATE_FLIGHT,
  UPDATE_FLIGHT_SUCCESS,
  UPDATE_FLIGHT_FAIL,
  OPEN_FLIGHT,
  OPEN_FLIGHT_SUCCESS,
  OPEN_FLIGHT_FAIL,
  CLOSE_FLIGHT,
  CLOSE_FLIGHT_SUCCESS,
  CLOSE_FLIGHT_FAIL
} from '../../constants/ActionTypes';

export default function fetchingNodes(state = [], action) {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_FLIGHT:
    case OPEN_FLIGHT:
    case CLOSE_FLIGHT:
      return state.concat(payload.id);

    case UPDATE_FLIGHT_SUCCESS:
    case UPDATE_FLIGHT_FAIL:
    case OPEN_FLIGHT_SUCCESS:
    case OPEN_FLIGHT_FAIL:
    case CLOSE_FLIGHT_SUCCESS:
    case CLOSE_FLIGHT_FAIL:
      return state.filter(id => id !== payload.id);

    default:
      return state;
  }
}
