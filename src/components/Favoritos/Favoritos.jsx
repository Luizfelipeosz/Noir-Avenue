import {  FaArrowLeft, FaHeart, FaRegHeart, FaTrash,} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";
import "./Favoritos.css";

const FAVORITES_KEY = "noiravenue_favorites";

function Favoritos() {
  const navigate = useNavigate();

  const getFavorites = () => {
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_KEY);

      return storedFavorites
        ? JSON.parse(storedFavorites)
        : [];
    } catch {
      return [];
    }
  };

  const [favorites, setFavorites] = useState(getFavorites);

  const removeFavorite = (id) => {
    const updatedFavorites = favorites.filter(
      (item) => item.id !== id
    );

    localStorage.setItem(
      FAVORITES_KEY,
      JSON.stringify(updatedFavorites)
    );

    setFavorites(updatedFavorites);

    toast.success("Removido dos favoritos", {
      description:
        "O item foi removido da sua lista de favoritos.",
    });
  };

  return (
    <main className="favorites-page">
      <div className="favorites-container">

        {/* HEADER */}

        <header className="favorites-header">
          <button
            type="button"
            className="favorites-back-button"
            onClick={() => navigate("/dashboard")}
          >
            <FaArrowLeft />
            Voltar ao Dashboard
          </button>

          <div className="favorites-heading">
            <div className="favorites-title-icon">
              <FaHeart />
            </div>

            <div>
              <span className="favorites-eyebrow">
                NOIR AVENUE
              </span>

              <h1>Favoritos</h1>

              <p>
                Seus conteúdos salvos em um só lugar.
              </p>
            </div>
          </div>
        </header>

        {/* CONTEÚDO */}

        <section className="favorites-content">
          <div className="favorites-section-header">
            <div>
              <h2>Itens salvos</h2>

              <p>
                {favorites.length === 0
                  ? "Sua lista está vazia."
                  : `${favorites.length} ${
                      favorites.length === 1
                        ? "item salvo"
                        : "itens salvos"
                    }.`}
              </p>
            </div>

            {favorites.length > 0 && (
              <div className="favorites-count">
                <FaHeart />
                {favorites.length}
              </div>
            )}
          </div>

          {favorites.length === 0 ? (
            <div className="favorites-empty">
              <div className="favorites-empty-icon">
                <FaRegHeart />
              </div>

              <h2>Nenhum favorito ainda</h2>

              <p>
                Quando você encontrar algo que deseja
                guardar, seus favoritos aparecerão aqui.
              </p>

              <button
                type="button"
                className="favorites-primary-button"
                onClick={() => navigate("/dashboard")}
              >
                Explorar Dashboard
              </button>
            </div>
          ) : (
            <div className="favorites-grid">
              {favorites.map((item) => (
                <article
                  className="favorite-card"
                  key={item.id}
                >
                  <div className="favorite-card-icon">
                    <FaHeart />
                  </div>

                  <div className="favorite-card-content">
                    <span>FAVORITO</span>

                    <h3>{item.name}</h3>

                    {item.description && (
                      <p>{item.description}</p>
                    )}
                  </div>

                  <button
                    type="button"
                    className="favorite-remove-button"
                    onClick={() =>
                      removeFavorite(item.id)
                    }
                    aria-label={`Remover ${item.name} dos favoritos`}
                    title="Remover dos favoritos"
                  >
                    <FaTrash />
                  </button>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

export default Favoritos;

