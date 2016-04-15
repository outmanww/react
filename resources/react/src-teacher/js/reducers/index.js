import { combineReducers } from 'redux';
import { routeReducer } from 'react-router-redux';
//my reducers
import application from './application';
import alert from './alert';
import disposable from './disposable';
import user from './user';
import lectures from './lectures';
import lectureBasic from './lectureBasic';
import room from './room';

const rootReducer = combineReducers(Object.assign({
  application, alert, disposable, user, lectures, lectureBasic, room
}, {
  routing: routeReducer
}
));

export default rootReducer;
