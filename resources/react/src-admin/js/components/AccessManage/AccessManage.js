import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Colors from 'material-ui/lib/styles/colors';
//Actions
import { routeActions } from 'react-router-redux';

class AccessManage extends Component {
  render() {
    const { routes, actions } = this.props;
    return (
      <div style={{ minHeight: '700px', background: Colors.blueGrey50}}>
        <section className="content-header">
          <h1>
            {routes[1].name}
            {
              typeof routes[2] !== 'undefined' &&
              <small onClick={() => actions.push(`/admin/single/access/${routes[2].path}`)}>{ routes[2].name }</small>
            }
            {
              typeof routes[3] !== 'undefined' &&
              typeof routes[3].name !== 'undefined' &&
             <small>{ routes[3].name }</small>
            }
          </h1>
        </section>
        <section className="content">
          {this.props.children}
        </section>
      </div>
    );
  }
}

AccessManage.propTypes = {
  children: PropTypes.element.isRequired,
  routing: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    routing: state.routing
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign({}, routeActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AccessManage);
