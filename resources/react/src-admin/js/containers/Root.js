import React, { Component, PropTypes } from 'react';
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router';
import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
//import DevTools from './DevTools';
//Config
import * as i18n from '../../local';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

//Components
import App from './App';
import Dashboard from '../components/Dashboard/Dashboard';
import AccessManage from '../components/AccessManage/AccessManage';
import Users from '../components/AccessManage/User/Users';
import CreateUser from '../components/AccessManage/User/CreateUser';
import EditUser from '../components/AccessManage/User/EditUser';
import ChangePassword from '../components/AccessManage/User/ChangePassword';
import Roles from '../components/AccessManage/Role/Roles';
import CreateRoles from '../components/AccessManage/Role/CreateRoles';
import EditRoles from '../components/AccessManage/Role/EditRoles';
import Permissions from '../components/AccessManage/Permission/Permissions';

import PinCodeManage from '../components/PinCodeManage/PinCodeManage';
import Pins from '../components/PinCodeManage/Pins';
import GeneratePin from '../components/PinCodeManage/GeneratePin';

import FlightManage from '../components/FlightManage/FlightManage';
import Plan from '../components/FlightManage/Plan/Plan';
import PlansList from '../components/FlightManage/Plan/PlansList';
import EditPlan from '../components/FlightManage/Plan/EditPlan';
import EditTimetable from '../components/FlightManage/Plan/Timetable/EditTimetable';

import Types from '../components/FlightManage/Type/Types';

import Place from '../components/FlightManage/Place/Place';
import PlacesList from '../components/FlightManage/Place/PlacesList';
import EditPlace from '../components/FlightManage/Place/EditPlace';
import CreatePlace from '../components/FlightManage/Place/CreatePlace';

export default class Root extends Component {
  render() {
    const { locale } = this.props;
    return (
      <div>
        <IntlProvider key="intl" locale={locale} messages={i18n[locale]}>
          <Router history={browserHistory}>
            <Redirect from="/admin/single" to="/admin/single/dashboard"/>
            <Route name="Top" path="/admin/single" component={App}>
              <Route name="Dashboard" path="dashboard" component={Dashboard}/>

              <Redirect from="access" to="access/users"/>
              <Route name="Accsee Management" path="access" component={AccessManage}>
                <Route name="Users" path="users" component={Users}/>
                <Route name="Create User" path="user/create" component={CreateUser}/>
                <Route name="Edit User" path="user/:id/edit" component={EditUser}/>
                <Route name="Change Password" path="user/:id/password/change" component={ChangePassword}/>
                <Route name="Roles" path="roles" component={Roles}/>
                <Route name="Create Role" path="roles/create" component={CreateRoles}/>
                <Route name="Edit Roles" path="roles/:id/edit" component={EditRoles}/>
                <Route name="Permissions" path="permissions" component={Permissions}/>
              </Route>

              <Redirect from="flight" to="flight/plans"/>
              <Route name="Flight Management" path="flight" component={FlightManage}>
                <Route name="Plan" path="plans" component={Plan}>
                  <IndexRoute component={PlansList}/>
                  <Route name="Timetable" path=":id/timetable" component={EditTimetable}/>
                  <Route name="Edit" path=":id/edit" component={EditPlan}/>
                </Route>

                <Route name="Type" path="types" component={Types}/>

                <Route name="places" path="places" component={Place}>
                  <IndexRoute component={PlacesList}/>
                  <Route name="Edit" path=":id/edit" component={EditPlace}/>
                  <Route name="Create" path="create" component={CreatePlace}/>
                </Route>
              </Route>

              <Redirect from="pins" to="pins/list"/>
              <Route path="pins" component={PinCodeManage}>
                <Route path="list" component={Pins}/>
                <Route path="generate" component={GeneratePin}/>
              </Route>
            </Route>
          </Router>
        </IntlProvider>
        {/*<DevTools/>*/}
      </div>
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
