import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
// Config
import { BROWSER_NAME } from '../../../config/env';
// Actions
import * as DashboardActions from '../../actions/dashboard';
// Material-ui
import { List, ListItem, Divider, Avatar, IconButton } from 'material-ui';
import { grey900, grey50, cyan500 } from 'material-ui/styles/colors';
import Loading from '../Common/Loading';
import ActionThumbUp from 'material-ui/svg-icons/action/thumb-up';

class Message extends Component {
  constructor(props, context) {
    super(props, context);
    const { application, conference, actions: {fetchMessages} } = props;

    fetchMessages({
      token: application.auditorCode,
      conference: conference.conference.id
    });

    this.state = {
      intervalId: null,
      interval: 200000,
      rem: 10,
      innerHeight: window.innerHeight,
      textareaHeight: 26,
      text: '',
      focus: false
    };
  }

  componentDidMount() {
    const { application, conference, actions: {fetchMessages} } = this.props;
    const intervalId = setInterval(()=> {
      fetchMessages({
        token: application.auditorCode,
        conference: conference.conference.id
      });
    }, this.state.interval);

    this.setState({intervalId});
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  componentDidUpdate(prevProps) {
    const { sendMessage } = this.props.status;
    if (prevProps.status.sendMessage.isFetching && !sendMessage.isFetching) {
      const element = document.getElementById("messages");
      element.scrollTop = element.scrollHeight;
    }
  }

  sendMessage(e) {
    const { application, conference, actions: {sendMessages} } = this.props;
    const { text } = this.state;
    sendMessages({
      token: application.auditorCode,
      conference: conference.conference.id,
      text
    });
    this.setState({
      textareaHeight: 26,
      text: ''
    });
  }

  sendLike(id) {
    const { status, application, actions: {sendLike} } = this.props;
    if (!status.like.isFetching) {
      sendLike({
        token: application.auditorCode,
        message: id
      });
    }
  }

  sendDislike(id) {
    const { status, application, actions: {sendDislike} } = this.props;
    if (!status.dislike.isFetching) {
      sendDislike({
        token: application.auditorCode,
        message: id
      }); 
    }
  }

  render() {
    const { status, message } = this.props;
    const { textareaHeight } = this.state;



    return (
      <div className="message-wrap">
        <div id="messages" className="messages" style={{height: this.state.innerHeight - 94}}>
        {
          message.messages.map((m, i) => 
            <div className="message-node">
              <div className="likes-wrap">
                <div
                  className="likes-icon"
                  onTouchTap={() => {
                    m.liked ?
                    this.sendDislike(m.id) :
                    this.sendLike(m.id)
                  }}
                >
                  <ActionThumbUp
                    color={m.liked ? cyan500 : grey900}
                    style={{
                      margin: '0 8px 0 8px',
                      height: 22,
                      opacity: m.id === status.like.id || m.id === status.dislike.id ? 0.4 : 1
                    }}
                  />
                </div>
                <p className="like-message">Like it!</p>
                <p className="likes">{m.likes}</p>
              </div>
              <div className="message-text">
                {m.text.split(/[\n\r]/).map(t =>
                  <p>{t}</p>
                )}
              </div>
              <div className="message-info">
                <div>{`No.${i+1}`}</div>
                <div>{`${Math.abs(moment.unix(m.time).diff(moment(), 'minutes'))} 分前`}</div>
              </div>
            </div>
          )
        }
        </div>

        <div style={{height: 20 + textareaHeight}}></div>

        <div className="message-form">
          <textarea
            id="text"
            name="body"
            wrap="soft"
            value={this.state.text}
            style={{ height: textareaHeight }}
            onFocus={(e) => {
              window.scrollTo(0, document.body.scrollHeight)
              let scrollHeight = e.target.scrollHeight;
              this.setState({
                focus: true,
                textareaHeight: scrollHeight > 26*4 ? 26*4 : scrollHeight,
              })
            }}
            onBlur={() => this.setState({
              focus: false,
              textareaHeight: 26,
            })}
            onChange={(e) => {
              window.scrollTo(0, document.body.scrollHeight)
              let scrollHeight = e.target.scrollHeight;
              let value = e.target.value;
              this.setState({
                textareaHeight: scrollHeight > 26*4 ? 26*4 : scrollHeight,
                text: typeof value === 'undefined' ? '' : value
              })
            }}
          >
          </textarea>
          <div
            className="message-submit"
            style={{
              marginTop: textareaHeight - 26,
              opacity: this.state.text.length === 0 && this.state.focus ? 0.4 : 1,
              pointerEvents: this.state.text.length === 0 ? 'none' : 'auto'
            }}
            onTouchTap={() => this.sendMessage()}
          >
            <p>送信</p>
          </div>
        </div>
      </div>
    );
  }
}

Message.propTypes = {
  status: PropTypes.object.isRequired,
  application: PropTypes.object.isRequired,
  conference: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    status: state.status,
    application: state.application,
    conference: state.conference,
    message: state.message
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign({}, DashboardActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Message);
