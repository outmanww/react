import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Actions
import * as DatabaseActions from '../../actions/test/database';
// Components
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Paper } from 'material-ui';
import Colors from 'material-ui/lib/styles/colors';

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);
    props.actions.checkDB();
  }

  render() {
    const { database } = this.props;
    return (
      <div style={{ minHeight: '600px', background: Colors.blueGrey50}}>
        <section className="content-header">
          <h1>Dashboard</h1>
          {database.database &&
            <div style={{paddingTop: 30}}>
              <div className="col-xs-6">
                <BootstrapTable data={database.database.user}>
                  <TableHeaderColumn dataField="userId" isKey={true}>User ID</TableHeaderColumn>
                  <TableHeaderColumn dataField="reservations">Reservations</TableHeaderColumn>
                </BootstrapTable>
              </div>
              <div className="col-xs-6">
                <BootstrapTable data={database.database.flight}>
                  <TableHeaderColumn dataField="flightId" isKey={true}>Flight ID</TableHeaderColumn>
                  <TableHeaderColumn dataField="reservations">Reservations</TableHeaderColumn>
                </BootstrapTable>
              </div>
            </div>
          }
        </section>
      </div>
    );
  }
}

Dashboard.propTypes = {
  database: PropTypes.object,
};

function mapStateToProps(state) {
  return {
    database: state.database
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign({}, DatabaseActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
