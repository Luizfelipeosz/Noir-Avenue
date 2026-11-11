
import type { RequestHandler } from "express";
import { verifyAccessToken } from "../services/jwt.service.js";

export const authenticateToken: RequestHandler = (
  req,
  res,
  next
) => {
  const authorization = req.headers.authorization;

  const token = authorization?.match(
    /^Bearer\s+(.+)$/i
  )?.[1];

  if (!token) {
    res.status(401).json({
      code: "AUTHENTICATION_REQUIRED",
      message: "Autenticação necessária.",
    });

    return;
  }

  try {
    const payload = verifyAccessToken(token);

    req.user = {
      id: payload.userId,
    };

    next();
  } catch {
    res.status(401).json({
      code: "INVALID_OR_EXPIRED_TOKEN",
      message: "Sua sessão é inválida ou expirou. Entre novamente.",
    });
  }
};
