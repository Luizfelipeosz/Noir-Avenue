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

const normalizeEmail = (value) =>
  value.trim().toLowerCase();

const isValidEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value);

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem(STORAGE_KEY);

    if (savedEmail) {
      setEmail(savedEmail);
      setRemember(true);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (isLoading) return;

    const normalizedEmail = normalizeEmail(email);

    if (!normalizedEmail || !password) {
      toast.warning("Preencha os campos obrigatórios", {
        description:
          "Informe seu e-mail e sua senha para acessar sua conta.",
      });

      return;
    }

    if (!isValidEmail(normalizedEmail)) {
      toast.warning("E-mail inválido", {
        description:
          "Verifique o endereço informado. Exemplo: nome@gmail.com.",
      });

      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: normalizedEmail,
          password,
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const errorCode = String(
          data.code || data.error || ""
        ).toUpperCase();

        const errorMessage = String(
          data.message || ""
        ).toLowerCase();

        const accountNotFound =
          response.status === 404 ||
          errorCode === "USER_NOT_FOUND" ||
          errorCode === "ACCOUNT_NOT_FOUND" ||
          errorMessage.includes("usuário não encontrado") ||
          errorMessage.includes("usuario nao encontrado") ||
          errorMessage.includes("conta não encontrada") ||
          errorMessage.includes("conta nao encontrada");

        const incorrectPassword =
          errorCode === "INVALID_PASSWORD" ||
          errorCode === "INCORRECT_PASSWORD" ||
          errorMessage.includes("senha incorreta") ||
          errorMessage.includes("senha inválida") ||
          errorMessage.includes("senha invalida");

        if (accountNotFound) {
          toast.error("Conta não encontrada", {
            description:
              "Não identificamos uma conta com este e-mail. Confira o endereço ou crie sua conta.",
            duration: 5000,
          });

          return;
        }

        if (incorrectPassword) {
          toast.error("Senha incorreta", {
            description:
              "A senha informada não confere. Tente novamente ou recupere sua senha.",
            duration: 5000,
          });

          return;
        }

        if (
          response.status === 400 &&
          (
            errorCode.includes("EMAIL") ||
            errorMessage.includes("formato") ||
            errorMessage.includes("e-mail inválido") ||
            errorMessage.includes("email invalido")
          )
        ) {
          toast.warning("Verifique seu e-mail", {
            description:
              "Informe um endereço válido, como nome@gmail.com.",
          });

          return;
        }

        if (response.status === 401) {
          toast.error("Não foi possível entrar", {
            description:
              "Confira seu e-mail e sua senha e tente novamente.",
            duration: 5000,
          });

          return;
        }

        toast.error("Não foi possível realizar o login", {
          description:
            "Ocorreu um problema ao acessar sua conta. Tente novamente em instantes.",
          duration: 5000,
        });

        return;
      }

      if (!data.user) {
        toast.error("Não foi possível concluir o login", {
          description:
            "O servidor não retornou os dados esperados. Tente novamente.",
        });

        return;
      }

      if (remember) {
        localStorage.setItem(STORAGE_KEY, normalizedEmail);
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

      toast.success("Login realizado com sucesso", {
        description: `Bem-vindo, ${data.user.name}!`,
        duration: 2000,
      });

      navigate("/dashboard");
    } catch (error) {
      console.error("Erro ao realizar login:", error);

      toast.error("Não foi possível conectar ao servidor", {
        description:
          "Verifique sua conexão e tente novamente em instantes.",
        duration: 5000,
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
            onChange={(event) =>
              setEmail(event.target.value)
            }
          />

          <FaUser className="icon" />
        </div>

        <div className="input-field">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Senha"
            value={password}
            required
            autoComplete="current-password"
            onChange={(event) =>
              setPassword(event.target.value)
            }
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

        <div className="recall-forget">
          <label>
            <input
              type="checkbox"
              checked={remember}
              onChange={(event) =>
                setRemember(event.target.checked)
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
          {isLoading ? "Entrando..." : "Entrar"}
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
