export const ADD_USER = 'ADD_USER'; // Action to add the user to the database
export const ADD_TRANSACTION_USER = 'ADD_TRANSACTION_USER'; // Action to add the transaction to the user
export const EDIT_USER = 'EDIT_USER';

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

export function editUser(firstName, lastName, email, role, phone, state){
    return({
        type: EDIT_USER,
        firstName,
        lastName,
        email,
        role,
        phone,
        state
    });
}