import bcrypt from "bcrypt";

import prisma from "../lib/prisma.js";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

interface LoginData {
  email: string;
  password: string;
}

export const registerUser = async ({
  name,
  email,
  password,
}: RegisterData) => {
  const normalizedName = name.trim();
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedName || !normalizedEmail || !password) {
    throw new Error("Dados obrigatórios não informados.");
  }

  const existingUser = await prisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },
  });

  if (existingUser) {
    throw new Error("EMAIL_ALREADY_EXISTS");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name: normalizedName,
      email: normalizedEmail,
      password: hashedPassword,
    },
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
};

export const loginUser = async ({
  email,
  password,
}: LoginData) => {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail || !password) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },
  });

  if (!user) {
    throw new Error("INVALID_CREDENTIALS");
  }

  const passwordMatches = await bcrypt.compare(
    password,
    user.password
  );

  if (!passwordMatches) {
    throw new Error("INVALID_CREDENTIALS");
  }

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
};

export const deleteUser = async (email: string) => {
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedEmail) {
    throw new Error("INVALID_EMAIL");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },
  });

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  await prisma.user.delete({
    where: {
      email: normalizedEmail,
    },
  });

  return {
    success: true,
  };
};
interface ChangePasswordData {
  email: string;
  currentPassword: string;
  newPassword: string;
}

export const changeUserPassword = async ({
  email,
  currentPassword,
  newPassword,
}: ChangePasswordData) => {
  const normalizedEmail = email.trim().toLowerCase();

  if (
    !normalizedEmail ||
    !currentPassword ||
    !newPassword
  ) {
    throw new Error("INVALID_PASSWORD_DATA");
  }

  const user = await prisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },
  });

  if (!user) {
    throw new Error("USER_NOT_FOUND");
  }

  const currentPasswordMatches =
    await bcrypt.compare(
      currentPassword,
      user.password
    );

  if (!currentPasswordMatches) {
    throw new Error("INVALID_CURRENT_PASSWORD");
  }

  if (currentPassword === newPassword) {
    throw new Error("SAME_PASSWORD");
  }

  const hashedPassword = await bcrypt.hash(
    newPassword,
    12
  );

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  return {
    success: true,
  };
};