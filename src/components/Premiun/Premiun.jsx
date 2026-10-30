import { useEffect, useRef, useState } from "react";
import {
  FaArrowLeft,
  FaCheck,
  FaCrown,
  FaLock,
  FaShieldAlt,
  FaStar,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

import "./Premiun.css";

const SESSION_KEY = "noiravenue_session";
const USERS_KEY = "noiravenue_users";

const benefits = [
  {
    title: "Acesso exclusivo",
    description: "Uma área dedicada à experiência Noir Premium.",
  },
  {
    title: "Experiência visual premium",
    description: "Uma interface com identidade e atenção aos detalhes.",
  },
  {
    title: "Coleções exclusivas",
    description: "Explore uma seleção diferenciada de conteúdos.",
  },
  {
    title: "Recursos antecipados",
    description: "Conheça novas funcionalidades em primeira mão.",
  },
  {
    title: "Personalização avançada",
    description: "Mais possibilidades para personalizar seu perfil.",
  },
  {
    title: "Evolução contínua",
    description: "Acompanhe a evolução da experiência Noir Avenue.",
  },
];

function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function Premium() {
  const navigate = useNavigate();
  const confirmButtonRef = useRef(null);

  const [session, setSession] = useState(() =>
    readStorage(SESSION_KEY, {})
  );
  const [showCheckout, setShowCheckout] = useState(false);

  const isPremium = Boolean(session?.isPremium);

  useEffect(() => {
    if (!showCheckout) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    confirmButtonRef.current?.focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setShowCheckout(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showCheckout]);

  useEffect(() => {
    if (isPremium) {
      setShowCheckout(false);
    }
  }, [isPremium]);

  const handleActivatePremium = () => {
    if (isPremium) {
      setShowCheckout(false);
      return;
    }

    const premiumSince = new Date().toISOString();

    const updatedUser = {
      ...session,
      isPremium: true,
      premiumSince,
    };

    try {
      localStorage.setItem(
        SESSION_KEY,
        JSON.stringify(updatedUser)
      );

      const users = readStorage(USERS_KEY, []);

      if (Array.isArray(users)) {
        const updatedUsers = users.map((user) =>
          user.email === updatedUser.email
            ? {
                ...user,
                isPremium: true,
                premiumSince,
              }
            : user
        );

        localStorage.setItem(
          USERS_KEY,
          JSON.stringify(updatedUsers)
        );
      }

      setSession(updatedUser);
      setShowCheckout(false);

      toast.success("Noir Premium ativado!", {
        description:
          "A assinatura foi ativada no modo de demonstração.",
      });
    } catch {
      toast.error("Não foi possível ativar o Premium.", {
        description:
          "Verifique o armazenamento do navegador e tente novamente.",
      });
    }
  };

  const handleCloseCheckout = () => {
    setShowCheckout(false);
  };

  return (
    <main className="premium-page">
      <div className="premium-shell">
        <button
          className="premium-back"
          type="button"
          onClick={() => navigate("/dashboard")}
        >
          <FaArrowLeft aria-hidden="true" />
          <span>Voltar para o dashboard</span>
        </button>

        <section className="premium-hero">
          <div className="premium-badge">
            <FaCrown aria-hidden="true" />
            <span>NOIR PREMIUM</span>
          </div>

          <h1>
            Uma experiência
            <span> além do comum.</span>
          </h1>

          <p>
            Exclusividade, personalidade e uma experiência
            cuidadosamente pensada para acompanhar a evolução
            da Noir Avenue.
          </p>

          {isPremium && (
            <div className="premium-active" role="status">
              <FaCheck aria-hidden="true" />
              <span>Sua experiência Premium está ativa</span>
            </div>
          )}
        </section>

        <section
          className="premium-content"
          aria-label="Plano Noir Premium"
        >
          <article className="premium-plan">
            <div className="plan-header">
              <div>
                <span className="plan-label">
                  MEMBROS EXCLUSIVOS
                </span>
                <h2>Noir Premium</h2>
                <p className="plan-subtitle">
                  Eleve sua experiência.
                </p>
              </div>

              <div className="plan-crown-wrap">
                <FaCrown
                  className="plan-crown"
                  aria-hidden="true"
                />
              </div>
            </div>

            <div className="plan-price">
              <span className="price-currency">R$</span>
              <strong>29,90</strong>
              <span className="price-period">/ mês</span>
            </div>

            <p className="plan-description">
              Um plano pensado para quem deseja explorar
              novas possibilidades dentro da plataforma.
            </p>

            <div className="plan-divider" />

            <h3 className="benefits-heading">
              O que está incluído
            </h3>

            <div className="plan-benefits">
              {benefits.map((benefit) => (
                <div className="benefit" key={benefit.title}>
                  <span className="benefit-icon">
                    <FaCheck aria-hidden="true" />
                  </span>

                  <div className="benefit-copy">
                    <strong>{benefit.title}</strong>
                    <p>{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {isPremium ? (
              <div className="premium-subscribed" role="status">
                <FaCheck aria-hidden="true" />
                <span>Você já faz parte do Noir Premium</span>
              </div>
            ) : (
              <button
                className="premium-cta"
                type="button"
                onClick={() => setShowCheckout(true)}
              >
                <FaCrown aria-hidden="true" />
                <span>Conhecer o plano</span>
              </button>
            )}

            <div className="secure-payment">
              <FaShieldAlt aria-hidden="true" />
              <span>Ambiente de demonstração</span>
            </div>
          </article>

          <aside className="premium-showcase">
            <div className="showcase-orb" aria-hidden="true" />
            <div className="showcase-grid" aria-hidden="true" />

            <div className="showcase-content">
              <div className="showcase-icon">
                <FaCrown aria-hidden="true" />
              </div>

              <span className="showcase-eyebrow">
                UMA NOVA PERSPECTIVA
              </span>

              <h2>
                O Noir,
                <br />
                <span>elevado.</span>
              </h2>

              <p>
                Cada detalhe faz parte de uma experiência
                construída em torno de personalidade,
                elegância e evolução.
              </p>

              <div className="showcase-divider" />

              <div className="showcase-signature">
                <FaStar aria-hidden="true" />
                <span>DESIGNED FOR THE DISTINCTIVE</span>
              </div>
            </div>

            <span className="showcase-index" aria-hidden="true">
              N° 01
            </span>
          </aside>
        </section>

        <section className="premium-footer">
          <div className="premium-section-heading">
            <span>O DIFERENCIAL</span>
            <h2>Mais do que um plano.</h2>
            <p>
              Uma proposta de experiência que acompanha a
              identidade e a evolução da Noir Avenue.
            </p>
          </div>

          <div className="premium-features">
            <article className="premium-feature">
              <span className="feature-number">01</span>
              <div className="feature-icon">
                <FaCrown aria-hidden="true" />
              </div>
              <h3>Exclusividade</h3>
              <p>
                Uma área dedicada a recursos e experiências
                Premium disponibilizados pela plataforma.
              </p>
            </article>

            <article className="premium-feature">
              <span className="feature-number">02</span>
              <div className="feature-icon">
                <FaStar aria-hidden="true" />
              </div>
              <h3>Personalidade</h3>
              <p>
                Uma experiência que valoriza a identidade
                visual e as possibilidades de personalização.
              </p>
            </article>

            <article className="premium-feature">
              <span className="feature-number">03</span>
              <div className="feature-icon">
                <FaShieldAlt aria-hidden="true" />
              </div>
              <h3>Evolução</h3>
              <p>
                Uma proposta preparada para acompanhar
                a chegada de novas funcionalidades.
              </p>
            </article>
          </div>
        </section>

        <footer className="premium-bottom">
          <span>NOIR AVENUE</span>
          <span>Uma experiência em constante evolução.</span>
        </footer>
      </div>

      {showCheckout && (
        <div
          className="checkout-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              handleCloseCheckout();
            }
          }}
        >
          <section
            className="checkout-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-title"
            aria-describedby="checkout-description"
          >
            <button
              className="checkout-close"
              type="button"
              onClick={handleCloseCheckout}
              aria-label="Fechar confirmação"
            >
              <span aria-hidden="true">×</span>
            </button>

            <div className="checkout-crown-wrap">
              <FaCrown
                className="checkout-crown"
                aria-hidden="true"
              />
            </div>

            <span className="checkout-eyebrow">
              NOIR AVENUE
            </span>

            <h2 id="checkout-title">
              Sua experiência começa aqui.
            </h2>

            <p id="checkout-description">
              Confirme a ativação demonstrativa do{" "}
              <strong>Noir Premium</strong>.
            </p>

            <div className="checkout-summary">
              <div>
                <span>Plano</span>
                <strong>Noir Premium mensal</strong>
              </div>

              <div className="checkout-total">
                <strong>R$ 29,90</strong>
                <span>por mês · valor ilustrativo</span>
              </div>
            </div>

            <div className="checkout-notice">
              <FaLock aria-hidden="true" />
              <p>
                <strong>Modo de demonstração</strong>
                Nenhum pagamento real será realizado.
                A ativação ficará registrada apenas no
                armazenamento local deste navegador.
              </p>
            </div>

            <button
              ref={confirmButtonRef}
              className="checkout-confirm"
              type="button"
              onClick={handleActivatePremium}
            >
              <FaCrown aria-hidden="true" />
              Confirmar ativação demonstrativa
            </button>

            <button
              className="checkout-cancel"
              type="button"
              onClick={handleCloseCheckout}
            >
              Voltar sem ativar
            </button>
          </section>
        </div>
      )}
    </main>
  );
}

export default Premium;
