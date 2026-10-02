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

  resendApiKey: requiredEnv(
    "RESEND_API_KEY",
    process.env.RESEND_API_KEY
  ),
};