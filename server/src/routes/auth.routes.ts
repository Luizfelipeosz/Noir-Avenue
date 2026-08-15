import { Router } from "express";
import crypto from "node:crypto";

import prisma from "../lib/prisma";

const router = Router();

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || typeof email !== "string") {
      return res.status(400).json({
        message: "Informe um e-mail válido.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    if (!user) {
      return res.status(404).json({
        message: "E-mail não encontrado.",
      });
    }

    // Remove tokens anteriores
    await prisma.passwordResetToken.deleteMany({
      where: {
        userId: user.id,
      },
    });

    // Gera token seguro
    const token = crypto.randomBytes(32).toString("hex");

    // Expira em 15 minutos
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

    const resetUrl =
      `http://localhost:5173/redefinir-senha?token=${token}`;

    console.log("=================================");
    console.log("LINK DE RECUPERAÇÃO:");
    console.log(resetUrl);
    console.log("=================================");

    return res.status(200).json({
      message: "Link de recuperação gerado.",
    });
  } catch (error) {
    console.error("Erro ao solicitar recuperação:", error);

    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
});

export default router;