import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Config
import { SCHOOL_NAME } from '../../../../config/env';
// Utils
import { format, getValues, validatLectureLength } from '../../../utils/ValidationUtils';
// Actions
import * as InitializeActions from '../../../actions/initialize';
import * as LectureActions from '../../../actions/lecture';
import { push } from 'react-router-redux';
// Components
import { FlatButton, RaisedButton, Dialog } from 'material-ui';
import IconButton from 'material-ui/lib/icon-button';

import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Icon from 'react-fa';
import Colors from 'material-ui/lib/styles/colors';
import CreateRoom from './CreateRoom';
import Loading from '../../Common/Loading';

class Lectures extends Component {
  constructor(props, context) {
    super(props, context);

    const { clearDisposable, fetchLectures } = props.actions;
    clearDisposable();
    fetchLectures();

    this.state = {
      open: false,
      id: 0,
      ...format(['length'])
    };
    this.hasError = true;
  }

  componentWillReceiveProps(nextProps) {
    const { lecture } = nextProps.lecture;
    if (lecture !== null) {
      this.setState({
        length: {
          value: String(lecture.length),
          status: 0,
          message: ''
        }
      });
    }

    const { room, actions } = this.props;
    if (this.state.open && room.isFetching && !nextProps.room.isFetching) {
      if (nextProps.room.didInvalidate) {
        this.setState({open: false});
        actions.clearDisposable();
      } else {
        actions.push(`/${SCHOOL_NAME}/teacher/dashboard`);
      }
    }
  }

  checkError() {
    this.hasError = Object.keys(this.state).some(key => {
      if (typeof this.state[key] !== 'object') {
        return false;
      }
      return this.state[key].status === 2
    })
  }

  openRoom() {
    const { openRoom } = this.props.actions;
    const { id, length } = this.state;

    this.setState({
      length: validatLectureLength(length.value)
    },() => {
      this.checkError();
      if (!this.hasError) {
        openRoom(id, length.value);
      }
    });
  }

  render() {
    const { me, lectures, lecture, room, actions } = this.props;
    const weeks = ['月','火','水','木','金','土','日'];
    return (
      <div className="row">
        <div className="col-md-12">
          <div className="panel panel-default panel-table">
            <div className="panel-heading">
              <div className="row">
                <div className="col col-xs-6">
                  <h3 className="panel-title">登録授業一覧</h3>
                </div>
                <div className="col col-xs-6 text-right">
                  <RaisedButton
                    label="新規登録"
                    secondary={true}
                    onClick={() => actions.push(`/${SCHOOL_NAME}/teacher/lectures/create`)}
                  />
                </div>
              </div>
            </div>
            <div className="panel-body">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th className="col-md-1">授業コード</th>
                    <th className="col-md-2">授業名</th>
                    <th className="col-md-2">開講日</th>
                    <th className="col-md-3">学部・学科</th>
                    <th className="col-md-4">アクション</th>
                  </tr> 
                </thead>
                <tbody>
                {!lectures.isFetching && lectures.lectures !== null &&
                  lectures.lectures.map(l =>
                  <tr key={l.id} className="">
                    <td>{l.code}</td>
                    <td>{l.title}</td>
                    <td>{`${weeks[Math.floor((Number(l.timeSlot) - 1) % 5 / 5)]}曜${(Number(l.timeSlot) - 1) % 5 + 1}限`}</td>
                    <td>{`${l.department.name}・${l.department.faculty.name}`}</td>
                    <td>
                      <div
                        className="custom-btn btn-mint space-left-2 pull-left"
                        onClick={() => {
                          actions.fetchLecture(l.id);
                          this.setState({
                            open: true,
                            id: l.id
                          });
                        }}
                      >
                        <p>授業開始</p>
                      </div>
                      <OverlayTrigger placement="top" overlay={(<Tooltip>削除</Tooltip>)}>
                        <div
                          className="custom-icon-btn btn-grapefruit space-right-2 pull-right"
                          onClick={() => actions.push(`/${SCHOOL_NAME}/teacher/lectures/${l.id}`)}
                        >
                          <i className="fa fa-trash"/>
                        </div>
                      </OverlayTrigger>
                      <OverlayTrigger placement="top" overlay={(<Tooltip>終了</Tooltip>)}>
                        <div
                          className="custom-icon-btn btn-blue space-right-1 pull-right"
                          onClick={() => actions.push(`/${SCHOOL_NAME}/teacher/lectures/${l.id}`)}
                        >
                          <i className="fa fa-pause"/>
                        </div>
                      </OverlayTrigger>
                      <OverlayTrigger placement="top" overlay={(<Tooltip>再開</Tooltip>)}>
                        <div
                          className="custom-icon-btn btn-blue space-right-1 pull-right"
                          onClick={() => actions.push(`/${SCHOOL_NAME}/teacher/lectures/${l.id}`)}
                        >
                          <i className="fa fa-play"/>
                        </div>
                      </OverlayTrigger>
                      <OverlayTrigger placement="top" overlay={(<Tooltip>詳細</Tooltip>)}>
                        <div
                          className="custom-icon-btn btn-aqua space-right-1 pull-right"
                          onClick={() => actions.push(`/${SCHOOL_NAME}/teacher/lectures/${l.id}`)}
                        >
                          <i className="fa fa-area-chart"/>
                        </div>
                      </OverlayTrigger>
                    </td>
                  </tr>
                )}
                {lectures.isFetching &&
                  <div
                    className="loading-wrap"
                    style={{
                      height: 200,
                      margin: '0 -15px',
                      padding: '0 15px',
                    }}
                  >
                    <Loading coverColor={Colors.grey50}/>
                  </div>
                }
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <Dialog
          title="授業を開講"
          actions={[
            <FlatButton
              label="キャンセル"
              secondary={true}
              onTouchTap={() => this.setState({open: false})}
            />,
            <FlatButton
              label="開講"
              primary={true}
              disabled={false}
              onTouchTap={() => {
                if (!room.isFetching) {
                  this.openRoom()
                }
              }}
            />
          ]}
          modal={true}
          open={this.state.open}
        >
          <CreateRoom
            me={me}
            lecture={lecture}
            length={this.state.length.value}
            setState={this.setState.bind(this)}
          />
        </Dialog>
      </div>
    );
  }
}

Lectures.propTypes = {
  me: PropTypes.object.isRequired,
  lectures: PropTypes.object.isRequired,
  lecture: PropTypes.object.isRequired,
  room: PropTypes.object.isRequired,
  routes: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    me: state.user,
    lectures: state.lectures,
    lecture: state.disposable.lecture,
    room: state.room,
    routes: ownProps.routes
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign(
    InitializeActions,
    LectureActions,
    { push }
  );
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Lectures);
