import {combineReducers} from 'redux';
import todoReducer from './todoReducer';
import userReducer from './userReducer';
import transactionReducer from './transactionReducer';
import utilsReducer from './utilsReducer';

const mainReducer = combineReducers({
    todo: todoReducer,
    user: userReducer,
    transaction: transactionReducer,
    utils: utilsReducer
});

export default mainReducer;