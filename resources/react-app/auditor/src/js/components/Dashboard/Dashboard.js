import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
// Config
import { SCHOOL_NAME } from '../../../config/env';
// Actions
import * as DashboardActions from '../../actions/dashboard';
import * as LectureActions from '../../actions/lecture';
// Components
import { RaisedButton } from 'material-ui';
import { Paper } from 'material-ui';
import { grey50 } from 'material-ui/styles/colors';

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);
    const { fetchCharts, fetchMessages } = props.actions;
    fetchCharts();
    fetchMessages();
    this.state = {
      intervalId: null,
      interval: 15000
    };
  }

  componentDidMount() {
    const { fetchCharts, fetchMessages } = this.props.actions;
    const intervalId = setInterval(()=> {
      fetchCharts();
      fetchMessages();
    }, this.state.interval);
    this.setState({intervalId});
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  openWindow() {
    window.open(
      `/${SCHOOL_NAME}/teacher/student`,
      '_blank',
      'top=50,left=50,width=1200,height=650,scrollbars=1,location=0,menubar=0,toolbar=0,status=1,directories=0,resizable=1'
    );
  }

  render() {
    const { charts, messages, actions } = this.props;
    const style = {
      minHeight: window.innerHeight - 64,
      background: grey50,
      padding: '0 60px 60px'
    };

    return (
      <div style={style}>
        <section className="content-header">
          <div className="row">
            <h3>ダッシュボード</h3>
          </div>
        </section>
        <section className="content">

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
    messages: state.dashboardMessages,
    routes: ownProps.routes
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign(LectureActions, DashboardActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
