process.env.DATABASE_URL = 'postgres://postgres:postgres@localhost:51214/template1?sslmode=disable';
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
prisma.category.findMany().then(console.log).catch(e => console.error(e.message)).finally(() => prisma.$disconnect());
