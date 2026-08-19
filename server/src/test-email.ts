import "dotenv/config";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

async function testEmail() {
  try {
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
    console.log(
      "EMAIL_PASSWORD configurado:",
      !!process.env.EMAIL_PASSWORD
    );

    await transporter.verify();

    console.log("✅ SMTP autenticado com sucesso.");

    await transporter.sendMail({
      from: `"Noir Avenue" <${process.env.EMAIL_USER}>`,
      to: "luizfelipefefe3@gmail.com",
      subject: "Teste Noir Avenue",
      text: "Teste de envio de e-mail.",
    });

    console.log("✅ E-mail enviado.");
  } catch (error) {
    console.error("❌ Erro ao enviar e-mail:");
    console.error(error);
  }
}

testEmail();