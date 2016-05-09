import React, { PropTypes, Component } from 'react';
import { Line } from 'react-chartjs';

class LineChart extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      lineWidth: 0
    };
  }

  componentDidMount() {
    this.setState({
      lineWidth: document.getElementById('line-wrap').clientWidth - 20
    });

    // window.onresize = () => {
    //   this.setState({
    //     lineWidth: document.getElementById('line-wrap').clientWidth
    //   });
    // }
  }

  render() {
    const { line } = this.props;

    let labels = [];
    for (let i = line.boring.length - 1; i >= 0; i--) {
      labels.unshift(5 * i);
    }

    const colors = {
      confused: '57,73,171',
      interesting: '67,160,71',
      boring: '229,57,53',
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
      bezierCurve : false,
      bezierCurveTension : 0,
      animation : false,
      // scaleShowHorizontalLines: true, //水平メモリ
      // scaleShowVerticalLines: true, //垂直メモリ
    };

    return (
      <div className="space-top-3 space-bottom-3 has-border">
        <div id="line-wrap">
          {this.state.lineWidth !== 0 &&
            <Line
              data={lineData}
              options={chartOptions}
              width={this.state.lineWidth}
              height="300"
              style={{width: this.state.lineWidth}}
            />
          }
        </div>
      </div>
    );
  }
}

LineChart.propTypes = {
  line: PropTypes.object.isRequired,
};

export default LineChart;
