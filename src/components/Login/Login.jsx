import { FaUser, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import logo from "../../assets/logo.png";
import "./Login.css";

const STORAGE_KEY = "noiravenue_email";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem(STORAGE_KEY);

    if (savedEmail) {
      setEmail(savedEmail);
      setRemember(true);
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    // Validação extra
    if (!email.trim() || !password.trim()) {
      toast.warning("Campos obrigatórios", {
        description: "Informe seu e-mail e sua senha para continuar.",
      });

      return;
    }

    // Salva ou remove o e-mail do usuário
    if (remember) {
      localStorage.setItem(STORAGE_KEY, email);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }

    // Futuramente será substituído pela chamada da API
    toast.success("Login realizado com sucesso!", {
      description: "Bem-vindo à Noir Avenue.",
    });

    console.log({
      email,
      password,
    });
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
            onChange={(e) => setEmail(e.target.value)}
          />

          <FaUser className="icon" />
        </div>

        <div className="input-field">
          <input
            type="password"
            placeholder="Senha"
            value={password}
            required
            autoComplete="current-password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <FaLock className="icon" />
        </div>

        <div className="recall-forget">
          <label>
            <input
              type="checkbox"
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
            Lembrar de mim
          </label>

          <a href="#">
            Esqueceu sua senha?
          </a>
        </div>

        <button type="submit">
          Entrar
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