import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';
import { devTools, persistState as persistDevToolsState } from 'redux-devtools';
import createLogger from 'redux-logger';
import persistState from 'redux-localstorage';

import Middlewares from '../middleware';
import rootReducer from '../reducers';

const reduxRouterMiddleware = syncHistory(browserHistory);

Middlewares.push(reduxRouterMiddleware);

const createStoreWithMiddleware = compose(
  applyMiddleware(...Middlewares),
  persistState(['application']),
)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);
  return store;
}