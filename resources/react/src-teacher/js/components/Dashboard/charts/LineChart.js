import React, { PropTypes, Component } from 'react';
import { Line } from 'react-chartjs';

class LineChart extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    //const lineWidth = document.getElementById('line-wrap').width;

    const { labels, data } = this.props;
    // const lineData = {
    //   labels: labels,
    //   datasets: [
    //     {
    //       label: "My Second dataset",
    //       fillColor: "rgba(151,187,205,0.2)",
    //       strokeColor: "rgba(151,187,205,1)",
    //       pointColor: "rgba(151,187,205,1)",
    //       pointStrokeColor: "#fff",
    //       pointHighlightFill: "#fff",
    //       pointHighlightStroke: "rgba(151,187,205,1)",
    //       data: data
    //     }
    //   ]
    // };

    var lineData = {
      labels: ['0', '10', '20', '30', '40', '50', '60', '70', '80', '90'],
      datasets: [
        {
          label: "My First dataset",
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "rgba(220,220,220,1)",
          pointColor: "rgba(220,220,220,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(220,220,220,1)",
          data: [65, 59, 80, 81, 56, 55, 40, 30, 10, 8]
        },
        {
          label: "My Second dataset",
          fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "rgba(151,187,205,1)",
          pointColor: "rgba(151,187,205,1)",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: [28, 48, 40, 19, 86, 27, 90, 8, 10, 80]
        }
      ]
    };

    return (
      <div className="space-top-4 space-bottom-3">
        <div className="has-border">
          <div id="line-wrap" className="raw">
          <Line data={lineData} width="600" height="250"/>
          </div>
        </div>
      </div>
    );
  }
}

LineChart.propTypes = {
  focused: PropTypes.string.isRequired,
};

export default LineChart;
