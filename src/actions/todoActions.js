import axios from 'axios';
import {setLoadingTrue, setLoadingFalse, setErrors} from './utilsActions';

export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const EDIT_TODO = 'EDIT_TODO';


export function getTask(id){ // getting the tasks from the server
    console.log(id);
    return (dispatch) =>{
        axios.get(`https://us-central1-reallos-test.cloudfunctions.net/api/get-all-tasks/${id}`,{
            headers: {Authorization: 'Bearer '+localStorage.getItem('FBIdToken')}
        })
        .then((res)=>{
            console.log(res.data)
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
        })
        .catch(err =>{
            console.error(err);
        })
    }
}

export function addTodo(transId, Title, Description, Date, To, From){ // action creator for ADD_TODO
    return({
        type: ADD_TODO,
        transId,
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