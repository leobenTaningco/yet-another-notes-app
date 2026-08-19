import * as todoRepository from '../repositories/todo.repository'

export function createTodo(userId: number,
    title: string, 
    bodyNote: string){
    return todoRepository.createTodo(userId, title, bodyNote);
}

export function getAllTodos(){
    return todoRepository.getAllTodos();
}

export function getTodoById(id: number){
    return todoRepository.getAllTodos();
}

export function deleteTodoById(id: number){
    return todoRepository.getTodoById(id);
}