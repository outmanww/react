import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Pagination } from 'react-bootstrap';
//Actions
import { routeActions } from 'react-router-redux';
import * as AccessUserActions from '../../../actions/access/user';
//Components
import { Paper } from 'material-ui';
import MessageInTable from '../../Common/MessageInTable';
import Loading from '../../Common/Loading';
import RightMenu from '../RightMenu';
import UsersTableBody from './UsersTableBody';

class Users extends Component {
  constructor(props, context) {
    super(props, context);
    this.props.actions.fetchUsers();
    this.state = {
      page: 1,
      items: 1,
      title: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    const { fetchUsers } = this.props.actions;
    const { total, search, perPage, query } = nextProps;

    let title;
    switch (query.filter) {
      case 'active': title = 'Active Users'; break;
      case 'deactivated': title = 'Deactivated Users'; break;
      case 'delete': title = 'Deleted Users'; break;
      default: title = 'All Users'; break;
    }

    this.setState({
      page: Math.ceil(query.skip / perPage) + 1 || 1,
      items: Math.ceil(total / perPage),
      title
    });

    if (search !== this.props.search) {
      fetchUsers();
    }
  }

  handlePage(e, selectedEvent) {
    const page = selectedEvent.eventKey;
    const { pathname, query, perPage, actions: { push } } = this.props;
    const skip = (page - 1) * perPage;
    const url = `${pathname}?filter=${query.filter || 'all'}&skip=${skip}&take=${perPage}`;

    push(url);
    this.setState({ page });
  }

  render() {
    const { myId, myRoles, myPermissions, users, isFetching, didInvalidate, asyncStatus, actions } = this.props;
    const { title } = this.state;

    return (
      <Paper zDepth={1}>
        <div className="box-header with-border">
          <h3 className="box-title">{title}</h3>
          <RightMenu/>
        </div>
        <div className="box-body">
          <div className="table-responsive">
            <table className="table table-striped table-bordered table-hover">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>E-mail</th>
                  <th>Confirmed</th>
                  <th>Roles</th>
                  <th className="visible-lg">Created</th>
                  <th className="visible-lg">Last Updated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              {!didInvalidate && !isFetching && users &&
                <UsersTableBody
                  myId={myId}
                  myRoles={myRoles}
                  myPermissions={myPermissions}
                  users={users}
                  asyncStatus={asyncStatus}
                  actions={actions}/>}
            </table>
            {!didInvalidate && isFetching && <Loading/>}
            {didInvalidate && <MessageInTable/>}
            <div className="pull-right">
              <Pagination
                first
                last
                ellipsis
                items={this.state.items}
                maxButtons={10}
                activePage={this.state.page}
                onSelect={this.handlePage.bind(this)} />
            </div>
          </div>
        </div>
      </Paper>
    );
  }
}

Users.propTypes = {
  myId: PropTypes.number,
  myRoles: PropTypes.array,
  myPermissions: PropTypes.array,
  total: PropTypes.number.isRequired,
  users: PropTypes.array,
  isFetching: PropTypes.bool.isRequired,
  didInvalidate: PropTypes.bool.isRequired,
  asyncStatus: PropTypes.object,
  pathname: PropTypes.string.isRequired,
  query: PropTypes.object.isRequired,
  search: PropTypes.string.isRequired,
  perPage: PropTypes.number.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  const { myProfile, users } = state;
  const { location: { pathname, query, search } } = ownProps;
  return {
    myId: myProfile.id,
    myRoles: myProfile.assigneesRoles,
    myPermissions: myProfile.assigneesPermissions,
    total: users.total,
    users: users.users,
    isFetching: users.isFetching,
    didInvalidate: users.didInvalidate,
    asyncStatus: users.asyncStatus,
    perPage: 10,
    pathname,
    query,
    search,
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign(routeActions, AccessUserActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);
