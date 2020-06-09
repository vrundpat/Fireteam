import { CREATE_FIRETEAM, JOIN_FIRETEAM, CREATE_SUCCESS, JOIN_SUCCESS, ALL_FIRETEAMS, GET_FIRETEAM } from '../actions/types';

const initialState = {
    leader: [],
    member: [],
    isCreating: null,
    isJoining: null,
    all_fireteams: null,
    currently_viewing: null
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
                leader: [ ...state.leader, action.payload.fireteam],
                member: [ ...state.member, action.payload.fireteam]
            }
            
        case JOIN_SUCCESS:
            return {
                ...state,
                isJoining: null,
                member: [...state.member, action.payload.fireteam]
            }
        
        case ALL_FIRETEAMS:
            return {
                ...state,
                all_fireteams: action.payload
            }
        
        case GET_FIRETEAM:
            return {
                ...state,
                currently_viewing: action.payload.fireteam
            }

        default:
            return state
    }
}