import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useState } from "react";

import logo from "../../assets/logo.png";
import "./Cadastro.css";

const Cadastro = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("As senhas não coincidem!");
      return;
    }

    alert(
      `Conta criada com sucesso!\n\nNome: ${name}\nE-mail: ${email}`
    );
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
            required
            onChange={(e) => setName(e.target.value)}
          />
          <FaUser className="icon" />
        </div>

        <div className="input-field">
          <input
            type="email"
            placeholder="E-mail"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <FaEnvelope className="icon" />
        </div>

        <div className="input-field">
          <input
            type="password"
            placeholder="Senha"
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className="icon" />
        </div>

        <div className="input-field">
          <input
            type="password"
            placeholder="Confirmar senha"
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
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