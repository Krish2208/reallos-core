import axios from 'axios'; // Importing axios to make endpoint request
import { myFirebase } from '../Config/MyFirebase';
import { setLoadingTrue, setLoadingFalse, setErrors } from './utilsActions'; // Importing acttions for util purposes


export const ADD_USER = 'ADD_USER'; // Action to add the user to the database
export const ADD_TRANSACTION_USER = 'ADD_TRANSACTION_USER'; // Action to add the transaction to the user
export const EDIT_USER = 'EDIT_USER';

export function signupUser(newUser) { // Still have to dispatch actions that update the state of the reducer
    return (dispatch) => {
        dispatch(setLoadingTrue()); // dispatching an action set loading to true
        myFirebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password) // creating a new user with email and password
        .then( res =>{
            localStorage.setItem('userID', res.user.uid); // storing the uid in local storage

            let user = {
                email: newUser.email,
                firstName: newUser.firstName,
                lastName: newUser.lastName,
                phone: newUser.phone,
                role: newUser.role,
                state: newUser.state
            };

            axios.post(`https://us-central1-reallos-test.cloudfunctions.net/api/add-user-details/${localStorage.getItem('userID')}`,user)
            .then(() =>{
                dispatch(setLoadingFalse()); // dispatching an action to set loading to false
            })
            .catch(err =>{
                let error;
                switch(err.code){
                    case 'auth/email-already-in-use': 
                        error = 'Account already exists with this email';
                        break;
                    case 'auth/network-request-failed':
                        error = 'Please check your internet connection';
                        break;
                    default :
                        error = 'Something went wrong, try again later!'
                        break;
                }
                dispatch(setErrors(error));
            })

        })
        .catch(err => {
            let error;
            switch(err.code){
                case 'auth/email-already-in-use': 
                    error = 'Account already exists with this email';
                    break;
                case 'auth/network-request-failed':
                    error = 'Please check your internet connection';
                    break;
                default :
                    error = 'Something went wrong, try again later!'
                    break;
            }
            dispatch(setErrors(error));
        })
    }
} 

export function login(user) { // still have to dispatch actions that update the state of the reducer
    return (dispatch) => {
        dispatch(setLoadingTrue()); // dispatching an action to set loading to true
        myFirebase.auth().signInWithEmailAndPassword(user.email, user.password) // Logging in the user
        .then( res => {
            return res.user.getIdToken(); // returning the jwt token
        })
        .then( token =>{
            localStorage.setItem('FBIdToken',token); // storing the token locally
            localStorage.setItem('userID', myFirebase.auth().currentUser.uid); // storing the uid locally

            window.location.href = '/transaction';
            dispatch(setLoadingFalse()); // dispatching an action to set loading to false
        })
        .catch( err =>{
            let error;
            switch(err.code){
                case 'auth/wrong-password': 
                    error = 'Incorrect email or passowrd!';
                    break;
                case 'auth/network-request-failed':
                    error = 'Please check your internet connection';
                    break;
                default :
                    error = 'Something went wrong, try again later!'
                    break;
            }
            dispatch(setErrors(error));
        })
    }
}

export function editingUser(newUser) { // to edit the current user
    return (dispatch) => {
        axios.put(`https://us-central1-reallos-test.cloudfunctions.net/api/update-profile`,newUser, {
            headers: {Authorization: 'Bearer ' + localStorage.getItem('FBIdToken')}
        })
        .then(() => {
            dispatch(editUser(
                newUser.firstName,
                newUser.lastName,
                newUser.email,
                newUser.role,
                newUser.phone,
                newUser.state
            ));
        })
        .catch(err => {
            console.error(err);
            if(err.response){
                    dispatch(setErrors(err.response.data)); // dispatching an action to set the error
                }
                else{
                    dispatch(setErrors({error: 'Please check your internet connection'}));
                }
        })
    }
}

// pure reducer functions here
export function addUser(id,firstName,lastName,email,phone,role,state,transactions) { // User is added to the redux store
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

export function addTransactionUser(payload) {
    return({
        type: ADD_TRANSACTION_USER,
        payload
    });
}

export function editUser(firstName, lastName, email, role, phone, state) { // Editing the user 
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
