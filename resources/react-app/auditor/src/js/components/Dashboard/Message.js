import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
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
      interval: 2000,
      rows: 1,
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

  sendMessage(e) {
    const { application, conference, actions: {sendMessages} } = this.props;
    const { text } = this.state;
    sendMessages({
      token: application.auditorCode,
      conference: conference.conference.id,
      text
    });
    this.setState({
      rows: 1,
      text: ''
    }, () => window.scrollTo(0,document.body.scrollHeight));
  }

  sendLike(id) {
    const { application, actions: {sendLike} } = this.props;
    sendLike({
      token: application.auditorCode,
      message: id
    });
  }

  sendDislike(id) {
    const { application, actions: {sendDislike} } = this.props;
    sendDislike({
      token: application.auditorCode,
      message: id
    });
  }

  render() {
    const { message } = this.props;

    return (
      <div className="message-wrap">
        <div className="messages">
        {
          message.messages.map(m => 
            <div className="message-node">
              <div className="likes-wrap">
                <div className="likes"><p>{m.likes}</p></div>
                <div className="likes-button">
                  <ActionThumbUp
                    color={m.liked ? cyan500 : grey900}
                    style={{
                      margin: '10px 7px 0 7px'
                    }}
                    onTouchTap={() => {
                      m.liked ?
                      this.sendDislike(m.id) :
                      this.sendLike(m.id)
                    }}
                  />
                </div>
              </div>
              <div className="message-text">
                {m.text.split(/[\n\r]/).map(t =>
                  <p>{t}</p>
                )}
              </div>
              <p className="message-time">{`${Math.abs(moment.unix(m.time).diff(moment(), 'minutes'))} 分前`}</p>
            </div>
          )
        }
        </div>

        <div style={{height: '8.4rem'}}></div>

        <div
          className="message-form"
          style={{paddingBottom: this.state.focus ? '5rem' : '1rem'}}
        >
          <textarea
            id="text"
            name="body"
            rows={this.state.rows}
            wrap="soft"
            value={this.state.text}
            onFocus={() => {
              this.setState({ focus: true })
              window.scrollTo(0,document.body.scrollHeight)
            }}
            onBlur={() => this.setState({focus: false})}
            onChange={(e) => {
              let value = e.target.value;
              let linefeed = value.match(/\r\n|\n/g);
              let lines = linefeed === null ? 1 : linefeed.length + 1;
              this.setState({
                rows: lines <= 4 ? lines : 4,
                text: typeof value === 'undefined' ? '' : value
              })
            }}
          >
          </textarea>
          <div
            className="message-submit"
            style={{marginTop: `${(this.state.rows - 1)*2.2}rem`}}
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
  application: PropTypes.object.isRequired,
  conference: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    application: state.application,
    conference: state.conference,
    message: state.message,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign({}, DashboardActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Message);
