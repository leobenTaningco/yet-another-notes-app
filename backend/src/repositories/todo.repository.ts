import "dotenv/config";
import { prisma } from "../../lib/prisma" 
import { UpdateTodoData} from '../types/todo.types'

export async function createTodoRepository(title: string, 
    bodyNote: string,
    userId: string) {
    return prisma.todo.create({
        data: {
            title,
            bodyNote,
            userId
        }
    })
}

export function getAllTodosRepository(userId: string){
    return prisma.todo.findMany({
        where: { userId }
    })
}

export async function getTodoByIdRepository(userId: string, todoId: number){
    return prisma.todo.findUnique({
        where: { 
            userId,
            todoId
         },
    });
}

export async function deleteTodoByIdRepository(userId: string, todoId: number){
    return prisma.todo.delete({
        where: { 
            userId,
            todoId
        },
    })
}

export async function updateTodoRepository(
    userId: string,
    todoId: number,
    data: UpdateTodoData ) {
    
    const todo = await prisma.todo.findFirst({
        where: {
            todoId,
            userId,
        }
    })

    if (!todo){
        throw new Error("Todo not found")
    }
    
    return prisma.todo.update({
        where: {
            todoId,
        },
        data,
    })
} 