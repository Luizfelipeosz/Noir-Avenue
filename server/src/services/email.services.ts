import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

if (!process.env.RESEND_API_KEY) {
  console.warn(
    "⚠️ RESEND_API_KEY não configurada."
  );
}

export async function sendPasswordResetEmail(
  email: string,
  userName: string,
  resetUrl: string
) {
  console.log(
    "📨 Tentando enviar e-mail para:",
    email
  );

  if (!process.env.RESEND_API_KEY) {
    throw new Error(
      "RESEND_API_KEY não configurada."
    );
  }

  const { data, error } =
    await resend.emails.send({
      from: "Noir Avenue <onboarding@resend.dev>",
      to: [email],
      subject:
        "Redefinição de senha — Noir Avenue",
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
            Recebemos uma solicitação para redefinir
            a senha da sua conta na Noir Avenue.
          </p>

          <p>
            Clique no botão abaixo para criar uma
            nova senha:
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

          <p style="
            color: #666666;
            font-size: 14px;
          ">
            Este link é válido por 15 minutos.
          </p>

          <p style="
            color: #666666;
            font-size: 14px;
          ">
            Se você não solicitou a redefinição da
            sua senha, ignore este e-mail.
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

  if (error) {
    console.error(
      "❌ Erro retornado pelo Resend:",
      error
    );

    throw new Error(
      error.message ||
        "Não foi possível enviar o e-mail."
    );
  }

  console.log(
    "✅ E-mail enviado pelo Resend:",
    data
  );

  return data;
}