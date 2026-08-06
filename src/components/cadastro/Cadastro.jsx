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

const Cadastro = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] =
    useState("");

  const [showPassword, setShowPassword] =
    useState(false);

  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    const users =
      JSON.parse(
        localStorage.getItem(
          "noiravenue_users"
        )
      ) || [];

    if (!name.trim() || !email.trim()) {
      toast.warning("Campos obrigatórios", {
        description:
          "Preencha todos os campos.",
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
      toast.error(
        "As senhas não coincidem.",
        {
          description:
            "Verifique os campos de senha antes de continuar.",
        }
      );

      return;
    }

    const emailExists = users.some(
      (user) =>
        user.email.toLowerCase() ===
        email.trim().toLowerCase()
    );

    if (emailExists) {
      toast.error(
        "E-mail já cadastrado.",
        {
          description:
            "Utilize outro endereço de e-mail para continuar.",
        }
      );

      return;
    }

    const newUser = {
      id: crypto.randomUUID(),
      name: name.trim(),
      email: email.trim(),
      password,
      phone: "",
      address: "",
      createdAt:
        new Date().toISOString(),
    };

    users.push(newUser);

    localStorage.setItem(
      "noiravenue_users",
      JSON.stringify(users)
    );

    toast.success(
      "Conta criada com sucesso!",
      {
        description:
          "Você será redirecionado para a tela de login.",
      }
    );

    setTimeout(() => {
      navigate("/");
    }, 1500);
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
            onChange={(event) =>
              setName(event.target.value)
            }
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
            onChange={(event) =>
              setEmail(event.target.value)
            }
          />

          <FaEnvelope className="icon" />
        </div>

        {/* SENHA */}
        <div className="input-field">
          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Senha"
            value={password}
            required
            autoComplete="new-password"
            onChange={(event) =>
              setPassword(
                event.target.value
              )
            }
          />

          <FaLock className="icon password-lock-icon" />

          <button
            type="button"
            className="password-toggle"
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

        {/* CONFIRMAR SENHA */}
        <div className="input-field">
          <input
            type={
              showConfirmPassword
                ? "text"
                : "password"
            }
            placeholder="Confirmar senha"
            value={confirmPassword}
            required
            autoComplete="new-password"
            onChange={(event) =>
              setConfirmPassword(
                event.target.value
              )
            }
          />

          <FaLock className="icon password-lock-icon" />

          <button
            type="button"
            className="password-toggle"
            onClick={() =>
              setShowConfirmPassword(
                (value) => !value
              )
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

        {/* FEEDBACK */}
        <div className="password-feedback">
          {confirmPassword && (
            <small
              className={
                password ===
                confirmPassword
                  ? "password-match"
                  : "password-mismatch"
              }
            >
              {password ===
              confirmPassword
                ? "✓ As senhas coincidem."
                : "✕ As senhas não coincidem."}
            </small>
          )}
        </div>

        {/* TERMOS */}
        <div className="remember">
          <label>
            <input
              type="checkbox"
              required
            />

            <span>
              Eu aceito os Termos de Uso
              e Política de Privacidade.
            </span>
          </label>
        </div>

        <button
          type="submit"
          className="submit-button"
        >
          Criar conta
        </button>

        <div className="login-link">
          <p>
            Já possui uma conta?{" "}
            <Link to="/">
              Entrar
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Cadastro;

