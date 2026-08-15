import crypto from "node:crypto";
import prisma from "../lib/prisma";

export async function createPasswordResetToken(email: string) {
  const normalizedEmail = email.trim().toLowerCase();

  const user = await prisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },
  });

  if (!user) {
    return null;
  }

  // Remove tokens anteriores desse usuário
  await prisma.passwordResetToken.deleteMany({
    where: {
      userId: user.id,
    },
  });

  // Gera um token criptograficamente seguro
  const token = crypto.randomBytes(32).toString("hex");

  // Token válido por 15 minutos
  const expiresAt = new Date(
    Date.now() + 15 * 60 * 1000
  );

  await prisma.passwordResetToken.create({
    data: {
      token,
      userId: user.id,
      expiresAt,
    },
  });

  return {
    token,
    user,
  };
}