import * as actions from '../actions/transactionActions';

const initialState = [ // this intitial state represents all the transaction is the database
];

function transactionReducer(state=initialState, action){
    switch(action.type){
        case actions.ADD_TRANSACTION: // Adding a transaction for a particular user
            return [
                ...state,{
                    id: action.id,
                    Name: action.Name,
                    Address: action.Address,
                    Description: action.Description,
                    People: action.People,
                    active:false
                }
            ]
        case actions.SET_ACTIVE_TRANSACTION: // returning one transaction as active
            return state.map((transaction)=>{
                if(transaction.id === action.transId){
                    return {
                        ...transaction,
                        active: true // Used to set which transaction is open
                    }
                }
                else
                    return{
                        ...transaction,
                        active: false
                    }
            });
        case actions.REMOVE_FROM_TRANSACTION: // Removing a person from the transaction
        return state.map((transaction)=>{
            if(transaction.id === action.transId){ // Still have to figure out a way to do this
                return{
                    ...transaction,
                    People: action.People
                }
            }
            else{
                return{
                    ...transaction
                }
            }
        });
        case actions.ADD_TO_TRANSACTION: // Adding a person to the transaction
        return state.map((transaction)=>{
            if(transaction.id === action.transId){
                return{
                    ...transaction,
                    People: action.People
                }
            }   
            else{
                return{
                    ...transaction
                }
            }
        })
        default:
            return state;
    }
}

export default transactionReducer;
