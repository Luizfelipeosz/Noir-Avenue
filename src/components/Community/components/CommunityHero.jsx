import {
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

function CommunityHero({ onCreatePost }) {
  const navigate = useNavigate();

  return (
    <section
      className="community-hero"
      aria-labelledby="community-hero-title"
    >
      <button
        type="button"
        className="community-back-btn"
        onClick={() => navigate("/dashboard")}
      >
        <FaArrowLeft aria-hidden="true" />
        Voltar
      </button>

      <div className="community-hero-copy">
        <span className="community-eyebrow">
          <span aria-hidden="true" />
          NOIR AVENUE · COMMUNITY
        </span>

        <h1 id="community-hero-title">
          Beyond the
          <br />
          <em>collection.</em>
        </h1>

        <p>
          Um espaço para compartilhar desejos, trocar perspectivas e
          participar da evolução da Noir Avenue.
        </p>

        <button
          type="button"
          className="community-primary-btn"
          onClick={onCreatePost}
        >
          Compartilhar uma ideia
          <FaArrowRight aria-hidden="true" />
        </button>
      </div>

      <div className="community-hero-art" aria-hidden="true">
        <div className="community-orbit orbit-one" />
        <div className="community-orbit orbit-two" />

        <div className="community-monogram">
          N<span>.</span>A
        </div>

        <span className="community-art-caption">
          A PLACE FOR IDEAS
          <br />
          AND NEW PERSPECTIVES
        </span>
      </div>

      <div className="community-hero-index">
        <span>01</span> / PARTICIPE DA CONVERSA
      </div>
    </section>
  );
}

export default CommunityHero;