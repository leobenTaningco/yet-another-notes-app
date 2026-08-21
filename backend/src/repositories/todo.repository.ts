import { PrismaClient } from '../../generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
    adapter,
});

export async function createTodoRepository( userId: number, 
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

export function getAllTodosRepository(){
    return prisma.todo.findMany()
}

export async function getTodoByIdRepository(id: number){
    return prisma.todo.findUnique({
        where: { id },
    });
}

export async function deleteTodoByIdRepository(id: number){
    return prisma.todo.delete({
        where: { id },
    })
}
