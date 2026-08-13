import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaCog,
  FaBell,
  FaMoon,
  FaGlobe,
  FaShieldAlt,
  FaCrown,
  FaChevronRight,
  FaCheck,
  FaArrowLeft,
} from "react-icons/fa";

import "./Configurações.css";

function Configuracoes() {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    return (
      JSON.parse(
        localStorage.getItem("noiravenue_session")
      ) || {}
    );
  });

  const [notifications, setNotifications] = useState(
    () => user.notifications ?? true
  );

  const [theme, setTheme] = useState(
    () => user.theme || "Dark"
  );

  const [language, setLanguage] = useState(
    () => user.language || "Português"
  );

  const isPremium = Boolean(user.isPremium);

  const handleSaveSettings = () => {
  const updatedUser = {
    ...user,
    notifications,
    theme,
    language,
  };

  localStorage.setItem(
    "noiravenue_session",
    JSON.stringify(updatedUser)
  );

  const users =
    JSON.parse(
      localStorage.getItem("noiravenue_users")
    ) || [];

  const updatedUsers = users.map((item) =>
    item.email?.toLowerCase() ===
    updatedUser.email?.toLowerCase()
      ? {
          ...item,
          notifications,
          theme,
          language,
        }
      : item
  );

  localStorage.setItem(
    "noiravenue_users",
    JSON.stringify(updatedUsers)
  );

  setUser(updatedUser);

  navigate("/dashboard");
};

  return (
    <main
      className={`settings-page ${
        isPremium ? "settings-premium" : ""
      }`}
    >
      {/* ==========================
          HEADER
      ========================== */}

      <header className="settings-header">
        <button
          className="settings-back-button"
          onClick={() => navigate("/dashboard")}
        >
          <FaArrowLeft />
          Voltar ao Dashboard
        </button>

        <div className="settings-header-main">
          <div className="settings-title">
            <div className="settings-title-icon">
              <FaCog />
            </div>

            <div>
              <span>NOIR AVENUE</span>

              <h1>Configurações</h1>
            </div>
          </div>

          <p>
            Personalize sua experiência dentro da
            plataforma.
          </p>
        </div>

        {isPremium && (
          <div className="settings-premium-badge">
            <FaCrown />
            Premium
          </div>
        )}
      </header>

      <div className="settings-layout">

        {/* ==========================
            NOTIFICAÇÕES
        ========================== */}

        <section className="settings-section">
          <div className="section-title">
            <FaBell />

            <div>
              <h2>Notificações</h2>

              <p>
                Controle como o Noir Avenue se
                comunica com você.
              </p>
            </div>
          </div>

          <div className="setting-row">
            <div>
              <strong>
                Notificações da plataforma
              </strong>

              <span>
                Receba atualizações, novidades e
                informações importantes.
              </span>
            </div>

            <button
              type="button"
              className={`toggle ${
                notifications ? "active" : ""
              }`}
              onClick={() =>
                setNotifications((value) => !value)
              }
              aria-label="Alternar notificações"
              aria-pressed={notifications}
            >
              <span />
            </button>
          </div>
        </section>

        {/* ==========================
            APARÊNCIA
        ========================== */}

        <section className="settings-section">
          <div className="section-title">
            <FaMoon />

            <div>
              <h2>Aparência</h2>

              <p>
                Defina como a interface deve ser
                apresentada.
              </p>
            </div>
          </div>

          <div className="setting-row">
            <div>
              <strong>
                Tema da interface
              </strong>

              <span>
                Escolha o tema utilizado pela
                plataforma.
              </span>
            </div>

            <select
              value={theme}
              onChange={(event) =>
                setTheme(event.target.value)
              }
            >
              <option value="Dark">
                Dark
              </option>

              <option value="Light">
                Light
              </option>
            </select>
          </div>

          {isPremium && (
            <div className="premium-setting">
              <div className="premium-setting-icon">
                <FaCrown />
              </div>

              <div>
                <strong>
                  Personalização Premium
                </strong>

                <span>
                  Recursos avançados de
                  personalização estão disponíveis
                  para sua conta.
                </span>
              </div>

              <FaCheck className="premium-check" />
            </div>
          )}
        </section>

        {/* ==========================
            PREFERÊNCIAS
        ========================== */}

        <section className="settings-section">
          <div className="section-title">
            <FaGlobe />

            <div>
              <h2>Preferências</h2>

              <p>
                Configure suas preferências de
                utilização.
              </p>
            </div>
          </div>

          <div className="setting-row">
            <div>
              <strong>Idioma</strong>

              <span>
                Idioma principal da plataforma.
              </span>
            </div>

            <select
              value={language}
              onChange={(event) =>
                setLanguage(event.target.value)
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
          </div>
        </section>

        {/* ==========================
            SEGURANÇA
        ========================== */}

        <section className="settings-section">
          <div className="section-title">
            <FaShieldAlt />

            <div>
              <h2>
                Privacidade e segurança
              </h2>

              <p>
                Gerencie informações relacionadas à
                sua conta.
              </p>
            </div>
          </div>

          <button
            type="button"
            className="settings-action"
            onClick={() =>
              alert(
                "Gerenciamento de dados em desenvolvimento."
              )
            }
          >
            <div>
              <strong>Dados da conta</strong>

              <span>
                Consulte e gerencie seus dados
                pessoais.
              </span>
            </div>

            <FaChevronRight />
          </button>

          <button
            type="button"
            className="settings-action"
            onClick={() =>
              alert(
                "Gerenciamento de segurança em desenvolvimento."
              )
            }
          >
            <div>
              <strong>Segurança</strong>

              <span>
                Gerencie suas credenciais e
                preferências de acesso.
              </span>
            </div>

            <FaChevronRight />
          </button>
        </section>

        {/* ==========================
            PREMIUM
        ========================== */}

        {!isPremium && (
          <section className="settings-upgrade">
            <div className="upgrade-icon">
              <FaCrown />
            </div>

            <div className="upgrade-content">
              <span>NOIR PREMIUM</span>

              <h2>
                Uma experiência mais exclusiva.
              </h2>

              <p>
                Desbloqueie recursos avançados,
                personalização exclusiva e uma
                experiência premium dentro do Noir
                Avenue.
              </p>
            </div>

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

        {isPremium && (
          <section className="premium-active-card">
            <div className="premium-active-icon">
              <FaCrown />
            </div>

            <div>
              <span>NOIR PREMIUM</span>

              <h2>
                Sua experiência Premium está ativa.
              </h2>

              <p>
                Sua conta possui acesso aos recursos
                exclusivos do Noir Avenue.
              </p>
            </div>

            <div className="premium-active-status">
              <FaCheck />
              Ativo
            </div>
          </section>
        )}

            <div className="settings-save-container">
              <button
                type="button"
                className="settings-save-button"
                onClick={handleSaveSettings}>
              <FaCheck />
                Salvar alterações
              </button>
            </div>
      </div>
    </main>
  );
}

export default Configuracoes;

