
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

const JWT_EXPIRES_IN = "7d";

const JWT_ISSUER = "noir-avenue-api";
const JWT_AUDIENCE = "noir-avenue-client";

export interface AuthTokenPayload {
  userId: string;
}

export const generateAccessToken = (
  userId: string
): string => {
  return jwt.sign(
    {},
    env.jwtSecret,
    {
      subject: userId,
      expiresIn: JWT_EXPIRES_IN,
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    }
  );
};

export const verifyAccessToken = (
  token: string
): AuthTokenPayload => {
  const decoded = jwt.verify(
    token,
    env.jwtSecret,
    {
      issuer: JWT_ISSUER,
      audience: JWT_AUDIENCE,
    }
  );

  if (
    typeof decoded === "string" ||
    typeof decoded.sub !== "string"
  ) {
    throw new Error("INVALID_TOKEN_PAYLOAD");
  }

  return {
    userId: decoded.sub,
  };
};
