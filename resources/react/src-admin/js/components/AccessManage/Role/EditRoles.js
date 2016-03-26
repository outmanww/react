import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Input } from 'react-bootstrap';
//Utility
import { validate } from '../../../utils/ValidationUtils';
//Actions
import * as AccessRoleActions from '../../../actions/access/role';
import * as AccessPermissionActions from '../../../actions/access/permission';
import * as InitializeActions from '../../../actions/initialize';
//Components
import { Paper } from 'material-ui';
import RightMenu from '../RightMenu';

class EditRoles extends Component {
  constructor(props, context) {
    super(props, context);
    const string = ['name', 'sort', 'associatedPermissions'].reduce((request, key) => {
      request[key] = { value: '', status: '', message: '' };
      return request;
    }, {});

    const array = ['permissions'].reduce((request, key) => {
      request[key] = { value: [], status: '', message: '' };
      return request;
    }, {});

    this.state = Object.assign(string, array);
  }

  componentWillMount() {
    const { clearDisposable } = this.props.actions;
    clearDisposable();
  }

  componentDidMount() {
    const { routeParams: { id }, actions: { fetchRole, fetchPermissions } } = this.props;
    fetchRole(id);
    fetchPermissions();
  }

  componentWillReceiveProps(nextProps) {
    const { role, validation, dependency } = nextProps;

    if (role !== null && this.props.role === null) {
      this.setState(Object.keys(role).reduce((state, key) => {
        state[key] = { value: role[key], status: '', message: '' };
        return state;
      }, {}));
    }

    if (validation !== {}) {
      this.setState(validation);
    }

    if (dependency) {
      this.setState({ permissions: {
        value: this.state.permissions.value.concat(dependency),
        status: '',
        message: ''
      } });
    }
  }

  validate(name, value, checked) {
    const { fetchPermissionDependency } = this.props.actions;

    switch (name) {
      case 'permissions':
        if (checked) {
          fetchPermissionDependency(value);
          this.setState({ [name]: {
            value: this.state[name].value.concat([Number(value)]),
            status: '',
            message: ''
          } });
        } else {
          this.setState({ [name]: {
            value: this.state[name].value.filter(p => p !== Number(value)),
            status: '',
            message: ''
          } });
        }
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
    const { validateRoleName } = this.props.actions;
    validateRoleName(this.state.name.value);
  }

  handleHover() {
    for (const key in this.state) {
      if (this.state[key].value === '') {
        this.validate(key, this.state[key].status);
      }
    }
  }

  handleSubmit() {
    const { routeParams: { id }, actions: { updateRole } } = this.props;
    const Keys = Object.keys(this.state);
    const hasError = Keys.some(key =>
      this.state[key].status === 'error'
    );

    if (!hasError) {
      updateRole(id, Keys.reduce((request, key) => {
        request[key] = this.state[key].value;
        return request;
      }, {}));
    }
  }

  handleClick() {
    history.back();
  }

  renderPermissions() {
    const { permissions } = this.props;
    const { value } = this.state.permissions;
    return permissions.map(permission =>
      <div className="col-xs-offset-2 col-xs-10" key={permission.id}>
        <div className="checkbox">
          <label className>
            <input
              type="checkbox"
              value={permission.id}
              name="permissions"
              checked={value.indexOf(permission.id) >= 0 ? true : ''}/>
            <span><strong>{permission.displayName}</strong></span>
          </label>
        </div>
      </div>
    );
  }

  render() {
    const { name, sort } = this.state;
    const hasError = Object.keys(this.state).some(key =>
      this.state[key].status === 'error'
    );

    return (
      <Paper zDepth={1}>
        <div className="box-header with-border">
          <h3 className="box-title">Edit Role</h3>
          <RightMenu/>
        </div>
        <div className="box-body">
          <form className="form-horizontal" onChange={this.handleChange.bind(this)}>
            <Input type="text" label="Name" name="name" placeholder="Role Name"
              value={name.value}
              bsStyle={name.status}
              labelClassName="col-xs-2"
              wrapperClassName="col-xs-10"
              help={name.message}
              onBlur={this.hanbleBlur.bind(this)}/>
            <Input type="text" label="Sort" name="sort" placeholder="Sort"
              value={sort.value}
              bsStyle={sort.status}
              labelClassName="col-xs-2"
              wrapperClassName="col-xs-10"
              help={sort.message}/>
            {this.renderPermissions()}
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
              Update
            </button>
          </div>
          <div className="clearfix" />
        </div>
      </Paper>
    );
  }
}

EditRoles.propTypes = {
  lang: PropTypes.string.isRequired,
  role: PropTypes.object.isRequired,
  validation: PropTypes.string.isRequired,
  permissions: PropTypes.array.isRequired,
  dependency: PropTypes.array,
  routeParams: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    lang: state.lang,
    role: state.disposable.editingRole,
    validation: state.disposable.validation,
    permissions: state.permissions.permissions,
    dependency: state.dependency
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign(AccessRoleActions, AccessPermissionActions, InitializeActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EditRoles);
