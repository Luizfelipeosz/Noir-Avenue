
import {
  FaArrowRight,
  FaComment,
  FaEllipsisH,
  FaHeart,
  FaRegHeart,
  FaShieldAlt,
  FaTrash,
} from "react-icons/fa";

function WishCard({
  post,
  currentUser,
  onOpenDiscussion,
  onToggleLike,
  onRemovePost,
  onNotice,
}) {
  const isOwnPost = post.author === currentUser;

  const statusClass = String(post.status || "")
    .toLowerCase()
    .replace(/\s+/g, "-");

  return (
    <article className="community-post">
      <div className="community-post-topline">
        <span className="community-category-tag">
          {post.category}
        </span>

        <div className="community-post-menu">
          {post.official && (
            <span className="community-official">
              <FaShieldAlt />
              DESTAQUE NOIR
            </span>
          )}

          {isOwnPost && (
            <button
              type="button"
              className="community-icon-action"
              onClick={() => onRemovePost(post)}
              title="Excluir publicação"
              aria-label={`Excluir publicação: ${post.title}`}
            >
              <FaTrash />
            </button>
          )}

          <button
            type="button"
            className="community-icon-action"
            title="Mais opções"
            aria-label="Mais opções"
            onClick={onNotice}
          >
            <FaEllipsisH />
          </button>
        </div>
      </div>

      <button
        type="button"
        className="community-post-title"
        onClick={() => onOpenDiscussion(post.id)}
      >
        {post.title}
      </button>

      <p className="community-post-body">
        {post.body}
      </p>

      <div className="community-post-author">
        <span className="community-avatar">
          {post.initials}
        </span>

        <span>
          <strong>{post.author}</strong>
          <small>{post.date}</small>
        </span>

        <span className={`community-status status-${statusClass}`}>
          {post.status}
        </span>
      </div>

      <div className="community-post-footer">
        <button
          type="button"
          className={post.liked ? "liked" : ""}
          onClick={() => onToggleLike(post.id)}
          aria-label={
            post.liked
              ? "Remover curtida"
              : "Curtir publicação"
          }
          aria-pressed={post.liked}
        >
          {post.liked ? <FaHeart /> : <FaRegHeart />}
          {post.likes}
          <span>curtidas</span>
        </button>

        <button
          type="button"
          onClick={() => onOpenDiscussion(post.id)}
          aria-label={`Ver ${post.comments} comentários`}
        >
          <FaComment />
          {post.comments}
          <span>comentários</span>
        </button>

        <button
          type="button"
          className="community-discuss-link"
          onClick={() => onOpenDiscussion(post.id)}
        >
          Participar
          <FaArrowRight />
        </button>
      </div>
    </article>
  );
}

export default WishCard;
