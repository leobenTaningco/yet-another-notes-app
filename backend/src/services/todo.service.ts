import { Todo } from '../types/todo.types';
import { todos } from '../repositories/data.todos';

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

export function getAllTodos(): Todo [] { // tweak for actual db implementation
    const todo = todos

    return todo
}

export function getTodoById(id: number): Todo | null{
    const todo = todos.find(todo => todo.id === Number(id));

    return todo ?? null;
}

export function deleteTodoById(id: number): Todo | null{
    const index = todos.findIndex(todo => todo.id === Number(id))

    const deletedTodo = todos.splice(index,1)[0];

    return deletedTodo ?? null;
}
