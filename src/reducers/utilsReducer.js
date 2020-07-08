import * as actions from '../actions/utilsActions';

const intialState = {
    Loading: false,
    Errors: null
};

function utilsReducer(state = intialState, action){
    
    switch(action.type){
        case actions.SET_LOADING_TRUE:
            return {
                Loading: true,
                Errors: null
            }
        case actions.SET_LOADING_FALSE:
            return {
                Loading: false,
                Errors: null
            }
        case actions.SET_ERRORS:
            return {
                Loading: false,
                Errors: action.error
            }

        default:
            return state;
    }
}

export default utilsReducer;

