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
}

function userReducer(state = initialState, action){
    switch(action.type){
        case actions.ADD_USER:
            return{
                ...state, 
                id: action.id,
                firstName: action.firstName,
                lastName: action.lastName,
                email: action.email,
                phone: action.phone,
                role: action.role,
                state: action.state,
                password: action.password
            }
        default: 
        return state;
    }
} 

export default userReducer;