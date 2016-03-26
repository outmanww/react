import React, { PropTypes, Component } from 'react';
import moment from 'moment';

class ReservationButton extends Component {
  constructor(props) {
    super(props);
  }

  handleClick() {
    const {
      fetchingNodes, timestamp, time, capacity, editMode,
      changeEditting, openFlight, closeFlight
    } = this.props;
    const { id, users, deletedAt } = time;

    if (editMode) {
      changeEditting([timestamp, id]);
      return true;
    }

    if (typeof id === 'undefined' || fetchingNodes.indexOf(time.id) >= 0) {
      return true;
    }

    if (deletedAt !== null) {
      openFlight(id, capacity);
      return true;
    }

    if (users.length === 0) {
      closeFlight(id);
      return true;
    }
  }

  render() {
    const { time, fetchingNodes, editting, editMode } = this.props;
    const flightAt = moment(time.flightAt, "YYYY-MM-DD HH:mm:ss");

    let className = 'rsv';

    if (editMode && typeof editting[0] !== 'undefined') {
      if (editting[1] === time.id) {
        className = `${className} focus`;
      } else {
        className = `${className} blur`;
      }
    }

    if (flightAt.diff(moment()) <= 0) {
      className = `${className} past`;
    }

    if (typeof time.id === 'undefined') {
      className = `${className} not-exist`;
    } else {
      className = `${className} exist`;
    }

    if (time.deletedAt === null) {
      className = `${className} opened`;
    } else {
      className = `${className} closed`;
    }

    if (typeof time.id !== 'undefined' && time.users.length > 0) {
      className = `${className} reserved`;
    }

    if (fetchingNodes.indexOf(time.id) >= 0) {
      className = `${className} isFetching`;
    }

    return (
      <button
        className={className}
        onClick={this.handleClick.bind(this)}>
        <p>{flightAt.format('HH:mm')}</p>
      </button>
    );
  }
}

ReservationButton.propTypes = {
  timestamp: PropTypes.number.isRequired,
  time: PropTypes.object.isRequired,
  fetchingNodes: PropTypes.array.isRequired,
  capacity: PropTypes.number.isRequired,
  editMode: PropTypes.bool.isRequired,
  editting: PropTypes.array.isRequired,
  changeEditting: PropTypes.func.isRequired,
  openFlight: PropTypes.func.isRequired,
  closeFlight: PropTypes.func.isRequired,
};

export default ReservationButton;
