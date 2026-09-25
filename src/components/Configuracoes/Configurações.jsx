import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaBell,
  FaCheck,
  FaChevronRight,
  FaCircle,
  FaCog,
  FaCrown,
  FaGlobe,
  FaLock,
  FaMoon,
  FaPalette,
  FaShoppingBag,
  FaShieldAlt,
  FaSignOutAlt,
  FaSun,
  FaSyncAlt,
  FaUser,
  FaUserCircle,
} from "react-icons/fa";

import "./Configurações.css";

const DEFAULT_SETTINGS = {
  notifications: true,
  orderNotifications: true,
  promotionalNotifications: false,
  theme: "Dark",
  language: "Português",
  currency: "BRL",
  compactMode: false,
};

function readSession() {
  try {
    return JSON.parse(localStorage.getItem("noiravenue_session")) || {};
  } catch {
    return {};
  }
}

function Configuracoes() {
  const navigate = useNavigate();

  const [user, setUser] = useState(readSession);

  const [settings, setSettings] = useState(() => {
    const session = readSession();

    return {
      notifications:
        session.notifications ?? DEFAULT_SETTINGS.notifications,

      orderNotifications:
        session.orderNotifications ??
        DEFAULT_SETTINGS.orderNotifications,

      promotionalNotifications:
        session.promotionalNotifications ??
        DEFAULT_SETTINGS.promotionalNotifications,

      theme: session.theme || DEFAULT_SETTINGS.theme,

      language: session.language || DEFAULT_SETTINGS.language,

      currency: session.currency || DEFAULT_SETTINGS.currency,

      compactMode:
        session.compactMode ?? DEFAULT_SETTINGS.compactMode,
    };
  });

  const [savedSettings, setSavedSettings] = useState(settings);
  const [isSaving, setIsSaving] = useState(false);
  const [savedMessage, setSavedMessage] = useState("");

  const isPremium = Boolean(user.isPremium);

  const hasChanges = useMemo(
    () => JSON.stringify(settings) !== JSON.stringify(savedSettings),
    [settings, savedSettings]
  );

  useEffect(() => {
    applyTheme(settings.theme);
  }, [settings.theme]);

  useEffect(() => {
    const handleStorage = () => {
      setUser(readSession());
    };

    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  function applyTheme(selectedTheme) {
    const root = document.documentElement;

    if (selectedTheme === "Light") {
      root.dataset.theme = "light";
      root.classList.add("theme-light");
    } else {
      root.dataset.theme = "dark";
      root.classList.remove("theme-light");
    }

    localStorage.setItem(
      "noiravenue_theme",
      selectedTheme.toLowerCase()
    );
  }

  function updateSetting(key, value) {
    setSettings((current) => ({
      ...current,
      [key]: value,
    }));

    setSavedMessage("");
  }

  function handleSaveSettings() {
    if (!hasChanges) return;

    setIsSaving(true);
    setSavedMessage("");

    const updatedUser = {
      ...user,
      ...settings,
    };

    localStorage.setItem(
      "noiravenue_session",
      JSON.stringify(updatedUser)
    );

    try {
      const users =
        JSON.parse(
          localStorage.getItem("noiravenue_users")
        ) || [];

      const updatedUsers = users.map((item) =>
        item.email?.toLowerCase() ===
        updatedUser.email?.toLowerCase()
          ? {
              ...item,
              ...settings,
            }
          : item
      );

      localStorage.setItem(
        "noiravenue_users",
        JSON.stringify(updatedUsers)
      );
    } catch {
      // Mantém a sessão local mesmo se o registro de usuários
      // estiver indisponível ou inválido.
    }

    applyTheme(settings.theme);

    setTimeout(() => {
      setUser(updatedUser);
      setSavedSettings(settings);
      setIsSaving(false);
      setSavedMessage("Alterações salvas com sucesso.");

      setTimeout(() => {
        setSavedMessage("");
      }, 3000);
    }, 350);
  }

  function handleResetSettings() {
    setSettings(DEFAULT_SETTINGS);
    setSavedMessage("");
  }

  function handleBack() {
    navigate("/dashboard");
  }

  const displayName =
    user.name ||
    user.fullName ||
    user.username ||
    "Usuário Noir Avenue";

  const email =
    user.email || "E-mail não informado";

  const initials = displayName
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");

  return (
    <main className="settings-page">
      <div className="settings-background-glow settings-glow-one" />
      <div className="settings-background-glow settings-glow-two" />

      <div className="settings-container">
        {/* =====================================================
            HEADER
        ===================================================== */}

        <header className="settings-header">
          <button
            type="button"
            className="settings-back-button"
            onClick={handleBack}
          >
            <FaArrowLeft />
            <span>Voltar ao Dashboard</span>
          </button>

          <div className="settings-heading">
            <div className="settings-heading-icon">
              <FaCog />
            </div>

            <div className="settings-heading-content">
              <span className="settings-eyebrow">
                NOIR AVENUE
              </span>

              <h1>Configurações</h1>

              <p>
                Controle sua conta, preferências e experiência
                dentro da plataforma.
              </p>
            </div>

            {isPremium && (
              <div className="settings-premium-badge">
                <FaCrown />
                <span>Premium</span>
              </div>
            )}
          </div>
        </header>

        {/* =====================================================
            ACCOUNT SUMMARY
        ===================================================== */}

        <section className="account-summary">
          <div className="account-summary-profile">
            <div className="account-avatar">
              {user.profilePhoto ? (
                <img
                  src={user.profilePhoto}
                  alt={`Foto de perfil de ${displayName}`}
                />
              ) : (
                <span>{initials || <FaUser />}</span>
              )}
            </div>

            <div className="account-summary-info">
              <span className="account-label">
                CONTA
              </span>

              <h2>{displayName}</h2>

              <p>{email}</p>
            </div>
          </div>

          <div className="account-summary-status">
            <span className="status-dot" />

            <div>
              <strong>Conta ativa</strong>
              <span>
                Sua conta está pronta para uso.
              </span>
            </div>
          </div>

          <button
            type="button"
            className="account-profile-button"
            onClick={() => navigate("/dashboard/perfil")}
          >
            <FaUserCircle />
            Ver perfil
            <FaChevronRight />
          </button>
        </section>

        <div className="settings-grid">
          {/* ===================================================
              LEFT COLUMN
          =================================================== */}

          <div className="settings-main-column">
            {/* NOTIFICATIONS */}

            <section className="settings-card">
              <div className="settings-card-header">
                <div className="settings-card-icon">
                  <FaBell />
                </div>

                <div>
                  <span className="settings-card-kicker">
                    COMUNICAÇÃO
                  </span>

                  <h2>Notificações</h2>

                  <p>
                    Escolha quais informações o Noir Avenue
                    pode enviar para você.
                  </p>
                </div>
              </div>

              <div className="settings-list">
                <div className="setting-item">
                  <div className="setting-item-content">
                    <strong>
                      Notificações da plataforma
                    </strong>

                    <span>
                      Receba atualizações importantes sobre
                      sua conta e sua experiência.
                    </span>
                  </div>

                  <button
                    type="button"
                    className={`settings-toggle ${
                      settings.notifications
                        ? "is-active"
                        : ""
                    }`}
                    onClick={() =>
                      updateSetting(
                        "notifications",
                        !settings.notifications
                      )
                    }
                    aria-label="Alternar notificações da plataforma"
                    aria-pressed={settings.notifications}
                  >
                    <span />
                  </button>
                </div>

                <div
                  className={`setting-item nested-setting ${
                    !settings.notifications
                      ? "is-disabled"
                      : ""
                  }`}
                >
                  <div className="setting-item-content">
                    <strong>
                      Atualizações de pedidos
                    </strong>

                    <span>
                      Status, confirmação e informações
                      relacionadas às compras.
                    </span>
                  </div>

                  <button
                    type="button"
                    className={`settings-toggle ${
                      settings.orderNotifications
                        ? "is-active"
                        : ""
                    }`}
                    disabled={!settings.notifications}
                    onClick={() =>
                      updateSetting(
                        "orderNotifications",
                        !settings.orderNotifications
                      )
                    }
                    aria-label="Alternar notificações de pedidos"
                    aria-pressed={
                      settings.orderNotifications
                    }
                  >
                    <span />
                  </button>
                </div>

                <div
                  className={`setting-item nested-setting ${
                    !settings.notifications
                      ? "is-disabled"
                      : ""
                  }`}
                >
                  <div className="setting-item-content">
                    <strong>
                      Ofertas e novidades
                    </strong>

                    <span>
                      Receba novidades, lançamentos e
                      comunicações comerciais do Noir Avenue.
                    </span>
                  </div>

                  <button
                    type="button"
                    className={`settings-toggle ${
                      settings.promotionalNotifications
                        ? "is-active"
                        : ""
                    }`}
                    disabled={!settings.notifications}
                    onClick={() =>
                      updateSetting(
                        "promotionalNotifications",
                        !settings.promotionalNotifications
                      )
                    }
                    aria-label="Alternar ofertas e novidades"
                    aria-pressed={
                      settings.promotionalNotifications
                    }
                  >
                    <span />
                  </button>
                </div>
              </div>
            </section>

            {/* APPEARANCE */}

            <section className="settings-card">
              <div className="settings-card-header">
                <div className="settings-card-icon">
                  <FaPalette />
                </div>

                <div>
                  <span className="settings-card-kicker">
                    INTERFACE
                  </span>

                  <h2>Aparência</h2>

                  <p>
                    Personalize a forma como o Noir Avenue
                    aparece para você.
                  </p>
                </div>
              </div>

              <div className="theme-selector">
                <button
                  type="button"
                  className={`theme-option ${
                    settings.theme === "Dark"
                      ? "is-selected"
                      : ""
                  }`}
                  onClick={() =>
                    updateSetting("theme", "Dark")
                  }
                >
                  <div className="theme-option-preview theme-preview-dark">
                    <FaMoon />
                  </div>

                  <div>
                    <strong>Dark</strong>
                    <span>
                      Experiência escura e sofisticada.
                    </span>
                  </div>

                  {settings.theme === "Dark" && (
                    <FaCheck className="theme-check" />
                  )}
                </button>

                <button
                  type="button"
                  className={`theme-option ${
                    settings.theme === "Light"
                      ? "is-selected"
                      : ""
                  }`}
                  onClick={() =>
                    updateSetting("theme", "Light")
                  }
                >
                  <div className="theme-option-preview theme-preview-light">
                    <FaSun />
                  </div>

                  <div>
                    <strong>Light</strong>
                    <span>
                      Interface clara e minimalista.
                    </span>
                  </div>

                  {settings.theme === "Light" && (
                    <FaCheck className="theme-check" />
                  )}
                </button>
              </div>

              <div className="setting-item compact-setting">
                <div className="setting-item-content">
                  <strong>Interface compacta</strong>

                  <span>
                    Reduza espaçamentos para visualizar
                    mais informações por tela.
                  </span>
                </div>

                <button
                  type="button"
                  className={`settings-toggle ${
                    settings.compactMode
                      ? "is-active"
                      : ""
                  }`}
                  onClick={() =>
                    updateSetting(
                      "compactMode",
                      !settings.compactMode
                    )
                  }
                  aria-label="Alternar interface compacta"
                  aria-pressed={settings.compactMode}
                >
                  <span />
                </button>
              </div>
            </section>

            {/* PREFERENCES */}

            <section className="settings-card">
              <div className="settings-card-header">
                <div className="settings-card-icon">
                  <FaGlobe />
                </div>

                <div>
                  <span className="settings-card-kicker">
                    PREFERÊNCIAS
                  </span>

                  <h2>Preferências gerais</h2>

                  <p>
                    Defina padrões para sua experiência no
                    Noir Avenue.
                  </p>
                </div>
              </div>

              <div className="settings-form-grid">
                <label className="settings-field">
                  <span>Idioma</span>

                  <select
                    value={settings.language}
                    onChange={(event) =>
                      updateSetting(
                        "language",
                        event.target.value
                      )
                    }
                  >
                    <option value="Português">
                      Português
                    </option>

                    <option value="English">
                      English
                    </option>

                    <option value="Español">
                      Español
                    </option>
                  </select>
                </label>

                <label className="settings-field">
                  <span>Moeda</span>

                  <select
                    value={settings.currency}
                    onChange={(event) =>
                      updateSetting(
                        "currency",
                        event.target.value
                      )
                    }
                  >
                    <option value="BRL">
                      BRL — Real brasileiro
                    </option>

                    <option value="USD">
                      USD — Dólar americano
                    </option>

                    <option value="EUR">
                      EUR — Euro
                    </option>
                  </select>
                </label>
              </div>
            </section>

            {/* SHOPPING */}

            <section className="settings-card">
              <div className="settings-card-header">
                <div className="settings-card-icon">
                  <FaShoppingBag />
                </div>

                <div>
                  <span className="settings-card-kicker">
                    EXPERIÊNCIA DE COMPRA
                  </span>

                  <h2>Compras</h2>

                  <p>
                    Acesse rapidamente recursos relacionados
                    à sua experiência de compra.
                  </p>
                </div>
              </div>

              <div className="settings-action-list">
                <button
                  type="button"
                  className="settings-action"
                  onClick={() =>
                    navigate("/dashboard/perfil")
                  }
                >
                  <div className="action-icon">
                    <FaUser />
                  </div>

                  <div className="action-content">
                    <strong>
                      Dados e endereço
                    </strong>

                    <span>
                      Confira seus dados utilizados durante
                      identificação e entrega.
                    </span>
                  </div>

                  <FaChevronRight />
                </button>

                <button
                  type="button"
                  className="settings-action"
                  onClick={() =>
                    navigate("/dashboard/cart")
                  }
                >
                  <div className="action-icon">
                    <FaShoppingBag />
                  </div>

                  <div className="action-content">
                    <strong>
                      Meu carrinho
                    </strong>

                    <span>
                      Revise os produtos adicionados à sua
                      experiência de compra.
                    </span>
                  </div>

                  <FaChevronRight />
                </button>
              </div>
            </section>
          </div>

          {/* ===================================================
              RIGHT COLUMN
          =================================================== */}

          <aside className="settings-side-column">
            {/* SECURITY */}

            <section className="settings-card settings-security-card">
              <div className="settings-card-header">
                <div className="settings-card-icon">
                  <FaShieldAlt />
                </div>

                <div>
                  <span className="settings-card-kicker">
                    PROTEÇÃO
                  </span>

                  <h2>Segurança</h2>

                  <p>
                    Controle informações relacionadas ao
                    acesso da sua conta.
                  </p>
                </div>
              </div>

              <div className="security-status">
                <div className="security-status-icon">
                  <FaLock />
                </div>

                <div>
                  <strong>
                    Sessão protegida
                  </strong>

                  <span>
                    Sua sessão atual está ativa.
                  </span>
                </div>

                <FaCheck />
              </div>

              <div className="settings-action-list">
                <button
                  type="button"
                  className="settings-action"
                  onClick={() =>
                    navigate("/dashboard/perfil")
                  }
                >
                  <div className="action-content">
                    <strong>
                      Credenciais da conta
                    </strong>

                    <span>
                      Gerencie informações relacionadas ao
                      seu acesso.
                    </span>
                  </div>

                  <FaChevronRight />
                </button>

                <button
                  type="button"
                  className="settings-action"
                  onClick={() =>
                    alert(
                      "A área de gerenciamento de dados será integrada ao backend do Noir Avenue."
                    )
                  }
                >
                  <div className="action-content">
                    <strong>
                      Dados pessoais
                    </strong>

                    <span>
                      Consulte as informações armazenadas
                      na sua conta.
                    </span>
                  </div>

                  <FaChevronRight />
                </button>
              </div>
            </section>

            {/* ACCOUNT */}

            <section className="settings-card">
              <div className="settings-card-header">
                <div className="settings-card-icon">
                  <FaUser />
                </div>

                <div>
                  <span className="settings-card-kicker">
                    SUA CONTA
                  </span>

                  <h2>Conta</h2>

                  <p>
                    Ações rápidas relacionadas ao seu
                    perfil.
                  </p>
                </div>
              </div>

              <div className="account-detail-list">
                <div>
                  <span>Nome</span>
                  <strong>{displayName}</strong>
                </div>

                <div>
                  <span>E-mail</span>
                  <strong>{email}</strong>
                </div>

                <div>
                  <span>Status</span>

                  <strong className="account-active">
                    <FaCircle />
                    Ativa
                  </strong>
                </div>
              </div>

              <button
                type="button"
                className="secondary-action-button"
                onClick={() =>
                  navigate("/dashboard/perfil")
                }
              >
                <FaUserCircle />
                Gerenciar perfil
              </button>
            </section>

            {/* PREMIUM */}

            {isPremium ? (
              <section className="premium-card premium-card-active">
                <div className="premium-card-top">
                  <div className="premium-icon">
                    <FaCrown />
                  </div>

                  <span className="premium-status">
                    ATIVO
                  </span>
                </div>

                <span className="premium-kicker">
                  NOIR PREMIUM
                </span>

                <h2>
                  Sua experiência Premium está ativa.
                </h2>

                <p>
                  Sua conta possui acesso aos recursos
                  exclusivos disponíveis no Noir Avenue.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/dashboard/premium")
                  }
                >
                  Gerenciar Premium
                  <FaChevronRight />
                </button>
              </section>
            ) : (
              <section className="premium-card">
                <div className="premium-card-top">
                  <div className="premium-icon">
                    <FaCrown />
                  </div>

                  <span className="premium-kicker">
                    NOIR PREMIUM
                  </span>
                </div>

                <h2>
                  Uma experiência ainda mais exclusiva.
                </h2>

                <p>
                  Conheça os recursos adicionais e a
                  experiência Premium do Noir Avenue.
                </p>

                <button
                  type="button"
                  onClick={() =>
                    navigate("/dashboard/premium")
                  }
                >
                  Conhecer Premium
                  <FaChevronRight />
                </button>
              </section>
            )}

            {/* SESSION */}

            <section className="settings-session-card">
              <div className="session-icon">
                <FaSignOutAlt />
              </div>

              <div>
                <span>Sessão atual</span>

                <strong>
                  Você está conectado ao Noir Avenue.
                </strong>
              </div>
            </section>
          </aside>
        </div>

        {/* =====================================================
            SAVE BAR
        ===================================================== */}

        <footer
          className={`settings-save-bar ${
            hasChanges ? "has-changes" : ""
          }`}
        >
          <div className="save-status">
            {savedMessage ? (
              <>
                <FaCheck />
                <span>{savedMessage}</span>
              </>
            ) : hasChanges ? (
              <>
                <FaCircle />
                <span>
                  Você possui alterações não salvas.
                </span>
              </>
            ) : (
              <>
                <FaCheck />
                <span>
                  Todas as configurações estão salvas.
                </span>
              </>
            )}
          </div>

          <div className="save-actions">
            <button
              type="button"
              className="reset-settings-button"
              onClick={handleResetSettings}
              disabled={!hasChanges}
            >
              <FaSyncAlt />
              Restaurar
            </button>

            <button
              type="button"
              className="settings-save-button"
              onClick={handleSaveSettings}
              disabled={!hasChanges || isSaving}
            >
              {isSaving ? (
                <>
                  <span className="save-spinner" />
                  Salvando...
                </>
              ) : (
                <>
                  <FaCheck />
                  Salvar alterações
                </>
              )}
            </button>
          </div>
        </footer>
      </div>
    </main>
  );
}

export default Configuracoes;