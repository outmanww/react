import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Config
import { SCHOOL_NAME } from '../../config/env';
// Actions
import * as InitializeActions from '../actions/initialize';
import { push } from 'react-router-redux';
// Components
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Paper, IconButton, IconMenu, MenuItem } from 'material-ui';
import Alert from '../components/Common/Alert';
// Icons
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import SocialPublic from 'material-ui/svg-icons/social/public';

class App extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { locale, user, alerts, children, routing, actions } = this.props;

    return (
      <MuiThemeProvider>
        <div id="dashboard-container">
          <Alert alerts={alerts} deleteSideAlerts={actions.deleteSideAlerts} />
          <Paper>
            {children}
          </Paper> 
        </div>
      </MuiThemeProvider>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  alerts: PropTypes.array,
  routing: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    alerts: state.alert,
    routing: ownProps
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign(
    InitializeActions,
    { push: push }
  );

  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
