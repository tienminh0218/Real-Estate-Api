import { PrismaClient } from '@prisma/client';
import { user } from './data/user';

//// npx ts-node src/utils/insert-database.ts

const prisma = new PrismaClient();

const createUser = async () => {
  await prisma.user.createMany({
    data: user,
  });
  const data = await prisma.user.findMany({});
  console.log(data);
};

async function main() {
  createUser();
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
