import "dotenv/config";

const requiredEnv = (
  name: string,
  value: string | undefined
): string => {
  if (!value) {
    throw new Error(
      `Variável de ambiente obrigatória não configurada: ${name}`
    );
  }

  return value;
};

export const env = {
  port: Number(process.env.PORT) || 3001,

  frontendUrl:
    process.env.FRONTEND_URL ||
    "http://localhost:5173",

  databaseUrl: requiredEnv(
    "DATABASE_URL",
    process.env.DATABASE_URL
  ),

  mail: {
    host: requiredEnv(
      "MAIL_HOST",
      process.env.MAIL_HOST
    ),

    port:
      Number(process.env.MAIL_PORT) || 587,

    user: requiredEnv(
      "MAIL_USER",
      process.env.MAIL_USER
    ),

    password: requiredEnv(
      "MAIL_PASSWORD",
      process.env.MAIL_PASSWORD
    ),
  },
};