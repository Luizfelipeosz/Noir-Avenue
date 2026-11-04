import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaArrowLeft,
  FaArrowRight,
  FaCheck,
  FaChevronDown,
  FaComment,
  FaComments,
  FaCompass,
  FaEllipsisH,
  FaHeart,
  FaLock,
  FaPlus,
  FaRegHeart,
  FaSearch,
  FaShieldAlt,
  FaSlidersH,
  FaTimes,
  FaTrash,
} from "react-icons/fa";

import "./Community.css";

const CATEGORIES = [
  "Todas",
  "Novas peças",
  "Melhorias",
  "Funcionalidades",
  "Experiência",
  "Outras ideias",
];

const INITIAL_POSTS = [
  {
    id: 1,
    author: "Marina Costa",
    initials: "MC",
    title: "Uma coleção de acessórios minimalistas",
    body: "Seria interessante ampliar a coleção com acessórios discretos: cintos, carteiras e peças em couro com acabamento sofisticado, mantendo a identidade visual da Noir.",
    category: "Novas peças",
    date: "Há 2 horas",
    likes: 24,
    comments: 8,
    liked: false,
    official: false,
    visibility: "public",
    status: "Em análise",
    commentsList: [
      {
        id: 1,
        author: "Rafael Mendes",
        initials: "RM",
        body: "Acho que combinaria muito com a proposta da loja.",
        date: "Há 1 hora",
      },
      {
        id: 2,
        author: "Beatriz Lima",
        initials: "BL",
        body: "Principalmente carteiras e cintos em tons neutros.",
        date: "Há 35 min",
      },
    ],
  },
  {
    id: 2,
    author: "Gabriel Oliveira",
    initials: "GO",
    title: "Lista de espera para peças esgotadas",
    body: "Uma funcionalidade para avisar quando um produto voltar ao catálogo ajudaria bastante. Poderíamos receber uma notificação dentro da conta ou por e-mail.",
    category: "Funcionalidades",
    date: "Há 5 horas",
    likes: 18,
    comments: 5,
    liked: false,
    official: true,
    visibility: "public",
    status: "Considerada",
    commentsList: [
      {
        id: 1,
        author: "Equipe Noir",
        initials: "NA",
        body: "Obrigado pela sugestão. A possibilidade de acompanhar a disponibilidade de produtos está no nosso radar.",
        date: "Há 3 horas",
        official: true,
      },
    ],
  },
  {
    id: 3,
    author: "Isabela Rocha",
    initials: "IR",
    title: "Filtros mais detalhados no catálogo",
    body: "Seria ótimo filtrar os produtos também por material e ocasião. Isso deixaria a busca por uma peça específica mais objetiva.",
    category: "Melhorias",
    date: "Ontem",
    likes: 12,
    comments: 3,
    liked: false,
    official: false,
    visibility: "public",
    status: "Aberta",
    commentsList: [],
  },
];

function readSession() {
  try {
    return JSON.parse(localStorage.getItem("noiravenue_session") || "{}");
  } catch {
    return {};
  }
}

function getInitials(name) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

