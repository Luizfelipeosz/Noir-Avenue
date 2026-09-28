import { useEffect, useMemo, useState } from "react";
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
  FaShoppingCart,
  FaBoxOpen,
  FaCreditCard,
  FaUserPlus,
  FaSignOutAlt,
  FaLock,
  FaMapMarkerAlt,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import {
  getActivities,
  clearActivities,
} from "../../utils/activityLogger";

import { timeAgo } from "../../utils/timeAgo";

import "./Historico.css";

function Historico() {
  const navigate = useNavigate();

  const [activities, setActivities] = useState(() =>
    getActivities()
  );

  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const handleActivity = () => {
      setActivities(getActivities());
    };

    const handleClear = () => {
      setActivities([]);
    };

    window.addEventListener(
      "noiravenue:activity",
      handleActivity
    );

    window.addEventListener(
      "noiravenue:activity:clear",
      handleClear
    );

    return () => {
      window.removeEventListener(
        "noiravenue:activity",
        handleActivity
      );

      window.removeEventListener(
        "noiravenue:activity:clear",
        handleClear
      );
    };
  }, []);

  const activityTypes = {
    login: {
      label: "Acesso",
      icon: <FaSignInAlt />,
    },

    register: {
      label: "Cadastro",
      icon: <FaUserPlus />,
    },

    profile: {
      label: "Perfil",
      icon: <FaUser />,
    },

    favorite: {
      label: "Favoritos",
      icon: <FaHeart />,
    },

    cart: {
      label: "Carrinho",
      icon: <FaShoppingCart />,
    },

    purchase: {
      label: "Compra",
      icon: <FaCreditCard />,
    },

    order: {
      label: "Pedido",
      icon: <FaBoxOpen />,
    },

    address: {
      label: "Endereço",
      icon: <FaMapMarkerAlt />,
    },

    password: {
      label: "Segurança",
      icon: <FaLock />,
    },

    premium: {
      label: "Premium",
      icon: <FaCrown />,
    },

    logout: {
      label: "Sessão",
      icon: <FaSignOutAlt />,
    },

    delete: {
      label: "Conta",
      icon: <FaTrash />,
    },

    system: {
      label: "Sistema",
      icon: <FaCheckCircle />,
    },
  };

  const getActivityConfig = (type) => {
    return (
      activityTypes[type] ||
      activityTypes.system
    );
  };

  const formatDate = (date) => {
    if (!date) {
      return "Data não disponível";
    }

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "Data não disponível";
    }

    return parsedDate.toLocaleString(
      "pt-BR",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  const filteredActivities = useMemo(() => {
    if (filter === "all") {
      return activities;
    }

    return activities.filter(
      (item) => item.type === filter
    );
  }, [activities, filter]);

  const clearHistory = () => {
    const confirmed = window.confirm(
      "Deseja realmente limpar todo o seu histórico de atividades?"
    );

    if (!confirmed) {
      return;
    }

    clearActivities();
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
      value: "cart",
      label: "Carrinho",
    },

    {
      value: "purchase",
      label: "Compras",
    },

    {
      value: "favorite",
      label: "Favoritos",
    },

    {
      value: "profile",
      label: "Perfil",
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
            type="button"
            className="back-dashboard"
            onClick={() =>
              navigate("/dashboard")
            }
          >
            <FaArrowLeft />

            <span>
              Voltar para Dashboard
            </span>
          </button>

          {activities.length > 0 && (
            <button
              type="button"
              className="clear-history"
              onClick={clearHistory}
            >
              <FaTrash />

              <span>
                Limpar histórico
              </span>
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

            <strong>
              {activities.length}
            </strong>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">
            <FaCheckCircle />
          </div>

          <div>
            <span>STATUS</span>

            <strong>
              Conta ativa
            </strong>
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
                type="button"
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
                type="button"
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
                const config =
                  getActivityConfig(
                    item.type
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
                      className={`timeline-icon ${item.type}`}
                    >
                      {config.icon}
                    </div>

                    {index <
                      filteredActivities.length -
                        1 && (
                      <div className="timeline-line" />
                    )}

                    <div className="activity-card">
                      <div className="activity-card-header">
                        <span
                          className={`activity-category ${item.type}`}
                        >
                          {config.label}
                        </span>

                        <time
                          dateTime={
                            item.createdAt
                          }
                          title={formatDate(
                            item.createdAt
                          )}
                        >
                          {formatDate(
                            item.createdAt
                          )}
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