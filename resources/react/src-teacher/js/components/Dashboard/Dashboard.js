import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Actions
import * as DashboardActions from '../../actions/dashboard';
// Components
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Paper } from 'material-ui';
import Colors from 'material-ui/lib/styles/colors';
import PieCharts from './PieCharts';
import LineChart from './LineChart';
import Message from './Message';

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
    }, 5000);
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
          <div className="raw">
            <div className="col-md-8">
              <div className="raw">
                {charts.pie !== null &&
                  <PieCharts pie={charts.pie}/>
                }
              </div>
              <div className="raw">
                {charts.line !== null &&
                  <LineChart line={charts.line}/>
                }
              </div>
            </div>
            <div className="col-md-4">
              <div className="raw">
                <Message messages={{}}/>
              </div>
            </div>
          </div>
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
