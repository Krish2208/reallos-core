import {combineReducers} from 'redux';
import todoReducer from './todoReducer';

const mainReducer = combineReducers({
    todo: todoReducer
});

export default mainReducer;