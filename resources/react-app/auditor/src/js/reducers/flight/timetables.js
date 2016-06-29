import {
  REQUEST_TIMETABLE,
  REQUEST_TIMETABLE_SUCCESS,
  REQUEST_TIMETABLE_FAIL,
  UPDATE_TIMETABLE
} from '../../constants/ActionTypes';

function fill(config, timetable) {
  const exists = timetable[1].map(t => t.period);
  const max = (config[1] - config[0]) * 60 / config[2];

  for (let p = 1; p <= max; p++) {
    if (exists.indexOf(p) === -1) {
      timetable[1].push({
        period: p,
        flightAt: (timetable[0] + (3600 * config[0]) + (60 * config[2] * (p - 1))) * 1000
      });
    }
  }

  return timetable[1].sort((a, b) => a.period > b.period ? 1 : -1);
}

const initialState = {
  timetables: {},
  isFetching: false,
  didInvalidate: false,
  updatedAt: 0
};

function change(state = initialState, type, payload, meta) {
  switch (type) {
    case REQUEST_TIMETABLE:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });

    case REQUEST_TIMETABLE_SUCCESS:
      if (state.updatedAt > meta.timestamp) {
        return state;
      }

      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        timetables: Object.assign({}, state.timetables,
        payload.timetables.reduce((reshaped, timetable) => {
          const key = timetable[0];
          reshaped[key] = fill(payload.config, timetable);
          return reshaped;
        }, {})
      ),
        updatedAt: meta.timestamp
      });

    case REQUEST_TIMETABLE_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: true
      });

    case UPDATE_TIMETABLE:
      return Object.assign({}, state, {
        timetables: Object.assign({}, state.timetables, {
        [payload.date]: state.timetables[payload.date].map(element => {
          if (element.id === payload.flight.id) {
            return payload.flight;
          }
          return element;
        })
      })
      });

    default:
      return state;
  }
}

export default function timetables(state = {}, action) {
  const { type, payload, meta } = action;
  switch (type) {
    case REQUEST_TIMETABLE:
    case REQUEST_TIMETABLE_SUCCESS:
    case REQUEST_TIMETABLE_FAIL:
    case UPDATE_TIMETABLE:
      return Object.assign({}, state, {
        [payload.key]: change(state[payload.key], type, payload, meta)
      });

    default:
      return state;
  }
}
