import React, { PropTypes, Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
//Actions
import { routeActions } from 'react-router-redux';
import Colors from 'material-ui/lib/styles/colors';

class Lecture extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { routes, actions } = this.props;
    return (
      <div style={{ minHeight: '600px', background: Colors.blueGrey50 }}>
        <section className="content-header">
          <h1>
            Lecture
          </h1>
        </section>
        <section className="content">
          {this.props.children}
        </section>
      </div>
    );
  }
}

Lecture.propTypes = {
  routes: PropTypes.array.isRequired,
  children: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
};

function mapStateToProps(state, ownProps) {
  return {
    routes: ownProps.routes
  };
}

function mapDispatchToProps(dispatch) {
  const actions = Object.assign({}, routeActions);
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Lecture);
