import React, { PropTypes, Component } from 'react';

class PermissionsTableBody extends Component {
  renderPermissions() {
    const { permissions } = this.props;

    return permissions.map(p =>
      <tr key={p.id} className="tr-disabled-aaa">
        <td>{p.name}</td>
        <td>{p.displayName}</td>
        <td>{p.dependencies.toString()}</td>
        <td><span className="label label-danger">None</span></td>
        <td>{p.roles.toString()}<br/></td>
        <td>{p.sort}</td>
        <td><span className="label label-danger">Yes</span></td>
      </tr>
    );
  }

  render() {
    return (
      <tbody>
        {this.renderPermissions()}
      </tbody>
    );
  }
}

PermissionsTableBody.propTypes = {
  myId: PropTypes.number.isRequired,
  myRoles: PropTypes.array.isRequired,
  myPermissions: PropTypes.array.isRequired,
  permissions: PropTypes.array.isRequired,
};

export default PermissionsTableBody;
