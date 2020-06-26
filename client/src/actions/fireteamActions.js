import { CREATE_FIRETEAM, JOIN_FIRETEAM, CREATE_SUCCESS, JOIN_SUCCESS, ALL_FIRETEAMS, CLEAR_ERROR, GET_FIRETEAM } from './types';
import { get_error } from './errorActions';
const axios = require('axios');


export const create_fireteam = (fireteam_info, leader_info) => dispatch => {
    dispatch({type: CREATE_FIRETEAM});
    const headers = {headers: {"Content-type": "application/json", "auth-token": ""}};
    const data = {
        leader: leader_info,
        activity_type: fireteam_info.activity_type,
        description: fireteam_info.description,
        capacity: fireteam_info.capacity,
        platform: fireteam_info.platform,
        power_requirement: fireteam_info.power_requirement
    };

    axios.post('/fireteam/create', data, headers)
        .then(response => {
            dispatch({type: CREATE_SUCCESS, payload: response.data});
            dispatch({type: CLEAR_ERROR});
        })
        .catch(error => {
            dispatch(get_error(error.response.data, error.response.status));
        });
}



export const join_fireteam = (member_info, fireteam_id) => dispatch => {
    dispatch({type: JOIN_FIRETEAM});
    const params = {id: fireteam_id}
    axios.post('/fireteam/join', member_info, {params})
        .then(response => {
            dispatch({type: JOIN_SUCCESS, payload: response.data});
            dispatch({type: CLEAR_ERROR});
        })
        .catch(error => {
            dispatch(get_error(error.response.data, error.response.status));
        });
}



export const all_fireteams = () => dispatch => {
    axios.get('/fireteam/getall')
        .then(response => {
            dispatch({type: ALL_FIRETEAMS, payload: response.data});
        })
        .catch(error => {
            dispatch(get_error(error.response.data, error.response.status));
        })
}



export const get_fireteam = (fireteam_id) => dispatch => {
    const params = {id: fireteam_id}
    axios.get('/fireteam/getfireteam', {params})
        .then(response => {
            dispatch({type: GET_FIRETEAM, payload: response.data});
        })
        .catch(error => {
            dispatch(get_error(error.response.data, error.response.status));
        });
}

