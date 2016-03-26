import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Input, Row, Col } from 'react-bootstrap';
//Utility
import { validate } from '../../../utils/ValidationUtils';
//Actions
import * as AccessUserActions from '../../../actions/access/user';
import * as AccessRoleActions from '../../../actions/access/role';
import * as InitializeActions from '../../../actions/initialize';
//Components
import { Paper } from 'material-ui';
import RightMenu from '../RightMenu';

class CreateUser extends Component {
  constructor(props, context) {
    super(props, context);
    const { clearDisposable, fetchRoles } = props.actions;
    clearDisposable();
    fetchRoles();

    const string = [
      'userId', 'email', 'password', 'passwordConfirmation',
      'firstName', 'lastName', 'sex', 'age', 'postalCode', 'state', 'city', 'street', 'building',
      'status', 'confirmed', 'confirmationEmail'
    ].reduce((request, key) => {
      request[key] = { value: '', status: '', message: '' };
      return request;
    }, {});

    const array = ['assigneesRoles'].reduce((request, key) => {
      request[key] = { value: [], status: '', message: '' };
      return request;
    }, {});

    this.state = Object.assign(string, array);
  }

  componentWillReceiveProps(nextProps) {
    const { validation, address } = nextProps;

    if (validation) {
      this.setState(validation);
    }

    if (address) {
      this.setState(Object.keys(address).reduce((state, key) => {
        state[key] = { value: address[key], status: '', message: '' };
        return state;
      }, {}));
    }
  }

  getAddress() {
    const { fetchAddress } = this.props.actions;
    const { value, status } = this.state.postalCode;
    if (status === '' && value.toString().length !== 0) {
      fetchAddress(value.toString());
    }
  }

  validate(name, value, checked) {
    const pass = this.state.password.value;
    const passConf = this.state.passwordConfirmation.value;

    switch (name) {
      case 'assigneesRoles':
        this.setState({ [name]: { value: [value] } });
        break;

      case 'status':
      case 'confirmed':
      case 'confirmationEmail':
        this.setState({ [name]: { value: checked ? '1' : '0' } });
        break;

      case 'password':
        this.setState({
          password: validate(name, value),
          passwordConfirmation: validate('passwordConfirmation', passConf, value)
        });
        break;

      case 'passwordConfirmation':
        this.setState({
          [name]: validate(name, value, pass)
        });
        break;

      default:
        this.setState({ [name]: validate(name, value) });
    }
  }

  handleChange(e) {
    const { name, value, checked } = e.target;
    this.validate(name, value, checked);
  }

  hanbleBlur() {
    const { validateEmail } = this.props.actions;
    validateEmail(this.state.email.value);
  }

  handleHover() {
    for (const key in this.state) {
      if (this.state[key].value === '') {
        this.validate(key, this.state[key].status);
      }
    }
  }

  handleSubmit() {
    const { storeUser } = this.props.actions;
    const Keys = Object.keys(this.state);
    const hasError = Keys.some(key =>
      this.state[key].status === 'error'
    );

    if (!hasError) {
      storeUser(Keys.reduce((request, key) => {
        request[key] = this.state[key].value;
        return request;
      }, {}));
    }
  }

  handleClick() {
    this.props.history.goBack();
  }

  renderRoles() {
    const { roles } = this.props;
    return roles.map(role =>
      <div className="col-xs-offset-2 col-xs-10" key={role.id}>
        <div className="checkbox">
          <label className>
            <input type="radio" value={role.id} name="assigneesRoles" className/>
            <span><strong>{role.name}</strong></span>
          </label>
        </div>
      </div>
    );
  }

