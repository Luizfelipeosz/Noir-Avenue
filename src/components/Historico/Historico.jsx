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
  FaTimes,
  FaExclamationTriangle,
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
  const [showClearModal, setShowClearModal] = useState(false);
  const [isClearing, setIsClearing] = useState(false);
  const [feedback, setFeedback] = useState("");

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

  useEffect(() => {
    if (!feedback) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setFeedback("");
    }, 4000);

    return () => {
      window.clearTimeout(timeout);
    };
  }, [feedback]);

  useEffect(() => {
    if (!showClearModal) {
      return;
    }

    const handleEscape = (event) => {
      if (event.key === "Escape" && !isClearing) {
        setShowClearModal(false);
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, [showClearModal, isClearing]);

  const activityTypes = {
    login: {
      label: "Acesso",
      filterLabel: "Acessos",
      icon: <FaSignInAlt />,
      colorClass: "login",
    },

    register: {
      label: "Cadastro",
      filterLabel: "Cadastros",
      icon: <FaUserPlus />,
      colorClass: "register",
    },

    profile: {
      label: "Perfil",
      filterLabel: "Perfil",
      icon: <FaUser />,
      colorClass: "profile",
    },

    favorite: {
      label: "Favoritos",
      filterLabel: "Favoritos",
      icon: <FaHeart />,
      colorClass: "favorite",
    },

    cart: {
      label: "Carrinho",
      filterLabel: "Carrinho",
      icon: <FaShoppingCart />,
      colorClass: "cart",
    },

    purchase: {
      label: "Compra",
      filterLabel: "Compras",
      icon: <FaCreditCard />,
      colorClass: "purchase",
    },

    order: {
      label: "Pedido",
      filterLabel: "Pedidos",
      icon: <FaBoxOpen />,
      colorClass: "order",
    },

    address: {
      label: "Endereço",
      filterLabel: "Endereços",
      icon: <FaMapMarkerAlt />,
      colorClass: "address",
    },

    password: {
      label: "Segurança",
      filterLabel: "Segurança",
      icon: <FaLock />,
      colorClass: "password",
    },

    premium: {
      label: "Premium",
      filterLabel: "Premium",
      icon: <FaCrown />,
      colorClass: "premium",
    },

    logout: {
      label: "Sessão",
      filterLabel: "Sessão",
      icon: <FaSignOutAlt />,
      colorClass: "logout",
    },

    delete: {
      label: "Conta",
      filterLabel: "Conta",
      icon: <FaTrash />,
      colorClass: "delete",
    },

    system: {
      label: "Sistema",
      filterLabel: "Sistema",
      icon: <FaCheckCircle />,
      colorClass: "system",
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

  const filters = useMemo(() => {
    const availableTypes = Object.entries(
      activityTypes
    );

    return [
      {
        value: "all",
        label: "Todas",
        count: activities.length,
      },

      ...availableTypes.map(
        ([value, config]) => ({
          value,
          label: config.filterLabel,
          count: activities.filter(
            (item) => item.type === value
          ).length,
        })
      ),
    ];
  }, [activities]);

  const filteredActivities = useMemo(() => {
    if (filter === "all") {
      return activities;
    }

    return activities.filter(
      (item) => item.type === filter
    );
  }, [activities, filter]);

  const clearHistory = () => {
    if (activities.length === 0) {
      return;
    }

    setShowClearModal(true);
  };

  const confirmClearHistory = () => {
    if (isClearing) {
      return;
    }

    setIsClearing(true);

    try {
      clearActivities();

      setActivities([]);
      setFilter("all");
      setShowClearModal(false);
      setFeedback(
        "Seu histórico de atividades foi limpo."
      );
    } finally {
      setIsClearing(false);
    }
  };

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const getActivityKey = (item, index) => {
    if (item.id) {
      return item.id;
    }

    return `${item.type || "activity"}-${
      item.createdAt || "unknown"
    }-${index}`;
  };

  return (
    <main className="history-page">
      {feedback && (
        <div
          className="history-feedback"
          role="status"
          aria-live="polite"
        >
          <div className="feedback-icon">
            <FaCheckCircle />
          </div>

          <div className="feedback-content">
            <strong>Histórico atualizado</strong>

            <span>{feedback}</span>
          </div>

          <button
            type="button"
            className="feedback-close"
            onClick={() => setFeedback("")}
            aria-label="Fechar aviso"
            title="Fechar aviso"
          >
            <FaTimes />
          </button>
        </div>
      )}

      <header className="history-header">
        <div className="history-heading">
          <div
            className="history-title-icon"
            aria-hidden="true"
          >
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
            onClick={() => navigate("/dashboard")}
            title="Voltar para o Dashboard"
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
              title="Limpar todo o histórico"
            >
              <FaTrash />

              <span>
                Limpar histórico
              </span>
            </button>
          )}
        </div>
      </header>

      <section
        className="history-summary"
        aria-label="Resumo do histórico"
      >
        <div className="summary-card">
          <div className="summary-icon">
            <FaClock />
          </div>

          <div className="summary-content">
            <span>ATIVIDADES</span>

            <strong>{activities.length}</strong>

            <small>
              {activities.length === 1
                ? "registro armazenado"
                : "registros armazenados"}
            </small>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon success">
            <FaCheckCircle />
          </div>

          <div className="summary-content">
            <span>STATUS</span>

            <strong>Conta ativa</strong>

            <small>
              Histórico funcionando normalmente
            </small>
          </div>
        </div>

        <div className="summary-card">
          <div className="summary-icon">
            <FaHistory />
          </div>

          <div className="summary-content">
            <span>EXIBINDO</span>

            <strong>
              {filteredActivities.length}
            </strong>

            <small>
              {filter === "all"
                ? "todos os registros"
                : "registros filtrados"}
            </small>
          </div>
        </div>
      </section>

      <section className="history-content">
        <div className="history-toolbar">
          <div className="filter-title">
            <div className="filter-title-icon">
              <FaFilter />
            </div>

            <div>
              <strong>Filtrar atividades</strong>

              <span>
                Encontre rapidamente uma ação específica
              </span>
            </div>
          </div>

          <div
            className="history-filters"
            role="group"
            aria-label="Filtros de atividades"
          >
            {filters.map((item) => (
              <button
                key={item.value}
                type="button"
                className={
                  filter === item.value
                    ? "active"
                    : ""
                }
                aria-pressed={
                  filter === item.value
                }
                onClick={() =>
                  handleFilterChange(
                    item.value
                  )
                }
                disabled={
                  item.value !== "all" &&
                  item.count === 0
                }
                title={
                  item.count === 0
                    ? `Nenhuma atividade em ${item.label.toLowerCase()}`
                    : `Mostrar ${item.label.toLowerCase()}`
                }
              >
                <span>{item.label}</span>

                <small>{item.count}</small>
              </button>
            ))}
          </div>
        </div>

        {filteredActivities.length === 0 ? (
          <div className="history-empty">
            <div
              className="empty-icon"
              aria-hidden="true"
            >
              {activities.length === 0 ? (
                <FaHistory />
              ) : (
                <FaFilter />
              )}
            </div>

            <span className="empty-eyebrow">
              {activities.length === 0
                ? "HISTÓRICO VAZIO"
                : "NENHUM RESULTADO"}
            </span>

            <h2>
              {activities.length === 0
                ? "Nenhuma atividade registrada"
                : "Nenhuma atividade encontrada"}
            </h2>

            <p>
              {activities.length === 0
                ? "Quando você realizar ações na plataforma, como acessar sua conta, adicionar produtos aos favoritos ou concluir uma compra, elas aparecerão aqui."
                : `Não encontramos atividades na categoria "${
                    filters.find(
                      (item) =>
                        item.value === filter
                    )?.label || "selecionada"
                  }".`}
            </p>

            {activities.length === 0 ? (
              <button
                type="button"
                className="empty-action"
                onClick={() =>
                  navigate("/dashboard")
                }
              >
                <FaArrowLeft />
                Voltar para Dashboard
              </button>
            ) : (
              <button
                type="button"
                className="empty-action"
                onClick={() => setFilter("all")}
              >
                <FaHistory />
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

                const colorClass =
                  config.colorClass;

                return (
                  <article
                    className="timeline-item"
                    key={getActivityKey(
                      item,
                      index
                    )}
                  >
                    <div
                      className={`timeline-marker ${colorClass}`}
                    >
                      <div className="timeline-icon">
                        {config.icon}
                      </div>
                    </div>

                    {index <
                      filteredActivities.length -
                        1 && (
                      <div
                        className="timeline-line"
                        aria-hidden="true"
                      />
                    )}

                    <div className="activity-card">
                      <div className="activity-card-header">
                        <span
                          className={`activity-category ${colorClass}`}
                        >
                          {config.icon}

                          <span>
                            {config.label}
                          </span>
                        </span>

                        <time
                          dateTime={
                            item.createdAt || undefined
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
                          {item.message ||
                            "Atividade registrada."}
                        </strong>

                        {item.createdAt && (
                          <span>
                            {timeAgo(
                              item.createdAt
                            )}
                          </span>
                        )}
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
        <FaLock />

        <span>
          Seu histórico é armazenado localmente
          neste dispositivo.
        </span>
      </footer>

      {showClearModal && (
        <div
          className="history-modal-overlay"
          role="presentation"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget &&
              !isClearing
            ) {
              setShowClearModal(false);
            }
          }}
        >
          <div
            className="history-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="clear-history-title"
            aria-describedby="clear-history-description"
          >
            <button
              type="button"
              className="modal-close"
              onClick={() =>
                setShowClearModal(false)
              }
              disabled={isClearing}
              aria-label="Fechar confirmação"
              title="Fechar"
            >
              <FaTimes />
            </button>

            <div className="modal-warning-icon">
              <FaExclamationTriangle />
            </div>

            <span className="modal-eyebrow">
              AÇÃO IRREVERSÍVEL
            </span>

            <h2 id="clear-history-title">
              Limpar histórico?
            </h2>

            <p id="clear-history-description">
              Você está prestes a remover todas as
              atividades registradas nesta conta
              neste dispositivo.
            </p>

            <div className="modal-info">
              <FaHistory />

              <span>
                {activities.length}{" "}
                {activities.length === 1
                  ? "atividade será removida."
                  : "atividades serão removidas."}
              </span>
            </div>

            <div className="modal-actions">
              <button
                type="button"
                className="modal-cancel"
                onClick={() =>
                  setShowClearModal(false)
                }
                disabled={isClearing}
              >
                Cancelar
              </button>

              <button
                type="button"
                className="modal-confirm"
                onClick={confirmClearHistory}
                disabled={isClearing}
              >
                <FaTrash />

                <span>
                  {isClearing
                    ? "Limpando..."
                    : "Sim, limpar histórico"}
                </span>
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Historico;