import axios from 'axios'; // Importing axios to make endpoint request
import { setLoadingTrue,setLoadingFalse, setErrors } from './utilsActions'; // Importing acttions for util purposes

export const ADD_USER = 'ADD_USER'; // Action to add the user to the database
export const ADD_TRANSACTION_USER = 'ADD_TRANSACTION_USER'; // Action to add the transaction to the user
export const EDIT_USER = 'EDIT_USER';

export function signupUser(newUser){ // Still have to dispatch actions that update the state of the reducer
    return (dispatch)=> {
        dispatch(setLoadingTrue()); // dispatching an action set loading to true
        axios.post('https://us-central1-reallos-test.cloudfunctions.net/api/signup',{
            ...newUser
        })
        .then( response =>{
            localStorage.setItem('FBIdToken', response.data.token); // storing the token in the local storage

            axios.get('https://us-central1-reallos-test.cloudfunctions.net/api/user-details',{  // Getting the user from the database
                headers: {Authorization: 'Bearer '+response.data.token}
            })
            .then( res => {
                    localStorage.setItem('userID',res.data.id); // Storing the userID in the local storage 

                    window.location.href = '/transaction'
                    dispatch(setLoadingFalse()); // dispatching an action to set loading to false

            })
            .catch(err =>{
                console.log(err)
                dispatch(setErrors(err)); // dispatching an action to set the error
            })

        })
        .catch(err =>{
            console.error(err)
            dispatch(setErrors(err)); // dispatching an action to set the error
        });
    }
} 

export function login(user){ // still have to dispatch actions that update the state of the reducer
    return (dispatch) =>{
        dispatch(setLoadingTrue()); // dispatching an action to set loading to true
        axios.post('https://us-central1-reallos-test.cloudfunctions.net/api/login',{
            ...user
        })
        .then( response=>{
            localStorage.setItem('FBIdToken', response.data.token); //storing the token in the local storage

            axios.get('https://us-central1-reallos-test.cloudfunctions.net/api/user-details',{  // Getting the user from the database
                headers: {Authorization: 'Bearer '+response.data.token}
            })
            .then( res => {

                    localStorage.setItem('userID',res.data.id); // storing the id of the user to local storage

                    window.location.href='/transaction';
                    dispatch(setLoadingFalse()); // dispatching an action to set loading to false
            })
            .catch(err =>{
                console.error(err)
                dispatch(setErrors()); // dispatching an actio to set the errors
            })
        })
        .catch(err =>{
            console.error(err)
            dispatch(setErrors()); // dispatching an actio to set the errors
        })
    }
}

export function addUser(id,firstName,lastName,email,phone,role,state,transactions){ // User is added to the redux store
    return({
        type: ADD_USER,
        id: id,
        firstName,
        lastName,
        email,
        phone,
        role,
        state,
        transactions
    });
}

export function addTransactionUser(payload){
    return({
        type: ADD_TRANSACTION_USER,
        payload
    });
}

export function editUser(firstName, lastName, email, role, phone, state){ // Editing the user 
    return({
        type: EDIT_USER,
        Name: firstName+" "+lastName,
        firstName,
        lastName,
        email,
        role,
        phone,
        state
    });
}