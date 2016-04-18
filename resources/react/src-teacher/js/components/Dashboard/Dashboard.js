import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Actions
import * as DashboardActions from '../../actions/dashboard';
// Components
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Paper } from 'material-ui';
import Colors from 'material-ui/lib/styles/colors';
import Charts from './Charts';

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);
    const { fetchCharts } = props.actions;
    fetchCharts();
    this.state = {
      intervalId: null
    };
  }

  componentDidMount() {
    const { fetchCharts } = this.props.actions;
    const intervalId = setInterval(()=> {
      fetchCharts();
    }, 1000);
    this.setState({intervalId});
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    const { charts } = this.props;
    const style = {
      minHeight: window.innerHeight - 64,
      background: Colors.blueGrey50,
      padding: '0 40px 40px'
    };

    return (
      <div style={style}>
        <section className="content-header">
          <h3>Dashboard</h3>
        </section>
        <section className="content">
          {charts.charts !== null &&
            <Charts charts={charts.charts}/>
          }
        </section>
      </div>
    );
  }
}

Dashboard.propTypes = {
};

function mapStateToProps(state, ownProps) {
  return {
    charts: state.dashboardCharts,
    routes: ownProps.routes
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign({}, DashboardActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
