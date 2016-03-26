import expect from 'expect';
import { applyMiddleware } from 'redux';
import nock from 'nock';
import thunk from 'redux-thunk';
const middlewares = [ thunk ];
import * as actions from '../../../src-front/js/actions/ticket';
import * as types from '../../../src-front/js/constants/ActionTypes';
import { _DOMAIN_NAME } from '../../../src-front/config/env';
import { WEBPAY, PIN } from '../../../src-front/config/url';

function mockStore(getState, expectedActions, done) {
  if (!Array.isArray(expectedActions)) {
    throw new Error('expectedActions should be an array of expected actions.');
  }
  if (typeof done !== 'undefined' && typeof done !== 'function') {
    throw new Error('done should either be undefined or function.');
  }

  function mockStoreWithoutMiddleware() {
    return {
      getState() {
        return typeof getState === 'function' ?
          getState() :
          getState;
      },

      dispatch(action) {
        const expectedAction = expectedActions.shift();
        expect(action).toEqual(expectedAction);
        if (done && !expectedActions.length) {
          done();
        }
        return action;
      }
    };
  }
  const mockStoreWithMiddleware = applyMiddleware(
    ...middlewares
  )(mockStoreWithoutMiddleware);

  return mockStoreWithMiddleware();
}

describe('fetchWebpay', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('fetch SUCCESS', (done) => {
    nock(_DOMAIN_NAME)
      .post(WEBPAY)
      .reply(200, {
        tickets: '23',
        msg: {type: 'success', msg: 'message'}
      });

    const request = {num: '3', amount: '3000', token: 'tok_8GaeNjaHubVF4Bz'};
    const state = {user: {}};
    const expectedActions = [
      {
        type: types.REQUEST_TICKET
      }, {
        type: types.REQUEST_TICKET_SUCCESS
      }, {
        type: types.UPDATE_USERINFO_TICKETS,
        num: '23'
      }, {
        type: types.ADD_SIDE_ALERT,
        status: 'success',
        messageId: 'addTicket.success',
        value: null
      }
    ];
    const store = mockStore(state, expectedActions, done);
    store.dispatch(actions.fetchWebpay(request));
  });

  it('fetch FAIL', (done) => {
    nock(_DOMAIN_NAME)
      .post(WEBPAY)
      .replyWithError('something happened');

    const request = {num: '3', amount: '3000', token: 'tok_8GaeNjaHubVF4Bz'};
    const state = {user: {}};
    const expectedActions = [
      {
        type: types.REQUEST_TICKET
      }, {
        type: types.REQUEST_TICKET_FAIL
      }, {
        type: types.ADD_SIDE_ALERT,
        status: 'danger',
        messageId: 'addTicket.fail',
        value: null
      }
    ];
    const store = mockStore(state, expectedActions, done);
    store.dispatch(actions.fetchWebpay(request));
  });
});

describe('fetchPin', () => {
  afterEach(() => {
    nock.cleanAll();
  });

  it('fetch SUCCESS', (done) => {
    nock(_DOMAIN_NAME)
      .post(PIN)
      .reply(200, {
        tickets: '23',
        msg: { type: 'success', msg: 'message' }
      });

    const request = {pin: 'pinCode'};
    const state = {user: {}};
    const expectedActions = [
      {
        type: types.REQUEST_TICKET
      }, {
        type: types.REQUEST_TICKET_SUCCESS
      }, {
        type: types.UPDATE_USERINFO_TICKETS,
        num: '23'
      }, {
        type: types.ADD_SIDE_ALERT,
        status: 'success',
        messageId: 'addTicket.success',
        value: null
      }
    ];
    const store = mockStore(state, expectedActions, done);
    store.dispatch(actions.fetchPin(request));
  });

  it('fetch FAIL', (done) => {
    nock(_DOMAIN_NAME)
      .post(PIN)
      .replyWithError('something happened');

    const request = {pin: 'pinCode'};
    const state = {user: {}};
    const expectedActions = [
      {
        type: types.REQUEST_TICKET
      }, {
        type: types.REQUEST_TICKET_FAIL
      }, {
        type: types.ADD_SIDE_ALERT,
        status: 'danger',
        messageId: 'addTicket.fail',
        value: null
      }
    ];
    const store = mockStore(state, expectedActions, done);
    store.dispatch(actions.fetchPin(request));
  });
});
