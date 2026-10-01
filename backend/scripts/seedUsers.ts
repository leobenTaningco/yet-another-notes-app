import { faker } from '@faker-js/faker'
import "dotenv/config";
import { PrismaClient } from '../src/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg';

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
    adapter,
});


async function seedUsers(){
    await prisma.user.deleteMany();

    await prisma.user.create({
        data: {
            userId: faker.string.uuid(),
            username: "ryan",
            status: 'active'
        }
    })

    await prisma.user.create({
        data: {
            userId: faker.string.uuid(),
            username: "ben",
            status: 'active'
        }
    })

    console.log('Users created');
}

seedUsers()
    .catch(console.error)
    .finally(()=> prisma.$disconnect())