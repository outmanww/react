import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
// Config
import { SCHOOL_NAME } from '../../../../../config/env';
// Utils

// Actions
import * as InitializeActions from '../../../../actions/initialize';
import * as LectureActions from '../../../../actions/lecture';
import { push } from 'react-router-redux';
// Material-ui
import { FlatButton, RaisedButton, Dialog } from 'material-ui';
import Colors from 'material-ui/lib/styles/colors';
// React-bootstrap
import { Input, Row, Col } from 'react-bootstrap';
// Components
import Loading from '../../../Common/Loading';
import ConfirmConference from './ConfirmConference';

class CreateConference extends Component {
  constructor(props, context) {
    super(props, context);
    const { clearDisposable } = props.actions;

    clearDisposable();
    this.hasError = true;
    this.state = {
      open: false,
      focused: 'default',
      title: '',
      place: '',
      time: '2016-06-27 03:09:50',
      description: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    const { storeLecture, actions } = this.props;

    if (this.state.open && storeLecture.isFetching && !nextProps.storeLecture.isFetching) {
      if (nextProps.storeLecture.didInvalidate) {
        this.setState({open: false});
        actions.clearDisposable();
      } else {
        actions.push(`/${SCHOOL_NAME}/teacher/lectures`);
      }
    }
  }

  checkError() {
    this.hasError = Object.keys(this.state).some(key => 
      this.state[key].status === 2
    )
  }

  createLecture () {
    const { state } = this;

    this.checkError();
    if (!this.hasError) {
      this.setState({open: true});
    };
  }

  storeLecture() {
    const { title, place, time, description } = this.state;
    const { storeLecture, actions } = this.props;

    if (!storeLecture.isFetching) {
      actions.storeLecture({ title, place, time, description });
    }
  }

  render() {
    const { user, storeLecture, actions } = this.props;
    const { state } = this;

    return (
      <div className="row">
        <div className="space-top-2 row-space-2 clearfix">
          <div className="col-md-7">
            <div>
              <div className="row">
                <div className="col-md-4">
                  <label
                    className="label-large"
                    htmlFor="input-title"
                  >
                    タイトル
                  </label>
                </div>
                <div className="col-md-8">
                  <div className="row-space-top-1 label-large text-right">
                    <div>残り
                      <span>50</span>文字
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <input className="overview-title input-large" id="input-title" type="text" maxLength={50}
                    name="title"
                    placeholder="タイトル"
                    value={state.title}
                    onChange={(e) => this.setState({ title: e.target.value })}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <label
                    className="label-large"
                    htmlFor="input-place"
                  >
                    場所
                  </label>
                </div>
                <div className="col-md-8">
                  <div className="row-space-top-1 label-large text-right">
                    <div>残り
                      <span>100</span>文字
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <input className="overview-place input-large" id="input-place" type="text" maxLength={100}
                    name="place"
                    placeholder="場所"
                    value={state.place}
                    onChange={(e) => this.setState({ place: e.target.value })}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <label
                    className="label-large"
                    htmlFor="input-time"
                  >
                    時間
                  </label>
                </div>
                <div className="col-md-8">
                  <div className="row-space-top-1 label-large text-right">
                    <div>残り
                      <span>19</span>文字
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <input className="overview-time input-large" id="input-time" type="text" maxLength={19}
                    name="time"
                    placeholder="YYYY-MM-DD hh:mm:ss"
                    value={state.time}
                    onChange={(e) => this.setState({ time: e.target.value })}
                  />
                </div>
              </div>

              <div className="row">
                <div className="col-md-4">
                  <label
                    className="label-large"
                    htmlFor="input-description"
                  >
                    説明
                  </label>
                </div>
                <div className="col-md-8">
                  <div className="row-space-top-1 label-large text-right">
                    <div>残り
                      <span>250</span>文字
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-12">
                  <input className="overview-description input-large" id="input-description" type="text" maxLength={250}
                    name="description"
                    placeholder=""
                    value={state.description}
                    onChange={(e) => this.setState({ description: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-top-3">
                <RaisedButton
                  style={{width: 150, float: 'right'}}
                  label="新規登録"
                  secondary={true}
                  onClick={() => this.createLecture()}
                />
              </div>
            </div>
          </div>
        </div>

        {
          state.open &&
          <Dialog
            title="入力内容の確認"
            actions={[
              <FlatButton
                label="キャンセル"
                disabled={storeLecture.isFetching}
                onTouchTap={() => this.setState({ open: false })}
              />,
              <FlatButton
                label="確定"
                disabled={storeLecture.isFetching}
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
            {storeLecture.isFetching &&
              <div
                className="loading-wrap"
                style={{
                  height: 341,
                  margin: '0 -15px',
                  padding: '0 15px'
                }}
              >
                <Loading/>
              </div>
            }
            <ConfirmConference
              conference={{
                title: state.title,
                place: state.place,
                time: state.time,
                description: state.description
              }}
            />
          </Dialog>
        }
      </div>
    );
  }
}

CreateConference.propTypes = {
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

export default connect(mapStateToProps, mapDispatchToProps)(CreateConference);
