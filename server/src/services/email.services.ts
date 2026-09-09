import nodemailer from "nodemailer";

const mailHost = process.env.MAIL_HOST;
const mailPort = Number(process.env.MAIL_PORT) || 465;
const mailUser = process.env.MAIL_USER;
const mailPassword = process.env.MAIL_PASSWORD;

if (!mailHost || !mailUser || !mailPassword) {
  console.warn(
    "⚠️ Configurações de e-mail não encontradas. " +
      "Verifique MAIL_HOST, MAIL_PORT, MAIL_USER e MAIL_PASSWORD no .env."
  );
}

const transporter = nodemailer.createTransport({
  host: mailHost,
  port: mailPort,
  secure: mailPort === 465,
  auth: {
    user: mailUser,
    pass: mailPassword,
  },
});

export async function sendPasswordResetEmail(
  email: string,
  userName: string,
  resetUrl: string
) {
  if (!mailUser || !mailPassword) {
    throw new Error("Credenciais de e-mail não configuradas.");
  }

  await transporter.sendMail({
    from: `"Noir Avenue" <${mailUser}>`,
    to: email,
    subject: "Redefinição de senha — Noir Avenue",
    html: `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 600px;
        margin: 40px auto;
        padding: 32px;
        background: #ffffff;
        color: #111111;
        border: 1px solid #e5e5e5;
        border-radius: 12px;
      ">
        <h2 style="margin-bottom: 24px;">
          Redefinição de senha
        </h2>

        <p>
          Olá, ${userName}.
        </p>

        <p>
          Recebemos uma solicitação para redefinir a senha
          da sua conta na Noir Avenue.
        </p>

        <p>
          Clique no botão abaixo para criar uma nova senha:
        </p>

        <a
          href="${resetUrl}"
          style="
            display: inline-block;
            margin: 20px 0;
            padding: 12px 24px;
            background: #111111;
            color: #ffffff;
            text-decoration: none;
            border-radius: 8px;
            font-weight: 600;
          "
        >
          Redefinir minha senha
        </a>

        <p style="color: #666666; font-size: 14px;">
          Este link é válido por 15 minutos.
        </p>

        <p style="color: #666666; font-size: 14px;">
          Se você não solicitou a redefinição da sua senha,
          ignore este e-mail.
        </p>

        <hr style="
          margin: 28px 0;
          border: none;
          border-top: 1px solid #eeeeee;
        " />

        <p style="
          color: #999999;
          font-size: 12px;
          text-align: center;
        ">
          Noir Avenue — Segurança da sua conta
        </p>
      </div>
    `,
  });
}