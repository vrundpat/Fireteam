import {
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
  } from '../actions/types';

  
const initialState = {
  token: localStorage.getItem('auth-token'),
  authenticated: null,
  isLoading: false,
  user: null
};  

export default function(state = initialState, action) {
  switch (action.type) {
    case LOGIN_SUCCESS:
    case REGISTER_SUCCESS:
      localStorage.setItem('auth-token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        authenticated: true,
        isLoading: false,
        user: action.payload.user
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT_SUCCESS:
    case REGISTER_FAIL:
      localStorage.removeItem('auth-token');
      return {
        ...state,
        token: null,
        user: null,
        authenticated: false,
        isLoading: false,
      };
    default:
        return state;
  }  
}