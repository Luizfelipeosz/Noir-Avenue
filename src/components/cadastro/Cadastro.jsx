import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import logo from "../../assets/logo.png";
import TermosDeUso from "../TermosdeUso/TermosDeUso";
import PoliticaDePrivacidade from "../PoliticaDePrivacidade/PoliticaDePrivacidade";

import "./Cadastro.css";

const API_URL =
  "https://noir-avenue-api.onrender.com/api";

const passwordRequirements = [
  {
    key: "minLength",
    label: "Entre 8 e 16 caracteres",
    test: (password) =>
      password.length >= 8 && password.length <= 16,
  },
  {
    key: "uppercase",
    label: "Pelo menos uma letra maiúscula",
    test: (password) => /[A-Z]/.test(password),
  },
  {
    key: "lowercase",
    label: "Pelo menos uma letra minúscula",
    test: (password) => /[a-z]/.test(password),
  },
  {
    key: "number",
    label: "Pelo menos um número",
    test: (password) => /\d/.test(password),
  },
  {
    key: "symbol",
    label: "Pelo menos um símbolo",
    test: (password) =>
      /[^A-Za-z0-9]/.test(password),
  },
];

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

  const [isLoading, setIsLoading] = useState(false);

  const [activeLegalDocument, setActiveLegalDocument] =
    useState(null);

  const [acceptedTerms, setAcceptedTerms] =
    useState(false);

  const passwordValidation =
    passwordRequirements.map((requirement) => ({
      ...requirement,
      valid: requirement.test(password),
    }));

  const isPasswordValid =
    password.length > 0 &&
    passwordValidation.every(
      (requirement) => requirement.valid
    );

  const passwordsMatch =
    confirmPassword.length > 0 &&
    password === confirmPassword;

  const passwordsMismatch =
    confirmPassword.length > 0 &&
    password !== confirmPassword;

  const isFormValid =
    name.trim() &&
    email.trim() &&
    isPasswordValid &&
    passwordsMatch &&
    acceptedTerms;

  const closeLegalDocument = () => {
    setActiveLegalDocument(null);
  };

  const openLegalDocument = (document) => {
    setActiveLegalDocument(document);
  };

  useEffect(() => {
    if (!activeLegalDocument) {
      document.body.style.overflow = "";
      return;
    }

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [activeLegalDocument]);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeLegalDocument();
      }
    };

    if (activeLegalDocument) {
      document.addEventListener(
        "keydown",
        handleEscape
      );
    }

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [activeLegalDocument]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim() || !email.trim()) {
      toast.warning("Campos obrigatórios", {
        description:
          "Preencha seu nome e e-mail para continuar.",
      });

      return;
    }

    if (!isPasswordValid) {
      toast.warning("Senha inválida", {
        description:
          "Sua senha precisa atender a todos os requisitos indicados.",
      });

      return;
    }

    if (!passwordsMatch) {
      toast.error("As senhas não coincidem.", {
        description:
          "Confira a confirmação da senha antes de continuar.",
      });

      return;
    }

    if (!acceptedTerms) {
      toast.warning("Aceite os termos", {
        description:
          "Você precisa aceitar os Termos de Uso e a Política de Privacidade.",
      });

      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(
        `${API_URL}/auth/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: name.trim(),
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(
          data.message ||
            "Não foi possível criar a conta."
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
      console.error(
        "❌ Erro ao realizar cadastro:",
        error
      );

      toast.error(
        "Não foi possível conectar ao servidor.",
        {
          description:
            "Verifique se a API do Noir Avenue está funcionando.",
        }
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <main className="container">
        <form
          onSubmit={handleSubmit}
          noValidate
          aria-labelledby="cadastro-title"
        >
          <img
            src={logo}
            alt="Noir Avenue"
            className="logo"
          />

          <h1 id="cadastro-title">
            Criar conta
          </h1>

          <p className="subtitle">
            Faça parte da Noir Avenue.
          </p>

          {/* NOME */}
          <div className="input-field">
            <label
              htmlFor="name"
              className="sr-only"
            >
              Nome completo
            </label>

            <input
              id="name"
              name="name"
              type="text"
              placeholder="Nome completo"
              value={name}
              required
              autoComplete="name"
              maxLength={100}
              aria-required="true"
              onChange={(event) =>
                setName(event.target.value)
              }
            />

            <FaUser
              className="icon"
              aria-hidden="true"
            />
          </div>

          {/* E-MAIL */}
          <div className="input-field">
            <label
              htmlFor="email"
              className="sr-only"
            >
              E-mail
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="E-mail"
              value={email}
              required
              autoComplete="email"
              maxLength={254}
              aria-required="true"
              onChange={(event) =>
                setEmail(event.target.value)
              }
            />

            <FaEnvelope
              className="icon"
              aria-hidden="true"
            />
          </div>

          {/* SENHA */}
          <div className="input-field">
            <label
              htmlFor="password"
              className="sr-only"
            >
              Senha
            </label>

            <input
              id="password"
              name="password"
              type={
                showPassword
                  ? "text"
                  : "password"
              }
              placeholder="Senha"
              value={password}
              required
              minLength={8}
              maxLength={16}
              autoComplete="new-password"
              aria-required="true"
              aria-describedby="password-requirements"
              aria-invalid={
                password.length > 0 &&
                !isPasswordValid
              }
              onChange={(event) =>
                setPassword(event.target.value)
              }
            />

            <FaLock
              className="icon password-lock-icon"
              aria-hidden="true"
            />

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
              aria-pressed={showPassword}
            >
              {showPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>
          </div>

          {/* REQUISITOS DA SENHA */}
          <div
            id="password-requirements"
            className="password-requirements"
            aria-live="polite"
          >
            <p className="requirements-title">
              Sua senha deve conter:
            </p>

            <ul>
              {passwordValidation.map(
                (requirement) => (
                  <li
                    key={requirement.key}
                    className={
                      requirement.valid
                        ? "requirement valid"
                        : "requirement"
                    }
                  >
                    {requirement.valid ? (
                      <FaCheck aria-hidden="true" />
                    ) : (
                      <FaTimes aria-hidden="true" />
                    )}

                    <span>
                      {requirement.label}
                    </span>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* CONFIRMAÇÃO DA SENHA */}
          <div className="input-field confirm-password-field">
            <label
              htmlFor="confirm-password"
              className="sr-only"
            >
              Confirmar senha
            </label>

            <input
              id="confirm-password"
              name="confirmPassword"
              type={
                showConfirmPassword
                  ? "text"
                  : "password"
              }
              placeholder="Confirmar senha"
              value={confirmPassword}
              required
              minLength={8}
              maxLength={16}
              autoComplete="new-password"
              aria-required="true"
              aria-describedby="password-match"
              aria-invalid={passwordsMismatch}
              onChange={(event) =>
                setConfirmPassword(
                  event.target.value
                )
              }
            />

            <FaLock
              className="icon password-lock-icon"
              aria-hidden="true"
            />

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
              aria-pressed={
                showConfirmPassword
              }
            >
              {showConfirmPassword ? (
                <FaEyeSlash />
              ) : (
                <FaEye />
              )}
            </button>
          </div>

          {/* FEEDBACK DE CONFIRMAÇÃO */}
          <div
            id="password-match"
            className={`password-feedback ${
              passwordsMatch
                ? "match"
                : passwordsMismatch
                  ? "mismatch"
                  : ""
            }`}
            aria-live="polite"
          >
            {passwordsMatch && (
              <>
                <FaCheck aria-hidden="true" />
                <span>
                  As senhas coincidem.
                </span>
              </>
            )}

            {passwordsMismatch && (
              <>
                <FaTimes aria-hidden="true" />
                <span>
                  As senhas ainda não coincidem.
                </span>
              </>
            )}
          </div>

          {/* TERMOS */}
          <div className="remember">
            <label htmlFor="terms">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                required
                checked={acceptedTerms}
                aria-required="true"
                onChange={(event) =>
                  setAcceptedTerms(
                    event.target.checked
                  )
                }
              />

              <span>
                Eu aceito os{" "}
                <button
                  type="button"
                  className="legal-inline-button"
                  onClick={() =>
                    openLegalDocument("terms")
                  }
                >
                  Termos de Uso
                </button>{" "}
                e a{" "}
                <button
                  type="button"
                  className="legal-inline-button"
                  onClick={() =>
                    openLegalDocument(
                      "privacy"
                    )
                  }
                >
                  Política de Privacidade
                </button>
                .
              </span>
            </label>
          </div>

          {/* BOTÃO */}
          <button
            type="submit"
            className="submit-button"
            disabled={
              isLoading || !isFormValid
            }
            aria-disabled={
              isLoading || !isFormValid
            }
          >
            {isLoading
              ? "Criando conta..."
              : "Criar conta"}
          </button>

          <div className="login-link">
            <p>
              Já possui uma conta?{" "}
              <Link to="/">Entrar</Link>
            </p>
          </div>
        </form>
      </main>

      {/* MODAL DE DOCUMENTOS */}
      {activeLegalDocument && (
        <div
          className="legal-modal-overlay"
          role="presentation"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              closeLegalDocument();
            }
          }}
        >
          <div
            className="legal-modal"
            role="dialog"
            aria-modal="true"
            aria-label={
              activeLegalDocument === "terms"
                ? "Termos de Uso"
                : "Política de Privacidade"
            }
          >
            <button
              type="button"
              className="legal-modal-close"
              onClick={closeLegalDocument}
              aria-label="Fechar documento"
            >
              <FaTimes />
            </button>

            <div className="legal-modal-content">
              {activeLegalDocument === "terms" ? (
                <TermosDeUso
                  isModal
                  onClose={closeLegalDocument}
                  onOpenPrivacy={() =>
                    openLegalDocument(
                      "privacy"
                    )
                  }
                />
              ) : (
                <PoliticaDePrivacidade
                  isModal
                  onClose={closeLegalDocument}
                  onOpenTerms={() =>
                    openLegalDocument("terms")
                  }
                />
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cadastro;