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

class message extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { messages } = this.props;
    const chatStyle = {
      width: '100%',
      margin: 10,
      padding: 10,
      backgroundColor: 'white',
      borderRadius: 5,

    }

    return (
      <div className="space-top-4 space-bottom-3 space-left-3">
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
            messages.dashboardMessages.map(m => 
              !this.props.name && m.action == 5 ?
              <div></div> :
              <div style={chatStyle}>
                <p>{m.text}</p>
                <p>{`${Math.abs(moment.unix(m.time).diff(moment(), 'minutes'))} 分前`}</p>
              </div>
            )
          }
          </div>
        </div>
      </div>
    );
  }
}

message.propTypes = {
  messages: PropTypes.object.isRequired,
  name: PropTypes.bool.isRequired
};

export default message;
