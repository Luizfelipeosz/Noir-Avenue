import "dotenv/config";
import Database from "better-sqlite3";
import { resolve } from "node:path";
import prisma from "./src/lib/prisma.js";

async function verifyImport() {
  const backupPath = resolve(
    process.cwd(),
    "../../Noir-Avenue-Backup/database/noir-avenue-original.db"
  );

  const sqlite = new Database(backupPath, {
    readonly: true,
    fileMustExist: true,
  });

  try {
    const sourceUsers = sqlite
      .prepare('SELECT * FROM "User" ORDER BY id')
      .all() as any[];

    const sourceTokens = sqlite
      .prepare('SELECT * FROM "PasswordResetToken" ORDER BY id')
      .all() as any[];

    const neonUsers = await prisma.user.findMany({
      orderBy: { id: "asc" },
    });

    const neonTokens = await prisma.passwordResetToken.findMany({
      orderBy: { id: "asc" },
    });

    const normalizeUsers = (users: any[]) =>
      users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
        password: user.password,
        createdAt: new Date(user.createdAt).toISOString(),
        updatedAt: new Date(user.updatedAt).toISOString(),
      }));

    const normalizeTokens = (tokens: any[]) =>
      tokens.map((token) => ({
        id: token.id,
        token: token.token,
        userId: token.userId,
        expiresAt: new Date(token.expiresAt).toISOString(),
        createdAt: new Date(token.createdAt).toISOString(),
      }));

    const usersMatch =
      JSON.stringify(normalizeUsers(sourceUsers)) ===
      JSON.stringify(normalizeUsers(neonUsers));

    const tokensMatch =
      JSON.stringify(normalizeTokens(sourceTokens)) ===
      JSON.stringify(normalizeTokens(neonTokens));

    console.log("=== VERIFICAÇÃO DA MIGRAÇÃO ===");
    console.log(
      "Usuários:",
      usersMatch ? "CORRETOS (6/6)" : "DIVERGÊNCIA"
    );
    console.log(
      "Tokens:",
      tokensMatch ? "CORRETOS (3/3)" : "DIVERGÊNCIA"
    );

    if (!usersMatch || !tokensMatch) {
      throw new Error("Os dados importados apresentam divergências.");
    }

    console.log("\nINTEGRIDADE DOS DADOS APROVADA!");
  } finally {
    sqlite.close();
    await prisma.$disconnect();
  }
}

verifyImport().catch((error) => {
  console.error("\nFalha na verificação:", error);
  process.exitCode = 1;
});