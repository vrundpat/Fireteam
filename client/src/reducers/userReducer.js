import { SET_EMAIL_ERROR, SET_EMAIL_REQUESTED, SET_EMAIL_SUCCESS } from '../actions/types';

const initialState = {
    isSet: false,
    isSetting: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        
        case SET_EMAIL_REQUESTED:
            return {
                ...state,
                isSetting: true
            }
        
        case SET_EMAIL_SUCCESS:
            return {
                ...state,
                isSet: true,
                isSetting: false
            }
        
        case SET_EMAIL_ERROR:
            return {
                ...state,
                isSetting: false
            }

        default:
            return state
    }
}