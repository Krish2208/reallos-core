import axios from 'axios';
import {setLoadingTrue, setLoadingFalse, setErrors} from './utilsActions';
import { addUser } from './userActions';

export const ADD_TRANSACTION = 'ADD_TRANSACTION'; // Adding the transaction to the reducer
export const REMOVE_FROM_TRANSACTION = 'REMOVE_FROM_TRANSACTION'; // Removing the person from the transaction
export const ADD_TO_TRANSACTION = 'ADD_TO_TRANSACTION'; // Adding a person to the transaction
export const CREATE_TRANSACTION = 'CREATE_TRANSACTION'; // Creating a new transaction 
export const GET_TRANSACTION = 'GET_TRANSACTION'; // getting the transaction from the database
export const CLEAR_TRANSACTION_STORE = 'CLEAR_TRANSACTION_STORE'; // clearing the transaction store

export function getTransaction(){
    return (dispatch) =>{
        dispatch(clearTransaction());
        let userID = localStorage.getItem('userID'); // Getting the stored user id from local storage
        dispatch(setLoadingTrue()); // dispatching an action to set loading to true

        axios.get(`https://us-central1-reallos-test.cloudfunctions.net/api/user-details`,{
            headers: {Authorization: 'Bearer '+localStorage.getItem('FBIdToken')}
        })
        .then(res =>{

            dispatch(addUser( // dispatching an action to add the user to the redux store
                userID,
                res.data.firstName,
                res.data.lastName,
                res.data.email,
                res.data.phone,
                res.data.role,
                res.data.state,
                res.data.transaction
            ))

            if(userID !== null) { // To ensure that the userID is not null
                axios.get(`https://us-central1-reallos-test.cloudfunctions.net/api/get-all-transactions/${userID}`,{
                    headers: {Authorization: 'Bearer '+localStorage.getItem('FBIdToken')}
                })
                .then( res =>{ // Getting all the transactions the user is involved in
                    res.data.txnList.map((transId)=>{
                        axios.get(`https://us-central1-reallos-test.cloudfunctions.net/api/get-transaction/${transId}`) // Getting all the transactions from the database
                        .then( res => {
                            dispatch(addTransaction(
                                transId,
                                res.data.name,
                                res.data.address,
                                res.data.desc,
                                res.data.people
                            ))
                            dispatch(setLoadingFalse()); // dispatching an action to set loading to false
                        })
                        .catch(err => {
                            console.error(err);
                            dispatch(setErrors(err)); // dispatching an action to set error
                        })
                    })
                })
                .catch(err =>{
                    console.error(err);
                    dispatch(setErrors(err)); // dispatching an action to set error
                })
            } 
        })
        .catch(err =>{
            console.error(err);
            dispatch(setErrors(err)); // dispatching an action to set the error
        })
    }
}

export function createTransaction(newTransaction,people){
    return (dispatch) =>{

        dispatch(setLoadingTrue()); // dispatching an action to set loading to true
        let token = localStorage.getItem('FBIdToken'); // getting the jwt

        axios.post('https://us-central1-reallos-test.cloudfunctions.net/api/create-transaction',newTransaction,{
            headers: { Authorization: 'Bearer ' + token }
        })
        .then(res =>{
            let id = res.data.id; // storing the id of the recently created transaction
            axios.post(`https://us-central1-reallos-test.cloudfunctions.net/api/add-multiple-people/${id}`,{
                people: people
            },{
                headers: { Authorization: 'Bearer ' + token }
            })
            .then( () => {
                dispatch(addTransaction(id,newTransaction.name,newTransaction.address,newTransaction.desc,newTransaction.people)) // dispatching an action to create a new transaction
                dispatch(setLoadingFalse()); // dispatching an action to set loading to false
            })
            .catch( err =>{
                console.error(err);
                dispatch(setErrors(err)); // dispatching an action to set the errors
            })
        })
        .catch(err =>{
            console.error(err);
            dispatch(setErrors(err)); // dispatching an action to set the errors
        });
        
    }
}




export function addTransaction(id, Name, Address, Description, People){
    return({
        type: ADD_TRANSACTION,
        id: id,
        Name: Name,
        Address: Address,
        Description: Description,
        People: People
    })
}


export function removeFromTransaction(People,transId){
    return({
        type: REMOVE_FROM_TRANSACTION,
        People,
        transId
    });
}

export function addToTransaction(People,transId){
    return({
        type: ADD_TO_TRANSACTION,
        People,
        transId
    })
}

export function clearTransaction(){
    return({
        type: CLEAR_TRANSACTION_STORE
    })
}