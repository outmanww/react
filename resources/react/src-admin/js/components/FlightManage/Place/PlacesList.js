import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//Actions
import { routeActions } from 'react-router-redux';
import * as PlaceActions from '../../../actions/Flight/place';
// Material-UI-components
import {
  FlatButton, FloatingActionButton, LinearProgress,
  Card, CardActions, CardHeader, CardMedia
} from 'material-ui';
import Colors from 'material-ui/lib/styles/colors';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';

class PlacesList extends Component {
  render() {
    const { places, isFetching, actions } = this.props;
    return (
      <div>
        {isFetching &&
          <LinearProgress
            style={{ position: 'absolute', top: 0, left: 0 }}
            color={Colors.indigo500}
            mode="indeterminate"
          />
        }
        <div className="placs-card-wrap">
          <Card className="flightCard" style={{ backgroundColor: Colors.grey200 }}>
            <FloatingActionButton
              backgroundColor={Colors.grey200}
              style={{ marginTop: 73 }}
              onTouchTap={() => actions.push(`/admin/single/flight/places/create`)}
            >
              <ContentAdd color={Colors.grey600}/>
            </FloatingActionButton>
          </Card>
          {places.map(place =>
            <Card className="flightCard" key={place.id}>
              <CardHeader
                title={place.name}
                textStyle={{ textAlign: 'left' }}
                style={{ height: 40, padding: 10, fontSize: '2rem' }}
              />
              <CardMedia>
                <img src={`/admin/single/flight/places/${place.id}/picture`} />
              </CardMedia>
              <CardActions>
                <FlatButton
                  label="編集"
                  onClick={() => actions.push(`/admin/single/flight/places/${place.id}/edit`)}
                />
              </CardActions>
            </Card>
          )}
        </div>
      </div>
    );
  }
}

PlacesList.propTypes = {
  places: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  didInvalidate: PropTypes.bool.isRequired,
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

export default connect(mapStateToProps, mapDispatchToProps)(PlacesList);
