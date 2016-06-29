import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Config
import { SCHOOL_NAME } from '../../config/env';
// Actions
import * as InitializeActions from '../actions/initialize';
import * as UserActions from '../actions/user';
import { push } from 'react-router-redux';
// Components
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { AppBar, Paper, IconButton, IconMenu, MenuItem } from 'material-ui';
import Alert from '../components/Common/Alert';
// Icons
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import SocialPublic from 'material-ui/svg-icons/social/public';

class App extends Component {
  constructor(props, context) {
    super(props, context);
    props.actions.fetchInfo();
  }

  render() {
    const { locale, user, alerts, children, routing, actions } = this.props;

    return (
      <MuiThemeProvider>
        <div id="dashboard-container">
          <Alert alerts={alerts} deleteSideAlerts={actions.deleteSideAlerts} />
          <AppBar
            title="Title"
            iconElementLeft={<IconButton><NavigationClose /></IconButton>}
            iconElementRight={
              <IconMenu
                iconButtonElement={
                  <IconButton><MoreVertIcon /></IconButton>
                }
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              >
                <MenuItem primaryText="Refresh" />
                <MenuItem primaryText="Help" />
                <MenuItem primaryText="Sign out" />
              </IconMenu>
            }
          />
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
  user: PropTypes.object.isRequired,
  locale: PropTypes.string.isRequired,
  alerts: PropTypes.array,
  routing: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    locale: state.application.locale,
    alerts: state.alert.side,
    routing: ownProps
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign(
    InitializeActions,
    UserActions,
    { push: push }
  );

  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
