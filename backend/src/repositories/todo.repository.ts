import { PrismaClient } from '../generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
    adapter,
});

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

export function getAllTodosRepository(){
    return prisma.todo.findMany()
}

export async function getTodoByIdRepository(todoId: number){
    return prisma.todo.findUnique({
        where: { todoId },
    });
}

export async function deleteTodoByIdRepository(todoId: number){
    return prisma.todo.delete({
        where: { todoId },
    })
}
