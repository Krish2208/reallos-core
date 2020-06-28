export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';
export const EDIT_TODO = 'EDIT_TODO';
let id = 0; // This will dynamically be fetched from the database but is being kept 0 for now

export function addTodo(transId, Title, Description, Date, To, From){ // action creator for ADD_TODO
    id++;
    return({
        type: ADD_TODO,
        id,
        transId,
        Title,
        Description,
        Date,
        To,
        From
    });
}

export function deleteTodo(id){ // action creator for DELETE_TODO
    return({
        type: DELETE_TODO,
        id
    })
}

export function editTodo(id,Title, Description, Date, To){
    return({
        type: EDIT_TODO,
        id,
        Title,
        Description,
        Date, 
        To
    })
}