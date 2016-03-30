import { callApi } from '../utils/FetchUtils';

export const CALL_API = Symbol('Call API');

export default store => next => action => {
  const callAPI = action[CALL_API];
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  let { endpoint } = callAPI;
  const { types, method, body } = callAPI;

  if (typeof endpoint === 'function') {
    endpoint = endpoint(store.getState());
  }
  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }
  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }
  if (!types.every(type => typeof type === 'string')) {
    throw new Error(`Expected action types to be strings. ${types} supplied.`);
  }

  function actionWith(data) {
    return {
      type: data.type,
      payload: Object.assign({}, action.payload, data.payload),
      error: data.error,
      meta: Object.assign({}, action.meta, data.meta)
    };
  }

  const [requestType, successType, failureType] = types;
  const timestamp = new Date().getTime();

  next(actionWith({
    type: requestType,
    meta: { timestamp }
  }));

  return callApi(endpoint, method, body).then(
    response => {
      next(actionWith({
        type: successType,
        payload: response,
        error: false,
        meta: { timestamp }
      }));

      if (
        typeof action.meta !== 'undefined' &&
        typeof action.meta.actionsOnSuccess !== 'undefined'
      ) {
        if (!Array.isArray(action.meta.actionsOnSuccess)) {
          throw new Error(`Expected actionsOnSuccess to be array. ${action.meta.actionsOnSuccess} supplied.`);
        }

        action.meta.actionsOnSuccess.forEach(childAction => {
          if (typeof childAction === 'function') {
            store.dispatch(childAction(response));
          } else {
            store.dispatch(childAction);
          }
        });
      }
    },
    error => {
      next(actionWith({
        type: failureType,
        payload: {
          status: 'danger',
          messageId: typeof error === 'string' ? error : 'unexpected'
        },
        error: true,
        meta: { timestamp }
      }));

      if (
        typeof action.meta !== 'undefined' &&
        typeof action.meta.actionsOnFail !== 'undefined'
      ) {
        if (!Array.isArray(action.meta.actionsOnFail)) {
          throw new Error(`Expected actionsOnFail to be array. ${action.meta.actionsOnFail} supplied.`);
        }

        action.meta.actionsOnFail.forEach(childAction => {
          if (typeof childAction === 'function') {
            store.dispatch(childAction(error));
          } else {
            store.dispatch(childAction);
          }
        });
      }
    }
  );
};
