import { CREATE_FIRETEAM, JOIN_FIRETEAM, CREATE_SUCCESS, JOIN_SUCCESS, ALL_FIRETEAMS } from './types';
import { get_error } from './errorActions';
const axios = require('axios');

export const create_fireteam = ({fireteam_info, leader_info}) => dispatch => {
    dispatch({type: CREATE_FIRETEAM});

    // TODO: Implement actions for fireteams making the server api calls on the proxy
}

export const join_fireteam = (member_info) => dispatch => {
    dispatch({type: JOIN_FIRETEAM});
    // TODO: Implement actions for fireteams making the server api calls on the proxy
}

export const all_fireteams = () => dispatch => {
    // TODO: Implement actions for fireteams making the server api calls on the proxy
}

export const get_fireteam = (id) => dispatch => {
    // TODO: Implement actions for fireteams making the server api calls on the proxy
}