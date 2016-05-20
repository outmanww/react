import React, { PropTypes, Component } from 'react';
import { Line } from 'react-chartjs';
import moment from 'moment';

class Profile extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    return (
      <div className="space-top-3 space-bottom-3 has-border">
        <div id="dashboard-line-wrap" className="bg-white" style={{padding: '20px'}}>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  line: PropTypes.object.isRequired,
};

export default Profile;
