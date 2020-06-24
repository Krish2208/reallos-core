export const ADD_TODO = 'ADD_TODO';
export const DELETE_TODO = 'DELETE_TODO';

export function addTodo(title,description,date,to){ // action creator for ADD_TODO
    return({
        type: ADD_TODO,
        title,
        description,
        date,
        to
    });
}

export function deleteTodo(title){ // action creator for DELETE_TODO
    return({
        type: DELETE_TODO,
        title
    })
}