import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, Redirect } from 'react-router';
import { Provider, connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
//import DevTools from './DevTools';
import * as i18n from '../../local';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

//Components
import App from './App';
import Dashboard from '../components/Dashboard/Dashboard';

export default class Root extends Component {
  render() {
    const { history, store, locale } = this.props;
    return (
      <Provider store={store}>
        <div>
          <IntlProvider key="intl" locale={locale} messages={i18n[locale]}>
            <Router history={history}>
              <Route name="Top" path="/" component={App}>
                <Route name="Dashboard" path="dashboard" component={Dashboard}/>
              </Route>
            </Router>
          </IntlProvider>
          {/*<DevTools/>*/}
        </div>
      </Provider>
    );
  }
}

Root.propTypes = {
  locale: PropTypes.string.isRequired
};

function mapStateToProps(state) {
  return {
    locale: state.application.locale
  };
}

export default connect(mapStateToProps)(Root);
