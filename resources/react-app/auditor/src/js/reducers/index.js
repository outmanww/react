import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
//my reducers
import application from './application';
import alert from './alert';
import disposable from './disposable';
import conference from './conference';
import message from './message';

const rootReducer = combineReducers(Object.assign({
  application, alert, disposable, conference, message
}, {
  routing: routeReducer
}
));

export default rootReducer;
