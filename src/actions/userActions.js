import axios from 'axios'; // Importing axios to make endpoint request

export const ADD_USER = 'ADD_USER'; // Action to add the user to the database
export const ADD_TRANSACTION_USER = 'ADD_TRANSACTION_USER'; // Action to add the transaction to the user
export const EDIT_USER = 'EDIT_USER';

export function signupUser(newUser,history){ // Still have to dispatch actions that update the state of the reducer
    return (dispatch)=> {
        axios.post('https://us-central1-reallos-test.cloudfunctions.net/api/signup',{
            ...newUser
        })
        .then( response =>{
            localStorage.setItem('FBIdToken', response.data.token); // storing the token in the local storage

            axios.get('https://us-central1-reallos-test.cloudfunctions.net/api/user-details',{  // Getting the user from the database
                headers: {Authorization: 'Bearer '+response.data.token}
            })
            .then( res => {
                dispatch(addUser(
                    res.data.id,
                    res.data.firstName,
                    res.data.lastName,
                    res.data.email,
                    res.data.phone,
                    res.data.role,
                    res.data.state
                    ));
                    history.push("/transaction"); // redirect to the transaction dashboard
            })
            .catch(err =>{
                console.log(err)
            })

        })
        .catch(err =>{
            console.error(err)
        });
    }
} 

export function login(user,history){ // still have to dispatch actions that update the state of the reducer
    return (dispatch) =>{
        axios.post('https://us-central1-reallos-test.cloudfunctions.net/api/login',{
            ...user
        })
        .then( response=>{
            localStorage.setItem('FBIdToken', response.data.token); //storing the token in the local storage

            axios.get('https://us-central1-reallos-test.cloudfunctions.net/api/user-details',{  // Getting the user from the database
                headers: {Authorization: 'Bearer '+response.data.token}
            })
            .then( res => {
                dispatch(addUser(
                    res.data.id,
                    res.data.firstName,
                    res.data.lastName,
                    res.data.email,
                    res.data.phone,
                    res.data.role,
                    res.data.state,
                    //res.data.transactions
                    ));
                    history.push("/transaction"); // redirect to the transaction dashboard
            })
            .catch(err =>{
                console.log(err)
            })
        })
        .catch(err =>{
            console.error(err)
        })
    }
}

export function addUser(id,firstName,lastName,email,phone,role,state,transactions){ // User is added to the redux store
    return({
        type: ADD_USER,
        id: id,
        firstName,
        lastName,
        email,
        phone,
        role,
        state,
        transactions
    });
}

export function addTransactionUser(payload){
    return({
        type: ADD_TRANSACTION_USER,
        payload
    });
}

export function editUser(firstName, lastName, email, role, phone, state){ // Editing the user 
    return({
        type: EDIT_USER,
        Name: firstName+" "+lastName,
        firstName,
        lastName,
        email,
        role,
        phone,
        state
    });
}