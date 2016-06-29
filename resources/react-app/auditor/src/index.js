import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
// import createBrowserHistory from 'history/lib/createBrowserHistory';
// import { useRouterHistory } from 'react-router';
import { browserHistory } from 'react-router'
import Root from './js/containers/Root';
import configureStore from './js/store/configureStore';
import { SCHOOL_NAME } from './config/env';

// baseURLを使うとreact-router-reduxのpushが動かなくなる
// const browserHistory = useRouterHistory(createBrowserHistory)({
//   basename: `/${SCHOOL_NAME}/teacher`
// })

const store = configureStore({}, browserHistory);

render(
  <Root history={browserHistory} store={store}/>,
  document.getElementById('root')
);
