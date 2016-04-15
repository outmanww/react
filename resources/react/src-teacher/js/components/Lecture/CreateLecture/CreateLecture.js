import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
// Config
import { SCHOOL_NAME } from '../../../../config/env';
// Utils
import {
  format, getValues,
  validatSelectBox, validatSelectBoxRequired,
  validatLectureTitle, validatLectureCode, validatLecturePlace, validatLectureLength, validatLectureDescription
} from '../../../utils/ValidationUtils';
// Actions
import * as InitializeActions from '../../../actions/initialize';
import * as LectureActions from '../../../actions/lecture';
import { push } from 'react-router-redux';
// Material-ui
import { FlatButton, RaisedButton, Dialog } from 'material-ui';
import Colors from 'material-ui/lib/styles/colors';
// React-bootstrap
import { Input, Row, Col } from 'react-bootstrap';
// Components
import Description from './Description';
import OverlappedLecture from './OverlappedLecture';
import ConfirmLecture from './ConfirmLecture';

class CreateLecture extends Component {
  constructor(props, context) {
    super(props, context);
    const { clearDisposable, fetchLectureBasic } = props.actions;

    clearDisposable();
    fetchLectureBasic();

    this.state = {
      open: false,
      join: false,
      focused: 'default',
      ...format([
        'faculty', 'department', 'grade',
        'title',
        'code',
        'yearSemester', 'weekday', 'timeSlot',
        'place',
        'length',
        'description'
      ])
    };
    this.hasError = true;
  }

  componentWillReceiveProps(nextProps) {
    const { lectureBasic } = nextProps.basic;
    if (lectureBasic !== null) {
      this.setState({
        faculty: {
          value: String(lectureBasic.faculties.default.faculty),
          status: 0,
          message: ''
        }
      })
    }

    const { storeLecture, joinLecture, actions } = this.props;

    if (
      this.state.open &&
      (storeLecture.isFetching && !nextProps.storeLecture.isFetching) ||
      (joinLecture.isFetching && !nextProps.joinLecture.isFetching)
    ) {
      if (nextProps.storeLecture.didInvalidate || nextProps.joinLecture.didInvalidate) {
        this.setState({open: false});
        actions.clearDisposable();
      } else {
        actions.push(`/${SCHOOL_NAME}/teacher/lectures`);
      }
    }
  }

  searchLecture () {
    const { department, yearSemester, code } = this.state;
    const { actions } = this.props;
    if (department.value !== '' && yearSemester.value !== '' && code.value !== '') {
      actions.searchLecture({
        department: department.value,
        yearSemester: yearSemester.value,
        code: code.value
      })
    }
  }

  checkError() {
    this.hasError = Object.keys(this.state).some(key => 
      this.state[key].status === 2
    )
  }

  createLecture () {
    const { state } = this;

    this.setState({
      faculty: validatSelectBoxRequired(state.faculty.value),
      department: validatSelectBoxRequired(state.department.value),
      grade: validatSelectBoxRequired(state.grade.value),
      title: validatLectureTitle(state.title.value),
      code: validatLectureCode(state.code.value),
      yearSemester: validatSelectBoxRequired(state.yearSemester.value),
      weekday: validatSelectBoxRequired(state.weekday.value),
      timeSlot: validatSelectBoxRequired(state.timeSlot.value),
      place: validatLecturePlace(state.place.value),
      length: validatLectureLength(state.length.value),
      description: validatLectureDescription(state.description.value),
    },() => {
      this.checkError();
      if (!this.hasError) {
        this.setState({
          open: true,
          join: false
        });
      };
    });
  }

  storeLecture() {
    const { join } = this.state;
    const { overlappedLecture, storeLecture, joinLecture, actions } = this.props;

    if (!storeLecture.isFetching && !joinLecture.isFetching) {
      if (join) {
        actions.joinLecture(overlappedLecture.overlappedLecture.id);
      } else {
        actions.storeLecture(getValues(this.state));
      }
    }
  }

