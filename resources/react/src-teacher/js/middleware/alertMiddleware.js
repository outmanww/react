import * as types from '../constants/ActionTypes';

export default store => next => action => {
  if (action.type !== types.ADD_SIDE_ALERT) {
    return next(action);
  }

  const key = Date.now();

  next({ key, ...action });
  setTimeout(() => next({
    type: types.DELETE_SIDE_ALERT,
    keys: [key]
  }), 5000);
};
