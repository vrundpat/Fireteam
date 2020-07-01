import { CREATE_FIRETEAM, JOIN_FIRETEAM, CREATE_SUCCESS, JOIN_SUCCESS, CREATE_FAIL, JOIN_FAIL, ALL_FIRETEAMS, GET_FIRETEAM } from '../actions/types';

const initialState = {
    leader: [],
    member: [],
    isCreating: false,
    isJoining: false,
    create_fail: false,
    join_fail: false,
    all_fireteams: [],
    current_server_time: null
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
                isCreating: false,
                create_fail: false,
                leader: [ ...state.leader, action.payload.fireteam],
                member: [ ...state.member, action.payload.fireteam]
            }

        case CREATE_FAIL:
            return {
                ...state,
                create_fail: true,
                isCreating: false
            }
            
        case JOIN_SUCCESS:
            return {
                ...state,
                isJoining: false,
                join_fail: false,
                member: [...state.member, action.payload.fireteam]
            }
            
        case JOIN_FAIL:
            return {
                ...state,
                join_fail: true,
                isJoining: false
            }
        
        case ALL_FIRETEAMS:
            return {
                ...state,
                all_fireteams: action.payload.all_fireteams,
                current_server_time: action.payload.current_time
            }
        
        case GET_FIRETEAM:
            return {
                ...state,
            }

        default:
            return state
    }
}