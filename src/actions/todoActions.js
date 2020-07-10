import axios from 'axios';
import {setLoadingTrue, setLoadingFalse, setErrors} from './utilsActions';
import {addPeople} from './peopleActions';
import {addUser} from './userActions';

export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const EDIT_TODO = 'EDIT_TODO';
export const CLEAR_TODO = 'CLEAR_TODO';


export function getTask(id,peopleLength){ // getting the tasks from the server
    return (dispatch) =>{
        dispatch(clearTodo()); // dispatching an action to clear the todos from the redux store
        dispatch(setLoadingTrue()); // dispatching an action to set loading to true

        if(peopleLength === 0){ // if the redux store has no people stored 
            axios.get(`https://us-central1-reallos-test.cloudfunctions.net/api/get-all-people/${id}`,{
            headers: {Authorization: 'Bearer '+localStorage.getItem('FBIdToken')}
        }) 
        .then( res => {
            if(res.data.peopleList.length !== peopleLength){ // If there has been any changes to people added
            res.data.peopleList.map( person =>{
                dispatch(addPeople(
                    person.accepted,
                    person.email,
                    person.name,
                    person.role,
                    person.uid
                ))
            })
            }
        })
        .catch(err => {
            console.error(err);
            dispatch(setErrors());
        })
        }

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

export function addTask(id,newTask){
    return (dispatch)=>{
        let To = {
            name: newTask.To.name,
            email: newTask.To.email
        };
        dispatch(setLoadingTrue()); // dispatching an action to set loading to true
        if(newTask.From.id === null){ // if the user is not stored in the redux store
            axios.get(`https://us-central1-reallos-test.cloudfunctions.net/api/user-details`,{
                headers: {Authorization: 'Bearer '+localStorage.getItem('FBIdToken')}
            })
            .then(res =>{
                let From = {
                    name: res.data.firstName+" "+res.data.lastName,
                    email: res.data.email
                }
                dispatch(addUser( // dispatching an action to add the user to the redux store
                    localStorage.getItem('userID'),
                    res.data.firstName,
                    res.data.lastName,
                    res.data.email,
                    res.data.phone,
                    res.data.role,
                    res.data.state,
                    res.data.transaction
                ))

                let Task = {
                    date : newTask.Date,
                    description: newTask.Description,
                    assignedBy: From,
                    assignedTo: To,
                    title: newTask.Title
                }

                axios.post(`https://us-central1-reallos-test.cloudfunctions.net/api/add-task/${id}`,Task,{
                    headers: {Authorization: 'Bearer '+localStorage.getItem('FBIdToken')}
                })
                .then(res =>{
                    dispatch(addTodo(
                        res.data.id,
                        Task.title,
                        Task.description,
                        Task.date,
                        Task.assignedTo,
                        Task.assignedBy
                    ))
                    dispatch(setLoadingFalse()); // dispatching an action to set loading to false
                })
                .catch(err =>{
                    console.error(err);
                    dispatch(setErrors(err)); // dispatching an action to set errors to true
                })
            })
            .catch(err =>{
                console.error(err); 
                dispatch(setErrors(err)); // dispatching an action to set the errors
            })
        } 
        
        else{
            let From = {
                name: newTask.name,
                email: newTask.email
            }
            let Task = {
                date : newTask.Date,
                description: newTask.Description,
                assignedBy: From,
                assignedTo: To,
                title: newTask.Title
            }
            axios.post(`https://us-central1-reallos-test.cloudfunctions.net/api/add-task/${id}`,Task,{
                headers: {Authorization: 'Bearer '+localStorage.getItem('FBIdToken')}
            })
            .then(res =>{
                dispatch(addTodo(
                    res.data.id,
                    Task.title,
                    Task.description,
                    Task.date,
                    Task.To,
                    Task.From
                ))
                dispatch(setLoadingFalse()); // dispatching an action to set loading to false
            })
            .catch(err =>{
                console.error(err);
                dispatch(setErrors(err)); // dispatching an action to set errors to true
            })
        }
        
    }
}

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

export function clearTodo(){
    return({
        type: CLEAR_TODO
    })
}