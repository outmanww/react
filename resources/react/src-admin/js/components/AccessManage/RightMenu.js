import React, { Component } from 'react';
import { ButtonGroup, DropdownButton, MenuItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
//Config
import { _ADMIN_DOMAIN_NAME } from '../../../config/env';

class RightMenu extends Component {
  render() {
    return (
      <div className="box-tools pull-right">
        <div className="pull-right" style={{ marginBottom: 10 }}>
          <ButtonGroup>
            <DropdownButton bsStyle="primary" bsSize="small" title="Users">
              <LinkContainer to={{
                pathname: `${_ADMIN_DOMAIN_NAME}access/users`,
                query: { filter: 'all' } }}>
                <MenuItem eventKey="1">All User</MenuItem>
              </LinkContainer>
              <LinkContainer to={{
                pathname: `${_ADMIN_DOMAIN_NAME}access/users`,
                query: { filter: 'active' } }}>
                <MenuItem eventKey="2">Active User</MenuItem>
              </LinkContainer>
              <LinkContainer to={{
                pathname: `${_ADMIN_DOMAIN_NAME}access/users`,
                query: { filter: 'deactivated' } }}>
                <MenuItem eventKey="3">Deactivated User</MenuItem>
              </LinkContainer>
              <MenuItem divider />
              <LinkContainer to={{
                pathname: `${_ADMIN_DOMAIN_NAME}access/user/create` }}>
                <MenuItem eventKey="4">Create User</MenuItem>
              </LinkContainer>
              <MenuItem divider />
              <LinkContainer to={{
                pathname: `${_ADMIN_DOMAIN_NAME}access/users`,
                query: { filter: 'deleted' } }}>
                <MenuItem eventKey="5">Deleted Users</MenuItem>
              </LinkContainer>
            </DropdownButton>
            <DropdownButton bsStyle="primary" bsSize="small" title="Roles">
              <LinkContainer to={{ pathname: `${_ADMIN_DOMAIN_NAME}access/roles` }}>
                <MenuItem eventKey="1">All Roles</MenuItem>
              </LinkContainer>
              <LinkContainer to={{ pathname: `${_ADMIN_DOMAIN_NAME}access/roles/create` }}>
                <MenuItem eventKey="2">Create Role</MenuItem>
              </LinkContainer>
            </DropdownButton>
            <DropdownButton bsStyle="primary" bsSize="small" title="Permissions">
              <LinkContainer to={{ pathname: `${_ADMIN_DOMAIN_NAME}access/permissions` }}>
                <MenuItem eventKey="1">All Permissions</MenuItem>
              </LinkContainer>
            </DropdownButton>
          </ButtonGroup>
        </div>
        <div className="clearfix" />
      </div>
    );
  }
}

export default RightMenu;
