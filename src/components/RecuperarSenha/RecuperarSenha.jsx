import { useState } from "react";
import { FaArrowLeft, FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import logo from "../../assets/logo.png";
import "./RecuperarSenha.css";

const USERS_KEY = "noiravenue_users";
const RESET_EMAIL_KEY = "noiravenue_reset_email";

function RecuperarSenha() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      toast.warning("E-mail obrigatório", {
        description: "Informe o e-mail cadastrado na sua conta.",
      });

      return;
    }

    const users =
      JSON.parse(localStorage.getItem(USERS_KEY)) || [];

    const user = users.find(
      (item) => item.email?.toLowerCase() === normalizedEmail
    );

    if (!user) {
      toast.error("E-mail não encontrado", {
        description:
          "Não encontramos uma conta associada a este e-mail.",
      });

      return;
    }

    localStorage.setItem(
      RESET_EMAIL_KEY,
      normalizedEmail
    );

    toast.success("E-mail confirmado", {
      description:
        "Você já pode criar uma nova senha para sua conta.",
    });

    navigate("/redefinir-senha");
  };

  return (
    <main className="recovery-page">
      <section className="recovery-card">
        <button
          type="button"
          className="recovery-back"
          onClick={() => navigate("/")}
        >
          <FaArrowLeft />
          Voltar para o login
        </button>

        <img
          src={logo}
          alt="Noir Avenue"
          className="recovery-logo"
        />

        <div className="recovery-header">
          <div className="recovery-icon">
            <FaLock />
          </div>

          <h1>Recuperar senha</h1>

          <p>
            Informe o e-mail associado à sua conta
            para continuar.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="recovery-input">
            <input
              type="email"
              placeholder="E-mail"
              value={email}
              autoComplete="email"
              required
              onChange={(event) =>
                setEmail(event.target.value)
              }
            />

            <FaEnvelope />
          </div>

          <button
            type="submit"
            className="recovery-submit"
          >
            Continuar
          </button>
        </form>

        <div className="recovery-footer">
          <span>Lembrou sua senha?</span>

          <Link to="/">
            Voltar para o login
          </Link>
        </div>
      </section>
    </main>
  );
}

export default RecuperarSenha;

