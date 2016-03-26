import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Input } from 'react-bootstrap';
//Utility
import { validate } from '../../../utils/ValidationUtils';
//Actions
import * as AccessUserActions from '../../../actions/access/user';
//Components
import { Paper } from 'material-ui';
import RightMenu from '../RightMenu';

class ChangePassword extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      password: { value: '', status: '', message: '' },
      passwordConfirmation: { value: '', status: '', message: '' },
    };
  }

  validate(name, value) {
    const pass = this.state.password.value;
    const passConf = this.state.passwordConfirmation.value;

    switch (name) {
      case 'password':
        this.setState({
          password: validate(name, value),
          passwordConfirmation: validate('passwordConfirmation', passConf, value)
        });
        break;

      case 'passwordConfirmation':
        this.setState({
          passwordConfirmation: validate(name, value, pass)
        });
        break;

      default:
    }
  }

  handleChange(e) {
    const { name, value } = e.target;
    this.validate(name, value);
  }

  handleHover() {
    for (const key in this.state) {
      if (this.state[key].value === '') {
        this.validate(key, this.state[key].status);
      }
    }
  }

  handleSubmit() {
    const { routeParams: { id }, actions: { changePassword } } = this.props;
    const hasError = Object.keys(this.state).some(key =>
      this.state[key].status === 'error'
    );

    if (!hasError) {
      changePassword(id, {
        password: this.state.password.value,
        password_confirmation: this.state.passwordConfirmation.value,
      });
    }
  }

  handleClick() {
    this.props.history.goBack();
  }

  render() {
    const { password, passwordConfirmation } = this.state;
    const hasError = Object.keys(this.state).some(key =>
      this.state[key].status === 'error'
    );

    return (
      <Paper className="content-wrap" zDepth={1}>
        <div className="box-header with-border">
          <h3 className="box-title">Change Password</h3>
          <RightMenu/>
        </div>
        <div className="box-body">
          <form className="form-horizontal" onChange={this.handleChange.bind(this)}>
            <Input type="password" label="Password" name="password"
              bsStyle={password.status}
              labelClassName="col-xs-2"
              wrapperClassName="col-xs-10"
              help={password.message}/>
            <Input type="password" label="Password Confirmation" name="passwordConfirmation"
              bsStyle={passwordConfirmation.status}
              labelClassName="col-xs-2"
              wrapperClassName="col-xs-10"
              help={passwordConfirmation.message}/>
          </form>
          <div className="pull-left">
            <button className="btn btn-danger btn-xs"
              onClick={this.handleClick.bind(this)}>
              Cancel
            </button>
          </div>
          <div className="pull-right">
            <button className="btn btn-success btn-xs" disabled={hasError}
              onClick={this.handleSubmit.bind(this)}
              onMouseOver={this.handleHover.bind(this)}>Create</button>
          </div>
          <div className="clearfix" />
        </div>
      </Paper>
    );
  }
}

ChangePassword.propTypes = {
  routeParams: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    lang: state.lang,
    routing: state.routing
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AccessUserActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword);
