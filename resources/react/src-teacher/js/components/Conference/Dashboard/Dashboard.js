import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
// Config
import { SCHOOL_NAME } from '../../../../config/env';
// Actions
import * as DashboardActions from '../../../actions/dashboard';
import * as LectureActions from '../../../actions/lecture';
// Components
import { RaisedButton } from 'material-ui';
import { Paper } from 'material-ui';
import Colors from 'material-ui/lib/styles/colors';
import Message from './Message';

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);
    const { fetchMessages } = props.actions;
    fetchMessages();
    this.state = {
      intervalId: null,
      interval: 15000
    };
  }

  componentDidMount() {
    const { fetchMessages } = this.props.actions;
    const intervalId = setInterval(()=> {
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
    const { messages, actions } = this.props;
    const style = {
      minHeight: window.innerHeight - 64,
      background: Colors.grey50,
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
            <div>
              <div className="row">
                <div className="panel panel-default room-info-wrap">
                  <div className="panel-heading">
                    <div className="row">
                      <div className="pull-left room-key-wrap">
                        <p><span>入室キー</span><span>タイトルをハードコード</span></p>
                      </div>
                      <RaisedButton
                        style={{width: 150, marginRight: 20, float:'right'}}
                        label="終了"
                        secondary={true}
                        onClick={() => actions.closeRoom(1)}
                      />
                      <RaisedButton
                        style={{width: 150, marginRight: 20, float:'right'}}
                        label="生徒用画面"
                        secondary={true}
                        onClick={() => this.openWindow()}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="row">
                    <Message messages={messages} name={true}/>
                  </div>                </div>
                <div className="col-md-6">
                  <div className="row">
                    <Message messages={messages} name={true}/>
                  </div>
                </div>
              </div>
            </div> :
            <div className="panel">
              <div className="panel-body">
                <h4 className="text-center">開講中の授業がありません</h4>
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
