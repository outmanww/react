import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Actions
import * as ApplicationActions from '../actions/application';
import * as MyProfileActions from '../actions/myProfile';
import * as InitializeActions from '../actions/initialize';
import { routeActions } from 'react-router-redux';
// Theme
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import MyTheme from '../theme/theme';
// Components
import { AppBar, Paper, IconButton, IconMenu, MenuItem, ThemeWrapper } from 'material-ui';
import Alert from '../components/Common/Alert';
import MainSidebar from '../components/MainSidebar/MainSidebar';
// Icons
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import SocialPublic from 'material-ui/lib/svg-icons/social/public';
var Breadcrumbs = require('react-breadcrumbs');


@ThemeDecorator(ThemeManager.getMuiTheme(MyTheme))
class App extends Component {
  constructor(props, context) {
    super(props, context);
    props.actions.fetchMyProfile();
    this.state = { open: true };
  }

  render() {
    const { locale, myProfile, alerts, children, routing, actions: {
      changeLocale, deleteSideAlerts, push
    }} = this.props;
    const { open } = this.state;

    const styles = {
      leftNav: {
        height: '100%',
        width: 230,
        position: 'fixed',
        textAlign: 'center',
        display: 'inline-block'   
      },
      appBar: {
        position: 'fixed',
        top: 0
      }
    }

    return (
      <div id="dashboard-container">
        <Alert alerts={alerts} deleteSideAlerts={deleteSideAlerts} />
        <AppBar
          style={styles.appBar}
          title="H works App"
          onLeftIconButtonTouchTap={() => this.setState({open: !open})}
          iconElementRight={
            <div>
              <IconMenu
                className="header-dropdown-user"
                iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
                <MenuItem
                  id="link-to-top"
                  primaryText="Top"
                  onTouchTap={() => window.location.href = '/droview'}
                  className="link-top"
                />
                <MenuItem
                  id="link-to-mypage"
                  primaryText="My Page"
                  onTouchTap={() => window.location.href = '/droview/reserve'}
                />
                <MenuItem
                  id="sign-out"
                  className="sign-out"
                  primaryText="Sign out"
                  onClick={() => window.location.href = '/logout'}
                />
              </IconMenu>
              <IconMenu
                id="header-dropdown-locale"
                iconButtonElement={<IconButton><SocialPublic /></IconButton>}
                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                anchorOrigin={{horizontal: 'right', vertical: 'top'}}>
                <MenuItem
                  primaryText="English"
                  onTouchTap={() => changeLocale('en')}
                />
                <MenuItem
                  primaryText="Japanese"
                  onTouchTap={() => changeLocale('ja')}
                />
              </IconMenu>
            </div>
          }
        />
        <Paper
          style={Object.assign({}, styles.leftNav, {left: open ? 0 : -230})}
        >
          <MainSidebar
            myProfile={myProfile}
            pathname={routing.location.pathname}
            push={push}/>
        </Paper>
        <Paper
          style={{marginLeft: open ? 230 : 0, marginTop: 64}}
        >
          {children}
        </Paper> 
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired,
  locale: PropTypes.string.isRequired,
  myProfile: PropTypes.object.isRequired,
  alerts: PropTypes.array,
  routing: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    locale: state.application.locale,
    myProfile: state.myProfile,
    alerts: state.alert.side,
    routing: state.routing
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign(
    ApplicationActions,
    MyProfileActions,
    InitializeActions,
    routeActions
  );
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
