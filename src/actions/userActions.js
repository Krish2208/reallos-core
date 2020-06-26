export const ADD_USER = 'ADD_USER'; // Action to add the user to the database
export const ADD_TRANSACTION_USER = 'ADD_TRANSACTION_USER'; // Action to add the transaction to the user

let id = 0; // to mimic the assignment of a primary key by the database

export function addUser(firstName,lastName,email,phone,role,state,password){ // User is added to the redux store
    id++;
    return({
        type: ADD_USER,
        id: id,
        firstName,
        lastName,
        email,
        phone,
        role,
        state,
        password
    });
}

export function addTransactionUser(payload){
    return({
        type: ADD_TRANSACTION_USER,
        payload
    });
}