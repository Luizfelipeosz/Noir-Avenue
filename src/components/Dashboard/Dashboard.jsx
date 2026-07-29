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
} from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();

  const session =
  JSON.parse(
    localStorage.getItem(
      "noiravenue_session"
    )
  ) || {};

  const user = session;

  const favorites =
    JSON.parse(
      localStorage.getItem(
        "noiravenue_favorites"
      )
    ) || [];

  const activities =
    JSON.parse(
      localStorage.getItem(
        "noiravenue_activities"
      )
    ) || [
      {
        id: 1,
        message: "Bem-vindo ao Noir Avenue.",
        createdAt:
          new Date().toISOString(),
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
    (fields.filter(Boolean).length /
      fields.length) *
      100
  );

  const hour = new Date().getHours();

  let greeting = "";

  if (hour >= 5 && hour < 12) {
    greeting = "Bom dia";
  } else if (
    hour >= 12 &&
    hour < 18
  ) {
    greeting = "Boa tarde";
  } else {
    greeting = "Boa noite";
  }

  const actions = [
    {
      title: "Meu Perfil",
      icon: <FaUser />,
      route: "/dashboard/perfil",
    },
    {
      title: "Favoritos",
      icon: <FaHeart />,
      route: "/dashboard/favoritos",
    },
    {
      title: "Configurações",
      icon: <FaCog />,
      route:
        "/dashboard/configuracoes",
    },
    {
      title: "Noir Premium",
      icon: <FaCrown />,
      route: "/dashboard/premium",
    },
    {
      title: "Histórico",
      icon: <FaClock />,
      route: "/dashboard/historico",
    },
  ];

  const logout = () => {
    localStorage.removeItem(
      "noiravenue_session"
    );

    navigate("/");
  };

  return (
    <div className="layout">
      <aside className="sidebar">
        <h2>NOIR AVENUE</h2>

        <nav>
          {actions.map((item) => (
            <button
              key={item.title}
              onClick={() =>
                navigate(item.route)
              }
            >
              {item.icon}
              {item.title}
            </button>
          ))}
        </nav>
      </aside>

      <main className="dashboard-container">
        <header className="dashboard-header">
          <div className="header-user">
            <h1>
              {greeting}, {user.name}
            </h1>

            <p>
              Seu último acesso foi{" "}
              {session.loginAt
                ? timeAgo(
                    session.loginAt
                  )
                : "agora mesmo"}.
            </p>
          </div>

          <div className="header-actions">
            <FaBell />
            <FaSearch />

            <button
              onClick={logout}
            >
              <FaSignOutAlt />
              Sair
            </button>
          </div>
        </header>

        <section className="dashboard-banner">
          <h2>
            Experiência Noir
            Avenue
          </h2>

          <p>
            Elegância,
            exclusividade e
            tecnologia em cada
            interação.
          </p>
        </section>

        <section className="dashboard-stats">
          <div className="card">
            <h3>Favoritos</h3>

            <span>
              {favorites.length}
            </span>
          </div>

          <div className="card">
            <h3>Coleções</h3>

            <span>04</span>
          </div>

          <div className="card-premium">
            <h3>Premium</h3>

            <span>
              {user.isPremium
                ? "Ativo"
                : "Inativo"}
            </span>
          </div>

          <div className="card">
            <h3>Perfil</h3>

            <span>
              {
                profilePercentage
              }
              %
            </span>
          </div>
        </section>

        <section className="activity">
          <h2>
            Atividades
            Recentes
          </h2>

          <ul>
            {activities.map(
              (item) => (
                <li
                  key={item.id}
                >
                  {item.message}
                  {" • "}
                  {timeAgo(
                    item.createdAt
                  )}
                </li>
              )
            )}
          </ul>
        </section>

        <section className="dashboard-actions">
          {actions.map((item) => (
            <div
              key={item.title}
              className="action-card"
              onClick={() =>
                navigate(item.route)
              }
            >
              {item.icon}

              <h3>
                {item.title}
              </h3>

              <p>
                Acesse
                rapidamente esta
                área da
                plataforma.
              </p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
