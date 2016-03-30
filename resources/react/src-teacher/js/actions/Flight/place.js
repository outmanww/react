import * as types from '../../constants/PlaceActionTypes';
import { CALL_API } from '../../middleware/fetchMiddleware';
import { push } from 'react-router-redux';

export function fetchPlaces() {
  return {
    [CALL_API]: {
      types: [
        types.REQUEST_PLACES,
        types.REQUEST_PLACES_SUCCESS,
        types.REQUEST_PLACES_FAIL
      ],
      endpoint: 'flight/places/fetch',
      method: 'GET',
      body: null
    }
  };
}

export function createPlace(body) {
  const data = new FormData();

  for (const i in body) {
    if (body[i] !== '') {
      data.append(i, body[i]);
    }
  }

  return {
    [CALL_API]: {
      types: [
        types.CREATE_PLACE,
        types.CREATE_PLACE_SUCCESS,
        types.CREATE_PLACE_FAIL
      ],
      endpoint: 'flight/place',
      method: 'POST',
      body: data
    },
    meta: {
      actionsOnSuccess: [
        push('/admin/single/flight/places')
      ]
    }
  };
}

export function updatePlace(id, body) {
  const data = new FormData();

  for (const i in body) {
    if (body[i] !== '') {
      data.append(i, body[i]);
    }
  }

  return {
    [CALL_API]: {
      types: [
        types.UPDATE_PLACE,
        types.UPDATE_PLACE_SUCCESS,
        types.UPDATE_PLACE_FAIL
      ],
      endpoint: `flight/place/${id}/update`,
      method: 'POST',
      body: data
    },
    meta: {
      actionsOnSuccess: [
        push('/admin/single/flight/places')
      ]
    }
  };
}

export function deletePlace(id) {
  return {
    [CALL_API]: {
      types: [
        types.DELETE_PLACE,
        types.DELETE_PLACE_SUCCESS,
        types.DELETE_PLACE_FAIL
      ],
      endpoint: `flight/place/${id}`,
      method: 'DELETE',
      body: null
    },
    meta: {
      actionsOnSuccess: [
        push('/admin/single/flight/places')
      ]
    }
  };
}
