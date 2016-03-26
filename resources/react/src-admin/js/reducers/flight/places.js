import * as types from '../../constants/PlaceActionTypes';

const initialState = {
  isFetching: false,
  didInvalidate: false,
  places: [],
  updatedAt: 0,
  partialUpdatedAt: 0
};

export default function places(state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_PLACES:
    case types.UPDATE_PLACE:
    case types.CREATE_PLACE:
    case types.DELETE_PLACE:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });

    case types.REQUEST_PLACES_SUCCESS:
    case types.CREATE_PLACE_SUCCESS:
    case types.UPDATE_PLACE_SUCCESS:
    case types.DELETE_PLACE_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        places: action.payload.places,
        updatedAt: action.meta.timestamp,
      });

    case types.REQUEST_PLACES_FAIL:
    case types.UPDATE_PLACE_FAIL:
    case types.CREATE_PLACE_FAIL:
    case types.DELETE_PLACE_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: true,
        updatedAt: action.meta.timestamp,
      });

    default:
      return state;
  }
}
