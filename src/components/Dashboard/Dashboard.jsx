
import "./Dashboard.css";
import { useNavigate } from "react-router-dom";
import {
  FaUser, FaHeart, FaCrown, FaCog,
  FaSignOutAlt, FaClock, FaBell, FaSearch
} from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("noiravenue_user")) || {
    nome: "Luiz Felipe"
  };

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
    { title: "Meu Perfil", icon: <FaUser />, route: "/perfil" },
    { title: "Favoritos", icon: <FaHeart />, route: "/favoritos" },
    { title: "Configurações", icon: <FaCog />, route: "/configuracoes" },
    { title: "Noir Premium", icon: <FaCrown />, route: "/premium" },
    { title: "Histórico", icon: <FaClock />, route: "/historico" },
  ];

  const activities = [
    "Login realizado há 5 minutos",
    "Perfil atualizado.",
    "Novo item adicionado aos favoritos.",
  ];

  const logout = () => {
    localStorage.removeItem("noiravenue_session");
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
              onClick={() => navigate(item.route)}
            >
              {item.icon}
              {item.title}
            </button>
          ))}
        </nav>
      </aside>

      <main className="dashboard-container">
        <header className="dashboard-header">
          <div>
            <h1>{greeting}, {user.nome}.</h1>
            <p>Seu último acesso foi hoje.</p>
          </div>

          <div className="header-actions">
            <FaBell />
            <FaSearch />
            <button onClick={logout}>
              <FaSignOutAlt />
              Sair
            </button>
          </div>
        </header>

        <section className="dashboard-banner">
          <h2>Experiência Noir Avenue</h2>
          <p>Elegância, exclusividade e tecnologia em cada interação.</p>
        </section>

        <section className="dashboard-stats">
          <div className="card"><h3>Favoritos</h3><span>12</span></div>
          <div className="card"><h3>Coleções</h3><span>04</span></div>
          <div className="card-premium"><h3>Premium</h3><span>Ativo</span></div>
          <div className="card"><h3>Perfil</h3><span>80%</span></div>
        </section>

        <section className="activity">
          <h2>Atividades Recentes</h2>
          <ul>
            {activities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section className="dashboard-actions">
          {actions.map((item) => (
            <div
              key={item.title}
              className="action-card"
              onClick={() => navigate(item.route)}
            >
              {item.icon}
              <h3>{item.title}</h3>
              <p>Acesse rapidamente esta área da plataforma.</p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
