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
      <div style={{ minHeight: window.innerHeight - 64, background: Colors.blueGrey50, marginTop:0}}>
        <div className="container">
          <section className="content-header">
            <div className="row">
              <h3>授業の管理</h3>
            </div>
          </section>
          <section className="content">
            {this.props.children}
          </section>
        </div>
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
