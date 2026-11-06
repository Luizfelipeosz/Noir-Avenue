import { useEffect, useRef, useState } from "react";
import {
  FaArrowRight,
  FaComment,
  FaEllipsisH,
  FaFlag,
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
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const isOwnPost = post.author === currentUser;
  const statusClass = String(post.status || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/\s+/g, "-");

  useEffect(() => {
    if (!menuOpen) return undefined;

    const handlePointerDown = (event) => {
      if (!menuRef.current?.contains(event.target)) {
        setMenuOpen(false);
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const handleRemove = () => {
    setMenuOpen(false);

    const confirmed = window.confirm(
      `Deseja realmente excluir a publicação "${post.title}"? Essa ação não pode ser desfeita nesta demonstração.`
    );

    if (confirmed) onRemovePost(post);
  };

  const handleReport = () => {
    setMenuOpen(false);
    onNotice();
  };

  return (
    <article className="community-post">
      <div className="community-post-topline">
        <span className="community-category-tag">{post.category}</span>

        <div className="community-post-menu" ref={menuRef}>
          {post.official && (
            <span className="community-official" title="Publicação destacada pela equipe">
              <FaShieldAlt aria-hidden="true" />
              DESTAQUE NOIR
            </span>
          )}

          <button
            type="button"
            className="community-icon-action"
            title="Mais opções"
            aria-label={`Mais opções para ${post.title}`}
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((current) => !current)}
          >
            <FaEllipsisH aria-hidden="true" />
          </button>

          {menuOpen && (
            <div className="community-post-options" role="menu">
              {isOwnPost && (
                <button
                  type="button"
                  className="danger"
                  role="menuitem"
                  onClick={handleRemove}
                >
                  <FaTrash aria-hidden="true" />
                  Excluir publicação
                </button>
              )}

              <button type="button" role="menuitem" onClick={handleReport}>
                <FaFlag aria-hidden="true" />
                Sinalizar publicação
              </button>
            </div>
          )}
        </div>
      </div>

      <button
        type="button"
        className="community-post-title"
        onClick={() => onOpenDiscussion(post.id)}
      >
        {post.title}
      </button>

      <p className="community-post-body">{post.body}</p>

      <div className="community-post-author">
        <span className="community-avatar" aria-hidden="true">
          {post.initials}
        </span>

        <span>
          <strong>{post.author}</strong>
          <small>{post.date}</small>
        </span>

        {post.status && (
          <span className={`community-status status-${statusClass}`}>
            {post.status}
          </span>
        )}
      </div>

      <div className="community-post-footer">
        <button
          type="button"
          className={post.liked ? "liked" : ""}
          onClick={() => onToggleLike(post.id)}
          aria-label={
            post.liked
              ? `Remover curtida. ${post.likes} curtidas`
              : `Curtir publicação. ${post.likes} curtidas`
          }
          aria-pressed={post.liked}
        >
          {post.liked ? (
            <FaHeart aria-hidden="true" />
          ) : (
            <FaRegHeart aria-hidden="true" />
          )}
          {post.likes}
          <span>curtidas</span>
        </button>

        <button
          type="button"
          onClick={() => onOpenDiscussion(post.id)}
          aria-label={`Ver ${post.comments} comentários`}
        >
          <FaComment aria-hidden="true" />
          {post.comments}
          <span>comentários</span>
        </button>

        <button
          type="button"
          className="community-discuss-link"
          onClick={() => onOpenDiscussion(post.id)}
        >
          Participar
          <FaArrowRight aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}

export default WishCard;
