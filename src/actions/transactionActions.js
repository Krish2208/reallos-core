export const ADD_TRANSACTION = 'ADD_TRANSACTION'; // Adding the transaction to the reducer
export const SET_ACTIVE_TRANSACTION = 'SET_ACTIVE_TRANSACTION' // Setting the active transaction which will be used to fetch data fro other functionalities
export const REMOVE_FROM_TRANSACTION = 'REMOVE_FROM_TRANSACTION'; // Removing the person from the transaction
export const ADD_TO_TRANSACTION = 'ADD_TO_TRANSACTION'; // Adding a person to the transaction


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

export function setActiveTransaction(transId){
    return({
        type: SET_ACTIVE_TRANSACTION,
        transId
    });
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