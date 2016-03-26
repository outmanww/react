import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import moment from 'moment';
//Actions
import { routeActions } from 'react-router-redux';
import * as TimetableActions from '../../../../actions/Flight/timetable';
import * as PlanActions from '../../../../actions/Flight/plan';
//Components
import { LinearProgress, CircularProgress } from 'material-ui';
import Colors from 'material-ui/lib/styles/colors';
import Timetable from './Timetable';
import OpenMode from './TimetableRightPanel/OpenMode';
import EditMode from './TimetableRightPanel/EditMode';

class EditTimetable extends Component {
  constructor(props) {
    super(props);
    const { routeParams, actions } = props;
    const timestamp = Math.floor(new Date().getTime() / 1000);

    actions.fetchTimetables({
      planId: routeParams.id,
      timestamp,
      range: [0, 6]
    });

    this.state = {
      timestamp,
      planId: routeParams.id,
      take: 7,
      range: [0, 6],
      capacity: 1,
      editMode: false,
      editting: new Array(2)
    };
  }

  render() {
    const { planId, plan, timetables, isFetching, fetchingNodes, actions } = this.props;
    const { timestamp, range, take, capacity, editMode, editting } = this.state;

    const displayData = Object.keys(timetables)
    .filter(key =>
      timestamp + (86400 * (range[0] - 1)) <= key && key < timestamp + (86400 * range[1])
    )
    .reduce((array, key) => {
      array.push({
        timestamp: key,
        timetable: timetables[key]
      });
      return array;
    }, []);

    const reachUpperLimit = range[1] > 28;
    const reachLowerLimit = range[0] < -28;

    return (
      <div>
        {isFetching &&
          <LinearProgress
            style={{ position: 'absolute', top: 0, left: 0 }}
            color={Colors.indigo500}
            mode="indeterminate"
          />
        }
        {plan &&
          <div className="timetable-header" style={{ backgroundImage: `url(/admin/single/flight/places/${plan.place.id}/picture)` }}>
            <h3>
              {plan.type.name}
              <span className="place">{plan.place.name}</span>
              {displayData.length === take &&
              <span className="date">
                {moment.unix(displayData[0].timestamp).format('YYYY年MM月DD日')}〜
                {moment.unix(displayData[6].timestamp).format('YYYY年MM月DD日')}
              </span>
              }
            </h3>
            <p>作成日: {plan.createdAt}</p>
            <p>更新日: {plan.updatedAt}</p>
          </div>
        }
        <div className="timetable-body">
          <div className="col-md-9">
            <button
              className={`btn-date back ${reachLowerLimit ? 'disabled' : ''}`}
              onMouseDown={() => {
                if (!reachLowerLimit) {
                  actions.fetchTimetables({ planId, timestamp, range: range.map(n => n - take) });
                  this.setState({ range: range.map(n => n - take) });
                }
              }}
            />
            {displayData.length < take &&
              <CircularProgress style={{ marginTop: 200, marginBottom: 220 }}/>
            }
            {displayData.length === take &&
              <Timetable
                timetable={displayData}
                fetchingNodes={fetchingNodes}
                capacity={capacity}
                editMode={editMode}
                editting={editting}
                changeEditting={(flightId) => this.setState({ editting: flightId })}
                openFlight={actions.openFlight}
                closeFlight={actions.closeFlight}
              />
            }
            <button
              className={`btn-date next ${reachUpperLimit ? 'disabled' : ''}`}
              onMouseDown={() => {
                if (!reachUpperLimit) {
                  actions.fetchTimetables({ planId, timestamp, range: range.map(n => n + take) });
                  this.setState({ range: range.map(n => n + take) });
                }
              }}
            />
            <div className="info">
              <div className="rsv opened past example"><p>終了</p></div>
              <div className="rsv opened reserved example"><p>予約あり</p></div>
              <div className="rsv opened example"><p>開講中</p></div>
              <div className="rsv closed example"><p>未開講</p></div>
              <div style={{ clear: 'both' }}></div>
            </div>
          </div>
          <div className="col-md-3" style={{ padding: 0 }}>
            <div className="mode">
              <div className="either">
                <input type="radio" defaultChecked="checked" checked={!editMode} />
                <label
                  data-label="開講・閉講"
                  onClick={() => this.setState({ editMode: false })}
                >
                  開講・閉講
                </label>
                <input type="radio" checked={editMode}/>
                <label
                  data-label="編集"
                  onClick={() => this.setState({ editMode: true })}
                >
                  編集
                </label>
              </div>
            </div>
            {editMode ?
              <EditMode
                fetchingNodes={fetchingNodes}
                flightData={
                  typeof timetables[editting[0]] === 'undefined' ?
                  null :
                  timetables[editting[0]].find(element => element.id === editting[1])
                }
                updateFlight={actions.updateFlight}
                openFlight={actions.openFlight}
                closeFlight={actions.closeFlight}
              /> :
              <OpenMode
                capacity={capacity}
                changeCapacity={(capacity) => this.setState({ capacity })}
              />
            }
          </div>
        </div>
      </div>
    );
  }
}

EditTimetable.propTypes = {
  planId: PropTypes.number.isRequired,
  plan: PropTypes.object.isRequired,
  timetables: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  didInvalidate: PropTypes.bool.isRequired,
  fetchingNodes: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

EditTimetable.title = 'Timetable';

function mapStateToProps(state, ownProps) {
  const { plans, timetables, fetchingNodes } = state;
  const { id } = ownProps.params;

  return {
    planId: Number(id),
    plan: plans.plans.filter(p => p.id === id)[0],
    timetables: timetables[id] ? timetables[id].timetables : {},
    isFetching: timetables[id] ? timetables[id].isFetching : false,
    didInvalidate: timetables[id] ? timetables[id].didInvalidate : false,
    fetchingNodes
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign(routeActions, PlanActions, TimetableActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditTimetable);
