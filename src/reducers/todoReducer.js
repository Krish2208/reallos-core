import * as actions from '../actions/todoActions';

const initialState = [
]; // initial data that is assumed to be fetched from the server

function todoReducer(state=initialState,action){
    switch(action.type){
        case actions.ADD_TODO:
            return [
                ...state,{
                    id: action.id,
                    Title: action.Title,
                    Description: action.Description,
                    Date: action.Date,
                    To: action.To,
                    From: action.From
                }
            ]
        case actions.DELETE_TODO:
            return state.filter(todo => todo.id !== action.id )
        case actions.EDIT_TODO:
            return state.map((todo)=>{
                if(todo.id === action.id){
                    return{
                        ...todo,
                        Title: action.Title,
                        Description: action.Description,
                        Date: action.Date,
                        To: action.To
                    }
                }
                else{
                    return{
                        ...todo
                    }
                }
            })
        case actions.CLEAR_TODO:
            return initialState;
        default:
            return state;
    }
}

export default todoReducer;