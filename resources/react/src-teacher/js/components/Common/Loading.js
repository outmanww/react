import React, { Component } from 'react';
import CircularProgress from 'material-ui/lib/circular-progress';

class Loading extends Component {
  render() {
    return (
      <div className="center-block">
      <div><CircularProgress /></div>
      </div>
    );
  }
}

export default Loading;
