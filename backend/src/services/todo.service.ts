import { Todo } from "../types/todo.types.ts";

const todos : Todo[] = []; // substitute for db since no db yet

export function createTodo(title: string, bodyNote: string): Todo {
    const todo: Todo = {
        id: todos.length + 1,
        title,
        bodyNote,
        completed: false,
    }

    todos.push(todo); // substitute for db since no db yet

    return todo;
}