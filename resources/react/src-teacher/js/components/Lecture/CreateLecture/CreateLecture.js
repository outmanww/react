import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
// Config
import { SCHOOL_NAME } from '../../../../config/env';
// Utils
import {
  format, validatLectureTitle, validatLectureCode, validatLecturePlace, validatLectureDescription,
  validatSelectBox, validatSelectBoxRequired
} from '../../../utils/ValidationUtils';
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
import Description from './Description';

class CreateLecture extends Component {
  constructor(props, context) {
    super(props, context);
    props.actions.fetchLectureBasic();
    this.state = {
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
    this.hasError = false;
  }

  searchLecture () {
    const { state: { department, yearSemester, code}, props } = this;
    if (department.value != 0 && yearSemester.value != 0 && code.value != 0) {
      props.actions.searchLecture({
        department: department.value,
        yearSemester: yearSemester.value,
        code: code.value
      })
    }
  }

  render() {
    const { basic, actions } = this.props;
    const { state } = this;
console.log(state.department)
    return (
      <div className="row">
        <div className="space-top-2 row-space-2 clearfix">
          <div className="col-md-7">
          {basic.lectureBasic !== null && basic.isFetching === false &&
          <div>
            <div className="raw">
              <div className="col-md-4" style={{paddingLeft: 0, paddingRight: 10}}>
                <label className="label-large" htmlFor="select-faculty">対象学部</label>
                <div className="select select-block">
                  <select id="select-faculty"
                    name="faculty"
                    defaultValue="0"
                    value={state.faculty.value}
                    onChange={(e) => this.setState({ faculty: validatSelectBox(e.target.value) })}
                    onFocus={() => this.setState({focused: 'target'})}
                  >
                    <option value="0">選択してください</option>
                    {basic.lectureBasic.faculties.data.map(f =>
                      <option value={f.id}>{f.name}</option>
                    )}
                  </select>
                </div>
              </div>

              <div className="col-md-4" style={{paddingLeft: 5, paddingRight: 5}}>
                <label className="label-large" htmlFor="select-department">学科</label>
                <div className="select select-block">
                  <select id="select-department"
                    name="department"
                    defaultValue="0"
                    value={state.department.value}
                    onChange={(e) => this.setState({ department: validatSelectBox(e.target.value) })}
                    onFocus={() => this.setState({focused: 'target'})}
                    onBlur={this.searchLecture.bind(this)}
                  >
                    <option value="0">選択してください</option>
                    {state.faculty.value != 0 &&
                      basic.lectureBasic.faculties.data.filter(f =>
                        f.id === Number(state.faculty.value)
                      )[0].departments.map(d =>
                        <option value={d.id}>{d.name}</option>
                      )
                    }
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
                    onChange={(e) => this.setState({ grade: validatSelectBox(e.target.value) })}
                    onFocus={() => this.setState({focused: 'target'})}
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
                  onFocus={() => this.setState({focused: 'code'})}
                  onBlur={this.searchLecture.bind(this)}
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
                    onChange={(e) => this.setState({ yearSemester: validatSelectBox(e.target.value) })}
                    onFocus={() => this.setState({focused: 'time'})}
                    onBlur={this.searchLecture.bind(this)}
                  >
                    <option value="0">選択してください</option>
                    {
                      Object.keys(basic.lectureBasic.yearSemester).map(key =>
                        <option value={key}>{basic.lectureBasic.yearSemester[key]}</option>
                      )
                    }
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
                    onChange={(e) => this.setState({ weekday: validatSelectBox(e.target.value) })}
                    onFocus={() => this.setState({focused: 'time'})}
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
                    onChange={(e) => this.setState({ timeSlot: validatSelectBox(e.target.value) })}
                    onFocus={() => this.setState({focused: 'time'})}
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
                  onFocus={() => this.setState({focused: 'place'})}
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
                  onFocus={() => this.setState({focused: 'length'})}
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
                  onFocus={() => this.setState({focused: 'description'})}
                />
              </div>
            </div>
          </div>
          }
          </div>
          <div className="col-md-5">
            <Description focused={this.state.focused}/>
          </div>
        </div>
      </div>
    );
  }
}

CreateLecture.propTypes = {
  basic: PropTypes.object.isRequired,
  routes: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    basic: state.lectureBasic,
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
