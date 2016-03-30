import thunk from 'redux-thunk';
import promise from 'redux-promise';
import fetchMiddleware from './fetchMiddleware';
import errorMiddleware from './errorMiddleware';

const Middlewares = [
  fetchMiddleware,
  errorMiddleware,
  thunk,
  promise
]

export default Middlewares;
