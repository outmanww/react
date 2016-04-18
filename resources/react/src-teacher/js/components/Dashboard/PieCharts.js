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

    console.log(pie);

    const colors = {
      confused: '199,36,58',
      interesting: '0,122,183',
      boring: '35,172,14',
    }

    const confused = [
        {
            value: pie.confused,
            color: `rgba(${colors.confused},1)`,
            highlight: `rgba(${colors.confused},0.8)`,
            label: "Red"
        },
        {
            value: pie.attendance - pie.confused,
            color: "rgba(0,0,0,0)",
        }
    ];

    const interesting = [
        {
            value: pie.interesting,
            color: `rgba(${colors.interesting},1)`,
            highlight: `rgba(${colors.interesting},0.8)`,
            label: "Red"
        },
        {
            value: pie.attendance - pie.interesting,
            color: "rgba(0,0,0,0)",
        }
    ];

    const boring = [
        {
            value: pie.boring,
            color: `rgba(${colors.boring},1)`,
            highlight: `rgba(${colors.boring},0.8`,
            label: "Red"
        },
        {
            value: pie.attendance - pie.boring,
            color: "rgba(0,0,0,0)",
        }
    ];

    return (
      <div className="space-top-4 space-bottom-3">
        <div className="has-border">
          <div className="col-md-4">
            <DoughnutChart
              data={confused}
              width="250"
              height="250"
            />
          </div>
          <div className="col-md-4">
            <DoughnutChart
              data={interesting}
              width="250"
              height="250"
            />
          </div>
          <div className="col-md-4">
            <DoughnutChart
              data={boring}
              width="250"
              height="250"
            />
          </div>
        </div>
      </div>
    );
  }
}

PieChart.propTypes = {
  pie: PropTypes.object.isRequired,
};

export default PieChart;
