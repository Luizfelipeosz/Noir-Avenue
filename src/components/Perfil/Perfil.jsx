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
  FaCamera,
  FaImage,
  FaTrashAlt,
  FaHeart,
  FaShoppingCart,
  FaStore,
  FaCog,
  FaArrowRight,
  FaLock,
} from "react-icons/fa";

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import "./Perfil.css";
import logo from "../../assets/logo.png";

const API_URL =
  "https://noir-avenue-api.onrender.com/api";

const SESSION_KEY = "noiravenue_session";
const STORAGE_KEY = "noiravenue_email";
const CART_KEY = "noiravenue_cart";
const FAVORITES_KEY = "noiravenue_favorites";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);

    if (!value) {
      return fallback;
    }

    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function calculateProfileCompletion(user) {
  const fields = [
    user?.name,
    user?.email,
    user?.telefone,
    user?.endereco,
  ];

  return Math.floor(
    (fields.filter(Boolean).length / fields.length) * 100
  );
}

function Perfil() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const getSessionUser = () => {
    try {
      const storedUser =
        localStorage.getItem(SESSION_KEY);

      if (!storedUser) {
        return {};
      }

      return JSON.parse(storedUser);
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

  const [isUploadingPhoto, setIsUploadingPhoto] =
    useState(false);

  const [isDeletingAccount, setIsDeletingAccount] =
    useState(false);

  const cart = readStorage(CART_KEY, []);
  const favorites = readStorage(FAVORITES_KEY, []);

  const cartCount = Array.isArray(cart)
    ? cart.reduce(
        (total, item) =>
          total + Number(item.quantity || 1),
        0
      )
    : 0;

  const favoritesCount = Array.isArray(favorites)
    ? favorites.length
    : 0;

  const profilePercentage =
    calculateProfileCompletion(profile);

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

  const profilePhoto = profile.photo || "";

  const updateUserStorage = (updatedUser) => {
    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify(updatedUser)
    );
  };

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleOpenEdit = () => {
    setEditName(profile.name || "");
    setEditPhone(profile.telefone || "");
    setEditAddress(profile.endereco || "");
    setShowEditModal(true);
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      toast.error("Arquivo inválido", {
        description:
          "Selecione uma imagem válida para sua foto de perfil.",
      });

      event.target.value = "";
      return;
    }

    if (file.size > MAX_IMAGE_SIZE) {
      toast.error("Imagem muito grande", {
        description:
          "Escolha uma imagem de até 5 MB.",
      });

      event.target.value = "";
      return;
    }

    setIsUploadingPhoto(true);

    const reader = new FileReader();

    reader.onload = () => {
      const photo = reader.result;

      const updatedUser = {
        ...profile,
        photo,
      };

      updateUserStorage(updatedUser);
      setProfile(updatedUser);
      setIsUploadingPhoto(false);

      toast.success("Foto atualizada", {
        description:
          "Sua foto de perfil foi salva com sucesso.",
      });

      event.target.value = "";
    };

    reader.onerror = () => {
      setIsUploadingPhoto(false);

      toast.error(
        "Não foi possível carregar a imagem",
        {
          description:
            "Tente selecionar outra foto.",
        }
      );

      event.target.value = "";
    };

    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    if (!profile.photo) {
      return;
    }

    const updatedUser = {
      ...profile,
      photo: "",
    };

    updateUserStorage(updatedUser);
    setProfile(updatedUser);

    toast.success("Foto removida", {
      description:
        "Sua foto de perfil foi removida.",
    });
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

    updateUserStorage(updatedUser);
    setProfile(updatedUser);
    setShowEditModal(false);

    toast.success("Perfil atualizado", {
      description:
        "Suas informações foram salvas com sucesso.",
    });
  };

  const handleDeleteAccount = async () => {
    if (!profile.email) {
      toast.error(
        "Não foi possível excluir a conta",
        {
          description:
            "Não encontramos o e-mail da sua conta.",
        }
      );

      return;
    }

    if (isDeletingAccount) {
      return;
    }

    try {
      setIsDeletingAccount(true);

      const response = await fetch(
        `${API_URL}/auth/account`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: profile.email,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        toast.error(
          data.message ||
            "Não foi possível excluir a conta."
        );

        return;
      }

      localStorage.removeItem(SESSION_KEY);
      localStorage.removeItem(STORAGE_KEY);

      setShowDeleteModal(false);

      toast.success("Conta removida", {
        description:
          "Sua conta foi excluída permanentemente.",
      });

      setTimeout(() => {
        navigate("/");
      }, 800);
    } catch (error) {
      console.error(
        "Erro ao excluir conta:",
        error
      );

      toast.error(
        "Não foi possível conectar ao servidor.",
        {
          description:
            "A conta não foi removida. Tente novamente.",
        }
      );
    } finally {
      setIsDeletingAccount(false);
    }
  };

  const profileShortcuts = [
    {
      icon: <FaStore />,
      title: "Explorar catálogo",
      description:
        "Descubra produtos e continue sua experiência.",
      action: () =>
        navigate("/dashboard/catalogo"),
    },
    {
      icon: <FaHeart />,
      title: "Meus favoritos",
      description:
        favoritesCount > 0
          ? `${favoritesCount} ${
              favoritesCount === 1
                ? "item salvo"
                : "itens salvos"
            } para você.`
          : "Você ainda não salvou produtos.",
      action: () =>
        navigate("/dashboard/favoritos"),
      badge:
        favoritesCount > 0
          ? favoritesCount
          : null,
    },
    {
      icon: <FaShoppingCart />,
      title: "Meu carrinho",
      description:
        cartCount > 0
          ? `${cartCount} ${
              cartCount === 1
                ? "item aguardando"
                : "itens aguardando"
            } no carrinho.`
          : "Seu carrinho está vazio.",
      action: () =>
        navigate("/dashboard/cart"),
      badge:
        cartCount > 0 ? cartCount : null,
    },
    {
      icon: <FaCog />,
      title: "Configurações",
      description:
        "Preferências e personalização da sua conta.",
      action: () =>
        navigate("/dashboard/configuracoes"),
    },
  ];

  return (
    <div className="profile-page">
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
        <section className="profile-intro">
          <span className="profile-eyebrow">
            SUA CONTA
          </span>

          <h1>Meu Perfil</h1>

          <p>
            Gerencie sua identidade, acompanhe sua
            experiência e mantenha sua conta Noir
            Avenue sempre atualizada.
          </p>
        </section>

        <section className="profile-hero">
          <div className="profile-hero-background" />

          <div className="profile-hero-content">
            <div className="profile-identity">
              <div
                className={`profile-avatar ${
                  profilePhoto ? "has-photo" : ""
                }`}
              >
                {profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt={`Foto de perfil de ${displayName}`}
                    className="profile-avatar-image"
                  />
                ) : (
                  <span>{initial}</span>
                )}

                <button
                  type="button"
                  className="profile-avatar-camera"
                  onClick={() =>
                    fileInputRef.current?.click()
                  }
                  aria-label="Alterar foto de perfil"
                  disabled={isUploadingPhoto}
                >
                  {isUploadingPhoto ? (
                    <span className="photo-loader" />
                  ) : (
                    <FaCamera />
                  )}
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="profile-photo-input"
                  onChange={handlePhotoChange}
                />
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

        <section className="profile-account-status">
          <div className="account-status-main">
            <div className="status-icon">
              <FaCheckCircle />
            </div>

            <div>
              <span className="status-label">
                PERFIL DA CONTA
              </span>

              <strong>
                {profilePercentage === 100
                  ? "Seu perfil está completo"
                  : "Complete seu perfil"}
              </strong>

              <p>
                {profilePercentage === 100
                  ? "Todos os dados essenciais estão preenchidos."
                  : "Mantenha seus dados atualizados para aproveitar melhor sua experiência."}
              </p>
            </div>
          </div>

          <div className="profile-progress">
            <div className="progress-header">
              <span>Completude</span>
              <strong>
                {profilePercentage}%
              </strong>
            </div>

            <div className="progress-track">
              <div
                className="progress-value"
                style={{
                  width: `${profilePercentage}%`,
                }}
              />
            </div>
          </div>
        </section>

        <section className="profile-stats">
          <article className="profile-stat">
            <div className="profile-stat-icon">
              <FaHeart />
            </div>

            <div>
              <strong>{favoritesCount}</strong>
              <span>Favoritos</span>
            </div>
          </article>

          <article className="profile-stat">
            <div className="profile-stat-icon">
              <FaShoppingCart />
            </div>

            <div>
              <strong>{cartCount}</strong>
              <span>No carrinho</span>
            </div>
          </article>

          <article className="profile-stat">
            <div className="profile-stat-icon">
              <FaShieldAlt />
            </div>

            <div>
              <strong>Ativa</strong>
              <span>Status da conta</span>
            </div>
          </article>

          <article className="profile-stat">
            <div className="profile-stat-icon">
              <FaLock />
            </div>

            <div>
              <strong>Protegida</strong>
              <span>Acesso da conta</span>
            </div>
          </article>
        </section>

        <section className="profile-section profile-experience-section">
          <div className="section-heading">
            <div>
              <span className="section-eyebrow">
                EXPERIÊNCIA
              </span>

              <h2>Atalhos da sua conta</h2>

              <p>
                Acesse rapidamente as principais áreas
                da sua experiência no Noir Avenue.
              </p>
            </div>
          </div>

          <div className="profile-shortcuts">
            {profileShortcuts.map((item) => (
              <button
                type="button"
                className="profile-shortcut"
                key={item.title}
                onClick={item.action}
              >
                <div className="shortcut-icon">
                  {item.icon}
                </div>

                <div className="shortcut-content">
                  <div className="shortcut-title">
                    <strong>{item.title}</strong>

                    {item.badge !== null &&
                      item.badge !== undefined && (
                        <span className="shortcut-badge">
                          {item.badge}
                        </span>
                      )}
                  </div>

                  <span>
                    {item.description}
                  </span>
                </div>

                <FaArrowRight className="shortcut-arrow" />
              </button>
            ))}
          </div>
        </section>

        <section className="profile-section">
          <div className="section-heading">
            <div>
              <span className="section-eyebrow">
                INFORMAÇÕES
              </span>

              <h2>Dados pessoais</h2>

              <p>
                Informações utilizadas para identificar
                e personalizar sua experiência.
              </p>
            </div>

            <button
              type="button"
              className="section-edit-button"
              onClick={handleOpenEdit}
            >
              <FaPen />
              Editar dados
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

        <section className="profile-section">
          <div className="section-heading">
            <div>
              <span className="section-eyebrow">
                PERSONALIZAÇÃO
              </span>

              <h2>Foto de perfil</h2>

              <p>
                Personalize a identidade visual da sua
                conta dentro do Noir Avenue.
              </p>
            </div>
          </div>

          <div className="profile-photo-panel">
            <div className="photo-panel-preview">
              <div
                className={`photo-panel-avatar ${
                  profilePhoto ? "has-photo" : ""
                }`}
              >
                {profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt={`Foto de ${displayName}`}
                  />
                ) : (
                  <span>{initial}</span>
                )}
              </div>

              <div>
                <strong>{displayName}</strong>
                <span>
                  JPG, PNG ou WEBP · até 5 MB
                </span>
              </div>
            </div>

            <div className="photo-panel-actions">
              <button
                type="button"
                className="photo-action-button primary"
                onClick={() =>
                  fileInputRef.current?.click()
                }
              >
                <FaImage />

                {profilePhoto
                  ? "Trocar foto"
                  : "Adicionar foto"}
              </button>

              {profilePhoto && (
                <button
                  type="button"
                  className="photo-action-button danger"
                  onClick={handleRemovePhoto}
                >
                  <FaTrashAlt />
                  Remover
                </button>
              )}
            </div>
          </div>
        </section>

        <section className="profile-section">
          <div className="section-heading">
            <div>
              <span className="section-eyebrow">
                SEGURANÇA
              </span>

              <h2>Acesso e segurança</h2>

              <p>
                Controle suas credenciais e mantenha
                sua conta protegida.
              </p>
            </div>
          </div>

          <div className="security-card">
            <div className="security-icon">
              <FaShieldAlt />
            </div>

            <div className="security-content">
              <div>
                <div className="security-title-row">
                  <h3>Senha da conta</h3>

                  <span className="security-status">
                    <FaCheckCircle />
                    Protegida
                  </span>
                </div>

                <p>
                  Atualize sua senha sempre que desejar
                  manter o acesso à conta sob controle.
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

        <section className="profile-actions-section">
          <div className="section-heading">
            <div>
              <span className="section-eyebrow">
                CONTA
              </span>

              <h2>Gerenciamento da conta</h2>

              <p>
                Ações relacionadas à sua sessão e aos
                seus dados no Noir Avenue.
              </p>
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
                <strong>
                  Voltar para o dashboard
                </strong>

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
              disabled={isDeletingAccount}
            >
              <div className="account-action-icon">
                <FaTrash />
              </div>

              <div>
                <strong>
                  Excluir minha conta
                </strong>

                <span>
                  Remove permanentemente sua conta e
                  os dados associados.
                </span>
              </div>

              <FaChevronRight className="action-arrow" />
            </button>
          </div>
        </section>
      </main>

      {showEditModal && (
        <div
          className="profile-modal-overlay"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
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

            <div className="modal-photo-editor">
              <div
                className={`modal-profile-avatar ${
                  profilePhoto ? "has-photo" : ""
                }`}
              >
                {profilePhoto ? (
                  <img
                    src={profilePhoto}
                    alt={`Foto de ${displayName}`}
                  />
                ) : (
                  <span>{initial}</span>
                )}
              </div>

              <div className="modal-photo-content">
                <strong>Foto de perfil</strong>

                <span>
                  JPG, PNG ou WEBP · até 5 MB
                </span>

                <div className="modal-photo-actions">
                  <button
                    type="button"
                    onClick={() =>
                      fileInputRef.current?.click()
                    }
                  >
                    <FaCamera />

                    {profilePhoto
                      ? "Trocar foto"
                      : "Adicionar foto"}
                  </button>

                  {profilePhoto && (
                    <button
                      type="button"
                      className="modal-photo-remove"
                      onClick={handleRemovePhoto}
                    >
                      Remover
                    </button>
                  )}
                </div>
              </div>
            </div>

            <p className="modal-description">
              Mantenha seus dados atualizados para
              proporcionar uma experiência mais completa
              dentro do Noir Avenue.
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

      {showDeleteModal && (
        <div
          className="profile-modal-overlay"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget &&
              !isDeletingAccount
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
            {!isDeletingAccount && (
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
            )}

            <div className="delete-icon">
              <FaTrash />
            </div>

            <span className="delete-eyebrow">
              AÇÃO PERMANENTE
            </span>

            <h2 id="delete-profile-title">
              {isDeletingAccount
                ? "Excluindo sua conta..."
                : "Excluir sua conta?"}
            </h2>

            <p>
              {isDeletingAccount
                ? "Estamos removendo sua conta e os dados associados. Aguarde alguns instantes."
                : "Essa ação irá remover sua conta e os dados associados a ela. Depois disso, não será possível recuperar essas informações."}
            </p>

            {!isDeletingAccount && (
              <div className="delete-warning">
                <FaShieldAlt />

                <span>
                  Esta ação não pode ser desfeita.
                </span>
              </div>
            )}

            <div className="modal-actions">
              <button
                type="button"
                className="modal-cancel"
                onClick={() =>
                  setShowDeleteModal(false)
                }
                disabled={isDeletingAccount}
              >
                Manter minha conta
              </button>

              <button
                type="button"
                className="modal-delete"
                onClick={handleDeleteAccount}
                disabled={isDeletingAccount}
              >
                <FaTrash />

                {isDeletingAccount
                  ? "Excluindo..."
                  : "Excluir conta"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Perfil;