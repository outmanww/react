import * as types from '../constants/ActionTypes';

export default store => next => action => {
  if (action.type !== types.ADD_ALERT) {
    return next(action);
  }

  const timestamp = Date.now();

  next({ meta: { timestamp }, ...action });

  setTimeout(() => next({
    type: types.DELETE_ALERT,
    key: [timestamp]
  }), 5000);
};
