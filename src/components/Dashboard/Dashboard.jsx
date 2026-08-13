import "./Dashboard.css";
import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo";

import {
  FaUser,
  FaHeart,
  FaCrown,
  FaCog,
  FaSignOutAlt,
  FaClock,
  FaBell,
  FaSearch,
  FaArrowRight,
  FaCompass,
  FaTimes,
  FaCheck,
} from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  const session =
    JSON.parse(localStorage.getItem("noiravenue_session")) || {};

  const user = session;
  const theme = user.theme || "Dark";
  const language = user.language || "Português";

  const translations = {
  Português: {
    area: "ÁREA DO CLIENTE",
    lastAccess: "Seu último acesso foi",
    bannerTitle: "Uma experiência feita para você.",
    bannerDescription:
      "Explore suas preferências, acompanhe sua jornada e descubra uma experiência cada vez mais personalizada.",
    explore: "Explorar experiência",
    overview: "VISÃO GERAL",
    yourSpace: "Seu espaço",
    favorites: "Favoritos",
    collections: "Coleções",
    premium: "Premium",
    profile: "Perfil",
    recentActivities: "Atividades recentes",
    quickAccess: "ACESSO RÁPIDO",
    explorePlatform: "Explore sua plataforma",
  },

  English: {
    area: "CUSTOMER AREA",
    lastAccess: "Your last access was",
    bannerTitle: "An experience made for you.",
    bannerDescription:
      "Explore your preferences, follow your journey and discover an increasingly personalized experience.",
    explore: "Explore experience",
    overview: "OVERVIEW",
    yourSpace: "Your space",
    favorites: "Favorites",
    collections: "Collections",
    premium: "Premium",
    profile: "Profile",
    recentActivities: "Recent activities",
    quickAccess: "QUICK ACCESS",
    explorePlatform: "Explore your platform",
  },

  Español: {
    area: "ÁREA DEL CLIENTE",
    lastAccess: "Tu último acceso fue",
    bannerTitle: "Una experiencia hecha para ti.",
    bannerDescription:
      "Explora tus preferencias, sigue tu recorrido y descubre una experiencia cada vez más personalizada.",
    explore: "Explorar experiencia",
    overview: "VISIÓN GENERAL",
    yourSpace: "Tu espacio",
    favorites: "Favoritos",
    collections: "Colecciones",
    premium: "Premium",
    profile: "Perfil",
    recentActivities: "Actividades recientes",
    quickAccess: "ACCESO RÁPIDO",
    explorePlatform: "Explora tu plataforma",
  },
};

