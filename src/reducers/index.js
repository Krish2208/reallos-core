import {combineReducers} from 'redux';
import todoReducer from './todoReducer';
import userReducer from './userReducer';
import transactionReducer from './transactionReducer';

const mainReducer = combineReducers({
    todo: todoReducer,
    user: userReducer,
    transaction: transactionReducer
});

export default mainReducer;