import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

import logo from "../../assets/logo.png";
import "./Cadastro.css";

const API_URL = "https://noir-avenue-api.onrender.com/api";

const Cadastro = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim() || !email.trim()) {
      toast.warning("Campos obrigatórios", {
        description: "Preencha todos os campos.",
      });

      return;
    }

    if (password.length < 8) {
      toast.warning("Senha inválida", {
        description:
          "A senha deve possuir no mínimo 8 caracteres.",
      });

      return;
    }

    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem.", {
        description:
          "Verifique os campos de senha antes de continuar.",
      });

      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(`${API_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(
          data.message || "Não foi possível criar a conta."
        );

        return;
      }

      toast.success("Conta criada com sucesso!", {
        description:
          "Você será redirecionado para a tela de login.",
      });

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      console.error("❌ Erro ao realizar cadastro:", error);

      toast.error("Não foi possível conectar ao servidor.", {
        description:
          "Verifique se a API do Noir Avenue está funcionando.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <img
          src={logo}
          alt="Noir Avenue"
          className="logo"
        />

        <h1>Criar conta</h1>

        <p className="subtitle">
          Faça parte da Noir Avenue.
        </p>

        <div className="input-field">
          <input
            type="text"
            placeholder="Nome completo"
            value={name}
            required
            autoComplete="name"
            onChange={(event) => setName(event.target.value)}
          />

          <FaUser className="icon" />
        </div>

        <div className="input-field">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            required
            autoComplete="email"
            onChange={(event) => setEmail(event.target.value)}
          />

          <FaEnvelope className="icon" />
        </div>

        <div className="input-field">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            value={password}
            required
            autoComplete="new-password"
            onChange={(event) => setPassword(event.target.value)}
          />

          <FaLock className="icon password-lock-icon" />

          <button
            type="button"
            className="password-toggle"
            onClick={() =>
              setShowPassword((value) => !value)
            }
            aria-label={
              showPassword
                ? "Ocultar senha"
                : "Mostrar senha"
            }
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <div className="input-field">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirmar senha"
            value={confirmPassword}
            required
            autoComplete="new-password"
            onChange={(event) =>
              setConfirmPassword(event.target.value)
            }
          />

          <FaLock className="icon password-lock-icon" />

          <button
            type="button"
            className="password-toggle"
            onClick={() =>
              setShowConfirmPassword((value) => !value)
            }
            aria-label={
              showConfirmPassword
                ? "Ocultar confirmação da senha"
                : "Mostrar confirmação da senha"
            }
          >
            {showConfirmPassword ? (
              <FaEyeSlash />
            ) : (
              <FaEye />
            )}
          </button>
        </div>

        <div className="password-feedback">
          {confirmPassword && (
            <small
              className={
                password === confirmPassword
                  ? "password-match"
                  : "password-mismatch"
              }
            >
              {password === confirmPassword
                ? "✓ As senhas coincidem."
                : "✕ As senhas não coincidem."}
            </small>
          )}
        </div>

        <div className="remember">
          <label>
            <input type="checkbox" required />

            <span>
              Eu aceito os Termos de Uso e Política de
              Privacidade.
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="submit-button"
          disabled={isLoading}
        >
          {isLoading ? "Criando conta..." : "Criar conta"}
        </button>

        <div className="login-link">
          <p>
            Já possui uma conta?{" "}
            <Link to="/">Entrar</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Cadastro;
