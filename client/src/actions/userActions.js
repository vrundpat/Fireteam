import axios from 'axios';
import { get_error } from './errorActions'; 
import {
    CLEAR_ERROR,
    SET_EMAIL_ERROR,
    SET_EMAIL_SUCCESS,
    SET_EMAIL_REQUESTED,
    UPDATE_EMAIL,
} from './types';


// Set email
export const setEmail = (email) => dispatch => {
    const headers = {headers: {"Content-type": "application/json", "auth-token": localStorage.getItem('auth-token')}};
    const data = {
        email: email
    }

    dispatch({type: SET_EMAIL_REQUESTED});

    axios.put('/essentials/email', data, headers)
        .then(response => {
            dispatch({type: UPDATE_EMAIL, payload: true});
            dispatch({type: SET_EMAIL_SUCCESS});
            dispatch({type: CLEAR_ERROR});
        })
        .catch(error => {
            dispatch({type: SET_EMAIL_ERROR});
            dispatch(get_error(error.response.data, error.response.status));
        }) 
} 
