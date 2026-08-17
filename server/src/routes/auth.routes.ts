import { Router } from "express";
import crypto from "node:crypto";
import nodemailer from "nodemailer";
import bcrypt from "bcrypt";

import prisma from "../lib/prisma";

const router = Router();

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: Number(process.env.MAIL_PORT) || 465,
  secure: true,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (
      !name ||
      typeof name !== "string" ||
      !email ||
      typeof email !== "string" ||
      !password ||
      typeof password !== "string"
    ) {
      return res.status(400).json({
        message: "Preencha todos os campos obrigatórios.",
      });
    }

    const normalizedName = name.trim();
    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedName || !normalizedEmail) {
      return res.status(400).json({
        message: "Preencha todos os campos obrigatórios.",
      });
    }

    if (password.length < 8) {
      return res.status(400).json({
        message:
          "A senha deve possuir no mínimo 8 caracteres.",
      });
    }

    const existingUser = await prisma.user.findUnique({
      where: {
        email: normalizedEmail,
      },
    });

    if (existingUser) {
      return res.status(409).json({
        message: "E-mail já cadastrado.",
      });
    }

    const hashedPassword = await bcrypt.hash(
      password,
      12
    );

    const user = await prisma.user.create({
      data: {
        name: normalizedName,
        email: normalizedEmail,
        password: hashedPassword,
      },
    });

    return res.status(201).json({
      message: "Conta criada com sucesso.",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(
      "Erro ao criar usuário:",
      error
    );

    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
});

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

    // Remove tokens anteriores do usuário
    await prisma.passwordResetToken.deleteMany({
      where: {
        userId: user.id,
      },
    });

    // Gera um token criptograficamente seguro
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

    const frontendUrl =
      process.env.FRONTEND_URL ||
      "http://localhost:5173";

    const resetUrl =
      `${frontendUrl}/redefinir-senha?token=${token}`;

    await transporter.sendMail({
      from: `"Noir Avenue" <${process.env.MAIL_USER}>`,
      to: normalizedEmail,
      subject: "Redefinição de senha — Noir Avenue",
      html: `
        <!DOCTYPE html>
        <html lang="pt-BR">
          <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>Redefinição de senha</title>
          </head>

          <body style="
            margin: 0;
            padding: 0;
            background: #080808;
            font-family: Arial, Helvetica, sans-serif;
            color: #ffffff;
          ">
            <div style="
              max-width: 600px;
              margin: 40px auto;
              padding: 40px 30px;
              background: #111111;
              border: 1px solid #292929;
              border-radius: 16px;
            ">

              <div style="
                text-align: center;
                margin-bottom: 30px;
              ">
                <h1 style="
                  margin: 0;
                  color: #ffffff;
                  font-size: 28px;
                  letter-spacing: 1px;
                ">
                  NOIR AVENUE
                </h1>
              </div>

              <h2 style="
                margin-bottom: 16px;
                color: #ffffff;
              ">
                Redefinição de senha
              </h2>

              <p style="
                color: #b8b8b8;
                line-height: 1.7;
                font-size: 15px;
              ">
                Olá, ${user.name || "usuário"}.
              </p>

              <p style="
                color: #b8b8b8;
                line-height: 1.7;
                font-size: 15px;
              ">
                Recebemos uma solicitação para redefinir
                a senha da sua conta Noir Avenue.
              </p>

              <div style="
                text-align: center;
                margin: 35px 0;
              ">
                <a
                  href="${resetUrl}"
                  style="
                    display: inline-block;
                    padding: 14px 28px;
                    background: #ffffff;
                    color: #111111;
                    text-decoration: none;
                    border-radius: 10px;
                    font-weight: bold;
                    font-size: 15px;
                  "
                >
                  Redefinir minha senha
                </a>
              </div>

              <p style="
                color: #888888;
                line-height: 1.6;
                font-size: 13px;
              ">
                Este link é válido por apenas
                <strong>15 minutos</strong>.
              </p>

              <p style="
                color: #888888;
                line-height: 1.6;
                font-size: 13px;
              ">
                Se você não solicitou a redefinição
                da sua senha, ignore este e-mail.
              </p>

              <hr style="
                margin: 30px 0;
                border: 0;
                border-top: 1px solid #292929;
              " />

              <p style="
                margin: 0;
                text-align: center;
                color: #666666;
                font-size: 12px;
              ">
                Noir Avenue — Segurança da conta
              </p>

            </div>
          </body>
        </html>
      `,
    });

    return res.status(200).json({
      message:
        "Se o e-mail estiver cadastrado, um link de recuperação será enviado.",
    });
  } catch (error) {
    console.error(
      "Erro ao solicitar recuperação:",
      error
    );

    return res.status(500).json({
      message: "Erro interno do servidor.",
    });
  }
});

export default router;