import { FaArrowRight, FaCompass, FaLock } from "react-icons/fa";

const COMMUNITY_TOPICS = [
  {
    name: "Novas peças",
    description: "Desejos para futuras coleções",
  },
  {
    name: "Melhorias",
    description: "Ideias para a experiência",
  },
  {
    name: "Funcionalidades",
    description: "Novas possibilidades",
  },
  {
    name: "Experiência",
    description: "Compartilhe sua opinião",
  },
  {
    name: "Outras ideias",
    description: "Outros assuntos e sugestões",
  },
];

function CommunitySidebar({
  onCreatePost,
  onCreatePrivatePost,
  onSelectCategory,
}) {
  return (
    <aside className="community-aside" aria-label="Ações e assuntos da comunidade">
      <section className="community-aside-card community-aside-create">
        <span className="community-kicker">SUA VOZ IMPORTA</span>

        <h3>
          Tem uma ideia
          <br />
          em mente?
        </h3>

        <p>
          Compartilhe uma sugestão, proponha uma melhoria ou peça aquela
          peça que ainda não encontrou.
        </p>

        <button type="button" onClick={onCreatePost}>
          Começar uma conversa
          <FaArrowRight aria-hidden="true" />
        </button>
      </section>

      <section className="community-aside-card">
        <div className="community-aside-heading">
          <span className="community-kicker">EXPLORE</span>
          <FaCompass aria-hidden="true" />
        </div>

        <h3>Assuntos da comunidade</h3>

        <div className="community-topic-list">
          {COMMUNITY_TOPICS.map((topic) => (
            <button
              type="button"
              key={topic.name}
              onClick={() => onSelectCategory(topic.name)}
            >
              <span>
                <strong>{topic.name}</strong>
                <small>{topic.description}</small>
              </span>

              <FaArrowRight aria-hidden="true" />
            </button>
          ))}
        </div>
      </section>

      <div className="community-aside-note">
        <FaLock aria-hidden="true" />

        <div>
          <strong>Uma conversa reservada.</strong>
          <p>
            Prefere falar diretamente com a equipe? Envie uma sugestão
            privada. Ela não aparecerá no feed público.
          </p>
        </div>
      </div>

      <button
        type="button"
        className="community-private-link"
        onClick={onCreatePrivatePost}
      >
        Enviar sugestão privada
        <FaArrowRight aria-hidden="true" />
      </button>
    </aside>
  );
}

export default CommunitySidebar;
