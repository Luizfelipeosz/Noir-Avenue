
import { useCallback, useEffect, useMemo, useState } from "react";

export const COMMUNITY_CATEGORIES = [
  "Todas",
  "Novas peças",
  "Melhorias",
  "Funcionalidades",
  "Experiência",
  "Outras ideias",
];

const INITIAL_FORM = {
  title: "",
  body: "",
  category: "Novas peças",
  visibility: "public",
};

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
  if (typeof window === "undefined") return {};

  try {
    return JSON.parse(
      window.localStorage.getItem("noiravenue_session") || "{}"
    );
  } catch {
    return {};
  }
}

function getInitials(name = "") {
  return String(name)
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0))
    .join("")
    .toUpperCase() || "NA";
}

function createId() {
  return globalThis.crypto?.randomUUID?.() || `${Date.now()}-${Math.random()}`;
}

export function useCommunity() {
  const session = useMemo(() => readSession(), []);

  const currentUser =
    session?.user?.name ||
    session?.name ||
    "Você";

  const [posts, setPosts] = useState(INITIAL_POSTS);

  const [activeCategory, setActiveCategory] = useState("Todas");
  const [feedView, setFeedView] = useState("public");
  const [sort, setSort] = useState("recentes");
  const [search, setSearch] = useState("");

  const [composerOpen, setComposerOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);

  const [notice, setNotice] = useState("");
  const [form, setForm] = useState(INITIAL_FORM);
  const [comment, setComment] = useState("");

  // Recupera sempre a versão atual da publicação.
  const selectedPost = useMemo(
    () => posts.find((post) => post.id === selectedPostId) || null,
    [posts, selectedPostId]
  );

  // Filtragem e ordenação do feed.
  const visiblePosts = useMemo(() => {
    let result =
      feedView === "private"
        ? posts.filter(
            (post) =>
              post.visibility === "private" &&
              post.author === currentUser
          )
        : posts.filter((post) => post.visibility === "public");

    if (activeCategory !== "Todas") {
      result = result.filter(
        (post) => post.category === activeCategory
      );
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
      result = [...result].sort(
        (a, b) => b.likes - a.likes
      );
    }

    return result;
  }, [posts, activeCategory, search, sort, feedView, currentUser]);

  // Bloqueia a rolagem de fundo enquanto um modal estiver aberto.
  useEffect(() => {
    if (!composerOpen && !selectedPostId) return undefined;

    const previousOverflow = document.body.style.overflow;

    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setComposerOpen(false);
        setSelectedPostId(null);
        setComment("");
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [composerOpen, selectedPostId]);

  // Remove avisos automaticamente.
  useEffect(() => {
    if (!notice) return undefined;

    const timeoutId = window.setTimeout(
      () => setNotice(""),
      4200
    );

    return () => window.clearTimeout(timeoutId);
  }, [notice]);

  const showNotice = useCallback((message) => {
    setNotice(message);
  }, []);

  const closeComposer = useCallback(() => {
    setComposerOpen(false);
  }, []);

  const closeDiscussion = useCallback(() => {
    setSelectedPostId(null);
    setComment("");
  }, []);

  // Abre o formulário com a visibilidade desejada.
  
const openComposer = useCallback(
  (visibility = "public", category = INITIAL_FORM.category) => {
    setForm({
      ...INITIAL_FORM,
      visibility,
      category,
    });

    setComposerOpen(true);
  },
  []
);

  const updateForm = useCallback((field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }, []);

  // Cria uma publicação local.
  const publishPost = useCallback(
    (event) => {
      event.preventDefault();

      const title = form.title.trim();
      const body = form.body.trim();

      if (!title || !body) return;

      const visibility = form.visibility;

      const newPost = {
        id: createId(),
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
        visibility,
        status: "Recebida",
        commentsList: [],
      };

      setPosts((current) => [newPost, ...current]);

      setComposerOpen(false);
      setActiveCategory("Todas");
      setFeedView(visibility);
      setSearch("");

      setNotice(
        visibility === "private"
          ? "Sugestão privada registrada nesta demonstração."
          : "Sua publicação foi adicionada ao feed de demonstração."
      );

      setForm(INITIAL_FORM);
    },
    [form, currentUser]
  );

  // Alterna a curtida de uma publicação.
  const toggleLike = useCallback((postId) => {
    setPosts((current) =>
      current.map((post) => {
        if (post.id !== postId) return post;

        const liked = !post.liked;

        return {
          ...post,
          liked,
          likes: Math.max(0, post.likes + (liked ? 1 : -1)),
        };
      })
    );
  }, []);

  // Abre a discussão pelo identificador da publicação.
  const openDiscussion = useCallback((postId) => {
    setComment("");
    setSelectedPostId(postId);
  }, []);

  // Adiciona comentário diretamente à publicação original.
  const addComment = useCallback(
    (event) => {
      event.preventDefault();

      const body = comment.trim();

      if (!body || !selectedPostId) return;

      const newComment = {
        id: createId(),
        author: currentUser,
        initials: getInitials(currentUser),
        body,
        date: "Agora",
      };

      setPosts((current) =>
        current.map((post) =>
          post.id === selectedPostId
            ? {
                ...post,
                comments: post.comments + 1,
                commentsList: [
                  ...(post.commentsList || []),
                  newComment,
                ],
              }
            : post
        )
      );

      setComment("");
    },
    [comment, currentUser, selectedPostId]
  );

  // Exclui somente publicações pertencentes ao usuário atual.
  const removeOwnPost = useCallback(
    (post) => {
      if (!post || post.author !== currentUser) return;

      setPosts((current) =>
        current.filter((item) => item.id !== post.id)
      );

      if (selectedPostId === post.id) {
        closeDiscussion();
      }

      setNotice("Publicação removida desta demonstração.");
    },
    [currentUser, selectedPostId, closeDiscussion]
  );

  // Abre o feed público ou privado.
  const changeFeedView = useCallback((view) => {
    setFeedView(view);
    setActiveCategory("Todas");
    setSearch("");
  }, []);

  // Seleciona uma categoria e retorna ao feed público.
  const selectCategory = useCallback((category) => {
    setFeedView("public");
    setActiveCategory(category);
  }, []);

  const clearSearch = useCallback(() => {
    setSearch("");
  }, []);

  return {
    categories: COMMUNITY_CATEGORIES,

    currentUser,
    posts,
    visiblePosts,
    selectedPost,

    activeCategory,
    setActiveCategory,
    selectCategory,

    feedView,
    setFeedView,
    changeFeedView,

    sort,
    setSort,

    search,
    setSearch,
    clearSearch,

    composerOpen,
    openComposer,
    closeComposer,

    form,
    setForm,
    updateForm,
    publishPost,

    comment,
    setComment,
    addComment,

    openDiscussion,
    closeDiscussion,

    toggleLike,
    removeOwnPost,

    notice,
    setNotice,
    showNotice,
  };
}
