export const FETCH_TRANSACTION = 'FETCH_TRANSACTION'; // fetching the transaction for the user

export function fetchTransaction(userId){ // This is where an asynchronous call will be made to fetch the transactions from the database
    return({
        type: FETCH_TRANSACTION,
        userId
    });
}