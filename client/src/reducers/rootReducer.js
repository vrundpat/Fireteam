import { combineReducers } from 'redux';
import authReducer from './authReducer';
import errorReducer from './errorReducer';
import fireteamReducer from './fireteamReducer';
import userReducer from './userReducer';

export default combineReducers({
    authReducer: authReducer,
    errorReducer: errorReducer,
    fireteamReducer: fireteamReducer,
    userReducer: userReducer
});