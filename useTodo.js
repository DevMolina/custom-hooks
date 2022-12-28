import { useEffect, useReducer } from "react";
import { todoReducer } from "../08-useReducer";

const initialState = [
    // {
    //     id: new Date().getTime(),
    //     description: 'Recolectar la piedra del Alma',
    //     done: false,
    // }
]

const init = () => {
    return JSON.parse(localStorage.getItem('todos') || [])
}

export const useTodo = () => {

    const [todos, dispatch] = useReducer(todoReducer, initialState, init);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos))
    
    }, [todos])
    

    const handleNewTodo = (todo) => {
        const action = {
            type: '[TODO] add Todo',
            payload: todo
        }
        dispatch(action);
    }

    const handleDeleteTodo = (id) => {
        // console.log(todos.filter((todo)=>todo.id===id));
        const action = {
            type: '[TODO] Remove Todo',
            payload: id
        }
        dispatch(action);
    }

    const handleToggleTodo = (id) => {
        // console.log(todos.filter((todo)=>todo.id===id)[0].description);
        // console.log(id);
        const action = {
            type: '[TODO] Toggle Todo',
            payload: id
        }
        dispatch(action);
    }

    return {
        todos,
        handleNewTodo,
        handleDeleteTodo,
        handleToggleTodo,
        todosCount: todos.length,
        pendingTodosCount: todos.filter((todo)=>!todo.done).length
    }
}