function Community() {
  const session = readSession();
  const currentUser = session?.user?.name || session?.name || "Você";

  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [activeCategory, setActiveCategory] = useState("Todas");
  const [feedView, setFeedView] = useState("public");
  const [sort, setSort] = useState("recentes");
  const [search, setSearch] = useState("");
  const [composerOpen, setComposerOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [notice, setNotice] = useState("");

  const [form, setForm] = useState({
    title: "",
    body: "",
    category: "Novas peças",
    visibility: "public",
  });
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (!composerOpen && !selectedPost) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setComposerOpen(false);
        setSelectedPost(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [composerOpen, selectedPost]);

  useEffect(() => {
    if (!notice) return undefined;

    const timeoutId = window.setTimeout(() => setNotice(""), 4200);
    return () => window.clearTimeout(timeoutId);
  }, [notice]);

  const visiblePosts = useMemo(() => {
    let result =
      feedView === "private"
        ? posts.filter(
            (post) =>
              post.visibility === "private" && post.author === currentUser
          )
        : posts.filter((post) => post.visibility === "public");

    if (activeCategory !== "Todas") {
      result = result.filter((post) => post.category === activeCategory);
    }

    const term = search.trim().toLocaleLowerCase("pt-BR");

    if (term) {
      result = result.filter((post) =>
        `${post.title} ${post.body} ${post.author} ${post.category}`
          .toLocaleLowerCase("pt-BR")
          .includes(term)
      );
    }

    if (sort === "populares") {
      result = [...result].sort((a, b) => b.likes - a.likes);
    }

    return result;
  }, [posts, activeCategory, search, sort, feedView, currentUser]);

  const openComposer = () => {
    setForm({
      title: "",
      body: "",
      category: "Novas peças",
      visibility: "public",
    });
    setComposerOpen(true);
  };

  const publishPost = (event) => {
    event.preventDefault();

    const title = form.title.trim();
    const body = form.body.trim();

    if (!title || !body) return;

    const newPost = {
      id: Date.now(),
      author: currentUser,
      initials: getInitials(currentUser),
      title,
      body,
      category: form.category,
      date: "Agora",
      likes: 0,
      comments: 0,
      liked: false,
      official: false,
      visibility: form.visibility,
      status: "Recebida",
      commentsList: [],
    };

    setPosts((current) => [newPost, ...current]);
    setComposerOpen(false);
    setActiveCategory("Todas");
    setFeedView(form.visibility === "private" ? "private" : "public");
    setSearch("");
    setNotice(
      form.visibility === "private"
        ? "Sugestão privada registrada nesta demonstração."
        : "Sua publicação foi adicionada ao feed de demonstração."
    );
  };

  const toggleLike = (postId) => {
    setPosts((current) =>
      current.map((post) =>
        post.id === postId
          ? {
              ...post,
              liked: !post.liked,
              likes: post.likes + (post.liked ? -1 : 1),
            }
          : post
      )
    );
  };

  const addComment = (event) => {
    event.preventDefault();

    if (!comment.trim() || !selectedPost) return;

    const newComment = {
      id: Date.now(),
      author: currentUser,
      initials: getInitials(currentUser),
      body: comment.trim(),
      date: "Agora",
    };

    setPosts((current) =>
      current.map((post) =>
        post.id === selectedPost.id
          ? {
              ...post,
              comments: post.comments + 1,
              commentsList: [...(post.commentsList || []), newComment],
            }
          : post
      )
    );

    setSelectedPost((current) =>
      current
        ? {
            ...current,
            comments: current.comments + 1,
            commentsList: [...(current.commentsList || []), newComment],
          }
        : current
    );

    setComment("");
  };

  const removeOwnPost = (post) => {
    if (post.author !== currentUser) return;

    setPosts((current) => current.filter((item) => item.id !== post.id));
    setSelectedPost(null);
  };

  const openPrivateComposer = () => {
    setForm({
      title: "",
      body: "",
      category: "Outras ideias",
      visibility: "private",
    });
    setComposerOpen(true);
  };

  return (
    <main className="community-page">
      <Link to="/dashboard" className="community-back-btn">
        <FaArrowLeft aria-hidden="true" />
        <span>Voltar</span>
      </Link>

      <section className="community-hero">
        <div className="community-hero-copy">
          <span className="community-eyebrow">
            <span /> NOIR AVENUE · COMMUNITY
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
            className="community-primary-btn"
            onClick={openComposer}
            type="button"
          >
            Compartilhar uma ideia <FaArrowRight />
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

      <section className="community-intro-row">
        <div>
          <span className="community-kicker">A COMUNIDADE</span>
          <h2>
            Uma marca também é feita
            <br />
            por quem a vive.
          </h2>
        </div>

        <p>
          Compartilhe o que gostaria de encontrar por aqui. Suas ideias ajudam
          a orientar novas possibilidades, aprimorar a experiência e construir
          os próximos capítulos da Noir Avenue.
        </p>
      </section>

      <section className="community-workspace">
        <div className="community-main-column">
          <div className="community-feed-heading">
            <div>
              <span className="community-kicker">VOZES DA COMUNIDADE</span>
              <h2>Conversas em destaque</h2>
            </div>

            <button
              className="community-mobile-compose"
              onClick={openComposer}
              type="button"
            >
              <FaPlus /> Nova ideia
            </button>
          </div>

          <div className="community-toolbar">
            <div className="community-search">
              <FaSearch aria-hidden="true" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Buscar ideias e conversas..."
                aria-label="Buscar publicações"
              />

              {search && (
                <button
                  onClick={() => setSearch("")}
                  aria-label="Limpar busca"
                  type="button"
                >
                  <FaTimes />
                </button>
              )}
            </div>

            <label className="community-sort">
              <FaSlidersH aria-hidden="true" />
              <select
                value={sort}
                onChange={(event) => setSort(event.target.value)}
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
              className={feedView === "public" ? "active" : ""}
              role="tab"
              aria-selected={feedView === "public"}
              onClick={() => {
                setFeedView("public");
                setActiveCategory("Todas");
              }}
              type="button"
            >
              Feed público
            </button>

            <button
              className={feedView === "private" ? "active" : ""}
              role="tab"
              aria-selected={feedView === "private"}
              onClick={() => {
                setFeedView("private");
                setActiveCategory("Todas");
              }}
              type="button"
            >
              Minhas sugestões privadas
            </button>
          </div>

          {feedView === "public" && (
            <div
              className="community-categories"
              role="tablist"
              aria-label="Categorias"
            >
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  role="tab"
                  aria-selected={activeCategory === category}
                  className={activeCategory === category ? "active" : ""}
                  onClick={() => setActiveCategory(category)}
                  type="button"
                >
                  {category}
                </button>
              ))}
            </div>
          )}

          {notice && (
            <div className="community-notice" role="status">
              <FaCheck /> {notice}
            </div>
          )}

          <div className="community-feed">
            {visiblePosts.length ? (
              visiblePosts.map((post) => (
                <article className="community-post" key={post.id}>
                  <div className="community-post-topline">
                    <span className="community-category-tag">
                      {post.category}
                    </span>

                    <div className="community-post-menu">
                      {post.official && (
                        <span className="community-official">
                          <FaShieldAlt /> DESTAQUE NOIR
                        </span>
                      )}

                      {post.author === currentUser && (
                        <button
                          className="community-icon-action"
                          onClick={() => removeOwnPost(post)}
                          title="Excluir publicação"
                          aria-label="Excluir publicação"
                          type="button"
                        >
                          <FaTrash />
                        </button>
                      )}

                      <button
                        className="community-icon-action"
                        title="Mais opções"
                        aria-label="Mais opções"
                        onClick={() =>
                          setNotice(
                            "As opções de denúncia e moderação serão conectadas ao backend."
                          )
                        }
                        type="button"
                      >
                        <FaEllipsisH />
                      </button>
                    </div>
                  </div>

                  <button
                    className="community-post-title"
                    onClick={() => setSelectedPost(post)}
                    type="button"
                  >
                    {post.title}
                  </button>

                  <p className="community-post-body">{post.body}</p>

                  <div className="community-post-author">
                    <span className="community-avatar">{post.initials}</span>
                    <span>
                      <strong>{post.author}</strong>
                      <small>{post.date}</small>
                    </span>
                    <span
                      className={`community-status status-${post.status
                        .toLowerCase()
                        .replace(/\s+/g, "-")}`}
                    >
                      {post.status}
                    </span>
                  </div>

                  <div className="community-post-footer">
                    <button
                      className={post.liked ? "liked" : ""}
                      onClick={() => toggleLike(post.id)}
                      type="button"
                      aria-label={`${post.liked ? "Remover curtida" : "Curtir"}: ${post.likes}`}
                    >
                      {post.liked ? <FaHeart /> : <FaRegHeart />}
                      {post.likes} <span>curtidas</span>
                    </button>

                    <button
                      onClick={() => setSelectedPost(post)}
                      type="button"
                    >
                      <FaComment /> {post.comments} <span>comentários</span>
                    </button>

                    <button
                      className="community-discuss-link"
                      onClick={() => setSelectedPost(post)}
                      type="button"
                    >
                      Participar <FaArrowRight />
                    </button>
                  </div>
                </article>
              ))
            ) : (
              <div className="community-empty">
                <FaCompass />
                <strong>
                  {feedView === "private"
                    ? "Você ainda não enviou sugestões privadas"
                    : "Nenhuma conversa encontrada"}
                </strong>
                <span>
                  {feedView === "private"
                    ? "As sugestões privadas que você enviar aparecerão aqui e não serão exibidas no feed público."
                    : "Tente outra categoria ou compartilhe a primeira ideia sobre esse assunto."}
                </span>
                <button
                  onClick={() => {
                    setForm({
                      title: "",
                      body: "",
                      category: "Outras ideias",
                      visibility:
                        feedView === "private" ? "private" : "public",
                    });
                    setComposerOpen(true);
                  }}
                  type="button"
                >
                  Criar publicação
                </button>
              </div>
            )}
          </div>

          <p className="community-demo-disclaimer">
            Conteúdo demonstrativo. Publicações e interações ainda não são
            salvas no servidor.
          </p>
        </div>

        <aside className="community-aside">
          <div className="community-aside-card community-aside-create">
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
            <button onClick={openComposer} type="button">
              Começar uma conversa <FaArrowRight />
            </button>
          </div>

          <div className="community-aside-card">
            <div className="community-aside-heading">
              <span className="community-kicker">EXPLORE</span>
              <FaCompass />
            </div>

            <h3>Assuntos da comunidade</h3>

            <div className="community-topic-list">
              {[
                ["Novas peças", "Desejos para futuras coleções"],
                ["Melhorias", "Ideias para a experiência"],
                ["Funcionalidades", "Novas possibilidades"],
                ["Experiência", "Compartilhe sua opinião"],
              ].map(([name, description]) => (
                <button
                  key={name}
                  onClick={() => {
                    setFeedView("public");
                    setActiveCategory(name);
                  }}
                  type="button"
                >
                  <span>
                    <strong>{name}</strong>
                    <small>{description}</small>
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
                Prefere falar diretamente com a equipe? Envie uma sugestão
                privada. Ela não aparecerá no feed público.
              </p>
            </div>
          </div>

          <button
            className="community-private-link"
            onClick={openPrivateComposer}
            type="button"
          >
            Enviar sugestão privada <FaArrowRight />
          </button>
        </aside>
      </section>

      {composerOpen && (
        <div
          className="community-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setComposerOpen(false);
            }
          }}
        >
          <section
            className="community-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="community-composer-title"
          >
            <div className="community-modal-header">
              <div>
                <span className="community-kicker">NOIR COMMUNITY</span>
                <h2 id="community-composer-title">
                  Compartilhe sua ideia.
                </h2>
              </div>

              <button
                className="community-modal-close"
                onClick={() => setComposerOpen(false)}
                aria-label="Fechar"
                type="button"
              >
                <FaTimes />
              </button>
            </div>

            <form onSubmit={publishPost}>
              <label className="community-field">
                Título da ideia
                <input
                  maxLength={90}
                  required
                  value={form.title}
                  onChange={(event) =>
                    setForm({ ...form, title: event.target.value })
                  }
                  placeholder="Dê um título para sua sugestão"
                />
              </label>

              <label className="community-field">
                Categoria
                <select
                  value={form.category}
                  onChange={(event) =>
                    setForm({ ...form, category: event.target.value })
                  }
                >
                  {CATEGORIES.filter((item) => item !== "Todas").map(
                    (item) => (
                      <option key={item}>{item}</option>
                    )
                  )}
                </select>
              </label>

              <label className="community-field">
                Conte sua ideia
                <textarea
                  required
                  maxLength={1200}
                  rows={5}
                  value={form.body}
                  onChange={(event) =>
                    setForm({ ...form, body: event.target.value })
                  }
                  placeholder="Explique o que gostaria de ver na Noir Avenue..."
                />
              </label>

              <div className="community-visibility">
                <span>VISIBILIDADE</span>

                <label
                  className={
                    form.visibility === "public" ? "selected" : ""
                  }
                >
                  <input
                    type="radio"
                    name="visibility"
                    value="public"
                    checked={form.visibility === "public"}
                    onChange={() =>
                      setForm({ ...form, visibility: "public" })
                    }
                  />
                  <FaComments />
                  <span>
                    <strong>Pública</strong>
                    <small>Visível para a comunidade</small>
                  </span>
                </label>

                <label
                  className={
                    form.visibility === "private" ? "selected" : ""
                  }
                >
                  <input
                    type="radio"
                    name="visibility"
                    value="private"
                    checked={form.visibility === "private"}
                    onChange={() =>
                      setForm({ ...form, visibility: "private" })
                    }
                  />
                  <FaLock />
                  <span>
                    <strong>Privada</strong>
                    <small>Enviada somente à equipe</small>
                  </span>
                </label>
              </div>

              <div className="community-modal-actions">
                <button
                  type="button"
                  className="community-cancel-btn"
                  onClick={() => setComposerOpen(false)}
                >
                  Cancelar
                </button>

                <button type="submit" className="community-primary-btn">
                  Enviar ideia <FaArrowRight />
                </button>
              </div>
            </form>

            <p className="community-modal-disclaimer">
              Demonstração local: o envio não chega à administração e será
              perdido ao recarregar a página.
            </p>
          </section>
        </div>
      )}

      {selectedPost && (
        <div
          className="community-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedPost(null);
            }
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
                  DISCUSSÃO · {selectedPost.category.toUpperCase()}
                </span>
                <h2 id="community-discussion-title">
                  {selectedPost.title}
                </h2>
              </div>

              <button
                className="community-modal-close"
                onClick={() => {
                  setSelectedPost(null);
                  setComment("");
                }}
                aria-label="Fechar"
                type="button"
              >
                <FaTimes />
              </button>
            </div>

            <div className="community-discussion-body">
              <span className="community-avatar">
                {selectedPost.initials}
              </span>
              <div>
                <strong>{selectedPost.author}</strong>
                <small>{selectedPost.date}</small>
                <p>{selectedPost.body}</p>
              </div>
            </div>

            <div className="community-comments-heading">
              <strong>Comentários</strong>
              <span>{selectedPost.comments}</span>
            </div>

            <div className="community-comments-list">
              {(selectedPost.commentsList || []).length ? (
                selectedPost.commentsList.map((item) => (
                  <div className="community-comment" key={item.id}>
                    <span className="community-avatar">{item.initials}</span>
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

            <form className="community-comment-form" onSubmit={addComment}>
              <input
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                placeholder="Escreva um comentário..."
                maxLength={500}
                aria-label="Escreva um comentário"
              />
              <button
                type="submit"
                disabled={!comment.trim()}
                aria-label="Enviar comentário"
              >
                <FaArrowRight />
              </button>
            </form>

            <p className="community-modal-disclaimer">
              Comentários demonstrativos: ainda não são enviados ao servidor.
            </p>
          </section>
        </div>
      )}
    </main>
  );
}

export default Community;
