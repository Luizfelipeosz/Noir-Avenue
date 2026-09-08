import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaTrash } from "react-icons/fa";

import "./Favoritos.css";

function Favoritos() {
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    loadFavorites();
  }, []);

  function loadFavorites() {
    const savedFavorites = JSON.parse(
      localStorage.getItem("noiravenue_favorites") || "[]"
    );

    setFavorites(savedFavorites);
  }

  function removeFavorite(productId) {
    const updatedFavorites = favorites.filter(
      (product) => product.id !== productId
    );

    localStorage.setItem(
      "noiravenue_favorites",
      JSON.stringify(updatedFavorites)
    );

    setFavorites(updatedFavorites);
  }

  function handleProductClick(slug) {
    navigate(`/dashboard/catalogo/${slug}`);
  }

  function handleBack() {
    navigate("/dashboard/catalogo");
  }

  return (
    <section className="favoritos">
      <div className="favoritos-header">
        <button
          type="button"
          className="favoritos-back"
          onClick={handleBack}
        >
          ← Voltar ao catálogo
        </button>

        <div className="favoritos-title">
          <span className="favoritos-eyebrow">
            SUA COLEÇÃO
          </span>

          <h1>Favoritos</h1>

          <p>
            Produtos que você escolheu guardar para depois.
          </p>
        </div>

        <span className="favoritos-count">
          {favorites.length}{" "}
          {favorites.length === 1
            ? "produto"
            : "produtos"}
        </span>
      </div>

      {favorites.length === 0 ? (
        <div className="favoritos-empty">
          <div className="favoritos-empty-icon">
            <FaHeart />
          </div>

          <h2>Nenhum favorito ainda</h2>

          <p>
            Explore o catálogo e salve os produtos que
            você mais gostar.
          </p>

          <button
            type="button"
            className="favoritos-empty-button"
            onClick={handleBack}
          >
            Explorar catálogo
          </button>
        </div>
      ) : (
        <div className="favoritos-grid">
          {favorites.map((product) => (
            <article
              key={product.id}
              className="favorito-card"
            >
              <button
                type="button"
                className="favorito-card-image"
                onClick={() =>
                  handleProductClick(product.slug)
                }
              >
                <img
                  src={product.image}
                  alt={product.name}
                />
              </button>

              <div className="favorito-card-content">
                <span className="favorito-card-category">
                  {product.category}
                </span>

                <h3>{product.name}</h3>

                <div className="favorito-card-footer">
                  <strong>
                    R${" "}
                    {product.price
                      .toFixed(2)
                      .replace(".", ",")}
                  </strong>

                  <button
                    type="button"
                    className="favorito-remove"
                    onClick={() =>
                      removeFavorite(product.id)
                    }
                    aria-label={`Remover ${product.name} dos favoritos`}
                    title="Remover dos favoritos"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export default Favoritos;