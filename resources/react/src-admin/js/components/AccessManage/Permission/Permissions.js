import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//Actions
import * as AccessPermissionActions from '../../../actions/access/permission';
//Components
import RightMenu from '../RightMenu';
import PermissionsTableBody from './PermissionsTableBody';

class Permissions extends Component {
  componentDidMount() {
    const { fetchPermissions } = this.props.actions;
    fetchPermissions();
  }

  render() {
    const { myId, myRoles, myPermissions, permissions, isFetching, didInvalidate } = this.props;

    return (
      <div className="box box-success">
        <div className="box-header with-border">
          <h3 className="box-title">Active Users</h3>
          <RightMenu/>
        </div>
        <div className="box-body">
          <table className="table table-striped table-bordered table-hover">
            <thead>
              <tr>
                <th>Permission</th>
                <th>Name</th>
                <th>Dependencies</th>
                <th>Users</th>
                <th>Roles</th>
                <th>Group Sort</th>
                <th>System</th>
              </tr>
            </thead>
            {!didInvalidate && !isFetching && permissions &&
            <PermissionsTableBody
              myId={myId}
              myRoles={myRoles}
              myPermissions={myPermissions}
              permissions={permissions}/>}
          </table>
        </div>
      </div>
    );
  }
}

Permissions.propTypes = {
  myId: PropTypes.number.isRequired,
  myRoles: PropTypes.array.isRequired,
  myPermissions: PropTypes.array.isRequired,
  permissions: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  didInvalidate: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    myId: state.myProfile.id,
    myRoles: state.myProfile.assigneesRoles,
    myPermissions: state.myProfile.assigneesPermissions,
    permissions: state.permissions.permissions,
    isFetching: state.permissions.isFetching,
    didInvalidate: state.permissions.didInvalidate,
    asyncStatus: state.permissions.asyncStatus,
    path: state.routing.path
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AccessPermissionActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Permissions);
