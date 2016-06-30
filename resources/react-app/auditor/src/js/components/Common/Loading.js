import React, { PropTypes, Component } from 'react';

class Loading extends Component {
  render() {
  	const { coverColor } = this.props;
  	const color = typeof coverColor === 'undefined' ? 'white' : coverColor ;

    return (
	  <div style={{width: '100%', height: '100%'}}>
	    <div
	    	className="sk-fading-circle"
	    	style={{
	    		position: 'absolute',
	    		left: 'calc(50% - 15px)',
	    		top: 'calc(50% - 15px)',
	    		zIndex: 1001
	    	}}>
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
	    <div style={{
	    	width: '100%',
	    	height: '100%',
	    	background: color,
	    	opacity: 0.5,
	    	zIndex: 1000
	   	}}
	    ></div>
	  </div>
    );
  }
}

Loading.propTypes = {
  coverColor: PropTypes.string
};

export default Loading;
