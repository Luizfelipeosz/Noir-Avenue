import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCrown,
  FaPen,
  FaSignOutAlt,
  FaTrash,
  FaShieldAlt,
  FaCheckCircle,
  FaTimes,
  FaChevronRight,
} from "react-icons/fa";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import "./Perfil.css";
import logo from "../../assets/logo.png";

const SESSION_KEY = "noiravenue_session";
const USERS_KEY = "noiravenue_users";

function Perfil() {
  const navigate = useNavigate();

  const getSessionUser = () => {
    try {
      return (
        JSON.parse(
          localStorage.getItem(SESSION_KEY)
        ) || {}
      );
    } catch {
      return {};
    }
  };

  const user = getSessionUser();

  const [profile, setProfile] = useState(user);

  const [showEditModal, setShowEditModal] =
    useState(false);

  const [showDeleteModal, setShowDeleteModal] =
    useState(false);

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

  const displayName =
    profile.name?.trim() || "Usuário Noir";

  const displayEmail =
    profile.email || "Não informado";

  const displayPhone =
    profile.telefone?.trim() ||
    "Não informado";

  const displayAddress =
    profile.endereco?.trim() ||
    "Não informado";

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleOpenEdit = () => {
    setEditName(profile.name || "");
    setEditPhone(profile.telefone || "");
    setEditAddress(profile.endereco || "");

    setShowEditModal(true);
  };

  const handleSaveProfile = () => {
    const normalizedName = editName.trim();
    const normalizedPhone = editPhone.trim();
    const normalizedAddress =
      editAddress.trim();

    if (!normalizedName) {
      toast.warning("Nome obrigatório", {
        description:
          "Informe seu nome para salvar as alterações.",
      });

      return;
    }

    const updatedUser = {
      ...profile,
      name: normalizedName,
      telefone: normalizedPhone,
      endereco: normalizedAddress,
    };

    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify(updatedUser)
    );

    const users =
      JSON.parse(
        localStorage.getItem(USERS_KEY)
      ) || [];

    const updatedUsers = users.map((userItem) =>
      userItem.email?.toLowerCase() ===
      updatedUser.email?.toLowerCase()
        ? {
            ...userItem,
            ...updatedUser,
          }
        : userItem
    );

    localStorage.setItem(
      USERS_KEY,
      JSON.stringify(updatedUsers)
    );

    setProfile(updatedUser);
    setShowEditModal(false);

    toast.success("Perfil atualizado", {
      description:
        "Suas informações foram salvas com sucesso.",
    });
  };

  const handleDeleteAccount = () => {
    const users =
      JSON.parse(
        localStorage.getItem(USERS_KEY)
      ) || [];

    const updatedUsers = users.filter(
      (userItem) =>
        userItem.email?.toLowerCase() !==
        profile.email?.toLowerCase()
    );

    localStorage.setItem(
      USERS_KEY,
      JSON.stringify(updatedUsers)
    );

    localStorage.removeItem(SESSION_KEY);

    setShowDeleteModal(false);

    toast.success("Conta removida", {
      description:
        "Sua conta foi removida com sucesso.",
    });

    setTimeout(() => {
      navigate("/");
    }, 800);
  };

  return (
    <div className="profile-page">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="profile-topbar">
        <img
          src={logo}
          alt="Noir Avenue"
          className="profile-logo"
        />

        <button
          type="button"
          className="profile-back-button"
          onClick={handleBack}
        >
          <span>Dashboard</span>
          <FaChevronRight />
        </button>
      </header>

      <main className="profile-main">
        {/* ===================================================
            INTRO
        =================================================== */}

        <section className="profile-intro">
          <div>
            <span className="profile-eyebrow">
              CONTA
            </span>

            <h1>Meu Perfil</h1>

            <p>
              Gerencie suas informações pessoais,
              preferências e segurança da conta.
            </p>
          </div>
        </section>

        {/* ===================================================
            PROFILE HERO
        =================================================== */}

        <section className="profile-hero">
          <div className="profile-hero-background" />

          <div className="profile-hero-content">
            <div className="profile-identity">
              <div
                className="profile-avatar"
                aria-label={`Avatar de ${displayName}`}
              >
                {initial}
              </div>

              <div className="profile-identity-info">
                <div className="profile-name-row">
                  <h2>{displayName}</h2>

                  <span className="premium-badge">
                    <FaCrown />
                    Noir Member
                  </span>
                </div>

                <p>
                  <FaEnvelope />
                  {displayEmail}
                </p>
              </div>
            </div>

            <button
              type="button"
              className="profile-edit-primary"
              onClick={handleOpenEdit}
            >
              <FaPen />
              Editar perfil
            </button>
          </div>
        </section>

        {/* ===================================================
            ACCOUNT OVERVIEW
        =================================================== */}

        <section className="profile-overview">
          <div className="overview-card">
            <div className="overview-icon">
              <FaCrown />
            </div>

            <div>
              <span>Status da conta</span>
              <strong>Membro Noir</strong>
            </div>
          </div>

          <div className="overview-card">
            <div className="overview-icon">
              <FaShieldAlt />
            </div>

            <div>
              <span>Segurança</span>
              <strong>Conta protegida</strong>
            </div>
          </div>

          <div className="overview-card">
            <div className="overview-icon">
              <FaCheckCircle />
            </div>

            <div>
              <span>Perfil</span>
              <strong>
                {profile.name &&
                profile.telefone &&
                profile.endereco
                  ? "Completo"
                  : "Em atualização"}
              </strong>
            </div>
          </div>
        </section>

        {/* ===================================================
            PERSONAL INFORMATION
        =================================================== */}

        <section className="profile-section">
          <div className="section-heading">
            <div>
              <span className="section-eyebrow">
                INFORMAÇÕES
              </span>

              <h2>Dados pessoais</h2>

              <p>
                Informações utilizadas para
                identificar e personalizar sua
                experiência.
              </p>
            </div>

            <button
              type="button"
              className="section-edit-button"
              onClick={handleOpenEdit}
            >
              <FaPen />
              Editar
            </button>
          </div>

          <div className="profile-info-grid">
            <article className="info-card">
              <div className="info-card-icon">
                <FaUser />
              </div>

              <div className="info-card-content">
                <span>Nome completo</span>
                <strong>{displayName}</strong>
              </div>
            </article>

            <article className="info-card">
              <div className="info-card-icon">
                <FaEnvelope />
              </div>

              <div className="info-card-content">
                <span>E-mail</span>
                <strong>{displayEmail}</strong>
              </div>
            </article>

            <article className="info-card">
              <div className="info-card-icon">
                <FaPhone />
              </div>

              <div className="info-card-content">
                <span>Telefone</span>
                <strong>{displayPhone}</strong>
              </div>
            </article>

            <article className="info-card">
              <div className="info-card-icon">
                <FaMapMarkerAlt />
              </div>

              <div className="info-card-content">
                <span>Endereço</span>
                <strong>{displayAddress}</strong>
              </div>
            </article>
          </div>
        </section>

        {/* ===================================================
            SECURITY
        =================================================== */}

        <section className="profile-section">
          <div className="section-heading">
            <div>
              <span className="section-eyebrow">
                SEGURANÇA
              </span>

              <h2>Acesso e segurança</h2>

              <p>
                Mantenha sua conta protegida e
                controle suas credenciais de acesso.
              </p>
            </div>
          </div>

          <div className="security-card">
            <div className="security-icon">
              <FaShieldAlt />
            </div>

            <div className="security-content">
              <div>
                <h3>Senha da conta</h3>

                <p>
                  Sua senha é armazenada de forma
                  protegida e pode ser atualizada
                  sempre que necessário.
                </p>
              </div>

              <button
                type="button"
                className="security-action"
                onClick={() =>
                  navigate("/recuperar-senha")
                }
              >
                Alterar senha
                <FaChevronRight />
              </button>
            </div>
          </div>
        </section>

        {/* ===================================================
            ACCOUNT ACTIONS
        =================================================== */}

        <section className="profile-actions-section">
          <div className="section-heading">
            <div>
              <span className="section-eyebrow">
                CONTA
              </span>

              <h2>Ações da conta</h2>
            </div>
          </div>

          <div className="account-actions">
            <button
              type="button"
              className="account-action secondary"
              onClick={handleBack}
            >
              <div className="account-action-icon">
                <FaSignOutAlt />
              </div>

              <div>
                <strong>Voltar para o dashboard</strong>
                <span>
                  Continuar navegando pelo Noir Avenue.
                </span>
              </div>

              <FaChevronRight className="action-arrow" />
            </button>

            <button
              type="button"
              className="account-action danger"
              onClick={() =>
                setShowDeleteModal(true)
              }
            >
              <div className="account-action-icon">
                <FaTrash />
              </div>

              <div>
                <strong>Excluir minha conta</strong>
                <span>
                  Essa ação remove permanentemente
                  seus dados.
                </span>
              </div>

              <FaChevronRight className="action-arrow" />
            </button>
          </div>
        </section>
      </main>

      {/* =====================================================
          EDIT PROFILE MODAL
      ===================================================== */}

      {showEditModal && (
        <div
          className="profile-modal-overlay"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setShowEditModal(false);
            }
          }}
        >
          <div
            className="profile-modal edit-profile-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-profile-title"
          >
            <button
              type="button"
              className="modal-close"
              onClick={() =>
                setShowEditModal(false)
              }
              aria-label="Fechar"
            >
              <FaTimes />
            </button>

            <div className="modal-header">
              <div className="modal-header-icon">
                <FaUser />
              </div>

              <div>
                <span>SEU PERFIL</span>

                <h2 id="edit-profile-title">
                  Editar informações
                </h2>
              </div>
            </div>

            <p className="modal-description">
              Atualize seus dados pessoais. As
              alterações serão aplicadas
              imediatamente ao seu perfil.
            </p>

            <div className="edit-fields">
              <label>
                <span>Nome completo</span>

                <div className="modal-input">
                  <FaUser />

                  <input
                    type="text"
                    value={editName}
                    placeholder="Digite seu nome"
                    autoComplete="name"
                    onChange={(event) =>
                      setEditName(
                        event.target.value
                      )
                    }
                  />
                </div>
              </label>

              <label>
                <span>Telefone</span>

                <div className="modal-input">
                  <FaPhone />

                  <input
                    type="tel"
                    value={editPhone}
                    placeholder="Digite seu telefone"
                    autoComplete="tel"
                    onChange={(event) =>
                      setEditPhone(
                        event.target.value
                      )
                    }
                  />
                </div>
              </label>

              <label>
                <span>Endereço</span>

                <div className="modal-input">
                  <FaMapMarkerAlt />

                  <input
                    type="text"
                    value={editAddress}
                    placeholder="Digite seu endereço"
                    autoComplete="street-address"
                    onChange={(event) =>
                      setEditAddress(
                        event.target.value
                      )
                    }
                  />
                </div>
              </label>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="modal-cancel"
                onClick={() =>
                  setShowEditModal(false)
                }
              >
                Cancelar
              </button>

              <button
                type="button"
                className="modal-save"
                onClick={handleSaveProfile}
              >
                <FaCheckCircle />
                Salvar alterações
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          DELETE MODAL
      ===================================================== */}

      {showDeleteModal && (
        <div
          className="profile-modal-overlay"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
            ) {
              setShowDeleteModal(false);
            }
          }}
        >
          <div
            className="profile-modal delete-profile-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-profile-title"
          >
            <button
              type="button"
              className="modal-close"
              onClick={() =>
                setShowDeleteModal(false)
              }
              aria-label="Fechar"
            >
              <FaTimes />
            </button>

            <div className="delete-icon">
              <FaTrash />
            </div>

            <span className="delete-eyebrow">
              AÇÃO PERMANENTE
            </span>

            <h2 id="delete-profile-title">
              Excluir sua conta?
            </h2>

            <p>
              Essa ação irá remover sua conta e
              os dados associados a ela. Depois
              disso, não será possível recuperar
              essas informações.
            </p>

            <div className="delete-warning">
              <FaShieldAlt />

              <span>
                Esta ação não pode ser desfeita.
              </span>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="modal-cancel"
                onClick={() =>
                  setShowDeleteModal(false)
                }
              >
                Manter minha conta
              </button>

              <button
                type="button"
                className="modal-delete"
                onClick={handleDeleteAccount}
              >
                <FaTrash />
                Excluir conta
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Perfil;