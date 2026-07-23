import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
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
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const users =
      JSON.parse(localStorage.getItem("noiravenue_users")) || [];

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
      toast.error("As senhas não coincidem.");
      return;
    }

    const emailExists = users.some(
      (user) => user.email === email
    );

    if (emailExists) {
      toast.error("E-mail já cadastrado.", {
        description:
          "Utilize outro endereço de e-mail para continuar.",
      });

      return;
    }

    const newUser = {
      id: crypto.randomUUID(),
      name,
      email,
      password,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);

    localStorage.setItem(
      "noiravenue_users",
      JSON.stringify(users)
    );

    toast.success("Conta criada com sucesso!", {
      description:
        "Você será redirecionado para a tela de login.",
    });

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="Noir Avenue" className="logo" />

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
            onChange={(e) => setName(e.target.value)}
          />
          <FaUser className="icon" />
        </div>

        <div className="input-field">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <FaEnvelope className="icon" />
        </div>

        <div className="input-field">
          <input
            type="password"
            placeholder="Senha"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className="icon" />
        </div>

        <div className="input-field">
          <input
            type="password"
            placeholder="Confirmar senha"
            value={confirmPassword}
            required
            onChange={(e) =>
              setConfirmPassword(e.target.value)
            }
          />
          <FaLock className="icon" />
        </div>

        <div className="remember">
          <label>
            <input type="checkbox" required />
            Aceito os Termos de Uso e Política de Privacidade.
          </label>
        </div>

        <button type="submit">
          Criar conta
        </button>

        <div className="login-link">
          <p>
            Já possui uma conta? <Link to="/">Entrar</Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Cadastro;