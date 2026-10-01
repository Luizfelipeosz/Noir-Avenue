import crypto from "node:crypto";

export const RESET_TOKEN_EXPIRATION_MINUTES = 15;

export function generateResetToken(): string {
  return crypto.randomBytes(32).toString("hex");
}

export function getResetTokenExpiration(): Date {
  return new Date(
    Date.now() +
      RESET_TOKEN_EXPIRATION_MINUTES *
        60 *
        1000
  );
}