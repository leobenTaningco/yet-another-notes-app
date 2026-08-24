import * as todoRepository from '../repositories/todo.repository'
import { UpdateTodoData } from '../types/todo.types'

export function createTodoService(
    userId: string,
    title: string, 
    bodyNote: string){
    return todoRepository.createTodoRepository(userId, title, bodyNote);
}

export function getAllTodoService(userId: string){
    return todoRepository.getAllTodosRepository(userId);
}

export function getTodoByIdService(
    userId: string,
    todoId: number){
    return todoRepository.getTodoByIdRepository(userId, todoId);
}

export function deleteTodoByIdService(
    userId: string,
    todoId: number){
    return todoRepository.getTodoByIdRepository(userId,todoId);
}

export function updateTodoService(
    userId: string,
    todoId: number, 
    data: UpdateTodoData
){
    return todoRepository.updateTodoRepository(userId, todoId, data);
}