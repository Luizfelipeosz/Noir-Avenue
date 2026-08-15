import bcrypt from "bcrypt";
import prisma from "./lib/prisma";

async function main() {
  const password = await bcrypt.hash("123456", 10);

  const user = await prisma.user.upsert({
    where: {
      email: "teste@noiravenue.com",
    },
    update: {},
    create: {
      name: "Usuário Teste",
      email: "teste@noiravenue.com",
      password,
    },
  });

  console.log("Usuário criado:", user);
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });