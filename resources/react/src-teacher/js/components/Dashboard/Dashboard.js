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
    }, 10000);
    this.setState({intervalId});
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    const { charts, messages } = this.props;
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
          <div className="row">
          {charts.room !== null &&
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <span className="list-head">対象</span>
                <span className="list-body">
                  {`${charts.room.lecture.department.faculty.name}・${charts.room.lecture.department.name}・${charts.room.lecture.grade}`}
                </span>
              </li>
              <li className="list-group-item">
                <span className="list-head">授業名</span>
                <span className="list-body">{charts.room.lecture.title}</span>
              </li>
              <li className="list-group-item">
                <span className="list-head">開講時期</span>
                <span>{`${charts.room.lecture.year} ${charts.room.lecture.semester.name} ${charts.room.lecture.timeSlot}限`}</span>
              </li>
              <li className="list-group-item">
                <span className="list-head">授業の長さ</span>
                <span className="list-body">{`${charts.room.length}`}</span>
              </li>
            </ul>
          }
          </div>
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
