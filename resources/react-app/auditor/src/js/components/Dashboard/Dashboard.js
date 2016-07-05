import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
// Config
import { SCHOOL_NAME } from '../../../config/env';
// Actions
import * as DashboardActions from '../../actions/dashboard';
// Components
import { Paper, Dialog, RaisedButton, FlatButton } from 'material-ui';
import { grey50, indigo500 } from 'material-ui/styles/colors';
import ConfirmConference from './ConfirmConference';
import Message from './Message';
import Loading from '../Common/Loading';

class Dashboard extends Component {
  constructor(props, context) {
    super(props, context);
    const { fetchConference, createAuditor } = props.actions;
    fetchConference();
    if (props.application.auditorCode === null) {
      createAuditor();
    }
    this.state = {
      open: true,
    };
  }

  render() {
    const { conference, messages } = this.props;
    const style = {
      minHeight: window.innerHeight,
      background: grey50,
    };
    const actions = [
      <FlatButton
        label="入場"
        primary={true}
        disabled={conference.isFetching || (conference.conference !== null && conference.conference.status == 0)}
        onTouchTap={() => this.setState({open: false})}
      />
    ];

    return (
      <div className="dashboard-wrap" style={style}>
        <div>
          <Dialog
            title="確認"
            actions={actions}
            modal={true}
            open={this.state.open}
            onRequestClose={this.handleClose}
          >
            {conference.isFetching &&
              <div
                className="loading-wrap"
                style={{
                  height: 280,
                  margin: '0 -24px',
                  padding: '0 15px'
                }}
              >
                <Loading/>
              </div>
            }
            <ConfirmConference conference={conference}/>
          </Dialog>
        </div>
        {!this.state.open &&
          <div className="main-content">
            <Paper
              className="header"
              zDepth={1}
              style={{
                zIndex: 1001,
                height: '5rem',
                width: '100%',
                position: 'fixed',
                top: 0,
                left: 0,
                backgroundColor: 'rgba(63, 81, 181, 0.9)',
                borderRadius: 0,
              }}
            >
              <h1
                style={{
                  width: '80%',
                  float: 'left',
                  margin: 0,
                  fontSize: '3rem',
                  textAlign: 'center',
                  lineHeight: '5rem',
                  color: 'white',
                  backgroundColor: 'rgba(63, 81, 181, 0)',
                }}
              >
                Re:act
              </h1>
              <a
                style={{
                  width: '20%',
                  float: 'right',
                  margin: 0,
                  fontSize: '1rem',
                  textAlign: 'center',
                  lineHeight: '5rem',
                  color: 'white',
                  backgroundColor: 'rgba(63, 81, 181, 0)',
                }}
                href="https://docs.google.com/forms/d/1TUxJoP51WUDppK4KIgDf4Yv04OMqmB3F5usdtuV2Lew/viewform"
              >
                アンケート
              </a>
            </Paper>
            <div style={{
              zIndex: 1001,
              position: 'fixed',
              top: '5rem',
              left: 0,
              width: '100%',
              height: '1rem',
              backgroundColor: grey50,
              opacity: 0.95,
            }}/>
            <div style={{height: '5rem'}}></div>
            <Message/>
          </div>
        }
      </div>
    );
  }
}

Dashboard.propTypes = {
  application: PropTypes.object.isRequired,
  conference: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    application: state.application,
    conference: state.conference,
    messages: state.messages,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign({}, DashboardActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
