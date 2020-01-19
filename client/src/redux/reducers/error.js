import { GET_ERRORS, CLEAR_ERRORS } from '../actions/types';

const initialState = {};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case GET_ERRORS:
      return [...state, payload];
    case CLEAR_ERRORS:
      return {};
    default:
      return state;
  }
}
