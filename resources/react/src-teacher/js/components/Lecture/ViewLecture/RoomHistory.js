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
    this.state = {
      lineWidth: 0
    };
  }

  componentDidMount() {
    this.setState({
      lineWidth: document.getElementById('history-line-wrap').clientWidth - 40
    });
  }

  render() {
    const { line, messages } = this.props;
    const colors = {
      confused: '57,73,171',
      interesting: '67,160,71',
      boring: '229,57,53',
    }

    const avatarStyle = {
      1: { color: Colors.indigo400, content: '質'},
      2: { color: Colors.amberA700, content: '感'},
      3: { color: Colors.green400, content: '他'}
    };

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

    const chartOptions = {
      scaleShowGridLines : true,
      // bezierCurve : false,
      bezierCurveTension : 0.5,
      animation : false,
      // scaleShowHorizontalLines: true, //水平メモリ
      // scaleShowVerticalLines: true, //垂直メモリ
      scaleOverride : true,
      scaleLabel: "<%=value%> %",
      scaleSteps : 5, // Y軸に表示する目盛数
      scaleStepWidth : 20, // Y軸目盛の幅
      scaleStartValue : 0, // Y軸の開始数値
      pointDot : false,
    };

    return (
      <div>
        <div className="row">
          <div className="space-left-2 space-right-4 has-border">
            <div id="history-line-wrap" className="bg-white" style={{padding: '20px'}}>
              {this.state.lineWidth !== 0 &&
                <Line
                  data={lineData}
                  options={chartOptions}
                  width={this.state.lineWidth}
                  height="250"
                  style={{width: this.state.lineWidth}}
                />
              }
            </div>
          </div>
        </div>
        <div className="row">
          <div className="space-top-4 space-bottom-3 space-left-2 space-right-4">
            <div id="message-wrap">
              <List subheader="メッセージ">
              {
                messages.map(m =>
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
