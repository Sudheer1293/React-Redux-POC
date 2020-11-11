import authReducer from './authReducer';
import userReducer from './userReducer';
import memberReducer from './memberReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    auth: authReducer,
    user: userReducer,
    member: memberReducer
});

export default rootReducer;