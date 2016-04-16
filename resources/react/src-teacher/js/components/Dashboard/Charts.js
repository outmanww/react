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

    const labels = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
    const data   = [28, 48, 40, 19, 86, 27, 90, 8, 10, 80, 60];
    const lineData = {
      labels: labels,
      datasets: [
        {
          label: "My Second dataset",
          fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: data
        }
      ]
    };

    return (
      <div className="space-top-4 space-bottom-3">
        <div className="has-border">
          <div id="line-wrap" className="raw">
            <Line
              data={lineData}
              width={`${this.state.lineWidth}px`}
              height="250"
              style={{width: this.state.lineWidth, height: 250}}
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
