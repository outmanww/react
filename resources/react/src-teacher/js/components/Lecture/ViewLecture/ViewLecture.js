import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
// Utils
import { format, validatTypeName, validatTypeEn, validatTypeDesc } from '../../../utils/ValidationUtils';
//Actions
import * as LectureActions from '../../../actions/lecture';
import { routeActions } from 'react-router-redux';
// Material-UiI-components
import { Paper, Card, CardHeader, CardText, CardActions, FlatButton, TextField } from 'material-ui';
import Colors from 'material-ui/lib/styles/colors';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import FontIcon from 'material-ui/lib/font-icon';
var LineChart = require("react-chartjs").Line;
var PieChart = require("react-chartjs").Pie;

class ViewLecture extends Component {
  constructor(props, context) {
    super(props, context);
    const { actions, routeParams } = props;
    this.state = {
      id: 0,
      editable: true
    };
    actions.fetchLecture(routeParams.id);
  }

  render() {
    const { userId, lecture, room, actions } = this.props;
    const { id, editable } = this.state;

    const beChanged = key => {
      const target = types.find(type => type.id === id.value);
      return target[key] !== this.state[key].value;
    };

    var lineData = {
      labels: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90'],
      datasets: [
        {
          label: "My First dataset",
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: [65, 59, 80, 81, 56, 55, 40, 30, 10, 8]
        },
        {
          label: "My Second dataset",
          fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: [28, 48, 40, 19, 86, 27, 90, 8, 10, 80]
        }
      ]
    };

    return (
      <div>
        <div className="row content-wrap-white">
          {lecture.lecture !== 'undefind' && !lecture.isFetching &&
          <div>
            <div className="col-md-12">
              <h4 className="">
                <span>{`${lecture.lecture.department.name}・${lecture.lecture.department.faculty.name}`}</span>
                <span>{`授業コード：${lecture.lecture.code}`}</span>
              </h4>
            </div>
            <div className="col-md-6">
              <div className="space-top-2 row-space-2 clearfix">
                <div className="row">
                  <div className="col-md-4">
                    <label className="label-large" htmlFor="input-name">授業名</label>
                  </div>
                  <div className="col-md-8">
                    <div className="row-space-top-1 label-large text-right">
                      <div>残り<span>11</span>文字</div>
                    </div>
                  </div>
                </div>
                <input className="overview-title input-large" type="text" name="name" id="input-name"
                  defaultValue={lecture.lecture.title}
                  maxLength={15}
                  disabled={!editable}
                />
              </div>

              <div className="space-top-2 row-space-2 clearfix">
                <div className="raw">
                  <div className="col-md-4" style={{paddingLeft: 0, paddingRight: 10}}>
                    <label className="label-large" htmlFor="select-property_type_id">授業の時期</label>
                    <div className="row-space-1">
                      <div className="select select-block">
                        <select name="property_type_id" id="select-property_type_id" disabled={!editable}>
                          <option selected value={1}>2016年度 前期</option>
                          <option value={2}>2016年度 前期</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4" style={{paddingLeft: 5, paddingRight: 5}}>
                    <label className="label-large" htmlFor="select-property_type_id">曜日</label>
                    <div className="row-space-1">
                      <div className="select select-block">
                        <select name="property_type_id" id="select-property_type_id" disabled={!editable}>
                          <option selected value={1}>月曜日</option>
                          <option value={2}>火曜日</option>
                          <option value={3}>水曜日</option>
                          <option value={4}>木曜日</option>
                          <option value={5}>金曜日</option>
                          <option value={6}>土曜日</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-4" style={{paddingLeft: 10, paddingRight: 0}}>
                    <label className="label-large" htmlFor="select-property_type_id">限</label>
                    <div className="row-space-1">
                      <div className="select select-block">
                        <select name="property_type_id" id="select-property_type_id" disabled={!editable}>
                          <option selected value={1}>１限</option>
                          <option value={2}>２限</option>
                          <option value={3}>３限</option>
                          <option value={4}>４限</option>
                          <option value={5}>５限</option>
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
                  <div className="col-md-8">
                    <div className="row-space-top-1 label-large text-right">
                      <div>残り<span>11</span>文字</div>
                    </div>
                  </div>
                </div>
                <input className="overview-title input-large" type="text" name="name" id="input-name"
                  defaultValue={lecture.lecture.place}
                  placeholder=""
                  maxLength={15}
                  disabled={!editable}
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="space-top-2 row-space-2 clearfix">
                <div className="raw">
                  <div className="col-md-6" style={{paddingLeft: 5, paddingRight: 5}}>
                    <label className="label-large" htmlFor="select-property_type_id">対象学年</label>
                    <div className="row-space-1">
                      <div className="select select-block">
                        <select name="property_type_id" id="select-property_type_id" disabled={!editable}>
                          <option selected value={1}>月曜日</option>
                          <option value={2}>火曜日</option>
                          <option value={3}>水曜日</option>
                          <option value={4}>木曜日</option>
                          <option value={5}>金曜日</option>
                          <option value={6}>土曜日</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-6" style={{paddingLeft: 10, paddingRight: 0}}>
                    <label className="label-large" htmlFor="select-property_type_id">授業時間</label>
                    <div className="row-space-1">
                      <div className="select select-block">
                        <select name="property_type_id" id="select-property_type_id" disabled={!editable}>
                          <option selected value={1}>１限</option>
                          <option value={2}>２限</option>
                          <option value={3}>３限</option>
                          <option value={4}>４限</option>
                          <option value={5}>５限</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-top-2 row-space-2 clearfix">
                <div className="row">
                  <div className="col-md-4">
                    <label className="label-large" htmlFor="textarea-summary">授業の説明</label>
                  </div>
                  <div className="col-md-8">
                    <div className="row-space-top-1 label-large text-right">
                      <div>残り<span>161</span>文字</div>
                    </div>
                  </div>
                </div>
                <textarea className="overview-summary" rows={6} name="summary"
                  maxLength={250}
                  data-ignore-handle-blur="true"
                  id="textarea-summary"
                  defaultValue={lecture.lecture.description}
                  disabled={!editable}
                />
              </div>
            </div>
          </div>
          }
        </div>

        <div className="row content-wrap-white content-top-space">
          <div className="col-md-12">
            <h4 className="space-top-2">過去の授業一覧</h4>
          </div>
          {lecture.lecture !== 'undefind' && !lecture.isFetching &&
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
              <div className="has-border">
                {/*<p className="select">編集するタイプを選択してください</p>*/}
                <LineChart data={lineData} width="600" height="250"/>
              </div>
            </div>
          </div>
          }
        </div>

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
