import * as actions from '../actions/transactionActions';

const initialState = [ // this intitial state represents all the transaction is the database
    {
        id: 1,
        Name: 'Transaction 1',
        Address: 'California Street, some random data'
    },
    {
        id: 2,
        Name: 'Transaction 2',
        Address: 'California Street, some random data'
    }
];

function transactionReducer(state=initialState, action){
    switch(action.type){
        case actions.FETCH_TRANSACTION: // This will return a state with the transaction belonging to the particular user 
            return state.filter(transaction => transaction.id == action.userId)
        default:
            return state;
    }
}

export default transactionReducer;
