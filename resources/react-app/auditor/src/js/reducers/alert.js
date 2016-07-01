import {
  ADD_ALERT,
  DELETE_ALERT,
} from '../constants/ActionTypes';

const initialState = [];

export default function alert(state = initialState, action) {
  switch (action.type) {
    case ADD_ALERT:
      /*
      action = {
        type: redux action type,
        payload: {
          status: error status (danger, warning, info),
          message: message from server
        },
        meta: {
          timestamp: Unix timestamp
        }
      }
      */
      return [
        ...state,
        {
          key: action.meta.timestamp,
          data: {
            status: action.payload.status,
            message: action.payload.message,
          }
        }
      ];

    case DELETE_ALERT:
      /*
      action = {
        type: redux action type,
        key: array contain Unix timestamp
      }
      */
      return state.filter(a =>
        action.key.indexOf(a.key) === -1
      );

    default:
      return state;
  }
}
