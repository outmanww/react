import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import Root from './js/containers/Root';
import configureStore from './js/store/configureStore';
import { addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import ja from 'react-intl/locale-data/ja';

const store = configureStore();

addLocaleData(en);
addLocaleData(ja);

render(
  <Provider store={store}>
    <Root/>
  </Provider>,
  document.getElementById('root')
);
