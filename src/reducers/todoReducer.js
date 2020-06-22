import * as actions from '../actions/todoActions';

const initialState = [
    {
        id: 1,
        name: 'abc'
    },
    {
        id: 2,
        name: 'def'
    }
]; // initial data that is assumed to be fetched from the server

function todoReducer(state=initialState,action){
    switch(action.type){
        case actions.ADD_TODO:
            return [
                ...state,{
                    id: action.id,
                    name: action.name
                }
            ]
        case actions.DELETE_TODO:
            return state.filter(todo => todo.name!=action.name )
        default:
            return state;
    }
}

export default todoReducer;