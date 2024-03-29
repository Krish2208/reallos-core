import * as actions from '../actions/userActions';

const initialState = {
    id: null,
    firstName: null,
    lastName: null,
    email: null,
    phone: null,
    role: null,
    state: null,
    password: null,
    transactionID: [],
    eSignature: null,
    initials: null
    // Add more fields as and when required
}

function userReducer(state = initialState, action){
    switch(action.type){
        case actions.ADD_USER:
            return{
                ...state, 
                id: action.id,
                Name: action.firstName+" "+action.lastName,
                firstName: action.firstName,
                lastName: action.lastName,
                email: action.email,
                phone: action.phone,
                role: action.role,
                state: action.state,
                password: action.password
            }
        case actions.ADD_TRANSACTION_USER:
            return{
                ...state,
                transactionID: action.payload
            }
        case actions.EDIT_USER:
            return{
                ...state,
                Name: action.firstName+" "+action.lastName,
                firstName: action.firstName,
                lastName: action.lastName,
                email: action.email,
                phone: action.phone,
                role: action.role,
                state: action.state
            }
        default: 
        return state;
    }
} 

export default userReducer;