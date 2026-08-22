import * as todoRepository from '../repositories/todo.repository'

export function createTodoService(userId: string,
    title: string, 
    bodyNote: string){
    return todoRepository.createTodoRepository(userId, title, bodyNote);
}

export function getAllTodoService(){
    return todoRepository.getAllTodosRepository();
}

export function getTodoByIdService(todoId: number){
    return todoRepository.getTodoByIdRepository(todoId);
}

export function deleteTodoByIdService(todoId: number){
    return todoRepository.getTodoByIdRepository(todoId);
}