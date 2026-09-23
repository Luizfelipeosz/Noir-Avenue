import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import {
  useEffect,
  useState,
} from "react";
import { toast } from "sonner";

import logo from "../../assets/logo.png";
import "./Login.css";

const API_URL = "https://noir-avenue-api.onrender.com/api";

const STORAGE_KEY = "noiravenue_email";
const SESSION_KEY = "noiravenue_session";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedEmail =
      localStorage.getItem(STORAGE_KEY);

    if (savedEmail) {
      setEmail(savedEmail);
      setRemember(true);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.warning("Campos obrigatórios", {
        description:
          "Informe seu e-mail e sua senha para continuar.",
      });

      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(
        `${API_URL}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(
          data.message ||
            "Não foi possível realizar o login."
        );

        return;
      }

      if (remember) {
        localStorage.setItem(
          STORAGE_KEY,
          email.trim()
        );
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }

      const session = {
        ...data.user,
        loginAt: new Date().toISOString(),
      };

      localStorage.setItem(
        SESSION_KEY,
        JSON.stringify(session)
      );

      toast.success(
        `Bem-vindo, ${data.user.name}!`,
        {
          description:
            "Redirecionando para sua conta...",
        }
      );

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error) {
      console.error(
        "❌ Erro ao realizar login:",
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
    <div className="container">
      <form onSubmit={handleSubmit}>
        <img
          src={logo}
          alt="Noir Avenue"
          className="logo"
        />

        <h1>Bem-vindo</h1>

        <p className="subtitle">
          Entre para continuar com sua jornada.
        </p>

        <div className="input-field">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            required
            autoComplete="email"
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <FaUser className="icon" />
        </div>

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
            autoComplete="current-password"
            onChange={(e) =>
              setPassword(e.target.value)
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

        <div className="recall-forget">
          <label>
            <input
              type="checkbox"
              checked={remember}
              onChange={() =>
                setRemember(!remember)
              }
            />

            Lembrar de mim
          </label>

          <Link to="/recuperar-senha">
            Esqueceu sua senha?
          </Link>
        </div>

        <button
          type="submit"
          disabled={isLoading}
        >
          {isLoading
            ? "Entrando..."
            : "Entrar"}
        </button>

        <div className="signup-link">
          <p>
            Não tem uma conta?{" "}
            <Link to="/cadastro">
              Cadastre-se
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;