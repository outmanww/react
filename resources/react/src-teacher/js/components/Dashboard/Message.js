import React, { PropTypes, Component } from 'react';
import { Doughnut } from 'react-chartjs';

class LineChart extends Component {
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
    const { line } = this.props;

    const colors = {
      confused: '199,36,58',
      interesting: '0,122,183',
      boring: '35,172,14',
    }

    var data = [
        {
            value: 300,
            color:"#F7464A",
            highlight: "#FF5A5E",
            label: "Red"
        },
        {
            value: 50,
            color: "#46BFBD",
            highlight: "#5AD3D1",
            label: "Green"
        },
        {
            value: 100,
            color: "#FDB45C",
            highlight: "#FFC870",
            label: "Yellow"
        }
    ]

    return (
      <div className="space-top-4 space-bottom-3">
        <div className="has-border">
        </div>
      </div>
    );
  }
}

LineChart.propTypes = {
  line: PropTypes.object.isRequired,
};

export default LineChart;
