import {GET_ERROR, CLEAR_ERROR} from './types';

// Get an error
export const get_error = (msg, status) => dispatch => dispatch({type: GET_ERROR, payload: {msg, status}});

// Clear errors
export const clear_error = () => dispatch => dispatch({type: CLEAR_ERROR});
