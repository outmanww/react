import * as types from '../../constants/ActionTypes';
import { CALL_API } from '../../middleware/fetchMiddleware';

export function fetchTimetables(request) {
  return {
    [CALL_API]: {
      types: [
        types.REQUEST_TIMETABLE,
        types.REQUEST_TIMETABLE_SUCCESS,
        types.REQUEST_TIMETABLE_FAIL
      ],
      endpoint: 'flight/timetables',
      method: 'POST',
      body: request
    },
    payload: {
      key: request.planId
    }
  };
}

export function updateFlight(id, capacity) {
  return {
    [CALL_API]: {
      types: [
        types.UPDATE_FLIGHT,
        types.UPDATE_FLIGHT_SUCCESS,
        types.UPDATE_FLIGHT_FAIL
      ],
      endpoint: 'flight/flight',
      method: 'PATCH',
      body: { id, capacity }
    },
    payload: { id },
    meta: {
      actionsOnSuccess: [
        (response) => ({
          type: types.UPDATE_TIMETABLE,
          payload: { key: response.planId, ...response },
          meta: { timestamp: new Date().getTime() }
        })
      ]
    }
  };
}

export function openFlight(id, capacity) {
  return {
    [CALL_API]: {
      types: [
        types.OPEN_FLIGHT,
        types.OPEN_FLIGHT_SUCCESS,
        types.OPEN_FLIGHT_FAIL
      ],
      endpoint: 'flight/flight/open',
      method: 'PATCH',
      body: { id, capacity }
    },
    payload: { id },
    meta: {
      actionsOnSuccess: [
        (response) => ({
          type: types.UPDATE_TIMETABLE,
          payload: { key: response.planId, ...response },
          meta: { timestamp: new Date().getTime() }
        })
      ]
    }
  };
}

export function closeFlight(id) {
  return {
    [CALL_API]: {
      types: [
        types.CLOSE_FLIGHT,
        types.CLOSE_FLIGHT_SUCCESS,
        types.CLOSE_FLIGHT_FAIL
      ],
      endpoint: 'flight/flight/close',
      method: 'DELETE',
      body: { id }
    },
    payload: { id },
    meta: {
      actionsOnSuccess: [
        (response) => ({
          type: types.UPDATE_TIMETABLE,
          payload: { key: response.planId, ...response },
          meta: { timestamp: new Date().getTime() }
        })
      ]
    }
  };
}
