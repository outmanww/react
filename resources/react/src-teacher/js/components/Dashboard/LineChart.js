import React, { PropTypes, Component } from 'react';
import { Line } from 'react-chartjs';
import moment from 'moment';

class LineChart extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      lineWidth: 0
    };
  }

  componentDidMount() {
    this.setState({
      lineWidth: document.getElementById('dashboard-line-wrap').clientWidth - 40
    });
  }

  render() {
    const { reactions, room } = this.props;

    const lineRange = 120;
    const interval = 10;
    const effectiveTime = 180;

    let labels = [];
    let confusedData =[];
    let interestingData =[];
    let boringData =[];

    let startTime = moment(room.createdAt, 'YYYY-MM-DD HH:mm:ss').unix();
    let endTime = moment().unix();

    for (let i = 0; i <= lineRange; i++) {
      let Ti = endTime - startTime > interval*lineRange ?
        (endTime - interval*lineRange + interval*i) :
        startTime + interval*i;

      labels[i] = Ti;

      let Ac = [];
      let Ai = [];
      let Ab = [];

      for (var j = reactions.length - 1; j >= 0; j--) {
        let r = reactions[j];
        let l = Math.abs(Number(r.createdAt) - Ti);

        // let a = l >= effectiveTime/2 ? 0 : Math.round(100*(1 - (l*2/effectiveTime)));
        let a = l >= effectiveTime/2 ? 0 : 100*Math.cos(l*Math.PI/effectiveTime);

        let Ar;
        switch (r.typeId){
          case 1:
            Ar = Ac[r.studentId];
            Ac[r.studentId] = typeof Ar === 'undefined' ? Number(a) : Number(Ar) + Number(a) > 100 ? 100 : Number(Ar) + Number(a);
            break;
          case 2:
            Ar = Ai[r.studentId];
            Ai[r.studentId] = typeof Ar === 'undefined' ? Number(a) : Number(Ar) + Number(a) > 100 ? 100 : Number(Ar) + Number(a);
            break;
          case 3:
            Ar = Ab[r.studentId];
            Ab[r.studentId] = typeof Ar === 'undefined' ? Number(a) : Number(Ar) + Number(a) > 100 ? 100 : Number(Ar) + Number(a);
            break;
        }
      }

      confusedData[i] = Math.round(Ac.reduce((a, b) => a + b)/22);
      interestingData[i] = Math.round(Ai.reduce((a, b) => a + b)/22);
      boringData[i] = Math.round(Ab.reduce((a, b) => a + b)/22);
    }

    let nextLabel = labels.map((l, i, array) => {
      return Math.round(l/60) === Math.round(array[i-1]/60) ? '' : moment(l, 'X').format('HH:mm')
    });

    const colors = {
      confused: '57,73,171',
      interesting: '67,160,71',
      boring: '229,57,53',
    }

    const lineData = {
      labels: nextLabel,
      datasets: [
        {
          label: "boring",
          fillColor: `rgba(${colors.boring},0)`,
          strokeColor: `rgba(${colors.boring},1)`,
          pointColor: `rgba(${colors.boring},1)`,
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: boringData
        },{
          label: "boring",
          fillColor: `rgba(${colors.interesting},0)`,
          strokeColor: `rgba(${colors.interesting},1)`,
          pointColor: `rgba(${colors.interesting},1)`,
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: interestingData
        },{
          label: "confused",
          fillColor: `rgba(${colors.confused},0)`,
          strokeColor: `rgba(${colors.confused},1)`,
          pointColor: `rgba(${colors.confused},1)`,
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "rgba(151,187,205,1)",
          data: confusedData
        }
      ]
    };

    const chartOptions = {
      scaleShowGridLines : true,
      bezierCurve : true,
      bezierCurveTension : 0.2,
      animation : false,
      // scaleShowHorizontalLines: true, //水平メモリ
      // scaleShowVerticalLines: true, //垂直メモリ
      scaleOverride : true,
      scaleLabel: "<%=value%> %",
      scaleSteps : 5,
      scaleStepWidth : 20,
      scaleStartValue : 0,
      pointDot : false,
    };

    return (
      <div className="space-top-3 space-bottom-3 has-border">
        <div id="dashboard-line-wrap" className="bg-white" style={{padding: '20px'}}>
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
