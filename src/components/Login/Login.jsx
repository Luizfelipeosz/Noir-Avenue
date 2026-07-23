import { FaUser, FaLock } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import logo from "../../assets/logo.png";
import "./Login.css";

const STORAGE_KEY = "noiravenue_email";

const Login = () => {
  const navigate = useNavigate();

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

    if (!email.trim() || !password.trim()) {
      toast.warning("Campos obrigatórios", {
        description:
          "Informe seu e-mail e sua senha para continuar.",
      });

      return;
    }

    const users =
      JSON.parse(localStorage.getItem("noiravenue_users")) || [];

    const user = users.find(
      (user) =>
        user.email === email &&
        user.password === password
    );

    if (!user) {
      toast.error("Credenciais inválidas.", {
        description:
          "Verifique seu e-mail e senha e tente novamente.",
      });

      return;
    }

    if (remember) {
      localStorage.setItem(STORAGE_KEY, email);
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }

    localStorage.setItem(
      "noiravenue_session",
      JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email,
      })
    );

    toast.success(`Bem-vindo, ${user.name}!`, {
      description:
        "Redirecionando para sua conta...",
    });

    setTimeout(() => {
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Noir Avenue" className="logo" />

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