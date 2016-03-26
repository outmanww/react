import React, { PropTypes, Component } from 'react';
//Components
import DateButton from './DateButton';
import ReservationButton from './ReservationButton';

class Timetable extends Component {
  render() {
    const {
      timetable, fetchingNodes, capacity, editMode, editting,
      changeEditting, openFlight, closeFlight
    } = this.props;
    return (
      <div className="timetable-and-date-wrap">
        <div className="date-wrap">
          {timetable.map(day =>
            <DateButton timestamp={Number(day.timestamp)} key={day.timestamp}/>
          )}
        </div>
        <div className={`timetable-wrap ${editMode ? 'edit-mode' : 'open-mode'}`}>
          {timetable.map(day =>
            <div className="timetable-columns" key={day.timestamp}>
              {day.timetable.map(time =>
                <ReservationButton
                  key={time.period}
                  timestamp={day.timestamp}
                  time={time}
                  fetchingNodes={fetchingNodes}
                  capacity={capacity}
                  editMode={editMode}
                  editting={editting}
                  changeEditting={changeEditting}
                  openFlight={openFlight}
                  closeFlight={closeFlight}
                />
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

Timetable.propTypes = {
  timetable: PropTypes.array.isRequired,
  fetchingNodes: PropTypes.object.isRequired,
  capacity: PropTypes.number.isRequired,
  editMode: PropTypes.bool.isRequired,
  editting: PropTypes.array.isRequired,
  changeEditting: PropTypes.func.isRequired,
  openFlight: PropTypes.func.isRequired,
  closeFlight: PropTypes.func.isRequired,
};

export default Timetable;
