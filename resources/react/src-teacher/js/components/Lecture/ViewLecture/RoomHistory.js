import React, { PropTypes, Component } from 'react';
import { Line } from 'react-chartjs';

class RoomHistory extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { line } = this.props;
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
      <div className="has-border">
        {/*<p className="select">編集するタイプを選択してください</p>*/}
        <Line data={lineData} width="600" height="250"/>
      </div>
    )
  }
}

RoomHistory.propTypes = {
  line: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired
};

export default RoomHistory;
