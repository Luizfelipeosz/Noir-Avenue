
import { FaArrowRight } from "react-icons/fa";

function CommunityHero({ onCreatePost }) {
  return (
    <section className="community-hero">
      <div className="community-hero-copy">
        <span className="community-eyebrow">
          <span />
          NOIR AVENUE · COMMUNITY
        </span>

        <h1>
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
          <FaArrowRight />
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
