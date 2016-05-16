import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Config
import { SCHOOL_NAME } from '../../config/env';
// Actions
import * as InitializeActions from '../actions/initialize';
import * as UserActions from '../actions/user';
import { push } from 'react-router-redux';
// Theme
import ThemeManager from 'material-ui/lib/styles/theme-manager';
import ThemeDecorator from 'material-ui/lib/styles/theme-decorator';
import MyTheme from '../theme/theme';
// Components
import { AppBar, Paper, IconButton, IconMenu, MenuItem, ThemeWrapper } from 'material-ui';
import Alert from '../components/Common/Alert';
import MainSidebar from '../components/Common/MainSidebar';
// Icons
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import SocialPublic from 'material-ui/lib/svg-icons/social/public';
var Breadcrumbs = require('react-breadcrumbs');

@ThemeDecorator(ThemeManager.getMuiTheme(MyTheme))
class App extends Component {
  constructor(props, context) {
    super(props, context);
    props.actions.fetchInfo();
    this.state = { open: true };
  }

  render() {
    const { locale, user, alerts, children, routing, actions } = this.props;
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
        <Alert alerts={alerts} deleteSideAlerts={actions.deleteSideAlerts} />
        <AppBar
          style={styles.appBar}
          title="Re:act"
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
                  onTouchTap={() => window.location.href = '/schools'}
                  className="link-top"
                />
                <MenuItem
                  id="sign-out"
                  className="sign-out"
                  primaryText="Sign out"
                  onClick={() => window.location.href =  `/${SCHOOL_NAME}/signout`}
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
        {user.user !== null && !user.isFetching && !user.user.confirmed &&
          <div className="global-alert">
            <p>管理者によるユーザー確認が完了していないため、授業の新規登録及び講義の開講は実行できません</p>
          </div>
        }
        <Paper
          style={Object.assign({}, styles.leftNav, {left: open ? 0 : -230})}
        >
          <MainSidebar
            user={user}
            pathname={routing.location.pathname}
            push={actions.push}/>
        </Paper>
        <Paper
          style={{
            marginLeft: open ? 230 : 0,
            marginTop: user.user !== null && !user.isFetching && !user.user.confirmed ? 114 : 64
          }}
        >
          {children}
        </Paper> 
      </div>
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
