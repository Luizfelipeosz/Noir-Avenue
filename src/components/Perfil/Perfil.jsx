import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCrown,
  FaPen,
  FaSignOutAlt,
  FaTrash,
} from "react-icons/fa";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import "./Perfil.css";
import logo from "../../assets/logo.png";

function Perfil() {
  const navigate = useNavigate();

  const user =
    JSON.parse(
      localStorage.getItem("noiravenue_session")
    ) || {};

  const [showModal, setShowModal] =
    useState(false);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [profile, setProfile] = useState(user);

  const [editName, setEditName] = useState(
    user.name || ""
  );

  const [editPhone, setEditPhone] = useState(
    user.telefone || ""
  );

  const [editAddress, setEditAddress] =
    useState(user.endereco || "");

  const initial = profile.name
    ? profile.name.charAt(0).toUpperCase()
    : "N";

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleSaveProfile = () => {
    const updatedUser = {
      ...profile,
      name: editName,
      telefone: editPhone,
      endereco: editAddress,
    };

    localStorage.setItem(
      "noiravenue_session",
      JSON.stringify(updatedUser)
    );

    const users =
      JSON.parse(
        localStorage.getItem(
          "noiravenue_users"
        )
      ) || [];

    const updatedUsers = users.map((u) =>
      u.email === updatedUser.email
        ? updatedUser
        : u
    );

    localStorage.setItem(
      "noiravenue_users",
      JSON.stringify(updatedUsers)
    );

    setProfile(updatedUser);

    setShowEditModal(false);
  };

  const handleDeleteAccount = () => {
    const users =
      JSON.parse(
        localStorage.getItem(
          "noiravenue_users"
        )
      ) || [];

    const updatedUsers = users.filter(
      (u) => u.email !== profile.email
    );

    localStorage.setItem(
      "noiravenue_users",
      JSON.stringify(updatedUsers)
    );

    localStorage.removeItem(
      "noiravenue_session"
    );

    navigate("/");
  };

  return (
    <div className="profile-container">
      <img
        src={logo}
        alt="Noir Avenue"
        className="logo"
      />

      <h1 className="profile-title">
        <FaUser />
        Meu Perfil
      </h1>

      <div className="profile-card">
        <div className="profile-banner" />

        <div className="profile-content">
          <div className="profile-header">
            <div className="profile-avatar">
              {initial}
            </div>

            <div>
              <h2>
                {profile.name ||
                  "Usuário Noir"}
              </h2>

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

              <p>
                {profile.name ||
                  "Não informado"}
              </p>
            </div>

            <div className="profile-item">
              <span>
                <FaEnvelope /> Email
              </span>

              <p>
                {profile.email ||
                  "Não informado"}
              </p>
            </div>

            <div className="profile-item">
              <span>
                <FaPhone /> Telefone
              </span>

              <p>
                {profile.telefone ||
                  "Não informado"}
              </p>
            </div>

            <div className="profile-item">
              <span>
                <FaMapMarkerAlt />
                {" "}Endereço
              </span>

              <p>
                {profile.endereco ||
                  "Não informado"}
              </p>
            </div>
          </div>

          <div className="profile-status">
            <FaCrown />

            <p>
              Status da conta:
              <strong>
                {" "}
                Membro Noir
              </strong>
            </p>
          </div>

          <div className="profile-actions">
            <button
              className="profile-button"
              onClick={() =>
                setShowEditModal(true)
              }
            >
              <FaPen />
              Editar Perfil
            </button>

            <button
              className="delete-button"
              onClick={() =>
                setShowModal(true)
              }
            >
              <FaTrash />
              Excluir Conta
            </button> 

            <button
              className="logout-button"
              onClick={handleBack}
            >
              <FaSignOutAlt />
              Voltar
            </button>
          </div>
        </div>
      </div>
            {showEditModal && (
        <div className="modal-overlay">
          <div className="edit-modal">
            <h2>Editar Perfil</h2>

            <p className="modal-description">
              Atualize suas informações pessoais.
            </p>

            <div className="edit-fields">
              <input
                type="text"
                placeholder="Nome"
                value={editName}
                onChange={(e) =>
                  setEditName(e.target.value)
                }
              />

              <input
                type="text"
                placeholder="Telefone"
                value={editPhone}
                onChange={(e) =>
                  setEditPhone(e.target.value)
                }
              />

              <input
                type="text"
                placeholder="Endereço"
                value={editAddress}
                onChange={(e) =>
                  setEditAddress(e.target.value)
                }
              />
            </div>

            <div className="modal-actions">
              <button
                onClick={() =>
                  setShowEditModal(false)
                }
              >
                Cancelar
              </button>

              <button
                className="confirm-delete"
                onClick={handleSaveProfile}
              >
                Salvar Alterações
              </button>
            </div>
          </div>
        </div>
      )}

      {showModal && (
        <div className="modal-overlay">
          <div className="delete-modal">
            <FaTrash
              size={45}
              style={{
                marginBottom: "20px",
              }}
            />

            <h2>Excluir Conta</h2>

            <p>
              Esta ação é permanente.
              <br />
              Todos os dados associados à sua
              conta serão removidos e não
              poderão ser recuperados.
            </p>

            <div className="modal-actions">
              <button
                onClick={() =>
                  setShowModal(false)
                }
              >
                Cancelar
              </button>

              <button
                className="confirm-delete"
                onClick={
                  handleDeleteAccount
                }
              >
                Excluir Permanentemente
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Perfil;