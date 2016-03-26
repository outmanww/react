import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//Actions
import { routeActions } from 'react-router-redux';
import * as PlanActions from '../../../actions/Flight/plan';
//Components
import {
  TextField, FlatButton, Card, CardHeader, CardTitle, CardMedia, CardText, CardActions
} from 'material-ui';
import Colors from 'material-ui/lib/styles/colors';
import Icon from 'react-fa';

class EditPlan extends Component {
  constructor(props) {
    super(props);
    const { routeParams, actions } = props;
    actions.fetchPlan(routeParams.id);
    this.state = {};
  }

  componentWillReceiveProps(nextProps) {
    const { plan } = nextProps;
    if (plan) {
      this.setState({ ...plan });
    }
  }

  handleChange(e) {
    this.setState({ description: e.target.value });
  }

  handleSubmit() {
    const { id, actions } = this.props;
    const { description } = this.state;
    actions.updatePlan(id, description);
  }

  activate() {
    const { id, actions } = this.props;
    actions.activatePlan(id);
  }

  deactivate() {
    const { id, actions } = this.props;
    actions.deactivatePlan(id);
  }

  delete() {
    const { id, actions } = this.props;
    actions.deletePlan(id);
  }

  cancel() {
    this.props.actions.goBack();
  }

  render() {
    const { plan } = this.props;
    console.log(plan)
    return (
      <div>
        {plan &&
        <Card className="flightCard-edit">
          <CardHeader
            title={plan.type.name}
            subtitle={plan.place.name}
            avatar={plan.active === 1 ?
              <Icon name="check-circle-o" className="paln-icon-active"/> :
              <Icon name="minus-square-o" className="paln-icon-deactive"/>
            }
            titleStyle={{ textAlign: 'left', fontSize: '2rem' }}
            style={{ height: 80, padding: 18 }}
          />
          <CardMedia
            overlay={
              <CardTitle
                title={
                  <p className="card-title">
                    <span>フライト</span><span>{`${plan.availability[0]}/${plan.availability[1]}`}</span>
                    <span>人数</span><span>{`${plan.availability[2]}/${plan.availability[3]}`}</span>
                  </p>
                }
                style={{ padding: 0, margin: 0 }}/>
            }
            overlayContentStyle={{ padding: 10 }}
          >
            <img src={`/admin/single/flight/places/${plan.place.id}/picture`} />
          </CardMedia>
          <CardText>
            <TextField
              style={{ marginLeft: 35, width: 400 }}
              hintText="プランの説明を書いてください"
              multiLine
              rows={1}
              rowsMax={5}
              defaultValue={plan.description}
              value={this.state.description}
              onChange={this.handleChange.bind(this)}
            />
          </CardText>
          <CardActions>
          <div className="actions">
            <FlatButton
              label="キャンセル"
              style={{ float: 'left' }}
              onTouchTap={this.cancel.bind(this)}
            />
            <FlatButton
              label="更新"
              secondary
              style={{ float: 'right' }}
              onTouchTap={this.handleSubmit.bind(this)}
            />
            {plan.active === 1 &&
            <FlatButton
              label="休講"
              style={{ float: 'right' }}
              labelStyle={{ color: Colors.red700 }}
              onTouchTap={this.deactivate.bind(this)}
            />}
            {plan.active === 0 &&
            [<FlatButton
              label="開講"
              style={{ float: 'right' }}
              labelStyle={{ color: Colors.red700 }}
              onTouchTap={this.activate.bind(this)}
            />,
            <FlatButton
              label="削除"
              style={{ float: 'right' }}
              labelStyle={{ color: Colors.red700 }}
              onTouchTap={this.delete.bind(this)}
            />]}
          </div>
          </CardActions>
        </Card>}
      </div>
    );
  }
}

EditPlan.propTypes = {
  id: PropTypes.number.isRequired,
  plan: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  didInvalidate: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired
};

EditPlan.title = 'Edit Plan';

function mapStateToProps(state, ownProps) {
  const { plans } = state;
  const { id } = ownProps.params;

  return {
    id: Number(id),
    plan: plans.plans.find(p => p.id === Number(id)) || null,
    isFetching: plans.isFetching || false,
    didInvalidate: plans.didInvalidate || false,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign(routeActions, PlanActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPlan);
