import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//Actions
import { routeActions } from 'react-router-redux';
import * as PlaceActions from '../../../actions/Flight/place';
// Material-UI-components
import {
  TextField, FlatButton, Card, CardHeader, CardMedia, CardText, CardActions
} from 'material-ui';
import Colors from 'material-ui/lib/styles/colors';
import Dropzone from 'react-dropzone';

class EditPlace extends Component {
  constructor(props, context) {
    super(props, context);
    props.actions.fetchPlaces();
    this.state = {
      active: false,
      file: 'noChange'
    };
  }

  componentWillReceiveProps(nextProps) {
    const { place } = nextProps;
    if (place) {
      this.setState(Object.assign(
        {},
        { ...place },
        {path: `/admin/single/flight/places/${place.id}/picture`}
      ));
    }
  }

  onDrop(files) {
    if (files.length === 1) {
      this.setState({
        file: files[0],
        path: files[0].preview
      });
    }
  }

  handleChange(item, e) {
    this.setState({ [item]: e.target.value });
  }

  handleHover(active) {
    this.setState({ active });
  }

  handleSubmit() {
    const { id, actions } = this.props;
    const { name, description, file } = this.state;
    actions.updatePlace(id, { name, description, file });
  }

  delete() {
    const { id, actions } = this.props;
    actions.deletePlace(id);
  }

  cancel() {
    this.props.history.goBack();
  }

  render() {
    console.log(this.state)
    const { active, path } = this.state;
    return (
      <div>
      {Object.keys(this.state).length > 2 &&
        <Card className="flightCard-edit">
          <CardHeader
            style={{ height: 80, fontSize: '2rem' }}
          >
            <TextField
              style={{ width: 400 }}
              underlineStyle={{ marginBottm: 10 }}
              hintText="場所の名前を書いてください"
              multiLine
              rows={1}
              rowsMax={5}
              defaultValue={this.state.name}
              value={this.state.name}
              onChange={this.handleChange.bind(this, 'name')}
            />
          </CardHeader>
          <CardMedia
            onMouseOver={this.handleHover.bind(this, true)}
            onMouseOut={this.handleHover.bind(this, false)}
          >
            <img src={path}/>
            <div className="cover" style={{ display: active ? 'block' : 'none' }}>
              <div className="border">
                <i className="fa fa-camera"></i>
                <p>ファイルをドラッグ&ドロップで画像を変更</p>
              </div>
            </div>
            <Dropzone
              onDrop={this.onDrop.bind(this)}
              className="dropable-area"
              accept="image/*"
            />
          </CardMedia>
          <CardText>
            <TextField
              style={{ marginLeft: 35, width: 400 }}
              hintText="場所の説明を書いてください"
              multiLine
              rows={1}
              rowsMax={5}
              defaultValue={this.state.description}
              value={this.state.description}
              onChange={this.handleChange.bind(this, 'description')}
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
            <FlatButton
              label="削除"
              style={{ float: 'right' }}
              labelStyle={{ color: Colors.red700 }}
              onTouchTap={this.delete.bind(this)}
            />
          </div>
          </CardActions>
        </Card>}
      </div>
    );
  }
}

EditPlace.propTypes = {
  id: PropTypes.number.isRequired,
  place: PropTypes.object.isRequired,
  isFetching: PropTypes.bool.isRequired,
  didInvalidate: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  const { places } = state;
  const { id } = ownProps.params;
  return {
    id,
    place: places.places.filter(p => p.id === Number(id))[0] || null,
    isFetching: places.isFetching || false,
    didInvalidate: places.didInvalidate || false,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign(routeActions, PlaceActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditPlace);
