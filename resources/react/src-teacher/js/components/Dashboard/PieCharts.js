import React, { PropTypes, Component } from 'react';
var DoughnutChart = require("react-chartjs").Doughnut;

class PieChart extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      lineWidth: 300
    };
  }

  render() {
    const { pie } = this.props;
    const colors = {
      confused: '57,73,171',
      interesting: '67,160,71',
      boring: '229,57,53',
    }

    const confused = [
        {
            value: pie.confused,
            color: `rgba(${colors.confused},1)`,
            highlight: `rgba(${colors.confused},0.8)`,
            label: "わからない"
        },
        {
            value: pie.attendance === 0 ? 1 : pie.attendance - pie.confused,
            color: "rgba(255,255,255,1)",
        }
    ];

    const interesting = [
        {
            value: pie.interesting,
            color: `rgba(${colors.interesting},1)`,
            highlight: `rgba(${colors.interesting},0.8)`,
            label: "いいね"
        },
        {
            value: pie.attendance === 0 ? 1 : pie.attendance - pie.interesting,
            color: "rgba(255,255,255,1)",
        }
    ];

    const boring = [
        {
            value: pie.boring,
            color: `rgba(${colors.boring},1)`,
            highlight: `rgba(${colors.boring},0.8`,
            label: "うーん"
        },
        {
            value: pie.attendance === 0 ? 1 : pie.attendance - pie.boring,
            color: "rgba(255,255,255,1)",
        }
    ];

    const chartOptions = {
      segmentShowStroke : false,
      animation : false,

    };

    return (
      <div className="row space-top-4" id="pie-wrap">
        <div className="col-md-4">
          <p className="h4 text-center space-top-0">わからない</p>
          <DoughnutChart
            data={confused}
            options={chartOptions}
            width="200"
            height="200"
          />
        </div>
        <div className="col-md-4">
          <p className="h4 text-center space-top-0">いいね</p>
          <DoughnutChart
            data={interesting}
            options={chartOptions}
            width="200"
            height="200"
          />
        </div>
        <div className="col-md-4">
          <p className="h4 text-center space-top-0">うーん</p>
          <DoughnutChart
            data={boring}
            options={chartOptions}
            width="200"
            height="200"
          />
        </div>
      </div>
    );
  }
}

PieChart.propTypes = {
  pie: PropTypes.object.isRequired,
};

export default PieChart;
