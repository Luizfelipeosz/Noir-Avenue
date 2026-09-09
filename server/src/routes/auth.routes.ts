import { Router } from "express";

import {
  createPasswordResetToken,
  resetPassword,
  verifyPasswordResetToken,
} from "../services/passwordReset.service";

import {
  sendPasswordResetEmail,
} from "../services/email.services";

const router = Router();

/**
 * POST /api/auth/forgot-password
 *
 * Solicita uma redefinição de senha.
 */
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || typeof email !== "string") {
      return res.status(400).json({
        message: "Informe um e-mail válido.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      return res.status(400).json({
        message: "Informe um e-mail válido.",
      });
    }

    const resetData = await createPasswordResetToken(
      normalizedEmail
    );

    /*
     * Por segurança, não revelamos se o e-mail existe
     * ou não no banco de dados.
     */
    if (!resetData) {
      return res.status(200).json({
        message:
          "Se o e-mail estiver cadastrado, um link de recuperação será enviado.",
      });
    }

    const frontendUrl =
      process.env.FRONTEND_URL ||
      "http://localhost:5173";

    const resetUrl =
      `${frontendUrl}/redefinir-senha?token=${encodeURIComponent(
        resetData.token
      )}`;

    await sendPasswordResetEmail(
      resetData.user.email,
      resetData.user.name,
      resetUrl
    );

    return res.status(200).json({
      message:
        "Se o e-mail estiver cadastrado, um link de recuperação será enviado.",
    });
  } catch (error) {
    console.error(
      "Erro ao solicitar recuperação de senha:",
      error
    );

    return res.status(500).json({
      message:
        "Não foi possível processar a solicitação. Tente novamente.",
    });
  }
});

/**
 * GET /api/auth/verify-reset-token?token=...
 *
 * Verifica se o token de recuperação ainda é válido.
 */
router.get("/verify-reset-token", async (req, res) => {
  try {
    const { token } = req.query;

    if (!token || typeof token !== "string") {
      return res.status(400).json({
        valid: false,
        message: "Token de recuperação não informado.",
      });
    }

    const resetToken =
      await verifyPasswordResetToken(token);

    if (!resetToken) {
      return res.status(400).json({
        valid: false,
        message:
          "Este link de recuperação é inválido ou expirou.",
      });
    }

    return res.status(200).json({
      valid: true,
      message: "Token válido.",
      user: {
        name: resetToken.user.name,
        email: resetToken.user.email,
      },
    });
  } catch (error) {
    console.error(
      "Erro ao verificar token de recuperação:",
      error
    );

    return res.status(500).json({
      valid: false,
      message: "Erro interno do servidor.",
    });
  }
});

/**
 * POST /api/auth/reset-password
 *
 * Define uma nova senha usando um token válido.
 */
router.post("/reset-password", async (req, res) => {
  try {
    const { token, password, confirmPassword } = req.body;

    if (!token || typeof token !== "string") {
      return res.status(400).json({
        message:
          "Token de recuperação não informado.",
      });
    }

    if (!password || typeof password !== "string") {
      return res.status(400).json({
        message: "Informe uma nova senha.",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message:
          "A senha deve possuir pelo menos 8 caracteres.",
      });
    }

    if (
      confirmPassword !== undefined &&
      password !== confirmPassword
    ) {
      return res.status(400).json({
        message: "As senhas não coincidem.",
      });
    }

    const result = await resetPassword(
      token,
      password
    );

    if (!result.success) {
      return res.status(400).json({
        message:
          "Este link de recuperação é inválido ou expirou.",
      });
    }

    return res.status(200).json({
      message:
        "Senha redefinida com sucesso.",
    });
  } catch (error) {
    console.error(
      "Erro ao redefinir senha:",
      error
    );

    return res.status(500).json({
      message:
        "Não foi possível redefinir a senha. Tente novamente.",
    });
  }
});

export default router;