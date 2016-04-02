import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Config
import { SCHOOL_NAME } from '../../../../config/env';
// Utils
import { format, validatTypeName, validatTypeEn, validatTypeDesc } from '../../../utils/ValidationUtils';
// Actions
import * as LectureActions from '../../../actions/lecture';
import { routeActions } from 'react-router-redux';
// Components
import { RaisedButton } from 'material-ui';
import { OverlayTrigger, Tooltip, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import Icon from 'react-fa';
import Colors from 'material-ui/lib/styles/colors';

class CreateLecture extends Component {
  constructor(props, context) {
    super(props, context);
    props.actions.fetchLectures();
    this.state = {};
    this.hasError = false;
  }

  render() {
    const weeks = ['月','火','水','木','金','土','日'];
    return (
      <div className="row">
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
            placeholder="授業名を入力してください"
            maxLength={15}
            onChange={(e) => this.setState({ name: validatTypeName(e.target.value) })}
          />
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
