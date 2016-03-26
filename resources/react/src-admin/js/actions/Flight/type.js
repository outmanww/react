import * as types from '../../constants/ActionTypes';
import { CALL_API } from '../../middleware/fetchMiddleware';

export function fetchTypes() {
  return {
    [CALL_API]: {
      types: [
        types.REQUEST_TYPES,
        types.REQUEST_TYPES_SUCCESS,
        types.REQUEST_TYPES_FAIL
      ],
      endpoint: 'flight/types/fetch',
      method: 'GET',
      body: null
    }
  };
}

export function createType(name, en, description) {
  return {
    [CALL_API]: {
      types: [
        types.CREATE_TYPES,
        types.CREATE_TYPES_SUCCESS,
        types.CREATE_TYPES_FAIL
      ],
      endpoint: `flight/type`,
      method: 'POST',
      body: { name, en, description }
    }
  };
}

export function updateType(id, body) {
  return {
    [CALL_API]: {
      types: [
        types.UPDATE_TYPES,
        types.UPDATE_TYPES_SUCCESS,
        types.UPDATE_TYPES_FAIL
      ],
      endpoint: `flight/type/${id}`,
      method: 'PATCH',
      body
    }
  };
}

export function deleteType(id) {
  return {
    [CALL_API]: {
      types: [
        types.DELETE_TYPES,
        types.DELETE_TYPES_SUCCESS,
        types.DELETE_TYPES_FAIL
      ],
      endpoint: `flight/type/${id}`,
      method: 'DELETE',
      body: null
    }
  };
}
