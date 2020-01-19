import axios from 'axios';
import { setAlert } from './alert';
import {
  TASK_LOAD_FAIL,
  TASK_LOAD_SUCCESS,
  TASK_CREATE_SUCCESS,
  TASK_CREATE_FAIL,
  TASK_UPDATE_SUCCESS,
  TASK_UPDATE_FAIL,
  TASK_DELETE_SUCCESS,
  TASK_DELETE_FAIL,
  CLEAR_ERRORS
} from './types';

export const loadTasks = () => async dispatch => {
  dispatch(clearErrors());
  try {
    const res = await axios.get('/api/task');
    dispatch({
      type: TASK_LOAD_SUCCESS,
      payload: res.data
    });
    dispatch(setAlert(res.data.resultLong, res.data.resultLong));
  } catch (err) {
    dispatch({
      type: TASK_LOAD_FAIL
    });
  }
};

export const createTask = postObj => async dispatch => {
  try {
    const res = await axios.post('/api/task/create', postObj);
    dispatch({
      type: TASK_CREATE_SUCCESS,
      payload: res.data
    });
    dispatch(setAlert(res.data.resultLong, res.data.resultLong));
  } catch (err) {
    dispatch({
      type: TASK_CREATE_FAIL
    });
  }
};

export const updateTask = (_id, postObj) => async dispatch => {
  try {
    const res = await axios.put('/api/task/update/' + _id, postObj);
    dispatch({
      type: TASK_UPDATE_SUCCESS,
      payload: res.data
    });
    dispatch(loadTasks());
    dispatch(setAlert(res.data.resultLong, res.data.resultLong));
  } catch (err) {
    dispatch({
      type: TASK_UPDATE_FAIL
    });
  }
};

export const deleteTask = _id => async dispatch => {
  try {
    const res = await axios.delete('/api/task/' + _id);
    dispatch({
      type: TASK_DELETE_SUCCESS,
      payload: res.data
    });
    dispatch(loadTasks());
    dispatch(setAlert(res.data.resultLong, res.data.resultLong));
  } catch (err) {
    dispatch({
      type: TASK_DELETE_FAIL
    });
  }
};

// Clear errors
export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  };
};
