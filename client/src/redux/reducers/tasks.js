import { TASK_LOAD_SUCCESS, TASK_LOAD_FAIL } from '../actions/types';

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
    default:
      return state;
  }
}
