import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
//Actions
import { routeActions } from 'react-router-redux';
import * as PinActions from '../../actions/pin/pin';
//Components
import RightMenu from './RightMenu';

class Pins extends Component {
  constructor(props, context) {
    super(props, context);
    this.props.actions.fetchPins();
  }

  render() {
    const { pins } = this.props;

    return (
      <div className="box box-success">
        <div className="box-header with-border">
          <h3 className="box-title">PinCode List</h3>
          <RightMenu/>
        </div>
        <div className="box-body">
          <BootstrapTable data={pins} pagination>
            <TableHeaderColumn
              dataField="pin"
              dataSort
              isKey>
              Code
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="numberOfTickets"
              dataSort>
              NumberOfTickets
            </TableHeaderColumn>
            <TableHeaderColumn
              dataField="createdAt"
              dataSort>
              Created
              </TableHeaderColumn>
          </BootstrapTable>
        </div>
      </div>
    );
  }
}

Pins.propTypes = {
  myId: PropTypes.number.isRequired,
  myRoles: PropTypes.array.isRequired,
  myPermissions: PropTypes.array.isRequired,
  pins: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  didInvalidate: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    myId: state.myProfile.id,
    myRoles: state.myProfile.assigneesRoles,
    myPermissions: state.myProfile.assigneesPermissions,
    pins: state.pins.pins,
    isFetching: state.pins.isFetching,
    didInvalidate: state.pins.didInvalidate,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign(routeActions, PinActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Pins);
