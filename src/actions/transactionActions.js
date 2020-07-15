import axios from 'axios';
import {setLoadingTrue, setLoadingFalse, setErrors} from './utilsActions';
import { addUser } from './userActions';

export const ADD_TRANSACTION = 'ADD_TRANSACTION'; // Adding the transaction to the reducer
export const CLEAR_TRANSACTION_STORE = 'CLEAR_TRANSACTION_STORE'; // clearing the transaction store


export function getTransaction(userId){
    return (dispatch) =>{
        if(userId === null) { // if the data has not previously been fetched and stored in the redux store already
            let userID = localStorage.getItem('userID'); // Getting the stored user id from local storage
            dispatch(setLoadingTrue()); // dispatching an action to set loading to true

            axios.get(`/user-details`,{
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
                    axios.get(`/get-all-transactions/${userID}`,{
                        headers: {Authorization: 'Bearer '+localStorage.getItem('FBIdToken')}
                    })
                    .then( res =>{ // Getting all the transactions the user is involved in
                        res.data.txnList.map((transId)=>{
                            axios.get(`/get-transaction/${transId}`) // Getting all the transactions from the database
                            .then( res => {
                                dispatch(addTransaction(
                                    transId,
                                    res.data.name,
                                    res.data.address,
                                    res.data.desc,
                                    res.data.people,
                                    res.data.all,
                                    res.data.completed
                                ))
                            })
                            .catch(err => {
                                console.error(err);
                                dispatch(setErrors(err)); // dispatching an action to set error
                            })
                        })
                        dispatch(setLoadingFalse()); // dispatching an action to set loading to false
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
}

export function createTransaction(newTransaction,people){
    return (dispatch) =>{

        dispatch(setLoadingTrue()); // dispatching an action to set loading to true
        let token = localStorage.getItem('FBIdToken'); // getting the jwt

        axios.post('/create-transaction',newTransaction,{
            headers: { Authorization: 'Bearer ' + token }
        })
        .then(res =>{
            let id = res.data.id; // storing the id of the recently created transaction
            axios.post(`/add-multiple-people/${id}`,{
                people: people
            },{
                headers: { Authorization: 'Bearer ' + token }
            })
            .then( () => {
                axios.put(`/add-transaction-to-user/${id}`,null,{
                    headers: {Authorization: 'Bearer ' + token}
                })
                .then( () =>{
                    dispatch(addTransaction(id,newTransaction.name,newTransaction.address,newTransaction.desc,newTransaction.people)) // dispatching an action to add the transaction to the store
                    dispatch(setLoadingFalse()); // dispatching an action to set loading to false
                })
                .catch(err =>{
                    console.error(err);
                    dispatch(setErrors(err)); // dispatching an action to set the errors
                })
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


// Pure Reducer functions
export function addTransaction(id, Name, Address, Description, People, allTask, completedTask){
    return({
        type: ADD_TRANSACTION,
        id: id,
        Name: Name,
        Address: Address,
        Description: Description,
        People: People,
        allTask,
        completedTask
    })
}


export function clearTransaction(){
    return({
        type: CLEAR_TRANSACTION_STORE
    })
}