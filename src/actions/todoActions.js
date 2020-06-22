export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';

export function addTodo(name){ // action creator for ADD_TODO
    return({
        type: ADD_TODO,
        name 
    });
}

export function deleteTodo(name){ // action creator for DELETE_TODO
    return({
        type: DELETE_TODO,
        name
    })
}