import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { routerMiddleware } from 'react-router-redux';
import { devTools, persistState as persistDevToolsState } from 'redux-devtools';
import createLogger from 'redux-logger';
import persistState from 'redux-localstorage';

import Middlewares from '../middleware';
import rootReducer from '../reducers';

const logger = createLogger({
  level: 'info',
  duration: true
});

const reduxRouterMiddleware = routerMiddleware(browserHistory);

Middlewares.push(logger, reduxRouterMiddleware);
// Middlewares.push(reduxRouterMiddleware);

const createStoreWithMiddleware = compose(
  applyMiddleware(...Middlewares),
  persistState(['application']),
)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);
  return store;
}