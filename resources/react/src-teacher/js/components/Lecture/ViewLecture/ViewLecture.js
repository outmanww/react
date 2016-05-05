import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
// Utils
import {
  format, getValues,
  validatSelectBox, validatSelectBoxRequired,
  validatLectureTitle, validatLecturePlace, validatLectureLength, validatLectureDescription
} from '../../../utils/ValidationUtils';
//Actions
import * as LectureActions from '../../../actions/lecture';
import { routeActions } from 'react-router-redux';
// Material-UiI-components
import { RaisedButton, FlatButton } from 'material-ui';
import Colors from 'material-ui/lib/styles/colors';
// Components
import Loading from '../../Common/Loading';
import RoomHistory from './RoomHistory';

class ViewLecture extends Component {
  constructor(props, context) {
    super(props, context);
    const { actions, routeParams } = props;

    this.state = {
      id: 0,
      editable: false
    };
    actions.fetchLectureBasic();
    actions.fetchLecture(routeParams.id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.lecture.lecture !== null) {
      const lecture = nextProps.lecture.lecture;
      this.setState({
        title: lecture.title,
        yearSemester: `${lecture.year}&${lecture.semester.id}`,
        weekday: lecture.weekday,
        timeSlot: lecture.timeSlot,
        place: lecture.place,
        length: lecture.length,
        description: lecture.description,
      })
    }

    if (
      this.state.editable &&
      this.props.update.isFetching &&
      !nextProps.update.isFetching
    ) {
      this.setState({
        editable: false
      })
    }
  }

