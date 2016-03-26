import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// Actions
import { routeActions } from 'react-router-redux';
import * as TimetableActions from '../../../actions/Flight/timetable';
import * as PlanActions from '../../../actions/Flight/plan';
// Material-UI-components
import {
  FlatButton, FloatingActionButton, LinearProgress,
  Card, CardActions, CardHeader, CardMedia, CardTitle, CardText
} from 'material-ui';
import Colors from 'material-ui/lib/styles/colors';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';
import Flag from 'material-ui/lib/svg-icons/content/flag';
// Components
import CreatePlan from './CreatePlan';

class PlansList extends Component {
  constructor(props, context) {
    super(props, context);
    props.actions.fetchPlans();
    this.state = {
      open: false,
      title: 'LEDチカチカに場所を追加'
    };
  }

  handleOpen(typeId) {
    this.setState({
      open: true,
      typeId
    });
  }

  handleClose() {
    this.setState({ open: false });
  }

  render() {
    const { plans, types, closedPlaces, actions: {
      fetchPlacesbyType, createPlan, push
    } } = this.props;

    const isFetching = plans.isFetching || types.isFetching;
    const didInvalidate = plans.didInvalidate || types.didInvalidate;

    return (
      <div>
        {isFetching &&
          <LinearProgress
            style={{ position: 'absolute', top: 0, left: 0 }}
            color={Colors.indigo500}
            mode="indeterminate"
          />
        }
        {!isFetching && !didInvalidate && types.types.map(type =>
          <div className="plan-type-wrap" key={type.id}>
            <div className="type-label">
              <Flag/>{type.name}
            </div>
            <div className="plan-type-card-wrap">
              {plans.plans.filter(plan => plan.type.id === type.id).map(plan =>
                <Card className={`flightCard ${plan.active === 0 ? 'deactive' : ''}`} key={plan.id}>
                  <CardHeader
                    title={plan.place.name}
                    textStyle={{ textAlign: 'left' }}
                    style={{ height: 40, padding: 10, fontSize: '2rem' }}
                  />
                  <CardMedia
                    style={{ height: 124 }}
                    overlay={
                      <CardTitle
                        style={{ padding: 0 }}
                        title={
                          <p className="card-title">
                            <span>フライト</span><span>{`${plan.availability[0]}/${plan.availability[1]}`}</span>
                            <span>人数</span><span>{`${plan.availability[2]}/${plan.availability[3]}`}</span>
                          </p>
                      }/>
                  }>
                    <img
                      style={{ height: 124 }}
                      src={`/admin/single/flight/places/${plan.place.id}/picture`}
                    />
                  </CardMedia>
                  <CardText style={{ height: 95, overflow: 'hidden' }}>
                    {plan.description}
                  </CardText>
                  <CardActions>
                    <FlatButton
                      label="予約管理"
                      onClick={() => push(`/admin/single/flight/plans/${plan.id}/timetable`)}
                    />
                    <FlatButton
                      label="設定"
                      onClick={() => push(`/admin/single/flight/plans/${plan.id}/edit`)}
                    />
                  </CardActions>
                </Card>
              )}
              <Card
                className="flightCard"
                style={{ backgroundColor: Colors.grey200 }}
              >
                <FloatingActionButton
                  backgroundColor={Colors.grey200}
                  style={{ marginTop: 120 }}
                  onTouchTap={() => this.setState({ open: true, typeId: type.id })}
                >
                  <ContentAdd color={Colors.grey600}/>
                </FloatingActionButton>
              </Card>
            </div>
          </div>
        )}
        {this.state.open &&
        <CreatePlan
          typeId={this.state.typeId}
          closedPlaces={closedPlaces}
          handleClose={this.handleClose.bind(this)}
          fetchPlacesbyType={fetchPlacesbyType}
          createPlan={createPlan}/>}
      </div>
    );
  }
}

PlansList.propTypes = {
  plans: PropTypes.array.isRequired,
  types: PropTypes.array.isRequired,
  closedPlaces: PropTypes.object,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  const { plans, types, disposable } = state;
  return {
    plans,
    types,
    closedPlaces: disposable.closedPlaces
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign(routeActions, TimetableActions, PlanActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlansList);
