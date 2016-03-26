import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import Colors from 'material-ui/lib/styles/colors';

class PinCodeManage extends Component {
  render() {
    return (
      <div style={{ minHeight: '700px', background: Colors.blueGrey100 }}>
        <section className="content-header">
          <h1>Pin-Code Management</h1>
        </section>
        <section className="content">
          {this.props.children}
        </section>
      </div>
    );
  }
}

PinCodeManage.propTypes = {
  routing: PropTypes.object.isRequired,
  children: PropTypes.element.isRequired
};

function mapStateToProps(state) {
  return {
    routing: state.routing
  };
}

export default connect(mapStateToProps)(PinCodeManage);
