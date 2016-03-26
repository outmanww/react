import {
  CHECK_DB,
  CHECK_DB_SUCCESS,
  CHECK_DB_FAIL,
} from '../../constants/TestActionTypes';

const initialState = {
  database: null,
  isFetching: false,
  didInvalidate: false,
};

export default function database(state = initialState, action) {
  switch (action.type) {
    case CHECK_DB:
      return Object.assign({}, state, {
        database: null,
        isFetching: true,
        didInvalidate: false,
      });

    case CHECK_DB_SUCCESS:
      return Object.assign({}, state, {
        database: action.payload,
        isFetching: false,
        didInvalidate: false,
      });

    case CHECK_DB_FAIL:
      return Object.assign({}, state, {
        database: null,
        isFetching: false,
        didInvalidate: true,
      });

    default:
      return state;
  }
}
