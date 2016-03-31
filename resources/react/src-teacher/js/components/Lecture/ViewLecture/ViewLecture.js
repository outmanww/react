import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//Actions
import { routeActions } from 'react-router-redux';
import Colors from 'material-ui/lib/styles/colors';

class ViewLecture extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="row">
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
            <input className="overview-title input-large" type="text" name="name" defaultValue="楽しく暮らせる部屋" placeholder="ポイントがはっきりわかるタイトルに。" maxLength={35} data-ignore-handle-blur="true" id="input-name"/>
          </div>

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
            <input className="overview-title input-large" type="text" name="name" defaultValue="楽しく暮らせる部屋" placeholder="ポイントがはっきりわかるタイトルに。" maxLength={35} data-ignore-handle-blur="true" id="input-name"/>
          </div>

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
            <input className="overview-title input-large" type="text" name="name" defaultValue="楽しく暮らせる部屋" placeholder="ポイントがはっきりわかるタイトルに。" maxLength={35} data-ignore-handle-blur="true" id="input-name"/>
          </div>
        </div>
        <div className="col-md-6">
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
  const actions = Object.assign({}, routeActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ViewLecture);
