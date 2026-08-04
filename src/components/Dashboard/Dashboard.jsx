import "./Dashboard.css";
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
} from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();

  const session =
    JSON.parse(
      localStorage.getItem("noiravenue_session")
    ) || {};

  const user = session;

  const favorites =
    JSON.parse(
      localStorage.getItem("noiravenue_favorites")
    ) || [];

  const activities =
    JSON.parse(
      localStorage.getItem("noiravenue_activities")
    ) || [
      {
        id: 1,
        message: "Bem-vindo ao Noir Avenue.",
        createdAt: new Date().toISOString(),
      },
    ];

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
      icon: <FaUser />,
      route: "/dashboard/perfil",
    },
    {
      title: "Favoritos",
      description: "Acesse os itens que você salvou.",
      icon: <FaHeart />,
      route: "/dashboard/favoritos",
    },
    {
      title: "Configurações",
      description: "Personalize sua experiência.",
      icon: <FaCog />,
      route: "/dashboard/configuracoes",
    },
    {
      title: "Noir Premium",
      description: "Descubra benefícios exclusivos.",
      icon: <FaCrown />,
      route: "/dashboard/premium",
      premium: true,
    },
    {
      title: "Histórico",
      description: "Consulte suas atividades recentes.",
      icon: <FaClock />,
      route: "/dashboard/historico",
    },
  ];

  const logout = () => {
    localStorage.removeItem("noiravenue_session");
    navigate("/");
  };

  return (
    <div className="layout">
      <aside className="sidebar">
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
              onClick={() => navigate(item.route)}
            >
              <span className="nav-icon">{item.icon}</span>

              <span className="nav-content">
                <span>{item.title}</span>

                {item.premium && (
                  <small>EXCLUSIVO</small>
                )}
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

            <p>
              Eleve sua experiência.
            </p>
          </div>

          <button
            onClick={() =>
              navigate("/dashboard/premium")
            }
          >
            <FaArrowRight />
          </button>
        </div>
      </aside>

      <main className="dashboard-container">
        <header className="dashboard-header">
          <div className="header-user">
            <span className="welcome-label">
              ÁREA DO CLIENTE
            </span>

            <h1>
              {greeting},{" "}
              <span>{user.name}</span>
            </h1>

            <p>
              Seu último acesso foi{" "}
              {session.loginAt
                ? timeAgo(session.loginAt)
                : "agora mesmo"}.
            </p>
          </div>

          <div className="header-actions">
            <button
              className="icon-button"
              aria-label="Notificações"
            >
              <FaBell />
            </button>

            <button
              className="icon-button"
              aria-label="Buscar"
            >
              <FaSearch />
            </button>

            <button
              className="logout-button"
              onClick={logout}
            >
              <FaSignOutAlt />
              Sair
            </button>
          </div>
        </header>

        <section className="dashboard-banner">
          <div className="banner-content">
            <span className="banner-label">
              NOIR AVENUE
            </span>

            <h2>
              Uma experiência feita
              para você.
            </h2>

            <p>
              Explore suas preferências,
              acompanhe sua jornada e
              descubra uma experiência
              cada vez mais personalizada.
            </p>

            <button
              className="banner-button"
              onClick={() =>
                navigate("/dashboard/favoritos")
              }
            >
              Explorar experiência
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
              <span>VISÃO GERAL</span>
              <h2>Seu espaço</h2>
            </div>
          </div>

          <div className="dashboard-stats">
            <div className="stat-card">
              <div className="stat-header">
                <span>Favoritos</span>
                <FaHeart />
              </div>

              <strong>{favorites.length}</strong>

              <p>
                Itens salvos por você
              </p>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <span>Coleções</span>
                <FaCompass />
              </div>

              <strong>04</strong>

              <p>
                Coleções disponíveis
              </p>
            </div>

            <div className="stat-card premium-stat">
              <div className="stat-header">
                <span>Premium</span>
                <FaCrown />
              </div>

              <strong>
                {user.isPremium
                  ? "Ativo"
                  : "Inativo"}
              </strong>

              <p>
                {user.isPremium
                  ? "Benefícios desbloqueados"
                  : "Conheça o Noir Premium"}
              </p>
            </div>

            <div className="stat-card">
              <div className="stat-header">
                <span>Perfil</span>
                <FaUser />
              </div>

              <strong>
                {profilePercentage}%
              </strong>

              <p>
                Perfil preenchido
              </p>
            </div>
          </div>
        </section>

        <section className="dashboard-content-grid">
          <div className="activity">
            <div className="section-heading compact">
              <div>
                <span>ACOMPANHE</span>
                <h2>Atividades recentes</h2>
              </div>

              <button
                onClick={() =>
                  navigate("/dashboard/historico")
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
                    <strong>
                      {item.message}
                    </strong>

                    <span>
                      {timeAgo(item.createdAt)}
                    </span>
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
              <strong>
                {profilePercentage}%
              </strong>
            </div>

            <p>
              Mantenha suas informações
              atualizadas para aproveitar
              melhor a experiência.
            </p>

            <button
              onClick={() =>
                navigate("/dashboard/perfil")
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
              <span>ACESSO RÁPIDO</span>
              <h2>Explore sua plataforma</h2>
            </div>
          </div>

          <div className="dashboard-actions">
            {actions.map((item) => (
              <div
                key={item.title}
                className={`action-card ${
                  item.premium
                    ? "action-card-premium"
                    : ""
                }`}
                onClick={() =>
                  navigate(item.route)
                }
              >
                <div className="action-icon">
                  {item.icon}
                </div>

                <h3>{item.title}</h3>

                <p>
                  {item.description}
                </p>

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
