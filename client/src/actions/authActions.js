import axios from 'axios';
import { get_error } from './errorActions'; 
import {
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT_SUCCESS,
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    CLEAR_ERROR
  } from './types';


// Register User
export const register = ({username, consoleID, password, confirm_password, email}) => dispatch => {
    const header_info = {headers: {"Content-type": "application/json"}};
    const new_user = JSON.stringify({username, password, consoleID, confirm_password, email})
    axios.post('/users/register', new_user, header_info)
        .then(response => {
          dispatch({type: REGISTER_SUCCESS, payload: response.data});
          dispatch({type: CLEAR_ERROR});
        })
        .catch(error => {
          dispatch(get_error(error.response.data, error.response.status));
          dispatch({type: REGISTER_FAIL});
        });
}

// Login User
export const login = ({username, password}) => dispatch => {
  const header_info = {headers: {"Content-type": "application/json"}};
  const user_info = JSON.stringify({username, password});
  axios.post('/users/login', user_info, header_info)
    .then(response => {
      dispatch({type: LOGIN_SUCCESS, payload: response.data});
      dispatch({type: CLEAR_ERROR});
    })
    .catch(error => {
      dispatch(get_error(error.response.data, error.response.status));
      dispatch({type: LOGIN_FAIL});
    });
}

// Logout User
export const logout = () => dispatch => dispatch({type: LOGOUT_SUCCESS});
