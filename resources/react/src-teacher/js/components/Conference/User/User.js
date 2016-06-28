import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
import { Line } from 'react-chartjs';
// Config
import { SCHOOL_NAME } from '../../../config/env';
// Actions
import * as DashboardActions from '../../actions/dashboard';
import * as LectureActions from '../../actions/lecture';
// Components
import { RaisedButton } from 'material-ui';
import Colors from 'material-ui/lib/styles/colors';
import Profile from './Profile';

class User extends Component {
  constructor(props, context) {
    super(props, context);
    const { fetchChartsTest } = props.actions;
    fetchChartsTest();
    this.state = {
      intervalId: null,
      interval: 10000,
      lineWidth: 0
    };
  }

  componentDidMount() {
    const { fetchChartsTest } = props.actions;
    const intervalId = setInterval(()=> {
      fetchChartsTest();
    }, this.state.interval);
    this.setState({intervalId});

    this.setState({
      lineWidth: document.getElementById('dashboard-line-wrap').clientWidth - 40
    });
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    const style = {
      minHeight: window.innerHeight - 64,
      background: Colors.grey50,
      padding: '0 60px 60px'
    };

    return (
      <div style={style}>
        <section className="content-header">
          <div className="row">
            <h3>ユーザー情報</h3>
          </div>
        </section>
        <section className="content">
          <Profile charts={this.props.charts}/>
        </section>
      </div>
    );
  }
}

User.propTypes = {
};

function mapStateToProps(state, ownProps) {
  return {
    charts: state.charts,
    routes: ownProps.routes
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign(LectureActions, DashboardActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
