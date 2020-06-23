import * as actions from '../actions/todoActions';

const initialState = [
    {
        title: 'do this',
        description: 'done this',
        date: '02/02/2000',
        to: 'Person 1'
    }
]; // initial data that is assumed to be fetched from the server

function todoReducer(state=initialState,action){
    switch(action.type){
        case actions.ADD_TODO:
            return [
                ...state,{
                    title: action.title,
                    description: action.description,
                    date: action.date,
                    to: action.to
                }
            ]
        case actions.DELETE_TODO:
            return state.filter(todo => todo.title!=action.title )
        default:
            return state;
    }
}

export default todoReducer;