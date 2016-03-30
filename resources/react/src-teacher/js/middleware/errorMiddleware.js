import * as types from '../constants/ActionTypes';

export default store => next => action => {
  const { type, payload, error, meta } = action;
  if (!error) {
    return next(action);
  }

  const { status, messageId, value, ...rest } = payload;
  next({ type, payload: { ...rest }, meta });
  next({
    type: types.ADD_SIDE_ALERT,
    status,
    messageId,
    value
  });
};
