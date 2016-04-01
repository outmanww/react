import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//Actions
import * as LectureActions from '../../../actions/lecture';
import { routeActions } from 'react-router-redux';
import Colors from 'material-ui/lib/styles/colors';

class ViewLecture extends Component {
  constructor(props, context) {
    super(props, context);
    props.actions.fetchLecture(1);
  }

  render() {
    return (
      <div>
        <div className="row content-wrap-white">
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
                defaultValue="線形代数１"
                placeholder=""
                maxLength={15}
              />
            </div>

            <div className="space-top-2 row-space-2 clearfix">
              <div className="raw">
                <div className="col-md-4" style={{paddingLeft: 0, paddingRight: 10}}>
                  <label className="label-large" htmlFor="select-property_type_id">授業の時期</label>
                  <div className="row-space-1">
                    <div className="select select-block">
                      <select name="property_type_id" id="select-property_type_id">
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
                      <select name="property_type_id" id="select-property_type_id">
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
                      <select name="property_type_id" id="select-property_type_id">
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
                defaultValue="工学部５号館３０１"
                placeholder=""
                maxLength={15}
              />
            </div>
          </div>
          <div className="col-md-6">
            <div className="space-top-2 row-space-2 clearfix">
              <div className="raw">
                <div className="col-md-6" style={{paddingLeft: 5, paddingRight: 5}}>
                  <label className="label-large" htmlFor="select-property_type_id">曜日</label>
                  <div className="row-space-1">
                    <div className="select select-block">
                      <select name="property_type_id" id="select-property_type_id">
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
                  <label className="label-large" htmlFor="select-property_type_id">限</label>
                  <div className="row-space-1">
                    <div className="select select-block">
                      <select name="property_type_id" id="select-property_type_id">
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
                placeholder=""
                maxLength={250}
                data-ignore-handle-blur="true"
                id="textarea-summary"
                defaultValue={"この授業は難しいです"}
              />
            </div>
          </div>
        </div>

        <div className="row content-wrap-white content-top-space">
          <div className="row">
            <div className="col-md-5">
              <div className="list-group">
                <a className="list-group-item"><span className="badge">14</span>リスト1</a>
                <a className="list-group-item active"><span className="badge">14</span>リスト2</a>
                <a className="list-group-item"><span className="badge">14</span>リスト3</a>
                <a className="list-group-item"><span className="badge">14</span>リスト4</a>
                <a className="list-group-item"><span className="badge">14</span>リスト5</a>
              </div>
            </div>
            <div className="col-md-7">
            </div>
          </div>
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
    routes: ownProps.routes
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign(LectureActions, routeActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewLecture);
