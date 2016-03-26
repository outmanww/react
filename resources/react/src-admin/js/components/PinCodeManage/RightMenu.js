import React, { Component } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import { Link } from 'react-router';
//Config
import { _ADMIN_DOMAIN_NAME } from '../../../config/env';

class RightMenu extends Component {
  render() {
    return (
      <div className="box-tools pull-right">
        <div className="pull-right" style={{ marginBottom: 10 }}>
          <ButtonGroup>
            <Button bsStyle="primary" bsSize="small" title="Users">
              <Link to={`${_ADMIN_DOMAIN_NAME}pins`} activeClassName="active">List</Link>
            </Button>
            <Button bsStyle="primary" bsSize="small" title="Roles">
              <Link to={`${_ADMIN_DOMAIN_NAME}pins/generate`} activeClassName="active">Generate</Link>
            </Button>
          </ButtonGroup>
        </div>
        <div className="clearfix" />
      </div>
    );
  }
}

RightMenu.propTypes = {
};

export default RightMenu;