  render() {
    const {
      userId, email, password, passwordConfirmation,
      firstName, sex, age, postalCode, state, city, street, building,
    } = this.state;
    const hasError = Object.keys(this.state).some(key =>
      this.state[key].status === 'error'
    );

    return (
      <Paper zDepth={1}>
        <div className="box-header with-border">
          <h3 className="box-title">Create User</h3>
          <RightMenu/>
        </div>
        <div className="box-body">
          <form className="form-horizontal" onChange={this.handleChange.bind(this)}>
            <Input type="text" label="User ID" name="userId" placeholder="User ID"
              bsStyle={userId.status}
              labelClassName="col-xs-2"
              wrapperClassName="col-xs-10"
              help={userId.message}/>
            <Input type="text" label="E-mail" name="email" placeholder="Horita@works.com"
              bsStyle={email.status}
              labelClassName="col-xs-2"
              wrapperClassName="col-xs-10"
              help={email.message}
              onBlur={this.hanbleBlur.bind(this)}/>
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

            <Input label="Name"
              bsStyle={firstName.status}
              labelClassName="col-xs-2"
              wrapperClassName="col-xs-10"
              help={firstName.message}>
              <Row>
                <Col xs={6} sm={5}><input type="text" name="firstName" placeholder="First Name" className="form-control" /></Col>
                <Col xs={6} sm={5}><input type="text" name="lastName" placeholder="Last Name" className="form-control" /></Col>
              </Row>
            </Input>
            <Input type="select" label="Sex" name="sex" placeholder="sex"
              bsStyle={sex.status}
              labelClassName="col-xs-2"
              wrapperClassName="col-xs-5 col-sm-3 col-md-2"
              help={sex.message}>
              <option value="0">Man</option>
              <option value="1">Woman</option>
            </Input>
            <Input type="number" label="Age" name="age" placeholder="age"
              bsStyle={age.status}
              labelClassName="col-xs-2"
              wrapperClassName="col-xs-5 col-sm-3 col-md-2"
              help={age.message}/>

            <Input label="Postal Code"
              bsStyle={postalCode.status}
              labelClassName="col-xs-2"
              wrapperClassName="col-xs-10"
              help={postalCode.message}>
              <Row>
                <Col xs={6} sm={4} md={3}>
                  <input type="text" name="postalCode" placeholder="1234567" className="form-control" />
                </Col>
                <Col xs={6} sm={4} md={3}>
                  <button type="button" className="btn btn-default" onClick={this.getAddress.bind(this)}>
                    Serch Address
                  </button>
                </Col>
              </Row>
            </Input>
            <Input type="select" label="State" name="state" placeholder="State"
              value={state.value}
              bsStyle={state.status}
              labelClassName="col-xs-2"
              wrapperClassName="col-xs-5 col-sm-3 col-md-2"
              help={state.message}>
              <option value="北海道">北海道</option>
              <option value="青森県">青森県</option>
              <option value="岩手県">岩手県</option>
              <option value="宮城県">宮城県</option>
              <option value="秋田県">秋田県</option>
              <option value="山形県">山形県</option>
              <option value="福島県">福島県</option>
              <option value="茨城県">茨城県</option>
              <option value="栃木県">栃木県</option>
              <option value="群馬県">群馬県</option>
              <option value="埼玉県">埼玉県</option>
              <option value="千葉県">千葉県</option>
              <option value="東京都">東京都</option>
              <option value="神奈川県">神奈川県</option>
              <option value="新潟県">新潟県</option>
              <option value="山梨県">山梨県</option>
              <option value="長野県">長野県</option>
              <option value="富山県">富山県</option>
              <option value="石川県">石川県</option>
              <option value="福井県">福井県</option>
              <option value="岐阜県">岐阜県</option>
              <option value="静岡県">静岡県</option>
              <option value="愛知県">愛知県</option>
              <option value="三重県">三重県</option>
              <option value="滋賀県">滋賀県</option>
              <option value="京都府">京都府</option>
              <option value="大阪府">大阪府</option>
              <option value="兵庫県">兵庫県</option>
              <option value="奈良県">奈良県</option>
              <option value="和歌山県">和歌山県</option>
              <option value="鳥取県">鳥取県</option>
              <option value="島根県">島根県</option>
              <option value="岡山県">岡山県</option>
              <option value="広島県">広島県</option>
              <option value="山口県">山口県</option>
              <option value="徳島県">徳島県</option>
              <option value="香川県">香川県</option>
              <option value="愛媛県">愛媛県</option>
              <option value="高知県">高知県</option>
              <option value="福岡県">福岡県</option>
              <option value="佐賀県">佐賀県</option>
              <option value="長崎県">長崎県</option>
              <option value="熊本県">熊本県</option>
              <option value="大分県">大分県</option>
              <option value="宮崎県">宮崎県</option>
              <option value="鹿児島県">鹿児島県</option>
              <option value="沖縄県">沖縄県</option>
            </Input>
            <Input type="text" label="City" name="city" placeholder="City"
              value={city.value}
              bsStyle={city.status}
              labelClassName="col-xs-2"
              wrapperClassName="col-xs-10"
              help={city.message}/>
            <Input type="text" label="Street" name="street" placeholder="Street"
              value={street.value}
              bsStyle={street.status}
              labelClassName="col-xs-2"
              wrapperClassName="col-xs-10"
              help={street.message}/>
            <Input type="text" label="Building" name="building" placeholder="Building"
              bsStyle={building.status}
              labelClassName="col-xs-2"
              wrapperClassName="col-xs-10"
              help={building.message}/>

            <div className="form-group">
              <label className="col-xs-2 control-label">Options</label>
              <div className="col-xs-10">
                <div className="checkbox">
                  <label className>
                    <input type="checkbox" name="status" className /><span>Active</span>
                  </label>
                </div>
                <span className="help-block">hoge hoge</span>
              </div>
              <div className="col-xs-offset-2 col-xs-10">
                <div className="checkbox">
                  <label className>
                    <input type="checkbox" name="confirmed" className/><span>Confirmed</span>
                  </label>
                </div>
                <span className="help-block">hoge hoge</span>
              </div>
              <div className="col-xs-offset-2 col-xs-10">
                <div className="checkbox">
                  <label className>
                    <input type="checkbox" name="confirmationEmail" className/><span>Send Confirmation Mail</span>
                  </label>
                </div>
                <span className="help-block">If confirmed is off</span>
              </div>
            </div>

            <div className="form-group">
              <label className="col-xs-2 control-label">Associated Roles</label>
              {this.props.roles && this.renderRoles()}
            </div>
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
              onMouseOver={this.handleHover.bind(this)}>
              Create
            </button>
          </div>
          <div className="clearfix" />
        </div>
      </Paper>
    );
  }
}

CreateUser.propTypes = {
  validation: PropTypes.object.isRequired,
  address: PropTypes.object.isRequired,
  roles: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired

};

function mapStateToProps(state) {
  return {
    validation: state.disposable.validation,
    address: state.disposable.address,
    roles: state.roles.roles
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign(AccessUserActions, AccessRoleActions, InitializeActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateUser);
