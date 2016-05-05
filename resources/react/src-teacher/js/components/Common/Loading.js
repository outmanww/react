import React, { Component } from 'react';

class Loading extends Component {
  render() {
    return (
	  <div style={{width: '100%', height: '100%', backgroundColor: 'white', opacity: 0.5}}>
	    <div className="sk-fading-circle" style={{position: 'absolute', left: '48.3%', top: '50%'}}>
	      <div className="sk-circle1 sk-circle"></div>
	      <div className="sk-circle2 sk-circle"></div>
	      <div className="sk-circle3 sk-circle"></div>
	      <div className="sk-circle4 sk-circle"></div>
	      <div className="sk-circle5 sk-circle"></div>
	      <div className="sk-circle6 sk-circle"></div>
	      <div className="sk-circle7 sk-circle"></div>
	      <div className="sk-circle8 sk-circle"></div>
	      <div className="sk-circle9 sk-circle"></div>
	      <div className="sk-circle10 sk-circle"></div>
	      <div className="sk-circle11 sk-circle"></div>
	      <div className="sk-circle12 sk-circle"></div>
	    </div>
	  </div>
    );
  }
}

export default Loading;
