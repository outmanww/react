import fetch from 'isomorphic-fetch';
import { CSRF_TOKEN, DOMAIN_NAME, SCHOOL_NAME } from '../../config/env';
import { keyToSnake } from './ChangeCaseUtils';
import { camelizeKeys } from 'humps';

export function callApi(endpoint, method, body) {
  const request = {
    method,
    headers: {
      'X-CSRF-Token': CSRF_TOKEN
    },
    credentials: 'same-origin',
  };

  if (method !== 'GET' && body) {
    if (body instanceof FormData) {
      request.body = body;
    } else {
      request.headers['Content-Type'] = 'application/json';
      request.headers['Accept'] = 'application/json';
      request.body = JSON.stringify(keyToSnake(body));
    }
  }

  let url;
  if (/^\//.test(endpoint)) {
    url = DOMAIN_NAME + endpoint;
  } else {
    url = `${DOMAIN_NAME}/conference/audience/${endpoint}`
  }

  return fetch(url, request)
    .then(response =>
      response.json().then(json => ({ json, response }))
    )
    .then(({ json, response }) => {
      if (!response.ok) {
        return Promise.reject(json);
      }

      return camelizeKeys(json);
    });
}
