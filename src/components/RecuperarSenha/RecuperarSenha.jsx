import { useState } from "react";
import { FaArrowLeft, FaEnvelope, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import logo from "../../assets/logo.png";
import "./RecuperarSenha.css";

const API_URL = "http://localhost:3001/api";

function RecuperarSenha() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const normalizedEmail = email.trim().toLowerCase();

    if (!normalizedEmail) {
      toast.warning("E-mail obrigatório", {
        description: "Informe o e-mail cadastrado na sua conta.",
      });

      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(
        `${API_URL}/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: normalizedEmail,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Não foi possível processar a solicitação."
        );
      }

      toast.success("Solicitação enviada", {
        description:
          "Se o e-mail estiver cadastrado, você receberá um link para redefinir sua senha.",
      });

      setEmail("");
    } catch (error) {
      console.error(
        "Erro ao solicitar recuperação de senha:",
        error
      );

      toast.error("Não foi possível continuar", {
        description:
          error.message ||
          "Verifique sua conexão e tente novamente.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="recovery-page">
      <section className="recovery-card">
        <button
          type="button"
          className="recovery-back"
          onClick={() => navigate("/")}
          disabled={isLoading}
        >
          <FaArrowLeft />
          <span>Voltar para o login</span>
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
            para receber o link de recuperação.
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
              disabled={isLoading}
              onChange={(event) =>
                setEmail(event.target.value)
              }
            />

            <FaEnvelope />
          </div>

          <button
            type="submit"
            className="recovery-submit"
            disabled={isLoading}
          >
            {isLoading
              ? "Enviando..."
              : "Enviar link de recuperação"}
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