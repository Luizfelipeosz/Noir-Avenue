import {
  FaArrowLeft,
  FaCheck,
  FaEye,
  FaEyeSlash,
  FaLock,
} from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";

import logo from "../../assets/logo.png";
import "./RedefinirSenha.css";

const API_URL = "http://localhost:3001/api";

function RedefinirSenha() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [isValidatingToken, setIsValidatingToken] =
    useState(true);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [tokenIsValid, setTokenIsValid] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        toast.error("Link inválido", {
          description:
            "O link de recuperação não possui um token válido.",
        });

        navigate("/recuperar-senha", {
          replace: true,
        });

        return;
      }

      try {
        setIsValidatingToken(true);

        const response = await fetch(
          `${API_URL}/auth/verify-reset-token?token=${encodeURIComponent(
            token
          )}`
        );

        const data = await response.json();

        if (!response.ok || !data.valid) {
          throw new Error(
            data?.message ||
              "Este link de recuperação é inválido ou expirou."
          );
        }

        setTokenIsValid(true);
      } catch (error) {
        console.error(
          "Erro ao verificar token de recuperação:",
          error
        );

        toast.error("Link inválido ou expirado", {
          description:
            error.message ||
            "Solicite uma nova recuperação de senha.",
        });

        navigate("/recuperar-senha", {
          replace: true,
        });
      } finally {
        setIsValidatingToken(false);
      }
    };

    verifyToken();
  }, [navigate, token]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!token || !tokenIsValid) {
      toast.error("Recuperação inválida", {
        description:
          "Solicite novamente um link de recuperação.",
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

    if (password.length < 8) {
      toast.warning("Senha muito curta", {
        description:
          "Sua senha deve possuir pelo menos 8 caracteres.",
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

    try {
      setIsSubmitting(true);

      const response = await fetch(
        `${API_URL}/auth/reset-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            token,
            password,
            confirmPassword,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message ||
            "Não foi possível redefinir sua senha."
        );
      }

      toast.success("Senha atualizada", {
        description:
          "Sua senha foi alterada com sucesso. Você será direcionado para o login.",
      });

      setPassword("");
      setConfirmPassword("");
      setTokenIsValid(false);

      setTimeout(() => {
        navigate("/", {
          replace: true,
        });
      }, 1200);
    } catch (error) {
      console.error(
        "Erro ao redefinir senha:",
        error
      );

      toast.error("Não foi possível atualizar", {
        description:
          error.message ||
          "O link pode ter expirado. Solicite uma nova recuperação.",
      });

      if (
        error.message
          ?.toLowerCase()
          .includes("inválido")
      ) {
        setTokenIsValid(false);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isValidatingToken) {
    return (
      <main className="reset-page">
        <section className="reset-card">
          <img
            src={logo}
            alt="Noir Avenue"
            className="reset-logo"
          />

          <div className="reset-header">
            <div className="reset-icon">
              <FaLock />
            </div>

            <h1>Validando link</h1>

            <p>
              Estamos verificando seu link de
              recuperação. Aguarde um momento.
            </p>
          </div>
        </section>
      </main>
    );
  }

  if (!tokenIsValid) {
    return null;
  }

  return (
    <main className="reset-page">
      <section className="reset-card">
        <button
          type="button"
          className="reset-back"
          onClick={() =>
            navigate("/recuperar-senha")
          }
          disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              disabled={isSubmitting}
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
              8 caracteres.
            </span>
          </div>

          <button
            type="submit"
            className="reset-submit"
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Atualizando..."
              : "Atualizar senha"}
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