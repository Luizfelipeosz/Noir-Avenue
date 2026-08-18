import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function sendPasswordResetEmail(
  email: string,
  resetUrl: string
) {
  await transporter.sendMail({
    from: `"Noir Avenue" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Redefinição de senha — Noir Avenue",
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto;">
        <h2>Redefinição de senha</h2>

        <p>Recebemos uma solicitação para redefinir a senha da sua conta Noir Avenue.</p>

        <p>O link abaixo é válido por 15 minutos:</p>

        <a
          href="${resetUrl}"
          style="
            display: inline-block;
            padding: 12px 20px;
            background: #111;
            color: #fff;
            text-decoration: none;
            border-radius: 8px;
          "
        >
          Redefinir minha senha
        </a>

        <p style="margin-top: 20px;">
          Se você não solicitou essa alteração, ignore este e-mail.
        </p>
      </div>
    `,
  });
}