  render() {
    const { userId, lecture, basic, update, room, actions } = this.props;
    const { id, editable, title, yearSemester, weekday, timeSlot, place, length, description } = this.state;

    return (
      <div>
        {lecture.lecture !== 'undefind' && !lecture.isFetching &&
        <div>
          <div className="row content-wrap-white relative">
            {editable && update.isFetching &&
              <div className="loading-wrap" style={{height: 350, paddingTop: 80}}>
                <Loading/>
              </div>
            }

            {editable ?
              <div className="switch-wrap edit-lecture-switch">
                <RaisedButton
                  label={update.isFetching ? '保存中...' : '保存'}
                  primary={true}
                  rippleColor="#00BCD4"
                  hoverColor="#B2EBF"
                  style={{float: 'right', width: 120, margin: '0 10px 0 10px', fontSize: 16}}
                  disabled={title.length === 0 || update.isFetching}
                  onClick={() => {
                    actions.updateLecture(
                      lecture.lecture.id,
                      { title, yearSemester, weekday, timeSlot, place, length, description }
                    )
                  }}
                />
                <FlatButton
                  label="キャンセル"
                  secondary={true}
                  style={{float: 'right', width: 120, margin: '0 10px 0 10px', fontSize: 16}}
                  onClick={() => this.setState({
                    editable: false,
                    title: lecture.lecture.title,
                    yearSemester: `${lecture.lecture.year}&${lecture.lecture.semester.id}`,
                    weekday: lecture.lecture.weekday,
                    timeSlot: lecture.lecture.timeSlot,
                    place: lecture.lecture.place,
                    length: lecture.lecture.length,
                    description: lecture.lecture.description
                  })}
                />
              </div> :
              <div className="switch-wrap edit-lecture-switch">
                <RaisedButton
                  label="編集"
                  style={{float: 'right', width: 120, margin: '0 10px 0 10px', fontSize: 16}}
                  primary={true}
                  onClick={() => this.setState({editable: true})}
                />
              </div>
            }

            <div className="col-md-12">
              <h4 className="space-top-4 lecture-title">
                <span>{`授業コード：${lecture.lecture.code}　`}</span>
                <span>{`　${lecture.lecture.department.faculty.name}　${lecture.lecture.department.name}対象`}</span>
              </h4>
            </div>
            <div className="col-md-6">
              <div className="space-top-2 row-space-2 clearfix">
                <div className="row">
                  <div className="col-md-4">
                    <label
                      className={title.length === 0 ? 'label-large error' : 'label-large'}
                      htmlFor="input-name"
                    >
                      授業名
                    </label>
                  </div>
                  {editable &&
                    <div className="col-md-8">
                      <div className="row-space-top-1 label-large text-right">
                        <div>残り
                          <span className={20 - title.length <= 0 ? 'error-message' : ''}>
                            {20 - title.length}
                          </span>文字
                        </div>
                      </div>
                    </div>
                  }
                </div>
                <input type="text" name="name" id="input-name" maxLength={20}
                  className={editable ? 'overview-title input-large' : 'overview-title input-large none-resize thin-gray-border'}
                  value={title}
                  onChange={(e) => this.setState({ title: e.target.value })}
                  disabled={!editable}
                />
              </div>

              <div className="space-top-2 row-space-2 clearfix">
                <div className="raw">
                  <div className="col-md-4" style={{paddingLeft: 0, paddingRight: 10}}>
                    <label className="label-large" htmlFor="select-property_type_id">授業の時期</label>
                    <div className="row-space-1">
                      <div className="select select-block">
                        <select
                          name="property_type_id"
                          id="select-property_type_id"
                          className={editable ? '' : 'none-appearance thin-gray-border'}
                          value={yearSemester}
                          onChange={(e) => this.setState({ yearSemester: e.target.value })}
                          disabled={!editable}
                        >
                        {basic.lectureBasic !== null &&
                          Object.keys(basic.lectureBasic.yearSemester).map(key =>
                            <option value={key}>{basic.lectureBasic.yearSemester[key]}</option>
                          )
                        }
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4" style={{paddingLeft: 5, paddingRight: 5}}>
                    <label className="label-large" htmlFor="select-property_type_id">曜日</label>
                    <div className="row-space-1">
                      <div className="select select-block">
                        <select
                          name="property_type_id"
                          id="select-property_type_id"
                          value={weekday}
                          className={editable ? '' : 'none-appearance thin-gray-border'}
                          onChange={(e) => this.setState({ weekday: e.target.value })}
                          disabled={!editable}
                        >
                          <option value={1}>月曜日</option>
                          <option value={2}>火曜日</option>
                          <option value={3}>水曜日</option>
                          <option value={4}>木曜日</option>
                          <option value={5}>金曜日</option>
                          <option value={6}>土曜日</option>
                          <option value={0}>日曜日</option>
                          <option value={7}>その他</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4" style={{paddingLeft: 10, paddingRight: 0}}>
                    <label className="label-large" htmlFor="select-property_type_id">限</label>
                    <div className="row-space-1">
                      <div className="select select-block">
                        <select
                          name="property_type_id"
                          id="select-property_type_id"
                          value={timeSlot}
                          className={editable ? '' : 'none-appearance thin-gray-border'}
                          disabled={!editable}
                          onChange={(e) => this.setState({ timeSlot: e.target.value })}
                        >
                          <option value={1}>１限</option>
                          <option value={2}>２限</option>
                          <option value={3}>３限</option>
                          <option value={4}>４限</option>
                          <option value={5}>５限</option>
                          <option value={6}>その他</option>
                        </select>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

              <div className="space-top-2 row-space-2 clearfix">
                <div className="row">
                  <div className="col-md-4">
                    <label className="label-large" htmlFor="input-name">授業の場所</label>
                  </div>
                  {editable &&
                    <div className="col-md-8">
                      <div className="row-space-top-1 label-large text-right">
                        <div>残り
                          <span className={20 - place.length <= 0 ? 'error-message' : ''}>
                            {20 - place.length}
                          </span>文字
                        </div>
                      </div>
                    </div>
                  }
                </div>
                <input type="text" name="name" id="input-name"
                  className={editable ? 'overview-title input-large' : 'overview-title input-large none-resize thin-gray-border'}
                  value={place}
                  placeholder=""
                  maxLength={15}
                  disabled={!editable}
                  onChange={(e) => this.setState({ place: e.target.value })}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="space-top-2 row-space-2 clearfix">
                <div className="raw">
                  <div className="col-md-6" style={{paddingLeft: 0, paddingRight: 10}}>
                    <label className="label-large" htmlFor="select-property_type_id">授業時間(分)</label>
                    <input id="input-length" maxLength={3} type="number" step="10"
                      className={editable ? 'overview-title input-large' : 'overview-title input-large none-resize thin-gray-border'}
                      name="length"
                      placeholder={editable ? '入力してください' : ''}
                      value={length}
                      disabled={!editable}
                      onChange={(e) => this.setState({ length: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="space-top-2 row-space-2 clearfix">
                <div className="row">
                  <div className="col-md-4">
                    <label className="label-large" htmlFor="textarea-description">授業の説明</label>
                  </div>
                  {editable &&
                    <div className="col-md-8">
                      <div className="row-space-top-1 label-large text-right">
                        <div>残り
                          <span className={120 - description.length <= 0 ? 'error-message' : ''}>
                            {120 - description.length}
                          </span>文字
                        </div>
                      </div>
                    </div>
                  }
                </div>
                <textarea rows={3} name="summary" maxLength={120}
                  id="textarea-description"
                  className={editable ? 'overview-summary' : 'overview-summary none-resize thin-gray-border'}
                  data-ignore-handle-blur="true"
                  value={description}
                  disabled={!editable}
                  onChange={(e) => this.setState({ description: e.target.value })}
                />
              </div>
            </div>
          </div>






          <div className="row content-wrap-white content-top-space">
            <div className="col-md-12">
              <h4 className="space-top-2">過去の授業一覧</h4>
            </div>
            <div className="space-top-2">
              <div className="col-md-4">
                <div className="list-group room-list">
                  {lecture.lecture.rooms.map(r =>
                    <a
                      key={r.id}
                      className={`list-group-item${r.teacher.id === userId ? r.id === id ? ' active' : '' : ' disabled'}`}
                      onClick={() => {
                        if (room.room !== 'undefined' && !room.isFetching) {
                          actions.fetchRoom(r.id);
                          this.setState({id: r.id});
                        }
                      }}
                    >
                      <span className="badge">14 人</span>
                      <span className="">{r.createdAt}</span>
                      <span className="space-left-3">{r.teacher.familyName} {r.teacher.givenName}</span>
                    </a>
                  )}
                </div>
              </div>

              <div className="col-md-8">
              {room.room !== null &&
                <RoomHistory
                  line={room.room.charts}
                  messages={room.room.messages}
                />
              }
              </div>
            </div>
          </div>
        </div>
        }
      </div>
    );
  }
}

ViewLecture.propTypes = {
  routes: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    userId: state.user.user ? state.user.user.id : 0,
    lecture: state.disposable.lecture,
    update: state.disposable.updateLecture,
    basic: state.lectureBasic,
    room: state.disposable.room,
    routeParams: ownProps.routeParams,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign(LectureActions, routeActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewLecture);
