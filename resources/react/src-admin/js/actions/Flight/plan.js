import * as types from '../../constants/PlanActionTypes';
import { CALL_API } from '../../middleware/fetchMiddleware';
import { push } from 'react-router-redux';

export function fetchPlans() {
  return {
    [CALL_API]: {
      types: [
        types.REQUEST_PLANS,
        types.REQUEST_PLANS_SUCCESS,
        types.REQUEST_PLANS_FAIL
      ],
      endpoint: 'flight/plans/fetch',
      method: 'GET',
      body: null
    }
  };
}

export function fetchPlan(id) {
  return {
    [CALL_API]: {
      types: [
        types.REQUEST_PLAN,
        types.REQUEST_PLAN_SUCCESS,
        types.REQUEST_PLAN_FAIL
      ],
      endpoint: `flight/plan/${id}/fetch`,
      method: 'GET',
      body: null
    }
  };
}

export function fetchPlacesbyType(id, filter = '') {
  return {
    [CALL_API]: {
      types: [
        types.REQUEST_CLOSED_PLACES,
        types.REQUEST_CLOSED_PLACES_SUCCESS,
        types.REQUEST_CLOSED_PLACES_FAIL
      ],
      endpoint: `flight/type/${id}/places/${filter}`,
      method: 'GET',
      body: null
    }
  };
}

export function createPlan(type, place, description) {
  return {
    [CALL_API]: {
      types: [
        types.CREATE_PLAN,
        types.CREATE_PLAN_SUCCESS,
        types.CREATE_PLAN_FAIL
      ],
      endpoint: 'flight/plan',
      method: 'POST',
      body: { type, place, description }
    },
    meta: {
      linkOnSuccess: '/admin/single/flight/plans'
    }
  };
}

export function updatePlan(id, description) {
  return {
    [CALL_API]: {
      types: [
        types.UPDATE_PLAN,
        types.UPDATE_PLAN_SUCCESS,
        types.UPDATE_PLAN_FAIL
      ],
      endpoint: `flight/plan/${id}`,
      method: 'PUT',
      body: { description }
    },
    meta: {
      actionsOnSuccess: [
        push('/admin/single/flight/plans')
      ]
    }
  };
}

export function activatePlan(id) {
  return {
    [CALL_API]: {
      types: [
        types.ACTIVATE_PLAN,
        types.ACTIVATE_PLAN_SUCCESS,
        types.ACTIVATE_PLAN_FAIL
      ],
      endpoint: `flight/plan/${id}/activate`,
      method: 'PATCH',
      body: null
    },
    meta: {
      actionsOnSuccess: [
        push('/admin/single/flight/plans')
      ]
    }
  };
}

export function deactivatePlan(id) {
  return {
    [CALL_API]: {
      types: [
        types.DEACTIVATE_PLAN,
        types.DEACTIVATE_PLAN_SUCCESS,
        types.DEACTIVATE_PLAN_FAIL
      ],
      endpoint: `flight/plan/${id}/deactivate`,
      method: 'PATCH',
      body: null
    },
    meta: {
      actionsOnSuccess: [
        push('/admin/single/flight/plans')
      ]
    }
  };
}

export function deletePlan(id) {
  return {
    [CALL_API]: {
      types: [
        types.DELETE_PLAN,
        types.DELETE_PLAN_SUCCESS,
        types.DELETE_PLAN_FAIL
      ],
      endpoint: `flight/plan/${id}`,
      method: 'DELETE',
      body: null
    },
    payload: {
      id
    },
    meta: {
      actionsOnSuccess: [
        push('/admin/single/flight/plans')
      ]
    }
  };
}