  render() {
    const { user, basic, overlappedLecture, actions } = this.props;
    const { state } = this;
    const weekdays = [
      {value: 1, string: '月曜日'},
      {value: 2, string: '火曜日'},
      {value: 3, string: '水曜日'},
      {value: 4, string: '木曜日'},
      {value: 5, string: '金曜日'},
      {value: 6, string: '土曜日'},
      {value: 0, string: '日曜日'},
    ];

    const grades = [
      {value: '学部１年', string: '学部１年'},
      {value: '学部２年', string: '学部２年'},
      {value: '学部３年', string: '学部３年'},
      {value: '学部４年', string: '学部４年'},
      {value: '修士１年', string: '修士１年'},
      {value: '修士２年', string: '修士２年'},
      {value: '全学年', string: '全学年'},
    ];
console.log(this.state.open, basic.lectureBasic, basic.isFetching, overlappedLecture)
    return (
      <div className="row">
        <div className="space-top-2 row-space-2 clearfix">
          <div className="col-md-7">
          {basic.lectureBasic !== null && basic.isFetching === false &&
          <div>
            <div className="raw">
              <div className="col-md-4" style={{paddingLeft: 0, paddingRight: 10}}>
                <label
                  className={state.faculty.status === 2 ? 'label-large error' : 'label-large'}
                  htmlFor="select-faculty"
                >
                  対象学部
                </label>
                <div className="select select-block">
                  <select id="select-faculty"
                    name="faculty"
                    value={state.faculty.value}
                    onChange={(e) => this.setState({ faculty: validatSelectBoxRequired(e.target.value) })}
                    onFocus={() => this.setState({focused: 'target'})}
                  >
                    {basic.lectureBasic.faculties.data.map(f =>
                      <option value={f.id}>{f.name}</option>
                    )}
                  </select>
                </div>
              </div>

              <div className="col-md-4" style={{paddingLeft: 5, paddingRight: 5}}>
                <label
                  className={state.department.status === 2 ? 'label-large error' : 'label-large'}
                  htmlFor="select-department"
                >
                  学科
                </label>
                <div className="select select-block">
                  <select id="select-department"
                    name="department"
                    value={state.department.value}
                    onChange={(e) => {
                      this.setState(
                        {department: validatSelectBoxRequired(e.target.value) },
                        this.searchLecture.bind(this)
                      )
                    }}
                    onFocus={() => this.setState({focused: 'target'})}
                  >
                    <option value="">選択してください</option>
                    {state.faculty.value != 0 &&
                      basic.lectureBasic.faculties.data.find(f =>
                        f.id === Number(state.faculty.value)
                      ).departments.map(d =>
                        <option value={d.id}>{d.name}</option>
                      )
                    }
                  </select>
                </div>
              </div>

              <div className="col-md-4" style={{paddingLeft: 10, paddingRight: 0}}>
                <label
                  className={state.grade.status === 2 ? 'label-large error' : 'label-large'}
                  htmlFor="select-grade"
                >
                  学年
                </label>
                <div className="select select-block">
                  <select id="select-grade"
                    name="grade"
                    value={state.grade.value}
                    onChange={(e) => {
                      this.setState({ grade: validatSelectBoxRequired(e.target.value) });
                      this.searchLecture.bind(this);
                    }}
                    onFocus={() => this.setState({focused: 'target'})}
                  >
                    <option value="">選択してください</option>
                    {grades.map(w => <option value={w.value}>{w.string}</option>)}
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <label
                  className={state.title.status === 2 ? 'label-large error' : 'label-large'}
                  htmlFor="input-title"
                >
                  授業名
                </label>
              </div>
              <div className="col-md-8">
                <div className="row-space-top-1 label-large text-right">
                  <div>残り
                    <span className={20 - state.title.value.length <= 0 ? 'error-message' : ''}>
                      {20 - state.title.value.length}
                    </span>文字
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <input className="overview-title input-large" id="input-title" type="text" maxLength={20}
                  name="title"
                  placeholder="授業のタイトル"
                  value={state.title.value}
                  onChange={(e) => this.setState({ title: validatLectureTitle(e.target.value) })}
                  onFocus={() => this.setState({focused: 'title'})}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <label
                  className={state.code.status === 2 ? 'label-large error' : 'label-large'}
                  htmlFor="input-code"
                >
                  授業コード
                </label>
              </div>
              <div className="col-md-8">
                <div className="row-space-top-1 label-large text-right">
                  {state.code.status === 2 &&
                    <FormattedMessage id={`validate.${state.code.message}`}>
                      {text => <div className="error-message" >{text}</div>}
                    </FormattedMessage>
                  }
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <input className="overview-title input-large" id="input-code" type="text" maxLength={15}
                  name="code"
                  placeholder="授業コード"
                  value={state.code.value}
                  onChange={(e) => this.setState({ code: validatLectureCode(e.target.value) })}
                  onFocus={() => this.setState({focused: 'code'})}
                  onBlur={this.searchLecture.bind(this)}
                />
              </div>
            </div>

            <div className="raw">
              <div className="col-md-4" style={{paddingLeft: 0, paddingRight: 10}}>
                <label
                  className={state.yearSemester.status === 2 ? 'label-large error' : 'label-large'}
                  htmlFor="select-year-semester"
                >
                  授業の時期
                </label>
                <div className="select select-block">
                  <select id="select-year-semester"
                    name="yearSemester"
                    value={state.yearSemester.value}
                    onChange={(e) => this.setState(
                      { yearSemester: validatSelectBoxRequired(e.target.value) },
                      this.searchLecture.bind(this)
                    )}
                    onFocus={() => this.setState({focused: 'time'})}
                  >
                    <option value="">選択してください</option>
                    {
                      Object.keys(basic.lectureBasic.yearSemester).map(key =>
                        <option value={key}>{basic.lectureBasic.yearSemester[key]}</option>
                      )
                    }
                  </select>
                </div>
              </div>

              <div className="col-md-4" style={{paddingLeft: 5, paddingRight: 5}}>
                <label
                  className={state.weekday.status === 2 ? 'label-large error' : 'label-large'}
                  htmlFor="select-weekday"
                >
                  曜日
                </label>
                <div className="select select-block">
                  <select id="select-weekday"
                    name="weekday"
                    value={state.weekday.value}
                    onChange={(e) => this.setState({ weekday: validatSelectBoxRequired(e.target.value) })}
                    onFocus={() => this.setState({focused: 'time'})}
                  >
                    <option value="">選択してください</option>
                    {weekdays.map(w => <option value={w.value}>{w.string}</option>)}
                  </select>
                </div>
              </div>

              <div className="col-md-4" style={{paddingLeft: 10, paddingRight: 0}}>
                <label
                  className={state.timeSlot.status === 2 ? 'label-large error' : 'label-large'}
                  htmlFor="select-timeSlot"
                >
                  限
                </label>
                <div className="select select-block">
                  <select id="select-timeSlot"
                    name="timeSlot"
                    value={state.timeSlot.value}
                    onChange={(e) => this.setState({ timeSlot: validatSelectBoxRequired(e.target.value) })}
                    onFocus={() => this.setState({focused: 'time'})}
                  >
                    <option value="">選択してください</option>
                    <option value={1}>１限</option>
                    <option value={2}>２限</option>
                    <option value={3}>３限</option>
                    <option value={4}>４限</option>
                    <option value={5}>５限</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <label
                  className={state.place.status === 2 ? 'label-large error' : 'label-large'}
                  htmlFor="input-place"
                >
                  授業の場所
                </label>
              </div>
              <div className="col-md-8">
                <div className="row-space-top-1 label-large text-right">
                  <div>残り
                    <span className={20 - state.place.value.length <= 0 ? 'error-message' : ''}>
                      {20 - state.place.value.length}
                    </span>文字
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <input className="overview-title input-large" id="input-place" type="text" maxLength={20}
                  name="place"
                  placeholder="授業の場所"
                  value={state.place.value}
                  onChange={(e) => this.setState({ place: validatLecturePlace(e.target.value) })}
                  onFocus={() => this.setState({focused: 'place'})}
                />
              </div>
            </div>

            <div className="raw">
              <div className="col-md-12" style={{paddingLeft: 0, paddingRight: 0}}>
                <label
                  className={state.length.status === 2 ? 'label-large error' : 'label-large'}
                  htmlFor="select-property_type_id"
                >
                  授業時間(分)
                </label>
                <input className="overview-title input-large" id="input-length" maxLength={3} type="number" step="10"
                  style={{width: 200}}
                  name="length" 
                  placeholder="入力してください"
                  value={state.length.value}
                  onChange={(e) => this.setState({ length: validatLectureLength(e.target.value) })}
                  onFocus={() => this.setState({focused: 'length'})}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <label
                  className={state.description.status === 2 ? 'label-large error' : 'label-large'}
                  htmlFor="textarea-description"
                >
                  授業の説明
                </label>
              </div>
              <div className="col-md-8">
                <div className="row-space-top-1 label-large text-right">
                  <div>残り
                    <span className={120 - state.description.value.length <= 0 ? 'error-message' : ''}>
                      {120 - state.description.value.length}
                    </span>文字
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <textarea className="overview-summary" id="textarea-description" rows={3} maxLength={120}
                  name="description"
                  placeholder="開講する授業についての簡単な説明を記述してください"
                  value={state.description.value}
                  onChange={(e) => this.setState({ description: validatLectureDescription(e.target.value) })}
                  onFocus={() => this.setState({focused: 'description'})}
                />
              </div>
            </div>
            <button
              className="btn btn-primary center-block space-top-3"
              onClick={() => this.createLecture()}
            >
              <span className="glyphicon glyphicon-pencil"></span>　新規作成
            </button>
          </div>
          }
          </div>
          <div className="col-md-5">
            {
              overlappedLecture.overlappedLecture !== null &&
              !overlappedLecture.isFetching &&
              <OverlappedLecture
                myId={user.user.id}
                lecture={overlappedLecture.overlappedLecture}
                setState={this.setState.bind(this)}
                push={actions.push}
              />
            }
            <Description focused={this.state.focused}/>
          </div>
        </div>

        {
          state.open &&
          basic.lectureBasic !== null &&
          basic.isFetching === false &&
          <Dialog
            title="入力内容の確認"
            actions={[
              <FlatButton
                label="キャンセル"
                onTouchTap={() => this.setState({ open: false })}
              />,
              <FlatButton
                label="確定"
                secondary={true}
                keyboardFocused={true}
                rippleColor={Colors.lightBlue600}
                hoverColor={Colors.lightBlue50}
                onTouchTap={() => this.storeLecture()}
              />
            ]}
            modal={false}
            open={state.open}
          >
            <ConfirmLecture
              lecture={
                state.join ?
                {
                  join: state.join,
                  department: overlappedLecture.overlappedLecture.department.name,
                  grade: overlappedLecture.overlappedLecture.grade,
                  title: overlappedLecture.overlappedLecture.title,
                  code: overlappedLecture.overlappedLecture.code,
                  yearSemester: `${overlappedLecture.overlappedLecture.year}年 ${overlappedLecture.overlappedLecture.semester.name}`,
                  weekday: weekdays.find(w => w.value === Number(overlappedLecture.overlappedLecture.weekday)).string,
                  timeSlot: `${overlappedLecture.overlappedLecture.timeSlot}限`,
                  place: overlappedLecture.overlappedLecture.place,
                  length: overlappedLecture.overlappedLecture.length,
                  description: overlappedLecture.overlappedLecture.description,
                  me: user.user.name,
                  otherTeacher: overlappedLecture.overlappedLecture.users.map(u => 
                    `${u.familyName} ${u.givenName}`
                  )
                }:
                {
                  join: state.join,
                  department: basic.lectureBasic.faculties.data.find(
                    f => f.id === Number(state.faculty.value)
                  ).departments.find(
                    d => d.id === Number(state.department.value)
                  ).name,
                  grade: grades.find(w => w.value === state.grade.value).string,
                  title: state.title.value,
                  code: state.code.value,
                  yearSemester: basic.lectureBasic.yearSemester[state.yearSemester.value],
                  weekday: weekdays.find(w => w.value === Number(state.weekday.value)).string,
                  timeSlot: `${state.timeSlot.value}限`,
                  place: state.place.value,
                  length: state.length.value,
                  description: state.description.value
                }
              }
            />
          </Dialog>
        }
      </div>
    );
  }
}

CreateLecture.propTypes = {
  user: PropTypes.object.isRequired,
  basic: PropTypes.object.isRequired,
  overlappedLecture: PropTypes.object.isRequired,
  storeLecture: PropTypes.object.isRequired,
  routes: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    user: state.user,
    basic: state.lectureBasic,
    overlappedLecture: state.disposable.overlappedLecture,
    storeLecture: state.disposable.storeLecture,
    joinLecture: state.disposable.joinLecture,
    routes: ownProps.routes
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign(
    InitializeActions,
    LectureActions,
    { push: push }
  );
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateLecture);
