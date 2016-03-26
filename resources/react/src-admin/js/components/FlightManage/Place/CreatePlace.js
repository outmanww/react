import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//Actions
import { routeActions } from 'react-router-redux';
import * as PlaceActions from '../../../actions/Flight/place';
//Utility
import { validate, format } from '../../../utils/ValidationUtils';
// Material-UI-components
import {
  TextField, FlatButton, Card, CardHeader, CardMedia, CardText, CardActions
} from 'material-ui';
import Dropzone from 'react-dropzone';

class CreatePlace extends Component {
  constructor(props, context) {
    super(props, context);
    props.actions.fetchPlaces();
    this.state = Object.assign({},
      format([
        'name', 'description', 'file'
      ]), {
        active: true,
      }
    );
  }

  onDrop(files) {
    this.setState({
      file: { value: files[0], status: '', message: '' }
    });
  }

  handleChange(item, e) {
    this.setState({
      [item]: validate(item, e.target.value)
    });
  }

  handleHover(active) {
    this.setState({ active });
  }

  handleSubmit() {
    const { actions } = this.props;
    const { name, file } = this.state;

    const newState = {
      name: validate('name', name.value),
      description: validate('description', name.value),
      file: validate('file', file.value),
    };

    this.setState(newState, () => {
      const Keys = Object.keys(this.state);
      const hasError = Keys.some(key => {
        if (typeof this.state[key] === 'object') {
          return this.state[key].status === 'error';
        }
      });

      if (!hasError) {
        actions.createPlace({
          name: this.state.name.value,
          description: this.state.description.value,
          file: this.state.file.value
        });
      }
    });
  }

  cancel() {
    this.props.history.goBack();
  }

  render() {
    const { name, description, file, active } = this.state;

    return (
      <div>
        <Card className="flightCard-edit">
          <CardHeader
            style={{ height: 80, fontSize: '2rem' }}
          >
            <TextField
              style={{ width: 400 }}
              underlineStyle={{ marginBottm: 10 }}
              hintText="プランのタイトル"
              errorText={name.message}
              defaultValue={name.value}
              value={name.value}
              onChange={this.handleChange.bind(this, 'name')}
            />
          </CardHeader>
          <CardMedia
            onMouseOver={this.handleHover.bind(this, true)}
            onMouseOut={this.handleHover.bind(this, false)}
            style={{ width: 500, height: 280 }}
          >
            <img
              src={file.value === '' ? '' : file.value.preview}
              style={{height: 280}}
            />
            <p className="file-error-messsage">{file.message}</p>
            <div className="cover" style={{ display: active || file.value === '' ? 'block' : 'none' }}>
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
              style={{ marginLeft: 35, marginTop: 15, width: 400 }}
              hintText="プランの説明"
              multiLine
              rows={1}
              rowsMax={5}
              defaultValue={description.value}
              value={description.value}
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
              label="作成"
              secondary
              style={{ float: 'right' }}
              onTouchTap={this.handleSubmit.bind(this)}
            />
          </div>
          </CardActions>
        </Card>
      </div>
    );
  }
}

CreatePlace.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};

function mapStateToProps() {
  return {
    isFetching: false,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign(routeActions, PlaceActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreatePlace);
