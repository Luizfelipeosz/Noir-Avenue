
import crypto from "node:crypto";
import bcrypt from "bcrypt";

import prisma from "../lib/prisma";

const RESET_TOKEN_EXPIRATION_MINUTES = 15;

export async function createPasswordResetToken(email: string) {
  const normalizedEmail = email.trim().toLowerCase();

  console.log("📧 E-mail procurado:", normalizedEmail);
  console.log("🗄️ DATABASE_URL:", process.env.DATABASE_URL);

  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  console.log("👥 Usuários encontrados no banco:", users);

  const user = await prisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },
  });

  console.log("🔎 Usuário encontrado:", user);

  if (!user) {
    return null;
  }

  // Remove tokens anteriores desse usuário.
  await prisma.passwordResetToken.deleteMany({
    where: {
      userId: user.id,
    },
  });

  // Gera um token criptograficamente seguro.
  const token = crypto.randomBytes(32).toString("hex");

  // Token válido por 15 minutos.
  const expiresAt = new Date(
    Date.now() + RESET_TOKEN_EXPIRATION_MINUTES * 60 * 1000
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

export async function verifyPasswordResetToken(token: string) {
  if (!token || typeof token !== "string") {
    return null;
  }

  const resetToken = await prisma.passwordResetToken.findUnique({
    where: {
      token,
    },
    include: {
      user: true,
    },
  });

  if (!resetToken) {
    return null;
  }

  if (resetToken.expiresAt.getTime() <= Date.now()) {
    await prisma.passwordResetToken.delete({
      where: {
        id: resetToken.id,
      },
    });

    return null;
  }

  return resetToken;
}

export async function resetPassword(
  token: string,
  newPassword: string
) {
  const resetToken = await verifyPasswordResetToken(token);

  if (!resetToken) {
    return {
      success: false,
      reason: "INVALID_TOKEN" as const,
    };
  }

  const hashedPassword = await bcrypt.hash(newPassword, 12);

  await prisma.$transaction([
    prisma.user.update({
      where: {
        id: resetToken.userId,
      },
      data: {
        password: hashedPassword,
      },
    }),

    // O token deixa de existir depois de ser utilizado.
    prisma.passwordResetToken.delete({
      where: {
        id: resetToken.id,
      },
    }),
  ]);

  return {
    success: true,
  };
}

