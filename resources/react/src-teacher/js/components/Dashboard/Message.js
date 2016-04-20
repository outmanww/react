import React, { PropTypes, Component } from 'react';
import { Doughnut } from 'react-chartjs';

class message extends Component {
  constructor(props, context) {
    super(props, context);
  }

  render() {
    const { messages } = this.props;
    return (
      <div className="space-top-4 space-bottom-3">
        <div className="has-border">
        {
          messages.dashboardMessages.map(m => 
            <p>{m.message}</p>
          )
        }
        </div>
      </div>
    );
  }
}

message.propTypes = {
  messages: PropTypes.object.isRequired,
};

export default message;
