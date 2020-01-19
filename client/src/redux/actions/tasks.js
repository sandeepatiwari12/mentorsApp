import axios from 'axios';
import { setAlert } from './alert';
import { TASK_LOAD_FAIL, TASK_LOAD_SUCCESS } from './types';

export const loadTasks = () => async dispatch => {
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
