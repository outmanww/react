import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//Actions
import { routeActions } from 'react-router-redux';
import * as TimetableActions from '../../../actions/Flight/timetable';
import * as PlanActions from '../../../actions/Flight/plan';
// Material-UI-components
import { Paper } from 'material-ui';

class Plan extends Component {
  render() {
    return (
      <Paper className="content-wrap" zDepth={1}>
        {this.props.children}
      </Paper>
    );
  }
}

Plan.propTypes = {
  children: PropTypes.object.isRequired,
  plans: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    plans: state.plans
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign(routeActions, TimetableActions, PlanActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Plan);
