import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//Actions
import { routeActions } from 'react-router-redux';
import * as PlaceActions from '../../../actions/Flight/place';
// Material-UI-components
import { Paper } from 'material-ui';

class Place extends Component {
  render() {
    return (
      <Paper className="content-wrap" zDepth={1}>
        {this.props.children}
      </Paper>
    );
  }
}

Place.propTypes = {
  children: PropTypes.object.isRequired,
  places: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { places, isFetching, didInvalidate } = state.places;
  return {
    places: places || [],
    isFetching: isFetching || false,
    didInvalidate: didInvalidate || false,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign(routeActions, PlaceActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Place);
