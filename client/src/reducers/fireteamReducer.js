import { CREATE_FIRETEAM, JOIN_FIRETEAM, CREATE_SUCCESS, JOIN_SUCCESS } from '../actions/types';

const initialState = {
    isLeader: null,
    isMember: null,
    isCreating: null,
    isJoining: null
}

export default function(state = initialState, action) {
    switch(action.type) {
        case CREATE_FIRETEAM:
            return {
                ...state,
                isCreating: true
            }
        
        case JOIN_FIRETEAM:
            return {
                ...state,
                isJoining: true
            }
        
        case CREATE_SUCCESS:
            return {
                ...state,
                isCreating: null,
                isLeader: action.payload.fireteam,
                isMember: action.payload.fireteam
            }
            
        case JOIN_SUCCESS:
            return {
                ...state,
                isJoining: null,
                isMember: action.payload.fireteam
            }
        default:
            return state
    }
}