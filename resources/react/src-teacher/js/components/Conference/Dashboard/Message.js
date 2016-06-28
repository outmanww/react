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

    const iconButtonElement = (
      <IconButton
        touch={true}
        tooltip="more"
        tooltipPosition="bottom-left"
      >
        <MoreVertIcon color={Colors.grey400} />
      </IconButton>
    );

    const rightIconMenu = (
      <IconMenu iconButtonElement={iconButtonElement}>
        <MenuItem>Reply</MenuItem>
        <MenuItem>Forward</MenuItem>
        <MenuItem>Delete</MenuItem>
      </IconMenu>
    );

    const avatarStyle = {
      1: { color: Colors.indigo400, content: '質'},
      2: { color: Colors.amberA700, content: '感'},
      3: { color: Colors.green400, content: '他'}
    };

    return (
      <div className="space-top-4 space-bottom-3 space-left-3">
        <div id="message-wrap">
          <List>
          {
            messages.dashboardMessages.length === 0 &&
            <ListItem
              primaryText="メッセージはありません"
              secondaryTextLines={2}
            />
          }
          {messages.dashboardMessages.length !== 0 &&
            messages.dashboardMessages.map(m => 
              !this.props.name && m.action == 5 ? <div></div> :
              <div>
                <ListItem
                  leftAvatar={
                    <Avatar
                      color={Colors.White}
                      backgroundColor={avatarStyle[m.type].color}
                    >
                      {avatarStyle[m.type].content}
                    </Avatar>
                  }
                  primaryText={m.message}
                  secondaryText={`${Math.abs(moment.unix(m.time).diff(moment(), 'minutes'))} 分前`}
                  secondaryTextLines={2}
                />
                <Divider inset={true} />
              </div>
            )
          }
          </List>
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
