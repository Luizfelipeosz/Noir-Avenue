import type { Request, Response } from "express";

import {
  createPasswordResetToken,
  resetPassword,
  verifyPasswordResetToken,
} from "../services/passwordReset.service.js";

import { sendPasswordResetEmail } from "../services/email.services.js";

import {
  registerUser,
  loginUser,
  deleteUser,
} from "../services/auth.service.js";

import { env } from "../config/env.js";

export async function forgotPasswordController(
  req: Request,
  res: Response
) {
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

    console.log(
      "📧 Solicitação de recuperação:",
      normalizedEmail
    );

    const resetData =
      await createPasswordResetToken(normalizedEmail);

    if (!resetData) {
      console.log(
        "⚠️ Nenhum usuário encontrado:",
        normalizedEmail
      );

      return res.status(200).json({
        message:
          "Se o e-mail estiver cadastrado, um link de recuperação será enviado.",
      });
    }

    const resetUrl =
      `${env.frontendUrl}/redefinir-senha?token=` +
      encodeURIComponent(resetData.token);

    console.log("🔗 Reset URL:", resetUrl);
    console.log("📨 Chamando serviço de e-mail...");

    await sendPasswordResetEmail(
      resetData.user.email,
      resetData.user.name,
      resetUrl
    );

    console.log(
      "✅ Serviço de e-mail executado com sucesso."
    );

    return res.status(200).json({
      message:
        "Se o e-mail estiver cadastrado, um link de recuperação será enviado.",
    });
  } catch (error) {
    console.error(
      "❌ Erro ao solicitar recuperação de senha:",
      error
    );

    return res.status(500).json({
      message:
        "Não foi possível processar a solicitação. Tente novamente.",
    });
  }
}

export async function verifyResetTokenController(
  req: Request,
  res: Response
) {
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
      "❌ Erro ao verificar token:",
      error
    );

    return res.status(500).json({
      valid: false,
      message: "Erro interno do servidor.",
    });
  }
}

export async function resetPasswordController(
  req: Request,
  res: Response
) {
  try {
    const {
      token,
      password,
      confirmPassword,
    } = req.body;

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
      message: "Senha redefinida com sucesso.",
    });
  } catch (error) {
    console.error(
      "❌ Erro ao redefinir senha:",
      error
    );

    return res.status(500).json({
      message:
        "Não foi possível redefinir a senha. Tente novamente.",
    });
  }
}

export async function loginController(
  req: Request,
  res: Response
) {
  try {
    const { email, password } = req.body;

    if (
      !email ||
      typeof email !== "string" ||
      !password ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        message:
          "Informe seu e-mail e sua senha.",
      });
    }

    const user = await loginUser({
      email,
      password,
    });

    return res.status(200).json({
      message: "Login realizado com sucesso.",
      user,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "INVALID_CREDENTIALS"
    ) {
      return res.status(401).json({
        message: "E-mail ou senha inválidos.",
      });
    }

    console.error(
      "❌ Erro ao realizar login:",
      error
    );

    return res.status(500).json({
      message:
        "Não foi possível realizar o login. Tente novamente.",
    });
  }
}

export async function registerController(
  req: Request,
  res: Response
) {
  try {
    const {
      name,
      email,
      password,
    } = req.body;

    if (
      !name ||
      typeof name !== "string" ||
      !email ||
      typeof email !== "string" ||
      !password ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        message:
          "Preencha todos os campos obrigatórios.",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message:
          "A senha deve possuir pelo menos 8 caracteres.",
      });
    }

    const user = await registerUser({
      name,
      email,
      password,
    });

    return res.status(201).json({
      message: "Conta criada com sucesso.",
      user,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "EMAIL_ALREADY_EXISTS"
    ) {
      return res.status(409).json({
        message:
          "Este e-mail já está cadastrado.",
      });
    }

    console.error(
      "❌ Erro ao criar usuário:",
      error
    );

    return res.status(500).json({
      message:
        "Não foi possível criar a conta. Tente novamente.",
    });
  }
}

export async function deleteAccountController(
  req: Request,
  res: Response
) {
  try {
    const { email } = req.body;

    if (!email || typeof email !== "string") {
      return res.status(400).json({
        message:
          "E-mail da conta não informado.",
      });
    }

    await deleteUser(email);

    return res.status(200).json({
      message: "Conta removida com sucesso.",
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "USER_NOT_FOUND"
    ) {
      return res.status(404).json({
        message: "Conta não encontrada.",
      });
    }

    if (
      error instanceof Error &&
      error.message === "INVALID_EMAIL"
    ) {
      return res.status(400).json({
        message: "Informe um e-mail válido.",
      });
    }

    console.error(
      "❌ Erro ao excluir conta:",
      error
    );

    return res.status(500).json({
      message:
        "Não foi possível excluir a conta. Tente novamente.",
    });
  }
}