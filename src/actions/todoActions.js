import axios from 'axios';
import {setLoadingTrue, setLoadingFalse, setErrors} from './utilsActions';

export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const EDIT_TODO = 'EDIT_TODO';


export function getTask(id){ // getting the tasks from the server
    console.log(id);
    return (dispatch) =>{
        dispatch(setLoadingTrue()); // dispatching an action to set loading to true
        axios.get(`https://us-central1-reallos-test.cloudfunctions.net/api/get-all-tasks/${id}`,{
            headers: {Authorization: 'Bearer '+localStorage.getItem('FBIdToken')}
        })
        .then((res)=>{
            res.data.todoList.map(todo =>{
                dispatch(addTodo(
                    id,
                    todo.title,
                    todo.description,
                    todo.date,
                    todo.assignedTo,
                    todo.assignedBy
                ))
            })
            dispatch(setLoadingFalse()); // dispatching an action to set loading to false
        })
        .catch(err =>{
            console.error(err);
            dispatch(setErrors(err)); // dispatching an action to set the errors
        })
    }
}

export function addTask()

export function addTodo(id, Title, Description, Date, To, From){ // action creator for ADD_TODO
    return({
        type: ADD_TODO,
        id,
        Title,
        Description,
        Date,
        To,
        From
    });
}

export function deleteTodo(id){ // action creator for DELETE_TODO
    return({
        type: DELETE_TODO,
        id
    })
}

export function editTodo(id,Title, Description, Date, To){
    return({
        type: EDIT_TODO,
        id,
        Title,
        Description,
        Date, 
        To
    })
}