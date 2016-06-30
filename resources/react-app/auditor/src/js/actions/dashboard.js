import * as types from '../constants/DashboardActionTypes';
import { ADD_SIDE_ALERT } from '../constants/ActionTypes';
import { CALL_API } from '../middleware/fetchMiddleware';
import { push } from 'react-router-redux';

export function fetchConference() {
  return {
    [CALL_API]: {
      types: [
        types.REQUEST_CONFERENCE,
        types.REQUEST_CONFERENCE_SUCCESS,
        types.REQUEST_CONFERENCE_FAIL
      ],
      endpoint: 'conference',
      method: 'GET',
      body: null
    }
  };
}

export function createAuditor() {
  return {
    [CALL_API]: {
      types: [
        types.CREATE_AUDITOR,
        types.CREATE_AUDITOR_SUCCESS,
        types.CREATE_AUDITOR_FAIL
      ],
      endpoint: 'create/auditor',
      method: 'GET',
      body: null
    }
  };
}

export function fetchMessages(body) {
  return {
    [CALL_API]: {
      types: [
        types.REQUEST_MESSAGES,
        types.REQUEST_MESSAGES_SUCCESS,
        types.REQUEST_MESSAGES_FAIL
      ],
      endpoint: 'messages',
      method: 'POST',
      body
    }
  };
}

export function sendMessages(body) {
  return {
    [CALL_API]: {
      types: [
        types.SEND_MESSAGES,
        types.SEND_MESSAGES_SUCCESS,
        types.SEND_MESSAGES_FAIL
      ],
      endpoint: 'messages/send',
      method: 'POST',
      body
    }
  };
}

export function sendLike(body) {
  return {
    [CALL_API]: {
      types: [
        types.SEND_LIKE,
        types.SEND_LIKE_SUCCESS,
        types.SEND_LIKE_FAIL
      ],
      endpoint: 'messages/like',
      method: 'POST',
      body
    }
  };
}

export function sendDislike(body) {
  return {
    [CALL_API]: {
      types: [
        types.SEND_DISLIKE,
        types.SEND_DISLIKE_SUCCESS,
        types.SEND_DISLIKE_FAIL
      ],
      endpoint: 'messages/dislike',
      method: 'POST',
      body
    }
  };
}
