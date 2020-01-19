import axios from 'axios';
import { setAlert } from './alert';
import jwt_decode from 'jwt-decode';
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT
} from './types';
import setAuthToken from '../../utils';

// Rgister User
export const register = ({ name, email, password }) => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post('/api/auth/register', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: REGISTER_FAIL
    });
  }
};

// Login User
export const login = ({ email, password }) => async dispatch => {
  const body = JSON.stringify({ email, password });
  try {
    await axios.post('/api/auth/login', body).then(res => {
      const { token } = res.data;
      localStorage.setItem('token', token);
      setAuthToken(token);
      const decoded = jwt_decode(decoded);
      dispatch(setCurrentUser(decoded));
    });
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Logout / clear profile

export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};
