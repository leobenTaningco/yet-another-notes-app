import "dotenv/config";
import { prisma } from "../../lib/prisma" 

export async function ensureUserRepository(userId: string){
    return prisma.user.upsert({
        where: {
            userId
        },
        update: {},
        create: {
            userId
        }
    })
}