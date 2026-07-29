import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCrown,
  FaPen,
  FaSignOutAlt,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import "./Perfil.css";
import logo from "../../assets/logo.png";


function Perfil() {
  const navigate = useNavigate();

  const user =
    JSON.parse(localStorage.getItem("noiravenue_user")) || {};

  const initial = user.nome
    ? user.nome.charAt(0).toUpperCase()
    : "N";

  const handleLogout = () => {
    localStorage.removeItem("noiravenue_session");
    navigate("/");
  };

  return (
    <div className="profile-container">
      <img src={logo} alt="Noir Avenue" className="logo" />
      <h1 className="profile-title">
        <FaUser />
        Meu Perfil
      </h1>

      <div className="profile-card">
        <div className="profile-banner" />

        <div className="profile-content">
          <div className="profile-header">
            <div className="profile-avatar">{initial}</div>

            <div>
              <h2>{user.nome || "Usuário Noir"}</h2>

              <p className="profile-subtitle">
                Cliente Premium • Noir Avenue
              </p>
            </div>
          </div>

          <div className="profile-grid">
            <div className="profile-item">
              <span>
                <FaUser /> Nome
              </span>

              <p>{user.nome || "Não informado"}</p>
            </div>

            <div className="profile-item">
              <span>
                <FaEnvelope /> Email
              </span>

              <p>{user.email || "Não informado"}</p>
            </div>

            <div className="profile-item">
              <span>
                <FaPhone /> Telefone
              </span>

              <p>{user.telefone || "Não informado"}</p>
            </div>

            <div className="profile-item">
              <span>
                <FaMapMarkerAlt /> Endereço
              </span>

              <p>{user.endereco || "Não informado"}</p>
            </div>
          </div>

          <div className="profile-status">
            <FaCrown />

            <p>
              Status da conta:
              <strong> Membro Noir</strong>
            </p>
          </div>

          <div className="profile-actions">
            <button className="profile-button">
              <FaPen />
              Editar Perfil
            </button>

            <button
              className="logout-button"
              onClick={handleLogout}
            >
              <FaSignOutAlt />
              Sair
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Perfil;