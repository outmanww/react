import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routeReducer } from 'react-router-redux';
//my reducers
import application from './application';
import alert from './alert';
import user from './user';
import lectures from './lectures';
// import disposable from './disposable';

const rootReducer = combineReducers(Object.assign({
  application, alert, user, lectures
}, {
  form: formReducer,
  routing: routeReducer
}
));

export default rootReducer;
