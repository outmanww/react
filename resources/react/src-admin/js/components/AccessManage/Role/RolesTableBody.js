import React, { PropTypes, Component } from 'react';
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Icon from 'react-fa';
//Config
import { _ADMIN_DOMAIN_NAME } from '../../../../config/env';
//Utility
import { hasPermission } from '../../../utils/PermissionUtils';

class RolesTableBody extends Component {
  handleClick(e) {
    const { id, action } = e;
    const { asyncStatus, actions: { deleteRole } } = this.props;

    if (!asyncStatus[id]) {
      switch (action) {
        case 'destroy': deleteRole(id); break;
        default: break;
      }
    }
  }

  renderRoles() {
    const { myRoles, myPermissions, roles, asyncStatus } = this.props;

    return roles.map(r =>
      <tr key={r.id} className="tr-disabled-aaa">
        <td>{r.name}</td>
        {r.all === 1 ?
          <td><span className="label label-success">All</span></td> :
          <td>{r.permissions.toString()}</td>}
        <td>{r.numberOfUsers}</td>
        <td>{r.sort}</td>
        <td>
          {hasPermission(myRoles, myPermissions, 'edit-roles') &&
          <LinkContainer to={{ pathname: `${_ADMIN_DOMAIN_NAME}access/roles/${r.id}/edit` }}>
            <OverlayTrigger placement="top" overlay={(<Tooltip>Edit</Tooltip>)}>
              <Button bsStyle="primary" bsSize="xsmall"><Icon name="pencil"/></Button>
            </OverlayTrigger>
          </LinkContainer>}
          {hasPermission(myRoles, myPermissions, 'delete-roles') &&
          <OverlayTrigger placement="top" overlay={(<Tooltip>Delete</Tooltip>)}>
            <Button bsStyle="danger" bsSize="xsmall" onClick={this.handleClick.bind(this, { id: r.id, action: 'destroy' })}>
              {asyncStatus[r.id] === 'destroy' ? <Icon spin name="trash"/> : <Icon name="trash"/>}
            </Button>
          </OverlayTrigger>}
        </td>
      </tr>
    );
  }

  render() {
    return (
      <tbody>
        {this.renderRoles()}
      </tbody>
    );
  }
}

RolesTableBody.propTypes = {
  myId: PropTypes.number.isRequired,
  myRoles: PropTypes.array.isRequired,
  myPermissions: PropTypes.array.isRequired,
  roles: PropTypes.array.isRequired,
  asyncStatus: PropTypes.object,
  actions: PropTypes.object.isRequired
};

export default RolesTableBody;
