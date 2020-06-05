import {GET_ERROR, CLEAR_ERROR} from '../actions/types';

const initialState = {
    error_msg: null,
    status: null,
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_ERROR:
            return {
                ...state,
                error_msg: action.payload.msg,
                status: action.payload.status
            }
        case CLEAR_ERROR:
            return {
                ...state,
                error_msg: null,
                status: null
            }
        default:
            return state
    }
}