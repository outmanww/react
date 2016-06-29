import thunk from 'redux-thunk';
import promise from 'redux-promise';
import fetchMiddleware from './fetchMiddleware';
import errorMiddleware from './errorMiddleware';
import alertMiddleware from './alertMiddleware';

const Middlewares = [
  fetchMiddleware,
  errorMiddleware,
  alertMiddleware,
  thunk,
  promise
]

export default Middlewares;
