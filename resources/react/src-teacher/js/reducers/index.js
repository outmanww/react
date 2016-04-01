import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routeReducer } from 'react-router-redux';
//my reducers
import application from './application';
import alert from './alert';
import disposable from './disposable';
import user from './user';
import lectures from './lectures';
// import disposable from './disposable';

const rootReducer = combineReducers(Object.assign({
  application, alert, disposable, user, lectures
}, {
  form: formReducer,
  routing: routeReducer
}
));

export default rootReducer;
