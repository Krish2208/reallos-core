import * as actions from '../actions/transactionActions';

const initialState = [ // this intitial state represents all the transaction is the database
];

function transactionReducer(state=initialState, action){
    switch(action.type){
        case actions.FETCH_TRANSACTION: // This will return a state with the transaction belonging to the particular user 
            return state.filter(transaction => transaction.id === action.userId)
        case actions.ADD_TRANSACTION: // Adding a transaction for a particular user
            return [
                ...state,{
                    id: action.id,
                    Name: action.Name,
                    Address: action.Address,
                    Description: action.Description,
                    active:false
                }
            ]
        case actions.SET_ACTIVE_TRANSACTION: // returning one transaction as active
            return state.map((transaction)=>{
                if(transaction.id === action.transId){
                    return {
                        ...transaction,
                        active: true
                    }
                }
                else
                    return transaction
            });
        default:
            return state;
    }
}

export default transactionReducer;
