import {
  TASK_LOAD_SUCCESS,
  TASK_LOAD_FAIL,
  TASK_CREATE_SUCCESS,
  TASK_CREATE_FAIL,
  TASK_DELETE_SUCCESS,
  TASK_DELETE_FAIL
} from '../actions/types';

const initialState = {
  loading: true,
  tasks: null
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case TASK_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        tasks: payload.tasks
      };
    case TASK_LOAD_FAIL:
      return {
        ...state,
        loading: false
      };
    case TASK_CREATE_SUCCESS:
      return {
        ...state,
        loading: false,
        message: payload
      };
    case TASK_CREATE_FAIL:
      return {
        ...state,
        loading: false,
        message: payload
      };
    case TASK_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        message: payload
      };
    case TASK_DELETE_FAIL:
      return {
        ...state,
        loading: false,
        message: payload
      };
    default:
      return state;
  }
}
