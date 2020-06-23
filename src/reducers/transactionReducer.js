import * as actions from '../actions/transactionActions';

const initialState = [
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
        case actions.FETCH_TRANSACTION:
            return state.filter(transaction => transaction.id == action.userId)
        default:
            return state;
    }
}

export default transactionReducer;
