import * as types from '../constants/ActionTypes';

export default store => next => action => {
  const { type, payload, error, meta } = action;
  if (!error) {
    return next(action);
  }

  const { status, message, ...rest } = payload;

  next({ type, payload: { ...rest }, meta });
  next({
    type: types.ADD_ALERT,
    payload: { status, message }
  });
};
