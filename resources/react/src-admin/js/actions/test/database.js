import * as types from '../../constants/TestActionTypes';
import { CALL_API } from '../../middleware/fetchMiddleware';

export function checkDB() {
  return {
    [CALL_API]: {
      types: [
        types.CHECK_DB,
        types.CHECK_DB_SUCCESS,
        types.CHECK_DB_FAIL
      ],
      endpoint: 'dbcheck',
      method: 'GET',
      body: null
    }
  };
}
