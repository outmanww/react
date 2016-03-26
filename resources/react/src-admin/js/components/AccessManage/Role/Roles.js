import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//Actions
import * as AccessRoleActions from '../../../actions/access/role';
//Components
import { Paper } from 'material-ui';
import RightMenu from '../RightMenu';
import RolesTableBody from './RolesTableBody';

class Roles extends Component {
  componentDidMount() {
    const { fetchRoles } = this.props.actions;
    fetchRoles();
  }

  render() {
    const { myId, myRoles, myPermissions, roles, isFetching, didInvalidate, asyncStatus, actions } = this.props;

    return (
      <Paper zDepth={1}>
        <div className="box-header with-border">
          <h3 className="box-title">All Roles</h3>
          <RightMenu/>
        </div>
        <div className="box-body">
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th>Role</th>
                  <th>Permissions</th>
                  <th>Number of Users</th>
                  <th>Sort</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {!didInvalidate && !isFetching && roles &&
              <RolesTableBody
                myId={myId}
                myRoles={myRoles}
                myPermissions={myPermissions}
                roles={roles}
                asyncStatus={asyncStatus}
                actions={actions}/>}
            </table>
          </div>
        </div>
      </Paper>
    );
  }
}

Roles.propTypes = {
  myId: PropTypes.number.isRequired,
  myRoles: PropTypes.array.isRequired,
  myPermissions: PropTypes.array.isRequired,
  roles: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  didInvalidate: PropTypes.bool.isRequired,
  asyncStatus: PropTypes.object,
  path: PropTypes.string.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    myId: state.myProfile.id,
    myRoles: state.myProfile.assigneesRoles,
    myPermissions: state.myProfile.assigneesPermissions,
    roles: state.roles.roles,
    isFetching: state.roles.isFetching,
    didInvalidate: state.roles.didInvalidate,
    asyncStatus: state.roles.asyncStatus,
    path: state.routing.path
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AccessRoleActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Roles);
