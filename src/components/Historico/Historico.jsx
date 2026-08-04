import { useMemo, useState } from "react";
import {
  FaClock,
  FaCheckCircle,
  FaUser,
  FaHeart,
  FaSignInAlt,
  FaTrash,
  FaCrown,
  FaFilter,
  FaHistory,
  FaArrowLeft,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo";
import "./Historico.css";

function Historico() {
  const navigate = useNavigate();

  const [activities, setActivities] = useState(() => {
    return (
      JSON.parse(
        localStorage.getItem("noiravenue_activities")
      ) || []
    );
  });

  const [filter, setFilter] = useState("all");

  const getActivityType = (message = "") => {
    const text = message.toLowerCase();

    if (
      text.includes("login") ||
      text.includes("acesso") ||
      text.includes("entrou")
    ) {
      return "login";
    }

    if (
      text.includes("perfil") ||
      text.includes("nome") ||
      text.includes("telefone") ||
      text.includes("endereço")
    ) {
      return "profile";
    }

    if (
      text.includes("favorito") ||
      text.includes("favoritos")
    ) {
      return "favorite";
    }

    if (
      text.includes("premium") ||
      text.includes("assinatura")
    ) {
      return "premium";
    }

    if (
      text.includes("exclu") ||
      text.includes("remov")
    ) {
      return "delete";
    }

    return "system";
  };

  const getActivityIcon = (type) => {
    const icons = {
      login: <FaSignInAlt />,
      profile: <FaUser />,
      favorite: <FaHeart />,
      premium: <FaCrown />,
      delete: <FaTrash />,
      system: <FaCheckCircle />,
    };

    return icons[type] || icons.system;
  };

  const getActivityLabel = (type) => {
    const labels = {
      login: "Acesso",
      profile: "Perfil",
      favorite: "Favoritos",
      premium: "Premium",
      delete: "Conta",
      system: "Sistema",
    };

    return labels[type] || "Sistema";
  };

  const filteredActivities = useMemo(() => {
    if (filter === "all") {
      return activities;
    }

    return activities.filter(
      (item) =>
        getActivityType(item.message) === filter
    );
  }, [activities, filter]);

  const clearHistory = () => {
    const confirmed = window.confirm(
      "Deseja realmente limpar todo o seu histórico de atividades?"
    );

    if (!confirmed) return;

    localStorage.removeItem(
      "noiravenue_activities"
    );

    setActivities([]);
  };

  const filters = [
    {
      value: "all",
      label: "Todas",
    },
    {
      value: "login",
      label: "Acessos",
    },
    {
      value: "profile",
      label: "Perfil",
    },
    {
      value: "favorite",
      label: "Favoritos",
    },
    {
      value: "premium",
      label: "Premium",
    },
  ];

  return (
    <main className="history-page">
      <header className="history-header">
        <div className="history-heading">
          <div className="history-title-icon">
            <FaHistory />
          </div>

          <div>
            <span className="history-eyebrow">
              NOIR AVENUE
            </span>

            <h1>Histórico de atividades</h1>

            <p>
              Acompanhe as principais ações
              realizadas na sua conta.
            </p>
          </div>
        </div>

        <div className="history-header-actions">
          <button
            className="back-dashboard"
            onClick={() => navigate("/dashboard")}
          >
            <FaArrowLeft />
            Voltar para Dashboard
          </button>

          {activities.length > 0 && (
            <button
              className="clear-history"
              onClick={clearHistory}
            >
              <FaTrash />
              Limpar histórico
            </button>
          )}
        </div>
      </header>

      <section className="history-summary">
        <div className="summary-card">
          <div className="summary-icon">
            <FaClock />
          </div>

          <div>
            <span>ATIVIDADES</span>

            <strong>{activities.length}</strong>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">
            <FaCheckCircle />
          </div>

          <div>
            <span>STATUS</span>

            <strong>Conta ativa</strong>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">
            <FaHistory />
          </div>

          <div>
            <span>EXIBINDO</span>

            <strong>
              {filteredActivities.length}
            </strong>
          </div>
        </div>
      </section>

      <section className="history-content">
        <div className="history-toolbar">
          <div className="filter-title">
            <FaFilter />

            <strong>
              Filtrar atividades
            </strong>
          </div>

          <div className="history-filters">
            {filters.map((item) => (
              <button
                key={item.value}
                className={
                  filter === item.value
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setFilter(item.value)
                }
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {filteredActivities.length === 0 ? (
          <div className="history-empty">
            <div className="empty-icon">
              <FaHistory />
            </div>

            <h2>
              {activities.length === 0
                ? "Nenhuma atividade registrada"
                : "Nenhuma atividade encontrada"}
            </h2>

            <p>
              {activities.length === 0
                ? "Quando você realizar ações na plataforma, elas aparecerão aqui."
                : "Não encontramos atividades para o filtro selecionado."}
            </p>

            {filter !== "all" && (
              <button
                onClick={() =>
                  setFilter("all")
                }
              >
                Ver todas as atividades
              </button>
            )}
          </div>
        ) : (
          <div className="timeline">
            {filteredActivities.map(
              (item, index) => {
                const type =
                  getActivityType(
                    item.message
                  );

                return (
                  <article
                    className="timeline-item"
                    key={
                      item.id ||
                      `${item.createdAt}-${index}`
                    }
                  >
                    <div
                      className={`timeline-icon ${type}`}
                    >
                      {getActivityIcon(type)}
                    </div>

                    {index <
                      filteredActivities.length -
                        1 && (
                      <div className="timeline-line" />
                    )}

                    <div className="activity-card">
                      <div className="activity-card-header">
                        <span
                          className={`activity-category ${type}`}
                        >
                          {getActivityLabel(
                            type
                          )}
                        </span>

                        <time>
                          {item.createdAt
                            ? new Date(
                                item.createdAt
                              ).toLocaleString(
                                "pt-BR",
                                {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                }
                              )
                            : "Data não disponível"}
                        </time>
                      </div>

                      <div className="activity-message">
                        <strong>
                          {item.message}
                        </strong>

                        <span>
                          {item.createdAt
                            ? timeAgo(
                                item.createdAt
                              )
                            : ""}
                        </span>
                      </div>
                    </div>
                  </article>
                );
              }
            )}
          </div>
        )}
      </section>

      <footer className="history-footer">
        <FaClock />

        <span>
          O histórico é armazenado localmente
          neste dispositivo.
        </span>
      </footer>
    </main>
  );
}

export default Historico;