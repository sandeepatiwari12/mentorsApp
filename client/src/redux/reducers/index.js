import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import tasks from './tasks';
import errors from './error';
export default combineReducers({
  alert,
  auth,
  tasks,
  errors
});
