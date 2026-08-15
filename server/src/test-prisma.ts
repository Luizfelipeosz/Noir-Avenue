import prisma from "../lib/prisma";

async function main() {
  const users = await prisma.user.findMany();

  console.log("Usuários cadastrados:", users);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });