import axios from 'axios'; // Importing axios to make endpoint request
import { addTransaction } from './transactionActions';

export const ADD_USER = 'ADD_USER'; // Action to add the user to the database
export const ADD_TRANSACTION_USER = 'ADD_TRANSACTION_USER'; // Action to add the transaction to the user
export const EDIT_USER = 'EDIT_USER';

export function signupUser(newUser,history){ // Still have to dispatch actions that update the state of the reducer
    return (dispatch)=> {
        axios.post('https://us-central1-reallos-test.cloudfunctions.net/api/signup',{
            ...newUser
        })
        .then( response =>{
            localStorage.setItem('FBIdToken', response.data.token); // storing the token in the local storage

            axios.get('https://us-central1-reallos-test.cloudfunctions.net/api/user-details',{  // Getting the user from the database
                headers: {Authorization: 'Bearer '+response.data.token}
            })
            .then( res => {
                dispatch(addUser(
                    res.data.id,
                    res.data.firstName,
                    res.data.lastName,
                    res.data.email,
                    res.data.phone,
                    res.data.role,
                    res.data.state,
                    res.data.transactions
                    ));

                    if (res.data.transactions && res.data.transactions.length) { // if the user has any transactions

                        let transactions = res.data.transactions.map(transaction => {
                            return transaction.trim();
                        }); // gettting all the ids with the space removed
    
                        transactions.map(transaction => {
                            axios.get(`https://us-central1-reallos-test.cloudfunctions.net/api/get-transaction/${transaction}`)
                            .then(res =>{
                                dispatch(addTransaction(
                                    transaction,
                                    res.data.name,
                                    res.data.address,
                                    res.data.desc,
                                    res.data.people
                                ));
                                history.push("/transaction"); // redirect to the transaction dashboard
                            })
                            .catch(err =>{
                                console.error(err);
                                })
                            })
                    }

                    else { // Else move to the transaction page
                        history.push("/transaction"); 
                    }
            })
            .catch(err =>{
                console.log(err)
            })

        })
        .catch(err =>{
            console.error(err)
        });
    }
} 

export function login(user,history){ // still have to dispatch actions that update the state of the reducer
    return (dispatch) =>{
        axios.post('https://us-central1-reallos-test.cloudfunctions.net/api/login',{
            ...user
        })
        .then( response=>{
            localStorage.setItem('FBIdToken', response.data.token); //storing the token in the local storage

            axios.get('https://us-central1-reallos-test.cloudfunctions.net/api/user-details',{  // Getting the user from the database
                headers: {Authorization: 'Bearer '+response.data.token}
            })
            .then( res => {
                dispatch(addUser(
                    res.data.id,
                    res.data.firstName,
                    res.data.lastName,
                    res.data.email,
                    res.data.phone,
                    res.data.role,
                    res.data.state,
                    res.data.transactions
                    ));

                    if (res.data.transactions && res.data.transactions.length) { // if the user has transactions

                        let transactions = res.data.transactions.map(transaction => {
                            return transaction.trim();
                        }); // gettting all the ids with the space removed
    
                        transactions.map(transaction => {
                            axios.get(`https://us-central1-reallos-test.cloudfunctions.net/api/get-transaction/${transaction}`)
                            .then(res =>{
                                dispatch(addTransaction(
                                    transaction,
                                    res.data.name,
                                    res.data.address,
                                    res.data.desc,
                                    res.data.people
                                ));
                                history.push("/transaction"); // redirect to the transaction dashboard
                            })
                            .catch(err =>{
                                console.error(err);
                                })
                            })
                    }
                    else { // else move to the transactions page
                        history.push("/transaction"); 
                    }
            })
            .catch(err =>{
                console.log(err)
            })
        })
        .catch(err =>{
            console.error(err)
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