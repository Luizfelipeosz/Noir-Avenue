import { useState } from "react";
import { FaCheck, FaCrown, FaLock, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import "./Premiun.css";

function Premium() {
  const navigate = useNavigate();

  const [showCheckout, setShowCheckout] = useState(false);

  const session =
    JSON.parse(
      localStorage.getItem("noiravenue_session")
    ) || {};

  const isPremium = session.isPremium || false;

  const benefits = [
    "Acesso exclusivo ao Noir Premium",
    "Experiência visual premium",
    "Coleções exclusivas",
    "Recursos antecipados da plataforma",
    "Personalização avançada do perfil",
    "Prioridade em novas funcionalidades",
  ];

  const handleActivatePremium = () => {
    const updatedUser = {
      ...session,
      isPremium: true,
      premiumSince: new Date().toISOString(),
    };

    localStorage.setItem(
      "noiravenue_session",
      JSON.stringify(updatedUser)
    );

    const users =
      JSON.parse(
        localStorage.getItem("noiravenue_users")
      ) || [];

    const updatedUsers = users.map((user) =>
      user.email === updatedUser.email
        ? {
            ...user,
            isPremium: true,
            premiumSince:
              updatedUser.premiumSince,
          }
        : user
    );

    localStorage.setItem(
      "noiravenue_users",
      JSON.stringify(updatedUsers)
    );

    setShowCheckout(false);

    window.location.reload();
  };

  return (
    <div className="premium-page">

      <button
        className="premium-back"
        onClick={() => navigate("/dashboard")}
      >
        <FaArrowLeft />
        Voltar para o Dashboard
      </button>

      <section className="premium-hero">

        <div className="premium-badge">
          <FaCrown />
          NOIR PREMIUM
        </div>

        <h1>
          Uma experiência
          <span> além do comum.</span>
        </h1>

        <p>
          Desbloqueie uma experiência exclusiva,
          criada para quem busca mais personalidade,
          recursos e exclusividade dentro da Noir Avenue.
        </p>

        {isPremium && (
          <div className="premium-active">
            <FaCheck />
            Sua assinatura Premium está ativa
          </div>
        )}
      </section>

      <section className="premium-content">

        <div className="premium-plan">

          <div className="plan-header">
            <div>
              <span className="plan-label">
                PLANO EXCLUSIVO
              </span>

              <h2>
                Noir Premium
              </h2>
            </div>

            <FaCrown className="plan-crown" />
          </div>

          <div className="plan-price">
            <span>R$</span>
            <strong>29,90</strong>
            <small>/mês</small>
          </div>

          <p className="plan-description">
            Tenha acesso completo à experiência
            Premium da Noir Avenue.
          </p>

          <div className="plan-benefits">

            {benefits.map((benefit) => (
              <div
                className="benefit"
                key={benefit}
              >
                <span>
                  <FaCheck />
                </span>

                <p>{benefit}</p>
              </div>
            ))}

          </div>

          {!isPremium ? (
            <button
              className="premium-cta"
              onClick={() =>
                setShowCheckout(true)
              }
            >
              <FaCrown />
              Assinar Noir Premium
            </button>
          ) : (
            <div className="premium-subscribed">
              <FaCheck />
              Plano Premium ativo
            </div>
          )}

          <div className="secure-payment">
            <FaLock />
            Pagamento seguro e protegido
          </div>

        </div>

        <div className="premium-showcase">

          <div className="showcase-glow" />

          <FaCrown className="showcase-crown" />

          <span>
            EXPERIÊNCIA EXCLUSIVA
          </span>

          <h2>
            O Noir,
            <br />
            elevado.
          </h2>

          <p>
            Uma experiência pensada nos mínimos
            detalhes para transformar a forma como
            você utiliza a plataforma.
          </p>

        </div>

      </section>

      <section className="premium-footer">

        <h2>
          Por que Noir Premium?
        </h2>

        <div className="premium-features">

          <div>
            <span>01</span>
            <h3>Exclusividade</h3>
            <p>
              Recursos e experiências disponíveis
              exclusivamente para membros Premium.
            </p>
          </div>

          <div>
            <span>02</span>
            <h3>Personalização</h3>
            <p>
              Mais controle sobre sua experiência
              dentro da plataforma.
            </p>
          </div>

          <div>
            <span>03</span>
            <h3>Evolução</h3>
            <p>
              Acesso antecipado às próximas
              funcionalidades da Noir Avenue.
            </p>
          </div>

        </div>

      </section>

      {showCheckout && (
        <div className="checkout-overlay">

          <div className="checkout-modal">

            <button
              className="checkout-close"
              onClick={() =>
                setShowCheckout(false)
              }
            >
              ×
            </button>

            <FaCrown className="checkout-crown" />

            <h2>
              Confirmar assinatura
            </h2>

            <p>
              Você está assinando o
              <strong> Noir Premium</strong>.
            </p>

            <div className="checkout-summary">
              <span>Plano mensal</span>

              <strong>
                R$ 29,90
              </strong>
            </div>

            <div className="checkout-notice">
              <FaLock />

              <span>
                Ambiente de demonstração.
                Nenhum pagamento real será realizado.
              </span>
            </div>

            <button
              className="checkout-confirm"
              onClick={handleActivatePremium}
            >
              Confirmar assinatura
            </button>

            <button
              className="checkout-cancel"
              onClick={() =>
                setShowCheckout(false)
              }
            >
              Cancelar
            </button>

          </div>

        </div>
      )}

    </div>
  );
}

export default Premium;

