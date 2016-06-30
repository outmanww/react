import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
// Config
import { SCHOOL_NAME } from '../../../config/env';
// Actions
import * as DashboardActions from '../../actions/dashboard';
// Components
import { Dialog, RaisedButton, FlatButton } from 'material-ui';
import { Paper } from 'material-ui';
import { grey50 } from 'material-ui/styles/colors';
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
      minHeight: window.innerHeight - 64,
      background: grey50,
      paddingTop: 5
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
          <Message/>
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
