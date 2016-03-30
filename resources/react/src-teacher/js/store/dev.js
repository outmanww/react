import { createStore, applyMiddleware, compose } from 'redux';
import { browserHistory } from 'react-router';
import { syncHistory } from 'react-router-redux';
import { devTools, persistState as persistDevToolsState } from 'redux-devtools';
import createLogger from 'redux-logger';
import persistState from 'redux-localstorage';

import Middlewares from '../middleware';
import rootReducer from '../reducers';
//import { persistState as persistDevToolsState } from 'redux-devtools';
//import DevTools from '../containers/DevTools';

// Sync dispatched route actions to the history
const reduxRouterMiddleware = syncHistory(browserHistory);

// Sync dispatched route actions to the history
const logger = createLogger({
  level: 'info',
  duration: true
});

Middlewares.push(logger, reduxRouterMiddleware);

//persistStateはdevToolsより上に記述
const createStoreWithMiddleware = compose(
  applyMiddleware(...Middlewares),
  persistState(['application']),
  //devTools(),
  //DevTools.instrument(),
  //persistDevToolsState(window.location.href.match(/[?&]debug_session=([^&]+)\b/)),
)(createStore);

export default function configureStore(initialState) {
  const store = createStoreWithMiddleware(rootReducer, initialState);
  // Required for replaying actions from devtools to work
  reduxRouterMiddleware.listenForReplays(store);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
