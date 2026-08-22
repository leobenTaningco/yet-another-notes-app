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

async function seedTodos(){
    const users = await prisma.user.findMany({
        select: {
            userId: true,
        }
    });

    if (users.length === 0 ){
        throw new Error('No users found. Run seedUsers first');
    }

    await prisma.todo.createMany({
        data: Array.from({ length: 10 }).map(()=> ({
            title: faker.lorem.sentence(),
            bodyNote: faker.lorem.paragraph(),
            userId: faker.helpers.arrayElement(users).userId,
        }))
    })

    console.log('Todos seeded');
}

seedTodos()
    .catch(console.error)
    .finally(()=> prisma.$disconnect())