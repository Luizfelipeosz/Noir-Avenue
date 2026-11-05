
import {
  FaArrowRight,
  FaCompass,
  FaLock,
} from "react-icons/fa";

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
];

function CommunitySidebar({
  onCreatePost,
  onCreatePrivatePost,
  onSelectCategory,
}) {
  return (
    <aside className="community-aside">
      <div className="community-aside-card community-aside-create">
        <span className="community-kicker">
          SUA VOZ IMPORTA
        </span>

        <h3>
          Tem uma ideia
          <br />
          em mente?
        </h3>

        <p>
          Compartilhe uma sugestão, proponha uma melhoria ou
          peça aquela peça que ainda não encontrou.
        </p>

        <button type="button" onClick={onCreatePost}>
          Começar uma conversa
          <FaArrowRight />
        </button>
      </div>

      <div className="community-aside-card">
        <div className="community-aside-heading">
          <span className="community-kicker">
            EXPLORE
          </span>

          <FaCompass />
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

              <FaArrowRight />
            </button>
          ))}
        </div>
      </div>

      <div className="community-aside-note">
        <FaLock />

        <div>
          <strong>Uma conversa reservada.</strong>

          <p>
            Prefere falar diretamente com a equipe? Envie uma
            sugestão privada. Ela não aparecerá no feed público.
          </p>
        </div>
      </div>

      <button
        type="button"
        className="community-private-link"
        onClick={onCreatePrivatePost}
      >
        Enviar sugestão privada
        <FaArrowRight />
      </button>
    </aside>
  );
}

export default CommunitySidebar;
