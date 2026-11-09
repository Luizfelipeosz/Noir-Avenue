import {
  FaCheck,
  FaChevronDown,
  FaCompass,
  FaPlus,
  FaSearch,
  FaSlidersH,
  FaTimes,
} from "react-icons/fa";

import WishCard from "./WishCard";

function CommunityFeed({
  categories,
  visiblePosts,
  currentUser,
  activeCategory,
  onSelectCategory,
  feedView,
  onChangeFeedView,
  sort,
  onSortChange,
  search,
  onSearchChange,
  onClearSearch,
  notice,
  onRemoveNotice,
  onCreatePost,
  onOpenDiscussion,
  onToggleLike,
  onRemovePost,
  onNotice,
}) {
  const isPrivateFeed = feedView === "private";

  const handleCreatePost = () => {
    onCreatePost(isPrivateFeed ? "private" : "public");
  };

  return (
    <div className="community-main-column">
      <div className="community-feed-heading">
        <div>
          <span className="community-kicker">VOZES DA COMUNIDADE</span>
          <h2>Conversas em destaque</h2>
        </div>

        <button
          type="button"
          className="community-mobile-compose"
          onClick={handleCreatePost}
        >
          <FaPlus aria-hidden="true" />
          Nova ideia
        </button>
      </div>

      <div className="community-toolbar">
        <div className="community-search">
          <FaSearch aria-hidden="true" />

          <input
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Buscar ideias e conversas..."
            aria-label="Buscar publicações"
          />

          {search && (
            <button
              type="button"
              onClick={onClearSearch}
              aria-label="Limpar busca"
            >
              <FaTimes aria-hidden="true" />
            </button>
          )}
        </div>

        <label className="community-sort">
          <FaSlidersH aria-hidden="true" />

          <select
            value={sort}
            onChange={(event) => onSortChange(event.target.value)}
            aria-label="Ordenar publicações"
          >
            <option value="recentes">Mais recentes</option>
            <option value="populares">Mais populares</option>
          </select>

          <FaChevronDown aria-hidden="true" />
        </label>
      </div>

      <div
        className="community-feed-switch"
        role="tablist"
        aria-label="Tipo de conteúdo"
      >
        <button
          type="button"
          className={!isPrivateFeed ? "active" : ""}
          role="tab"
          aria-selected={!isPrivateFeed}
          onClick={() => onChangeFeedView("public")}
        >
          Feed público
        </button>

        <button
          type="button"
          className={isPrivateFeed ? "active" : ""}
          role="tab"
          aria-selected={isPrivateFeed}
          onClick={() => onChangeFeedView("private")}
        >
          Minhas sugestões privadas
        </button>
      </div>

      {!isPrivateFeed && (
        <div
          className="community-categories"
          role="tablist"
          aria-label="Categorias"
        >
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              role="tab"
              aria-selected={activeCategory === category}
              className={activeCategory === category ? "active" : ""}
              onClick={() => onSelectCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {notice && (
        <div className="community-notice" role="status" aria-live="polite">
          <FaCheck aria-hidden="true" />
          <span>{notice}</span>

          {onRemoveNotice && (
            <button
              type="button"
              onClick={onRemoveNotice}
              aria-label="Fechar aviso"
            >
              <FaTimes aria-hidden="true" />
            </button>
          )}
        </div>
      )}

      <div className="community-feed" aria-live="polite">
        {visiblePosts.length > 0 ? (
          visiblePosts.map((post) => (
            <WishCard
              key={post.id}
              post={post}
              currentUser={currentUser}
              onOpenDiscussion={onOpenDiscussion}
              onToggleLike={onToggleLike}
              onRemovePost={onRemovePost}
              onNotice={onNotice}
            />
          ))
        ) : (
          <div className="community-empty">
            <FaCompass aria-hidden="true" />

            <strong>
              {isPrivateFeed
                ? "Você ainda não enviou sugestões privadas"
                : search
                  ? "Nenhuma publicação corresponde à sua busca"
                  : "Nenhuma conversa encontrada"}
            </strong>

            <span>
              {isPrivateFeed
                ? "As sugestões privadas que você enviar aparecerão aqui e não serão exibidas no feed público."
                : search
                  ? "Experimente outros termos ou limpe a busca para visualizar todas as publicações."
                  : "Experimente outra categoria ou compartilhe a primeira ideia sobre esse assunto."}
            </span>

            {search && !isPrivateFeed ? (
              <button type="button" onClick={onClearSearch}>
                Limpar busca
              </button>
            ) : (
              <button type="button" onClick={handleCreatePost}>
                Criar publicação
              </button>
            )}
          </div>
        )}
      </div>

      <p className="community-demo-disclaimer">
        Demonstração local: publicações e interações ainda não são salvas no servidor.
      </p>
    </div>
  );
}

export default CommunityFeed;
