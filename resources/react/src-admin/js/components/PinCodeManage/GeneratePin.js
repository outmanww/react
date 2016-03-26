import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Input } from 'react-bootstrap';
//Actions
import * as PinActions from '../../actions/pin/pin';
//Components
import RightMenu from './RightMenu';

class GeneratePin extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      tickets: '1',
      pins: '1',
    };
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { generatePins } = this.props.actions;
    generatePins(this.state);
  }

  render() {
    const { ticket, pin } = this.state;
    return (
      <div className="box box-success">
        <div className="box-header with-border">
          <h3 className="box-title">Generate Pin-Code</h3>
          <RightMenu/>
        </div>
        <div className="box-body">
          <form
            className="form-horizontal"
            onChange={this.handleChange.bind(this)}>
            <Input type="select" label="獲得できるチケットの枚数" name="tickets" ref="ticket"
              value={ticket}
              labelClassName="col-xs-3"
              wrapperClassName="col-xs-5 col-sm-3 col-md-2">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </Input>
            <Input type="select" label="発行するPINコードの数" name="pins" ref="pin"
              value={pin}
              labelClassName="col-xs-3"
              wrapperClassName="col-xs-5 col-sm-3 col-md-2">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </Input>
            <button className="btn btn-default" disabled=""
              onClick={this.handleSubmit.bind(this)}>
              発行する
            </button>
          </form>
        </div>
      </div>
    );
  }
}

GeneratePin.propTypes = {
  routing: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    routing: state.routing
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(PinActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GeneratePin);
