import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import { products } from "../../data/products";
import { categories } from "../../data/categories";
import { useCart } from "../../context/CartContext";

import ProductCard from "./ProductCard";

import "./Catalogo.css";

function Catalogo() {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const [selectedCategory, setSelectedCategory] =
    useState("Todos");

  const [searchTerm, setSearchTerm] = useState("");

  const [sortOption, setSortOption] =
    useState("relevancia");

  const [theme, setTheme] = useState(
    localStorage.getItem("noiravenue_theme") || "dark"
  );

  useEffect(() => {
    function handleThemeChange() {
      setTheme(
        localStorage.getItem("noiravenue_theme") || "dark"
      );
    }

    window.addEventListener("storage", handleThemeChange);
    window.addEventListener(
      "noiravenue-theme-change",
      handleThemeChange
    );

    return () => {
      window.removeEventListener("storage", handleThemeChange);
      window.removeEventListener(
        "noiravenue-theme-change",
        handleThemeChange
      );
    };
  }, []);

  const cartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const filteredProducts = useMemo(() => {
    const normalizedSearch = searchTerm
      .trim()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

    let result = products.filter((product) => {
      const matchesCategory =
        selectedCategory === "Todos" ||
        product.category === selectedCategory;

      if (!matchesCategory) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      const searchableContent = [
        product.name,
        product.category,
        product.description,
      ]
        .join(" ")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "");

      return searchableContent.includes(normalizedSearch);
    });

    switch (sortOption) {
      case "menor-preco":
        result = [...result].sort(
          (a, b) => a.price - b.price
        );
        break;

      case "maior-preco":
        result = [...result].sort(
          (a, b) => b.price - a.price
        );
        break;

      case "nome":
        result = [...result].sort((a, b) =>
          a.name.localeCompare(b.name, "pt-BR")
        );
        break;

      case "mais-novos":
        result = [...result].sort(
          (a, b) => Number(b.isNew) - Number(a.isNew)
        );
        break;

      case "relevancia":
      default:
        result = [...result].sort((a, b) => {
          if (a.featured !== b.featured) {
            return Number(b.featured) - Number(a.featured);
          }

          if (a.isNew !== b.isNew) {
            return Number(b.isNew) - Number(a.isNew);
          }

          return 0;
        });

        break;
    }

    return result;
  }, [selectedCategory, searchTerm, sortOption]);

  const hasActiveFilters =
    selectedCategory !== "Todos" ||
    searchTerm.trim() !== "" ||
    sortOption !== "relevancia";

  function clearFilters() {
    setSelectedCategory("Todos");
    setSearchTerm("");
    setSortOption("relevancia");
  }

  return (
    <section
      className={`catalogo ${
        theme === "light" ? "theme-light" : "theme-dark"
      }`}
    >
      <div className="catalogo-glow catalogo-glow-one" />
      <div className="catalogo-glow catalogo-glow-two" />

      <div className="catalogo-content">
        <div className="catalogo-actions">
          <button
            type="button"
            className="catalogo-back"
            onClick={() => navigate("/dashboard")}
          >
            <span
              className="catalogo-back-icon"
              aria-hidden="true"
            >
              ←
            </span>

            <span>Voltar ao Dashboard</span>
          </button>

          <button
            type="button"
            className="catalogo-cart"
            onClick={() => navigate("/dashboard/cart")}
            aria-label={
              cartQuantity > 0
                ? `Abrir carrinho com ${cartQuantity} ${
                    cartQuantity === 1 ? "item" : "itens"
                  }`
                : "Abrir carrinho vazio"
            }
          >
            <span
              className="catalogo-cart-icon"
              aria-hidden="true"
            >
              🛒
            </span>

            <span className="catalogo-cart-label">
              Carrinho
            </span>

            {cartQuantity > 0 && (
              <span
                className="catalogo-cart-badge"
                aria-hidden="true"
              >
                {cartQuantity > 99 ? "99+" : cartQuantity}
              </span>
            )}
          </button>
        </div>

        <header className="catalogo-header">
          <div className="catalogo-heading">
            <span className="catalogo-eyebrow">
              COLEÇÃO NOIR
            </span>

            <h1>Explore nossa coleção</h1>

            <p>
              Descubra peças selecionadas para composições
              urbanas, contemporâneas e atemporais.
            </p>
          </div>

          <div className="catalogo-count-wrapper">
            <span className="catalogo-count-label">
              EXIBINDO
            </span>

            <span className="catalogo-count">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1
                ? "produto"
                : "produtos"}
            </span>
          </div>
        </header>

        <div className="catalogo-toolbar">
          <div className="catalogo-search-wrapper">
            <span
              className="catalogo-search-icon"
              aria-hidden="true"
            >
              ⌕
            </span>

            <input
              type="search"
              className="catalogo-search"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="Buscar produtos..."
              aria-label="Buscar produtos"
            />

            {searchTerm && (
              <button
                type="button"
                className="catalogo-search-clear"
                onClick={() => setSearchTerm("")}
                aria-label="Limpar busca"
              >
                ×
              </button>
            )}
          </div>

          <div className="catalogo-sort-wrapper">
            <label
              htmlFor="catalogo-sort"
              className="catalogo-sort-label"
            >
              Ordenar por
            </label>

            <select
              id="catalogo-sort"
              className="catalogo-sort"
              value={sortOption}
              onChange={(event) =>
                setSortOption(event.target.value)
              }
            >
              <option value="relevancia">
                Relevância
              </option>

              <option value="mais-novos">
                Mais novos
              </option>

              <option value="menor-preco">
                Menor preço
              </option>

              <option value="maior-preco">
                Maior preço
              </option>

              <option value="nome">
                Nome
              </option>
            </select>
          </div>
        </div>

        <div className="catalogo-divider" />

        <nav
          className="catalogo-categories"
          aria-label="Categorias de produtos"
        >
          <button
            type="button"
            className={
              selectedCategory === "Todos"
                ? "catalogo-category active"
                : "catalogo-category"
            }
            onClick={() => setSelectedCategory("Todos")}
          >
            Todos
          </button>

          {categories.map((category) => (
            <button
              type="button"
              key={category}
              className={
                selectedCategory === category
                  ? "catalogo-category active"
                  : "catalogo-category"
              }
              onClick={() =>
                setSelectedCategory(category)
              }
            >
              {category}
            </button>
          ))}
        </nav>

        {hasActiveFilters && (
          <div className="catalogo-active-filters">
            <span>
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1
                ? "resultado encontrado"
                : "resultados encontrados"}
            </span>

            <button
              type="button"
              onClick={clearFilters}
            >
              Limpar filtros
            </button>
          </div>
        )}

        {filteredProducts.length > 0 ? (
          <div className="catalogo-grid">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="catalogo-empty">
            <span
              className="catalogo-empty-icon"
              aria-hidden="true"
            >
              ⌕
            </span>

            <h2>Nenhum produto encontrado</h2>

            <p>
              Não encontramos produtos que correspondam
              aos critérios selecionados.
            </p>

            <button
              type="button"
              className="catalogo-empty-button"
              onClick={clearFilters}
            >
              Limpar filtros
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Catalogo;