const t = translations[language] || translations.Português;

  const favorites =
    JSON.parse(localStorage.getItem("noiravenue_favorites")) || [];

  const activities =
    JSON.parse(localStorage.getItem("noiravenue_activities")) || [
      {
        id: 1,
        message: "Bem-vindo ao Noir Avenue.",
        createdAt: new Date().toISOString(),
      },
    ];

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [notificationsReadAt, setNotificationsReadAt] = useState(
    () => localStorage.getItem("noiravenue_notifications_read_at") || ""
  );

  const fields = [
    user.name,
    user.email,
    user.telefone,
    user.endereco,
    user.foto,
  ];

  const profilePercentage = Math.floor(
    (fields.filter(Boolean).length / fields.length) * 100
  );

  const hour = new Date().getHours();

  let greeting = "";

  if (hour >= 5 && hour < 12) {
    greeting = "Bom dia";
  } else if (hour >= 12 && hour < 18) {
    greeting = "Boa tarde";
  } else {
    greeting = "Boa noite";
  }

  const actions = [
    {
      title: "Meu Perfil",
      description: "Gerencie suas informações pessoais.",
      keywords: "perfil conta usuário dados pessoais",
      icon: <FaUser />,
      route: "/dashboard/perfil",
    },
    {
      title: "Favoritos",
      description: "Acesse os itens que você salvou.",
      keywords: "favoritos salvos itens coleção",
      icon: <FaHeart />,
      route: "/dashboard/favoritos",
    },
    {
      title: "Configurações",
      description: "Personalize sua experiência.",
      keywords: "configurações preferências ajustes tema",
      icon: <FaCog />,
      route: "/dashboard/configuracoes",
    },
    {
      title: "Noir Premium",
      description: "Descubra benefícios exclusivos.",
      keywords: "premium assinatura benefícios exclusivo",
      icon: <FaCrown />,
      route: "/dashboard/premium",
      premium: true,
    },
    {
      title: "Histórico",
      description: "Consulte suas atividades recentes.",
      keywords: "histórico atividades recentes jornada",
      icon: <FaClock />,
      route: "/dashboard/historico",
    },
  ];

  const filteredActions = useMemo(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase();

    if (!normalizedTerm) return actions;

    return actions.filter((item) =>
      `${item.title} ${item.description} ${item.keywords}`
        .toLowerCase()
        .includes(normalizedTerm)
    );
  }, [searchTerm]);

  const unreadNotifications = activities.filter((item) => {
    if (!notificationsReadAt) return true;
    return new Date(item.createdAt) > new Date(notificationsReadAt);
  });

  const openSearch = () => {
    setNotificationsOpen(false);
    setSearchOpen(true);

    requestAnimationFrame(() => {
      searchInputRef.current?.focus();
    });
  };

  const closeSearch = () => {
    setSearchOpen(false);
    setSearchTerm("");
  };

  const openNotifications = () => {
    setSearchOpen(false);
    setNotificationsOpen((current) => !current);
  };

  const markNotificationsAsRead = () => {
    const now = new Date().toISOString();

    localStorage.setItem(
      "noiravenue_notifications_read_at",
      now
    );

    setNotificationsReadAt(now);
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Escape") {
      closeSearch();
      return;
    }

    if (event.key === "Enter" && filteredActions.length > 0) {
      navigate(filteredActions[0].route);
      closeSearch();
    }
  };

  const handleNavigate = (route) => {
    navigate(route);
    closeSearch();
    setNotificationsOpen(false);
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeSearch();
        setNotificationsOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const logout = () => {
    localStorage.removeItem("noiravenue_session");
    navigate("/");
  };

  return (
    <div className={`layout ${ theme === "Light" ? "theme-light" : "theme-dark" }`}
>      <aside className="sidebar">
        <div className="sidebar-brand">
          <span>NOIR</span>
          <strong>AVENUE</strong>
        </div>

        <p className="sidebar-label">NAVEGAÇÃO</p>

        <nav>
          {actions.map((item) => (
            <button
              key={item.title}
              className={item.premium ? "premium-nav-item" : ""}
              onClick={() => handleNavigate(item.route)}
            >
              <span className="nav-icon">{item.icon}</span>

              <span className="nav-content">
                <span>{item.title}</span>

                {item.premium && <small>EXCLUSIVO</small>}
              </span>

              {item.premium && (
                <FaCrown className="nav-crown" />
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-premium">
          <div className="sidebar-premium-icon">
            <FaCrown />
          </div>

          <div>
            <strong>Noir Premium</strong>

            <p>Eleve sua experiência.</p>
          </div>

          <button
            onClick={() => handleNavigate("/dashboard/premium")}
            aria-label="Acessar Noir Premium"
          >
            <FaArrowRight />
          </button>
        </div>
      </aside>

      <main className="dashboard-container">
        <header className="dashboard-header">
          <div className="header-user">
            <span className="welcome-label">
              {t.area}
            </span>

            <h1>
              {greeting}, <span>{user.name}</span>
            </h1>

            <p>
              {t.lastAccess}{" "}
              {session.loginAt
                ? timeAgo(session.loginAt)
                  : "agora mesmo"}.
            </p>
          </div>

          <div className="header-actions">
            <div className="header-tool">
              <button
                className={`icon-button ${
                  notificationsOpen ? "active" : ""
                }`}
                aria-label="Notificações"
                aria-expanded={notificationsOpen}
                onClick={openNotifications}
              >
                <FaBell />

                {unreadNotifications.length > 0 && (
                  <span className="notification-badge">
                    {unreadNotifications.length > 9
                      ? "9+"
                      : unreadNotifications.length}
                  </span>
                )}
              </button>

              {notificationsOpen && (
                <div className="notifications-panel">
                  <div className="panel-header">
                    <div>
                      <span>NOIR AVENUE</span>
                      <h3>Notificações</h3>
                    </div>

                    {unreadNotifications.length > 0 && (
                      <button
                        className="panel-action"
                        onClick={markNotificationsAsRead}
                      >
                        <FaCheck />
                        Marcar como lidas
                      </button>
                    )}
                  </div>

                  <div className="notification-list">
                    {activities.length > 0 ? (
                      activities.slice(0, 5).map((item) => {
                        const isUnread =
                          !notificationsReadAt ||
                          new Date(item.createdAt) >
                            new Date(notificationsReadAt);

                        return (
                          <button
                            className={`notification-item ${
                              isUnread ? "unread" : ""
                            }`}
                            key={item.id}
                            onClick={() =>
                              handleNavigate(
                                "/dashboard/historico"
                              )
                            }
                          >
                            <span className="notification-dot" />

                            <span className="notification-content">
                              <strong>{item.message}</strong>
                              <small>
                                {timeAgo(item.createdAt)}
                              </small>
                            </span>
                          </button>
                        );
                      })
                    ) : (
                      <div className="empty-panel">
                        <FaBell />
                        <strong>Nenhuma notificação</strong>
                        <span>
                          Você está em dia por aqui.
                        </span>
                      </div>
                    )}
                  </div>

                  <button
                    className="panel-footer-action"
                    onClick={() =>
                      handleNavigate("/dashboard/historico")
                    }
                  >
                    Ver todas as atividades
                    <FaArrowRight />
                  </button>
                </div>
              )}
            </div>

            <div className="header-tool">
              <button
                className={`icon-button ${
                  searchOpen ? "active" : ""
                }`}
                aria-label="Buscar na plataforma"
                aria-expanded={searchOpen}
                onClick={openSearch}
              >
                <FaSearch />
              </button>
            </div>

            <button
              className="logout-button"
              onClick={logout}
            >
              <FaSignOutAlt />
              Sair
            </button>
          </div>
        </header>

        {searchOpen && (
          <div className="search-overlay" onClick={closeSearch}>
            <div
              className="search-panel"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="search-input-wrapper">
                <FaSearch />

                <input
                  ref={searchInputRef}
                  value={searchTerm}
                  onChange={(event) =>
                    setSearchTerm(event.target.value)
                  }
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Pesquisar na sua área..."
                  aria-label="Pesquisar na plataforma"
                />

                <button
                  className="search-close"
                  onClick={closeSearch}
                  aria-label="Fechar busca"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="search-results">
                <span className="search-results-label">
                  {searchTerm
                    ? "RESULTADOS"
                    : "ACESSO RÁPIDO"}
                </span>

                {filteredActions.length > 0 ? (
                  filteredActions.map((item) => (
                    <button
                      className="search-result"
                      key={item.title}
                      onClick={() =>
                        handleNavigate(item.route)
                      }
                    >
                      <span className="search-result-icon">
                        {item.icon}
                      </span>

                      <span>
                        <strong>{item.title}</strong>
                        <small>{item.description}</small>
                      </span>

                      <FaArrowRight />
                    </button>
                  ))
                ) : (
                  <div className="search-empty">
                    <FaSearch />
                    <strong>Nenhum resultado encontrado</strong>
                    <span>
                      Tente buscar por perfil, favoritos,
                      configurações, premium ou histórico.
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        <section className="dashboard-banner">
          <div className="banner-content">
            <span className="banner-label">NOIR AVENUE</span>

            <h2>{t.bannerTitle}</h2>

            <p>{t.bannerDescription}</p>

            <button
              className="banner-button"
              onClick={() =>
                handleNavigate("/dashboard/favoritos")
              }
            >
              {t.explore}
              <FaArrowRight />
            </button>
          </div>

          <div className="banner-decoration">
            <FaCompass />
          </div>
        </section>

        <section className="dashboard-section">
          <div className="section-heading">
            <div>
             <span>{t.overview}</span>
             <h2>{t.yourSpace}</h2>
            </div>
          </div>

          <div className="dashboard-stats">
            <div className="stat-card">
              <div className="stat-header">
                <span>{t.favorites}</span>
                <FaHeart />
              </div>

              <strong>{favorites.length}</strong>

              <p>Itens salvos por você</p>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <span>Coleções</span>
                <FaCompass />
              </div>

              <strong>04</strong>

              <p>Coleções disponíveis</p>
            </div>

            <div className="stat-card premium-stat">
              <div className="stat-header">
                <span>{t.premium}</span>
                <FaCrown />
              </div>

              <strong>
                {user.isPremium ? "Ativo" : "Inativo"}
              </strong>

              <p>
                {user.isPremium
                  ? "Benefícios desbloqueados"
                  : "Conheça o Noir Premium"}
              </p>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <span>{t.profile}</span>
                <FaUser />
              </div>

              <strong>{profilePercentage}%</strong>

              <p>Perfil preenchido</p>
            </div>
          </div>
        </section>

        <section className="dashboard-content-grid">
          <div className="activity">
            <div className="section-heading compact">
              <div>
                <span>{t.track}</span>
                <h2>{t.recentActivities}</h2>
              </div>

              <button
                onClick={() =>
                  handleNavigate("/dashboard/historico")
                }
              >
                Ver histórico
                <FaArrowRight />
              </button>
            </div>

            <ul>
              {activities.map((item) => (
                <li key={item.id}>
                  <div className="activity-dot" />

                  <div>
                    <strong>{item.message}</strong>

                    <span>{timeAgo(item.createdAt)}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          <div className="profile-progress">
            <div className="section-heading compact">
              <div>
                <span>SEU PERFIL</span>
                <h2>Complete seu perfil</h2>
              </div>
            </div>

            <div className="progress-circle">
              <strong>{profilePercentage}%</strong>
            </div>

            <p>
              Mantenha suas informações
              atualizadas para aproveitar
              melhor a experiência.
            </p>

            <button
              onClick={() =>
                handleNavigate("/dashboard/perfil")
              }
            >
              Atualizar perfil
              <FaArrowRight />
            </button>
          </div>
        </section>

        <section className="dashboard-actions-section">
          <div className="section-heading">
            <div>
             <span>{t.quickAccess}</span>
             <h2>{t.explorePlatform}</h2>
            </div>
          </div>

          <div className="dashboard-actions">
            {actions.map((item) => (
              <div
                key={item.title}
                className={`action-card ${
                  item.premium ? "action-card-premium" : ""
                }`}
                onClick={() => handleNavigate(item.route)}
              >
                <div className="action-icon">{item.icon}</div>

                <h3>{item.title}</h3>

                <p>{item.description}</p>

                <span className="action-link">
                  Acessar
                  <FaArrowRight />
                </span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
