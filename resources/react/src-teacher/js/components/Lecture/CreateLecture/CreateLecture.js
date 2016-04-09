import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
// Config
import { SCHOOL_NAME } from '../../../../config/env';
// Utils
import { format, validatLectureName, validatLectureCode, validatLecturePlace } from '../../../utils/ValidationUtils';
// Actions
import * as LectureActions from '../../../actions/lecture';
import { routeActions } from 'react-router-redux';
// Components
import { RaisedButton } from 'material-ui';
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Icon from 'react-fa';
import Colors from 'material-ui/lib/styles/colors';
// React-bootstrap
import { Input, Row, Col } from 'react-bootstrap';

class CreateLecture extends Component {
  constructor(props, context) {
    super(props, context);
    props.actions.fetchLectures();
    this.state = {
      ...format([
        'faculty', 'department', 'grade',
        'name',
        'code',
        'yearSemester', 'weekday', 'timeSlot',
        'place',
        'length',
        'description'
      ])
    };
    this.hasError = false;
  }

  render() {
    const weeks = ['月','火','水','木','金','土','日'];
    const { state } = this;

    console.log(state);

    return (
      <div className="row">
        <div className="space-top-2 row-space-2 clearfix">
          <div className="col-md-7">
            <div className="raw">
              <div className="col-md-4" style={{paddingLeft: 0, paddingRight: 10}}>
                <label className="label-large" htmlFor="select-faculty">対象学部</label>
                <div className="select select-block">
                  <select id="select-faculty"
                    name="faculty"
                    defaultValue={0}
                    value={state.faculty.value}
                    onChange={(e) => this.setState({ faculty: {value: e.target.value} })}
                  >
                    <option value={0}>文学部</option>
                    <option value={1}>工学部</option>
                  </select>
                </div>
              </div>

              <div className="col-md-4" style={{paddingLeft: 5, paddingRight: 5}}>
                <label className="label-large" htmlFor="select-department">学科</label>
                <div className="select select-block">
                  <select id="select-department"
                    name="department"
                    defaultValue={1}
                    value={state.department.value}
                    onChange={(e) => this.setState({ department: {value: e.target.value} })}
                  >
                    <option value={1}>物理工学科</option>
                    <option value={2}>機械航空学科</option>
                  </select>
                </div>
              </div>

              <div className="col-md-4" style={{paddingLeft: 10, paddingRight: 0}}>
                <label className="label-large" htmlFor="select-grade">学年</label>
                <div className="select select-block">
                  <select id="select-grade"
                    name="grade"
                    defaultValue={1}
                    value={state.grade.value}
                    onChange={(e) => this.setState({ grade: {value: e.target.value} })}
                  >
                    <option value={1}>学部１年</option>
                    <option value={2}>学部２年</option>
                    <option value={3}>学部３年</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <label className="label-large" htmlFor="input-name">授業名</label>
              </div>
              <div className="col-md-8">
                <div className="row-space-top-1 label-large text-right">
                  <div>残り
                    <span className={20 - state.name.value.length <= 0 ? 'error-message' : ''}>
                      {20 - state.name.value.length}
                    </span>文字
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <input className="overview-title input-large" id="input-name" type="text" maxLength={20}
                  name="name"
                  placeholder="授業のタイトル"
                  value={state.name.value}
                  onChange={(e) => this.setState({ name: validatLectureName(e.target.value) })}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <label className="label-large" htmlFor="input-code">授業コード</label>
              </div>
              <div className="col-md-8">
                <div className="row-space-top-1 label-large text-right">
                  {state.code.message &&
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
                />
              </div>
            </div>

            <div className="raw">
              <div className="col-md-4" style={{paddingLeft: 0, paddingRight: 10}}>
                <label className="label-large" htmlFor="select-year-semester">授業の時期</label>
                <div className="select select-block">
                  <select id="select-year-semester"
                    name="yearSemester"
                    defaultValue={0}
                    value={state.yearSemester.value}
                    onChange={(e) => this.setState({ yearSemester: {value: e.target.value} })}
                  >
                    <option value={0}>2016年度 前期</option>
                    <option value={1}>2016年度 後期</option>
                  </select>
                </div>
              </div>

              <div className="col-md-4" style={{paddingLeft: 5, paddingRight: 5}}>
                <label className="label-large" htmlFor="select-weekday">曜日</label>
                <div className="select select-block">
                  <select id="select-weekday"
                    name="weekday"
                    defaultValue={1}
                    value={state.weekday.value}
                    onChange={(e) => this.setState({ weekday: {value: e.target.value} })}
                  >
                    <option value={1}>月曜日</option>
                    <option value={2}>火曜日</option>
                    <option value={3}>水曜日</option>
                    <option value={4}>木曜日</option>
                    <option value={5}>金曜日</option>
                    <option value={6}>土曜日</option>
                    <option value={0}>日曜日</option>
                  </select>
                </div>
              </div>

              <div className="col-md-4" style={{paddingLeft: 10, paddingRight: 0}}>
                <label className="label-large" htmlFor="select-timeSlot">限</label>
                <div className="select select-block">
                  <select id="select-timeSlot"
                    name="timeSlot"
                    defaultValue={1}
                    value={state.timeSlot.value}
                    onChange={(e) => this.setState({ timeSlot: {value: e.target.value} })}
                  >
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
                <label className="label-large" htmlFor="input-place">授業の場所</label>
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
                />
              </div>
            </div>

            <div className="raw">
              <div className="col-md-12" style={{paddingLeft: 0, paddingRight: 0}}>
                <label className="label-large" htmlFor="select-property_type_id">授業時間(分)</label>
                <input className="overview-title input-large" id="input-length" maxLength={3} type="number" step="10"
                  style={{width: 200}}
                  name="length" 
                  placeholder="入力してください"
                  value={state.length.value}
                  onChange={(e) => this.setState({ length: {value: e.target.value} })}
                />
              </div>
            </div>

            <div className="row">
              <div className="col-md-4">
                <label className="label-large" htmlFor="textarea-description">授業の説明</label>
              </div>
              <div className="col-md-8">
                <div className="row-space-top-1 label-large text-right">
                  <div>残り
                    <span className={100 - state.description.value.length <= 0 ? 'error-message' : ''}>
                      {100 - state.description.value.length}
                    </span>文字
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-12">
                <textarea className="overview-summary" id="textarea-description" rows={3} maxLength={100}
                  name="description"
                  placeholder="開講する授業についての簡単な説明を記述してください"
                  value={state.description.value}
                  onChange={(e) => this.setState({ description: validatLectureDescription(e.target.value) })}
                />
              </div>
            </div>

          </div>
          <div className="col-md-5">
            説明
          </div>
        </div>
      </div>
    );
  }
}

CreateLecture.propTypes = {
  routes: PropTypes.array.isRequired,
  children: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    lectures: state.lectures,
    routes: ownProps.routes
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign(LectureActions, routeActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateLecture);
