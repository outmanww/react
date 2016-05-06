import React, { PropTypes, Component } from 'react';
import { Line } from 'react-chartjs';
import moment from 'moment';
// Material-ui
import { List, ListItem, Divider, Avatar } from 'material-ui';
import Colors from 'material-ui/lib/styles/colors';
import IconButton from 'material-ui/lib/icon-button';
import MoreVertIcon from 'material-ui/lib/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/lib/menus/icon-menu';
import MenuItem from 'material-ui/lib/menus/menu-item';

class RoomHistory extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { line, messages } = this.props;
    const colors = {
      confused: '57,73,171',
      interesting: '67,160,71',
      boring: '229,57,53',
    }

    let labels = [];
    for (let i = line.boring.length - 1; i >= 0; i--) {
      labels.unshift(5 * i);
    }

    const lineData = {
      labels: labels,
      datasets: [
        {
          label: "confused",
          fillColor: `rgba(${colors.confused},0.02)`,
          strokeColor: `rgba(${colors.confused},1)`,
          pointColor: `rgba(${colors.confused},1)`,
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: line.confused
        },{
          label: "interesting",
          fillColor: `rgba(${colors.interesting},0.02)`,
          strokeColor: `rgba(${colors.interesting},1)`,
          pointColor: `rgba(${colors.interesting},1)`,
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: line.interesting
        },{
          label: "boring",
          fillColor: `rgba(${colors.boring},0.02)`,
          strokeColor: `rgba(${colors.boring},1)`,
          pointColor: `rgba(${colors.boring},1)`,
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: line.boring
        }
      ]
    };

console.log(lineData);

    return (
      <div>
        <div className="row">
          <div className="has-border">
            {/*<p className="select">編集するタイプを選択してください</p>*/}
            <Line data={lineData} width="600" height="250"/>
          </div>
        </div>
        <div className="row">
          <div className="space-top-4 space-bottom-3 space-left-3">
            <div id="message-wrap">
              <List subheader="メッセージ">
              {
                messages.map(m =>
                  <div>
                    <ListItem
                      leftAvatar={
                        <Avatar
                          color={Colors.deepOrange300}
                          backgroundColor={
                            Colors.purple500
                          }
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
        </div>
      </div>
    )
  }
}

RoomHistory.propTypes = {
  line: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired
};

export default RoomHistory;
