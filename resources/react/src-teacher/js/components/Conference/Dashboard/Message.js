import React, { PropTypes, Component } from 'react';
import { Doughnut } from 'react-chartjs';
import moment from 'moment';
// Material-ui
import { List, ListItem, Divider, Avatar } from 'material-ui';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';

class Message extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { messages } = this.props;
    const chatStyle = {
      margin: '10px 0 0 0',
      padding: 10,
      backgroundColor: 'white',
      borderRadius: 5,
      borderRadius: 4,
      boxShadow: '0px 1px 2px rgba(0,0,0,0.2)',
      backgroundColor: 'rgba(255,255,255,1.0)'
    }

    return (
      <div className="space-top-4 space-bottom-3">
        <div id="message-wrap">
          <div>
          {
            messages.dashboardMessages.length === 0 &&
            <ListItem
              primaryText="メッセージはありません"
              secondaryTextLines={2}
            />
          }
          {messages.dashboardMessages.length !== 0 &&
            messages.dashboardMessages
            .sort((m1, m2) => m1.key > m2.key ? 1 : -1)
            .map(m => 
              <div className="message-node" key={`message-${m.key}`}>
                <div className="likes-wrap">
                  <p className="likes">{m.likes}</p>
                </div>
                <div className="message-text">
                  {m.text.split(/[\n\r]/).map((t, i) =>
                    <p key={`message-text-${m.key}-${i}`}>{t}</p>
                  )}
                </div>
                <div className="message-info">
                  <div>{`No.${m.key}`}</div>
                  <div>{`${Math.abs(moment.unix(m.time).diff(moment(), 'minutes'))} 分前`}</div>
                </div>
              </div>
            )
          }
          </div>
        </div>
      </div>
    );
  }
}

Message.propTypes = {
  messages: PropTypes.object.isRequired,
  name: PropTypes.bool.isRequired
};

export default Message;
