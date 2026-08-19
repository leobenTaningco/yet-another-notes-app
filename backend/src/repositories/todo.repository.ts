import { PrismaClient } from '../generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg';
import { Todo } from '../types/todo.types'


const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
    adapter,
});

export async function createTodo( userId: number, 
    title: string, 
    bodyNote: string) {
    return prisma.todo.create({
        data: {
            userId,
            title,
            bodyNote,
        }
    })
}

export function getAllTodos(){
    return prisma.todo.findMany()
}

export async function getTodoById(id: number){
    return prisma.todo.findUnique({
        where: { id },
    });
}

export async function deleteTodoById(id: number){
    return prisma.todo.delete({
        where: { id },
    })
}
