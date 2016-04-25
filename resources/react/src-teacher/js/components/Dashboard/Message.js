import React, { PropTypes, Component } from 'react';
import { Doughnut } from 'react-chartjs';
import moment from 'moment';
// Material-ui
import { List, ListItem, Divider, Avatar } from 'material-ui';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item'

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

    return (
      <div className="space-top-4 space-bottom-3 space-left-3">
        <div id="message-wrap">
          <List subheader="メッセージ">
          {
            messages.dashboardMessages.map(m =>
              <div>
                <ListItem
                  leftAvatar={
                    <Avatar
                      color={Colors.deepOrange300}
                      backgroundColor={Colors.purple500}
                    >
                      {m.id}
                    </Avatar>
                  }
                  primaryText={m.message}
                  secondaryText={moment.unix(m.time).format('MM月DD日 hh:mm:ss')}
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
};

export default message;
