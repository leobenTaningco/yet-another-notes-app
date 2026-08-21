import * as todoRepository from '../repositories/todo.repository'

export function createTodoService(userId: number,
    title: string, 
    bodyNote: string){
    return todoRepository.createTodoRepository(userId, title, bodyNote);
}

export function getAllTodoService(){
    return todoRepository.getAllTodosRepository();
}

export function getTodoByIdService(id: number){
    return todoRepository.getTodoByIdRepository(id);
}

export function deleteTodoByIdService(id: number){
    return todoRepository.getTodoByIdRepository(id);
}