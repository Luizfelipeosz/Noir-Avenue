import { Router } from "express";
import crypto from "node:crypto";
import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma";
const router = Router();

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "E-mail é obrigatório.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const user = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    /*
     * Não revelamos se o e-mail existe.
     * Isso evita enumeração de contas.
     */
    if (!user) {
      return res.status(200).json({
        message:
          "Se o e-mail estiver cadastrado, você receberá as instruções para redefinir sua senha.",
      });
    }

    // Remove tokens anteriores desse usuário
    await prisma.passwordResetToken.deleteMany({
      where: {
        userId: user.id,
      },
    });

    // Token aleatório seguro
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

    console.log("TOKEN DE RECUPERAÇÃO:", token);

    return res.status(200).json({
      message:
        "Se o e-mail estiver cadastrado, você receberá as instruções para redefinir sua senha.",
    });
  } catch (error) {
    console.error("Erro ao solicitar recuperação:", error);

    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const { token, password } = req.body;

    if (!token || !password) {
      return res.status(400).json({
        message: "Token e senha são obrigatórios.",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message:
          "A senha deve possuir pelo menos 6 caracteres.",
      });
    }

    const resetToken =
      await prisma.passwordResetToken.findUnique({
        where: {
          token,
        },
        include: {
          user: true,
        },
      });

    if (!resetToken) {
      return res.status(400).json({
        message: "Token inválido ou expirado.",
      });
    }

    if (resetToken.expiresAt < new Date()) {
      await prisma.passwordResetToken.delete({
        where: {
          id: resetToken.id,
        },
      });

      return res.status(400).json({
        message: "Token inválido ou expirado.",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      12
    );

    await prisma.user.update({
      where: {
        id: resetToken.userId,
      },
      data: {
        password: hashedPassword,
      },
    });

    await prisma.passwordResetToken.delete({
      where: {
        id: resetToken.id,
      },
    });

    return res.status(200).json({
      message: "Senha atualizada com sucesso.",
    });
  } catch (error) {
    console.error("Erro ao redefinir senha:", error);

    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
});

export default router;  