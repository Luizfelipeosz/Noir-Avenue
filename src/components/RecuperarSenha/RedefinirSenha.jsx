import {
  FaArrowLeft,
  FaCheck,
  FaEye,
  FaEyeSlash,
  FaLock,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

import logo from "../../assets/logo.png";
import "./RedefinirSenha.css";

const USERS_KEY = "noiravenue_users";
const RESET_EMAIL_KEY = "noiravenue_reset_email";
const SESSION_KEY = "noiravenue_session";

function RedefinirSenha() {
  const navigate = useNavigate();

  const [resetEmail, setResetEmail] = useState(null);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  useEffect(() => {
    const storedEmail = localStorage.getItem(RESET_EMAIL_KEY);

    if (!storedEmail) {
      toast.error("Recuperação inválida", {
        description:
          "Inicie novamente o processo de recuperação de senha.",
      });

      navigate("/recuperar-senha", {
        replace: true,
      });

      return;
    }

    setResetEmail(storedEmail);
  }, [navigate]);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!resetEmail) {
      toast.error("Sessão de recuperação inválida", {
        description:
          "Inicie novamente o processo de recuperação de senha.",
      });

      navigate("/recuperar-senha");
      return;
    }

    if (!password || !confirmPassword) {
      toast.warning("Campos obrigatórios", {
        description:
          "Informe e confirme sua nova senha.",
      });

      return;
    }

    if (password.length < 6) {
      toast.warning("Senha muito curta", {
        description:
          "Sua senha deve possuir pelo menos 6 caracteres.",
      });

      return;
    }

    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem", {
        description:
          "Confira os dois campos e tente novamente.",
      });

      return;
    }

    let users = [];

    try {
      users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];
    } catch {
      toast.error("Erro ao acessar os dados", {
        description:
          "Não foi possível atualizar sua senha. Tente novamente.",
      });

      return;
    }

    const normalizedResetEmail =
      resetEmail.trim().toLowerCase();

    const userExists = users.some(
      (user) =>
        user.email?.trim().toLowerCase() ===
        normalizedResetEmail
    );

    if (!userExists) {
      toast.error("Conta não encontrada", {
        description:
          "Não foi possível localizar essa conta.",
      });

      localStorage.removeItem(RESET_EMAIL_KEY);

      navigate("/recuperar-senha");
      return;
    }

    const updatedUsers = users.map((user) =>
      user.email?.trim().toLowerCase() ===
      normalizedResetEmail
        ? {
            ...user,
            password,
          }
        : user
    );

    localStorage.setItem(
      USERS_KEY,
      JSON.stringify(updatedUsers)
    );

    const storedSession =
      localStorage.getItem(SESSION_KEY);

    if (storedSession) {
      try {
        const session = JSON.parse(storedSession);

        if (
          session?.email?.trim().toLowerCase() ===
          normalizedResetEmail
        ) {
          localStorage.setItem(
            SESSION_KEY,
            JSON.stringify({
              ...session,
              password,
            })
          );
        }
      } catch {
        localStorage.removeItem(SESSION_KEY);
      }
    }

    localStorage.removeItem(RESET_EMAIL_KEY);

    toast.success("Senha atualizada", {
      description:
        "Sua senha foi alterada com sucesso. Você será direcionado para o login.",
    });

    setTimeout(() => {
      navigate("/", {
        replace: true,
      });
    }, 1200);
  };

  return (
    <main className="reset-page">
      <section className="reset-card">
        <button
          type="button"
          className="reset-back"
          onClick={() =>
            navigate("/recuperar-senha")
          }
        >
          <FaArrowLeft />
          <span>Voltar</span>
        </button>

        <img
          src={logo}
          alt="Noir Avenue"
          className="reset-logo"
        />

        <div className="reset-header">
          <div className="reset-icon">
            <FaLock />
          </div>

          <h1>Nova senha</h1>

          <p>
            Crie uma nova senha para voltar a
            acessar sua conta.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="reset-input">
            <input
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Nova senha"
              value={password}
              autoComplete="new-password"
              required
              onChange={(event) =>
                setPassword(event.target.value)
              }
            />

            <FaLock className="reset-lock-icon" />

            <button
              type="button"
              className="reset-password-toggle"
              onClick={() =>
                setShowPassword(
                  (value) => !value
                )
              }
              aria-label={
                showPassword
                  ? "Ocultar senha"
                  : "Mostrar senha"
              }
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>
          </div>

          <div className="reset-input">
            <input
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder="Confirmar nova senha"
              value={confirmPassword}
              autoComplete="new-password"
              required
              onChange={(event) =>
                setConfirmPassword(
                  event.target.value
                )
              }
            />

            <FaLock className="reset-lock-icon" />

            <button
              type="button"
              className="reset-password-toggle"
              onClick={() =>
                setShowConfirmPassword(
                  (value) => !value
                )
              }
              aria-label={
                showConfirmPassword
                  ? "Ocultar senha"
                  : "Mostrar senha"
              }
            >
              {showConfirmPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>
          </div>

          <div className="reset-requirement">
            <FaCheck />

            <span>
              A senha deve possuir pelo menos
              6 caracteres.
            </span>
          </div>

          <button
            type="submit"
            className="reset-submit"
          >
            Atualizar senha
          </button>
        </form>

        <div className="reset-footer">
          <span>Já possui acesso?</span>

          <Link to="/">
            Entrar na conta
          </Link>
        </div>
      </section>
    </main>
  );
}

export default RedefinirSenha;

