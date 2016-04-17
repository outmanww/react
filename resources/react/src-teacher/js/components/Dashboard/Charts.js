import React, { PropTypes, Component } from 'react';
import { LineChart } from './charts/LineChart';
import { Line } from 'react-chartjs';

class Charts extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      lineWidth: 300
    };
  }

  componentDidMount() {
    this.setState({
      lineWidth: document.getElementById('line-wrap').clientWidth
    });
  }

  render() {
    const { line } = this.props.charts;

    let labels = [];
    for (let i = line.boring.length - 1; i >= 0; i--) {
      labels.unshift(5 * i);
    }

    const colors = {
      confused: '199,36,58',
      interesting: '0,122,183',
      boring: '35,172,14',
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

    return (
      <div className="space-top-4 space-bottom-3">
        <div className="has-border">
          <div id="line-wrap" className="raw">
            <Line
              data={lineData}
              width="1000"
              height="300"
            />
          </div>
        </div>
      </div>
    );
  }
}

Charts.propTypes = {
  focused: PropTypes.string.isRequired,
};

export default Charts;
