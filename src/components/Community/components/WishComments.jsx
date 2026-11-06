import { FaArrowRight, FaTimes } from "react-icons/fa";

function WishComments({
  post,
  comment,
  onCommentChange,
  onAddComment,
  onClose,
}) {
  if (!post) return null;

  const comments = post.commentsList || [];

  return (
    <div
      className="community-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="community-modal community-discussion-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="community-discussion-title"
      >
        <div className="community-modal-header">
          <div>
            <span className="community-kicker">
              DISCUSSÃO · {post.category.toUpperCase()}
            </span>

            <h2 id="community-discussion-title">{post.title}</h2>
          </div>

          <button
            type="button"
            className="community-modal-close"
            onClick={onClose}
            aria-label="Fechar discussão"
          >
            <FaTimes aria-hidden="true" />
          </button>
        </div>

        <div className="community-discussion-body">
          <span className="community-avatar" aria-hidden="true">
            {post.initials}
          </span>

          <div>
            <strong>{post.author}</strong>
            <small>{post.date}</small>
            <p>{post.body}</p>
          </div>
        </div>

        <div className="community-comments-heading">
          <strong>Comentários</strong>
          <span>{post.comments ?? comments.length}</span>
        </div>

        <div className="community-comments-list">
          {comments.length > 0 ? (
            comments.map((item) => (
              <div className="community-comment" key={item.id}>
                <span className="community-avatar" aria-hidden="true">
                  {item.initials}
                </span>

                <div>
                  <strong>
                    {item.author}
                    {item.official && <em>Equipe Noir</em>}
                  </strong>

                  <small>{item.date}</small>
                  <p>{item.body}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="community-no-comments">
              Ainda não há comentários. Inicie a conversa.
            </p>
          )}
        </div>

        <form className="community-comment-form" onSubmit={onAddComment}>
          <input
            type="text"
            value={comment}
            onChange={(event) => onCommentChange(event.target.value)}
            placeholder="Escreva um comentário..."
            maxLength={500}
            aria-label="Escreva um comentário"
          />

          <button
            type="submit"
            disabled={!comment.trim()}
            aria-label="Enviar comentário"
          >
            <FaArrowRight aria-hidden="true" />
          </button>
        </form>

        <p className="community-modal-disclaimer">
          Comentários demonstrativos: ainda não são enviados ao servidor.
        </p>
      </section>
    </div>
  );
}

export default WishComments;
