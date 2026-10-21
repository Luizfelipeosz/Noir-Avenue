import "./Dashboard.css";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo";
import { categories } from "../../data/categories";

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
  FaShoppingBag,
  FaShoppingCart,
  FaBars,
} from "react-icons/fa";

import {
  readActivities,
  subscribeToNotifications,
  markAllNotificationsAsRead,
} from "../../utils/notifications";

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

function readLocalStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);

    if (!value) {
      return fallback;
    }

    const parsed = JSON.parse(value);

    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function Dashboard() {
  const navigate = useNavigate();
  const searchInputRef = useRef(null);

  const [session, setSession] = useState(() =>
    readLocalStorage("noiravenue_session", {})
  );

  const user = session || {};
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

  const [favorites, setFavorites] = useState(() =>
    readLocalStorage("noiravenue_favorites", [])
  );

  const [activities, setActivities] = useState(() =>
    readActivities()
  );

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  const [sidebarHovered, setSidebarHovered] = useState(false);
  const [sidebarFocused, setSidebarFocused] = useState(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const sidebarOpen =
    sidebarHovered || sidebarFocused || mobileSidebarOpen;

  const profilePercentage = calculateProfileCompletion(user);
  const hour = new Date().getHours();

  const greeting =
    hour >= 5 && hour < 12
      ? "Bom dia"
      : hour >= 12 && hour < 18
        ? "Boa tarde"
        : "Boa noite";

  const actions = useMemo(
    () => [
      {
        title: "Meu Perfil",
        description: "Gerencie suas informações pessoais.",
        keywords: "perfil conta usuário dados pessoais",
        icon: <FaUser />,
        iconClass: "nav-icon-profile",
        route: "/dashboard/perfil",
      },
      {
        title: "Favoritos",
        description: "Acesse os itens que você salvou.",
        keywords: "favoritos salvos itens coleção",
        icon: <FaHeart />,
        iconClass: "nav-icon-favorites",
        route: "/dashboard/favoritos",
      },
      {
        title: "Catálogo",
        description: "Explore nossa coleção.",
        keywords: "catálogo produtos coleção roupas",
        icon: <FaShoppingBag />,
        iconClass: "nav-icon-catalog",
        route: "/dashboard/catalogo",
      },
      {
        title: "Carrinho",
        description: "Confira seus itens selecionados.",
        keywords: "carrinho compras itens selecionados",
        icon: <FaShoppingCart />,
        iconClass: "nav-icon-cart",
        route: "/dashboard/cart",
      },
      {
        title: "Configurações",
        description: "Personalize sua experiência.",
        keywords: "configurações preferências ajustes tema",
        icon: <FaCog />,
        iconClass: "nav-icon-settings",
        route: "/dashboard/configuracoes",
      },
      {
        title: "Noir Premium",
        description: "Descubra benefícios exclusivos.",
        keywords: "premium assinatura benefícios exclusivo",
        icon: <FaCrown />,
        iconClass: "nav-icon-premium",
        route: "/dashboard/premium",
        premium: true,
      },
      {
        title: "Histórico",
        description: "Consulte suas atividades recentes.",
        keywords: "histórico atividades recentes jornada",
        icon: <FaClock />,
        iconClass: "nav-icon-history",
        route: "/dashboard/historico",
      },
    ],
    []
  );

  const filteredActions = useMemo(() => {
    const normalizedTerm = searchTerm.trim().toLowerCase();

    if (!normalizedTerm) {
      return actions;
    }

    return actions.filter((item) =>
      `${item.title} ${item.description} ${item.keywords}`
        .toLowerCase()
        .includes(normalizedTerm)
    );
  }, [actions, searchTerm]);

  const sortedActivities = useMemo(() => {
    return [...activities].sort((a, b) => {
      const dateA = new Date(a.createdAt || 0).getTime();
      const dateB = new Date(b.createdAt || 0).getTime();

      return (
        (Number.isFinite(dateB) ? dateB : 0) -
        (Number.isFinite(dateA) ? dateA : 0)
      );
    });
  }, [activities]);

  const unreadNotifications = useMemo(
    () => activities.filter((item) => item.read !== true),
    [activities]
  );

  // Atualiza as atividades e acompanha alterações feitas por outros componentes.
  useEffect(() => {
    const refreshActivities = () => {
      setActivities(readActivities());
    };

    refreshActivities();

    return subscribeToNotifications((updatedActivities) => {
      setActivities(
        Array.isArray(updatedActivities)
          ? updatedActivities
          : readActivities()
      );
    });
  }, []);

  // Mantém os dados do usuário e os favoritos atualizados.
  useEffect(() => {
    const refreshStoredData = () => {
      setSession(readLocalStorage("noiravenue_session", {}));
      setFavorites(readLocalStorage("noiravenue_favorites", []));
    };

    window.addEventListener("storage", refreshStoredData);
    window.addEventListener("focus", refreshStoredData);

    return () => {
      window.removeEventListener("storage", refreshStoredData);
      window.removeEventListener("focus", refreshStoredData);
    };
  }, []);

  const toggleMobileSidebar = () => {
    setMobileSidebarOpen((current) => !current);
  };

  const closeSidebarOnMobile = () => {
    if (window.innerWidth <= 800) {
      setMobileSidebarOpen(false);
    }
  };

  const closeSearch = useCallback(() => {
    setSearchOpen(false);
    setSearchTerm("");
  }, []);

  const openSearch = () => {
    setNotificationsOpen(false);
    setSearchOpen(true);

    requestAnimationFrame(() => {
      searchInputRef.current?.focus();
    });
  };

  const openNotifications = () => {
    setSearchOpen(false);
    setNotificationsOpen((current) => !current);
  };

  const markNotificationsAsRead = () => {
    markAllNotificationsAsRead();
    setActivities(readActivities());
  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Escape") {
      closeSearch();
      return;
    }

    if (event.key === "Enter" && filteredActions.length > 0) {
      navigate(filteredActions[0].route);
      closeSearch();
      closeSidebarOnMobile();
    }
  };

  const handleNavigate = (route) => {
    navigate(route);
    closeSearch();
    setNotificationsOpen(false);
    closeSidebarOnMobile();
  };

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeSearch();
        setNotificationsOpen(false);
        setMobileSidebarOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [closeSearch]);

  const logout = () => {
    localStorage.removeItem("noiravenue_session");
    navigate("/");
  };

  const openActivity = () => {
    markNotificationsAsRead();
    handleNavigate("/dashboard/historico");
  };

  return (
    <div
      className={`layout ${
        theme === "Light" ? "theme-light" : "theme-dark"
      } ${
        sidebarOpen ? "sidebar-open" : "sidebar-collapsed"
      }`}
    >
      <aside
        className="sidebar"
        onMouseEnter={() => {
          if (window.innerWidth > 800) {
            setSidebarHovered(true);
          }
        }}
        onMouseLeave={() => setSidebarHovered(false)}
        onFocusCapture={() => {
          if (window.innerWidth > 800) {
            setSidebarFocused(true);
          }
        }}
        onBlurCapture={(event) => {
          if (
            window.innerWidth > 800 &&
            !event.currentTarget.contains(event.relatedTarget)
          ) {
            setSidebarFocused(false);
          }
        }}
      >
        <button
          type="button"
          className="sidebar-mobile-close"
          onClick={() => setMobileSidebarOpen(false)}
          aria-label="Fechar navegação"
        >
          <FaTimes />
        </button>

        <div className="sidebar-brand">
          <span>NOIR</span>
          <strong>AVENUE</strong>
        </div>

        <p className="sidebar-label">NAVEGAÇÃO</p>

        <nav>
          {actions.map((item) => (
            <button
              key={item.title}
              type="button"
              className={item.premium ? "premium-nav-item" : ""}
              onClick={() => handleNavigate(item.route)}
            >
              <span className={`nav-icon ${item.iconClass}`}>
                {item.icon}
              </span>

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
      </aside>

      <main className="dashboard-container">
        <button
          type="button"
          className="sidebar-toggle"
          onClick={toggleMobileSidebar}
          aria-label={
            mobileSidebarOpen
              ? "Fechar navegação"
              : "Abrir navegação"
          }
          aria-expanded={mobileSidebarOpen}
        >
          {mobileSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>

        <header className="dashboard-header">
          <div className="header-user">
            <span className="welcome-label">{t.area}</span>

            <h1>
              {greeting},{" "}
              <span>{user.name || "Cliente"}</span>
            </h1>

            <p>
              {t.lastAccess}{" "}
              {session.loginAt
                ? timeAgo(session.loginAt)
                : "agora mesmo"}
              .
            </p>
          </div>

          <div className="header-actions">
            <div className="header-tool">
              <button
                type="button"
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
                        type="button"
                        className="panel-action"
                        onClick={markNotificationsAsRead}
                      >
                        <FaCheck />
                        Marcar como lidas
                      </button>
                    )}
                  </div>

                  <div className="notification-list">
                    {sortedActivities.length > 0 ? (
                      sortedActivities.slice(0, 5).map((item) => {
                        const isUnread = item.read !== true;

                        return (
                          <button
                            type="button"
                            className={`notification-item ${
                              isUnread ? "unread" : ""
                            }`}
                            key={item.id}
                            onClick={openActivity}
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
                          Quando houver atividades na sua conta, elas
                          aparecerão aqui.
                        </span>
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    className="panel-footer-action"
                    onClick={openActivity}
                  >
                    Ver todas as atividades
                    <FaArrowRight />
                  </button>
                </div>
              )}
            </div>

            <div className="header-tool">
              <button
                type="button"
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
              type="button"
              className="logout-button"
              onClick={logout}
            >
              <FaSignOutAlt />
              Sair
            </button>
          </div>
        </header>

        {searchOpen && (
          <div
            className="search-overlay"
            onClick={closeSearch}
          >
            <div
              className="search-panel"
              onClick={(event) => event.stopPropagation()}
            >
              <div className="search-input-wrapper">
                <FaSearch />

                <input
                  ref={searchInputRef}
                  value={searchTerm}
                  onChange={(event) => setSearchTerm(event.target.value)}
                  onKeyDown={handleSearchKeyDown}
                  placeholder="Pesquisar na sua área..."
                  aria-label="Pesquisar na plataforma"
                />

                <button
                  type="button"
                  className="search-close"
                  onClick={closeSearch}
                  aria-label="Fechar busca"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="search-results">
                <span className="search-results-label">
                  {searchTerm ? "RESULTADOS" : "ACESSO RÁPIDO"}
                </span>

                {filteredActions.length > 0 ? (
                  filteredActions.map((item) => (
                    <button
                      type="button"
                      className="search-result"
                      key={item.title}
                      onClick={() => handleNavigate(item.route)}
                    >
                      <span
                        className={`search-result-icon ${item.iconClass}`}
                        aria-hidden="true"
                      >
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
                      Tente buscar por perfil, favoritos, configurações,
                      premium ou histórico.
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
              type="button"
              className="banner-button"
              onClick={() => handleNavigate("/dashboard/catalogo")}
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
            <div
              className="stat-card"
              role="link"
              tabIndex={0}
              aria-label="Acessar Favoritos"
              onClick={() => handleNavigate("/dashboard/favoritos")}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleNavigate("/dashboard/favoritos");
                }
              }}
            >
              <div className="stat-header">
                <span>{t.favorites}</span>
                <FaHeart />
              </div>

              <strong>{favorites.length}</strong>
              <p>Itens salvos por você</p>
            </div>

            <div
              className="stat-card"
              role="link"
              tabIndex={0}
              aria-label="Acessar Catálogo"
              onClick={() => handleNavigate("/dashboard/catalogo")}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleNavigate("/dashboard/catalogo");
                }
              }}
            >
              <div className="stat-header">
                <span>{t.collections}</span>
                <FaCompass />
              </div>

              <strong>{String(categories.length).padStart(2, "0")}</strong>
              <p>Coleções disponíveis</p>
            </div>

            <div
              className="stat-card premium-stat"
              role="link"
              tabIndex={0}
              aria-label="Acessar Noir Premium"
              onClick={() => handleNavigate("/dashboard/premium")}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleNavigate("/dashboard/premium");
                }
              }}
            >
              <div className="stat-header">
                <span>{t.premium}</span>
                <FaCrown />
              </div>

              <strong>{user.isPremium ? "Ativo" : "Inativo"}</strong>

              <p>
                {user.isPremium
                  ? "Benefícios desbloqueados"
                  : "Conheça o Noir Premium"}
              </p>
            </div>

            <div
              className="stat-card"
              role="link"
              tabIndex={0}
              aria-label="Acessar Perfil"
              onClick={() => handleNavigate("/dashboard/perfil")}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  handleNavigate("/dashboard/perfil");
                }
              }}
            >
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
                <span>ACOMPANHAMENTO</span>
                <h2>{t.recentActivities}</h2>
              </div>

              <button
                type="button"
                onClick={() => handleNavigate("/dashboard/historico")}
              >
                Ver histórico
                <FaArrowRight />
              </button>
            </div>

            <ul>
              {sortedActivities.slice(0, 5).map((item) => (
                <li key={item.id}>
                  <div className="activity-dot" />

                  <div>
                    <strong>{item.message}</strong>
                    <span>{timeAgo(item.createdAt)}</span>
                  </div>
                </li>
              ))}

              {sortedActivities.length === 0 && (
                <li className="activity-empty">
                  <div>
                    <strong>Nenhuma atividade registrada</strong>
                    <span>
                      Suas ações aparecerão aqui quando forem registradas.
                    </span>
                  </div>
                </li>
              )}
            </ul>
          </div>

          <div className="profile-progress">
            <div className="section-heading compact">
              <div>
                <span>SEU PERFIL</span>

                <h2>
                  {profilePercentage === 100
                    ? "Perfil completo"
                    : "Complete seu perfil"}
                </h2>
              </div>
            </div>

            <div
              className="progress-circle"
              style={{
                "--profile-progress": `${profilePercentage}%`,
              }}
            >
              <strong>{profilePercentage}%</strong>
            </div>

            <p>
              {profilePercentage === 100
                ? "Seu perfil está completo. Todas as informações principais estão preenchidas."
                : "Mantenha suas informações atualizadas para aproveitar melhor a experiência."}
            </p>

            <button
              type="button"
              onClick={() => handleNavigate("/dashboard/perfil")}
            >
              {profilePercentage === 100
                ? "Ver perfil"
                : "Atualizar perfil"}

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
                role="button"
                aria-label={`${item.title}: ${item.description}`}
                tabIndex={0}
                onKeyDown={(event) => {
                  if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    handleNavigate(item.route);
                  }
                }}
              >
                <div
                  className={`action-icon ${item.iconClass}`}
                  aria-hidden="true"
                >
                  {item.icon}
                </div>

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
