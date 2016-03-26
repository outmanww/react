import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//Actions
import { routeActions } from 'react-router-redux';
import * as PlanActions from '../../actions/Flight/plan';
import * as TypeActions from '../../actions/Flight/type';
import * as PlaceActions from '../../actions/Flight/place';

import Colors from 'material-ui/lib/styles/colors';

class FlightManage extends Component {
  constructor(props, context) {
    super(props, context);
    const { plans, types, places, actions } = props;
    const now = new Date().getTime();

    actions.fetchTypes();
    actions.fetchPlaces();


    // if (now - plans.updatedAt > 100000 || plans.length <= 1) {
    //   actions.fetchPlans();
    // }

    // if (now - types.updatedAt > 100000 || types.length <= 1) {
    //   actions.fetchTypes();
    // }

    // if (now - places.updatedAt > 100000 || places.length <= 1) {
    //   actions.fetchPlaces();
    // }
  }

  render() {
    const { routes, actions } = this.props;

    return (
      <div style={{ minHeight: '600px', background: Colors.blueGrey50 }}>
        <section className="content-header">
          <h1>
            {routes[1].name}
            {
              typeof routes[2] !== 'undefined' &&
              <small onClick={() => actions.push(`/admin/single/flight/${routes[2].path}`)}>{ routes[2].name }</small>
            }
            {
              typeof routes[3] !== 'undefined' &&
              typeof routes[3].name !== 'undefined' &&
             <small>{ routes[3].name }</small>
            }
          </h1>
        </section>
        <section className="content">
          {this.props.children}
        </section>
      </div>
    );
  }
}

FlightManage.propTypes = {
  routes: PropTypes.array.isRequired,
  children: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

FlightManage.title = 'Flight Managemen';

function mapStateToProps(state, ownProps) {
  const { plans, types, places } = state;
  return {
    plans,
    types,
    places,
    routes: ownProps.routes
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign(PlanActions, TypeActions, PlaceActions, routeActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FlightManage);
