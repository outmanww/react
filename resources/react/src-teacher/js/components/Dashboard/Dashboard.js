import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
// Actions
import * as DashboardActions from '../../actions/dashboard';
// Components
import { RaisedButton } from 'material-ui';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
import { Paper } from 'material-ui';
import Colors from 'material-ui/lib/styles/colors';
import PieCharts from './PieCharts';
import LineChart from './LineChart';
import Message from './Message';

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);
    const { fetchCharts, fetchMessages } = props.actions;
    fetchCharts();
    fetchMessages();
    this.state = {
      intervalId: null
    };
  }

  componentDidMount() {
    const { fetchCharts, fetchMessages } = this.props.actions;
    const intervalId = setInterval(()=> {
      fetchCharts();
      fetchMessages();
    }, 100000);
    this.setState({intervalId});
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    const { charts, messages } = this.props;
    const weekdays = {
      '1': '月曜日',
      '2': '火曜日',
      '3': '水曜日',
      '4': '木曜日',
      '5': '金曜日',
      '6': '土曜日',
      '0': '日曜日'
    };
    const style = {
      minHeight: window.innerHeight - 64,
      background: Colors.blueGrey50,
      padding: '0 40px 40px'
    };

    return (
      <div style={style}>
        <section className="content-header">
          <h3>ダッシュボード</h3>
        </section>
        <section className="content">
          {charts.room !== null &&
            <div className="room-info-wrap row">
              <div className="col-md-3 bg-gray room-key-wrap">
                <p>入室キー</p>
                <p>{charts.room.key}</p>
              </div>
              <div className="col-md-5 room-info-main-wrap">
                <p>{`${charts.room.lecture.department.faculty.name} ${charts.room.lecture.department.name} ${charts.room.lecture.grade}対象`}</p>
                <p>{`${charts.room.lecture.year}年${charts.room.lecture.semester.name} ${weekdays[charts.room.lecture.weekday]}${charts.room.lecture.timeSlot}限`}</p>
                <p>{charts.room.lecture.title}</p>
              </div>
              <div className="col-md-4 room-close-wrap">
                <RaisedButton
                  style={{width: 200, margin: '20px 0 0 20px'}}
                  label="新規登録"
                  secondary={true}
                  onClick={() => actions.push(`/${SCHOOL_NAME}/teacher/lectures/create`)}
                />
                <p><span>開始</span><span>{moment(charts.room.createdAt).format('HH:mm')}</span></p>
                <p><span>終了予定</span><span>{moment(charts.room.createdAt).add(charts.room.length, 'm').format('HH:mm')}</span></p>
              </div>
            </div>
          }
          <div className="row">
            <div className="col-md-8">
              {charts.pie !== null &&
                <PieCharts pie={charts.pie}/>
              }
              <div className="row">
                {charts.line !== null &&
                  <LineChart line={charts.line}/>
                }
              </div>
            </div>
            <div className="col-md-4">
              <div className="row">
                <Message messages={messages}/>
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
    messages: state.dashboardMessages,
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
