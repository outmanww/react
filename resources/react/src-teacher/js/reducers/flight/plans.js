import * as types from '../../constants/PlanActionTypes';

const getAvailability = p => {
  const future = p.flights.filter(f => new Date(f.flightAt) > new Date());
  return [
    future.filter(f => f.users > 0).length,
    future.length,
    future.reduce((prev, flight) => Number(prev) + Number(flight.users), 0),
    future.reduce((prev, flight) => Number(prev) + Number(flight.numberOfDrones), 0)
  ];
};

const reshape = p => {
  p.availability = getAvailability(p);
  p.open = p.flights.length;
  delete p.flights;
  return p;
};

const initialState = {
  plans: [],
  isFetching: false,
  didInvalidate: false,
  updatedAt: 0,
  partialUpdatedAt: 0
};

export default function plans(state = initialState, action) {
  switch (action.type) {
    case types.REQUEST_PLANS:
    case types.REQUEST_PLAN:
    case types.CREATE_PLAN:
    case types.UPDATE_PLAN:
    case types.ACTIVATE_PLAN:
    case types.DEACTIVATE_PLAN:
    case types.DELETE_PLAN:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      });

    case types.REQUEST_PLANS_SUCCESS:
    case types.REQUEST_PLAN_SUCCESS:
    case types.CREATE_PLAN_SUCCESS:
    case types.UPDATE_PLAN_SUCCESS:
    case types.ACTIVATE_PLAN_SUCCESS:
    case types.DEACTIVATE_PLAN_SUCCESS:
    case types.DELETE_PLAN_SUCCESS:
      {
        const { payload: { plans }, meta: { timestamp } } = action;

        if (timestamp < state.updatedAt || timestamp < state.partialUpdatedAt) {
          return state;
        }

        let nextPlans = {};
        let label = '';

        if (action.type === types.REQUEST_PLAN_SUCCESS) {
          nextPlans = state.plans.filter(plan =>
            plans.map(p => p.id).indexOf(plan.id) === -1
          ).concat(plans.map(reshape)).sort((a, b) =>
            a.place.id > b.place.id ? 1 : -1
          );
          label = 'partialUpdatedAt';
        } else {
          nextPlans = plans.map(reshape).sort((a, b) =>
            a.place.id > b.place.id ? 1 : -1
          );
          label = 'updatedAt';
        }

        return Object.assign({}, state, {
          isFetching: false,
          didInvalidate: false,
          plans: nextPlans,
          [label]: timestamp
        });
      }
    case types.REQUEST_PLANS_FAIL:
    case types.REQUEST_PLAN_FAIL:
    case types.CREATE_PLAN_FAIL:
    case types.UPDATE_PLAN_FAIL:
    case types.ACTIVATE_PLAN_FAIL:
    case types.DEACTIVATE_PLAN_FAIL:
    case types.DELETE_PLAN_FAIL:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: true
      });

    default:
      return state;
  }
}
