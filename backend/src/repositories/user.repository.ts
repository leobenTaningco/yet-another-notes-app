import { PrismaClient } from '../generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
    adapter,
});

export async function createUserRepository(userId: string,
    username: string,
    status: string,) {
    return prisma.user.create({
        data: {
            userId,
            username,
            status,
        }
    })
}

export async function deleteAllUsersRepository(){
    return prisma.user.deleteMany()
}
