import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaArrowLeft,
  FaArrowRight,
  FaHeart,
  FaRegHeart,
  FaShoppingBag,
  FaUndo,
  FaTrash,
} from "react-icons/fa";
import { addActivity } from "../../utils/activityLogger";
import "./Favoritos.css";

function Favoritos() {
  const navigate = useNavigate();

  const [favorites, setFavorites] = useState([]);
  const [removedProduct, setRemovedProduct] = useState(null);

  useEffect(() => {
    loadFavorites();
  }, []);

  useEffect(() => {
    if (!removedProduct) return;

    const timeout = setTimeout(() => {
      setRemovedProduct(null);
    }, 5000);

    return () => clearTimeout(timeout);
  }, [removedProduct]);

  function loadFavorites() {
    const savedFavorites = JSON.parse(
      localStorage.getItem("noiravenue_favorites") || "[]"
    );

    setFavorites(savedFavorites);
  }

  function removeFavorite(productId) {
    const product = favorites.find(
      (item) => item.id === productId
    );

    if (!product) return;

    const updatedFavorites = favorites.filter(
      (item) => item.id !== productId
    );

    localStorage.setItem(
      "noiravenue_favorites",
      JSON.stringify(updatedFavorites)
    );

    setFavorites(updatedFavorites);
    setRemovedProduct(product);

    addActivity({
      type: "favorite",
      action: "removed",
      message: `Removeu "${product.name}" dos favoritos.`,
      metadata: {
        productId: product.id,
        productName: product.name,
      },
    });
  }

  function undoRemove() {
    if (!removedProduct) return;

    const currentFavorites = JSON.parse(
      localStorage.getItem("noiravenue_favorites") || "[]"
    );

    const alreadyExists = currentFavorites.some(
      (item) => item.id === removedProduct.id
    );

    if (alreadyExists) {
      setRemovedProduct(null);
      return;
    }

    const restoredFavorites = [
      ...currentFavorites,
      removedProduct,
    ];

    localStorage.setItem(
      "noiravenue_favorites",
      JSON.stringify(restoredFavorites)
    );

    setFavorites(restoredFavorites);
    setRemovedProduct(null);

    addActivity({
      type: "favorite",
      action: "added",
      message: `Adicionou "${removedProduct.name}" aos favoritos.`,
      metadata: {
        productId: removedProduct.id,
        productName: removedProduct.name,
      },
    });
  }

  function handleProductClick(slug) {
    navigate(`/dashboard/catalogo/${slug}`);
  }

  function handleBack() {
    navigate("/dashboard/catalogo");
  }

  const favoriteCount = favorites.length;

  return (
    <section className="favoritos">
      <div className="favoritos-container">
        <header className="favoritos-header">
          <button
            type="button"
            className="favoritos-back"
            onClick={handleBack}
          >
            <FaArrowLeft />
            <span>Voltar ao catálogo</span>
          </button>

          <div className="favoritos-heading">
            <div className="favoritos-heading-main">
              <span className="favoritos-eyebrow">
                SUA COLEÇÃO
              </span>

              <h1>Favoritos</h1>

              <p>
                Salve os produtos que você mais gostou para
                encontrar, comparar e comprar depois.
              </p>
            </div>

            <div className="favoritos-count-card">
              <div className="favoritos-count-icon">
                <FaHeart />
              </div>

              <div>
                <strong>{favoriteCount}</strong>

                <span>
                  {favoriteCount === 1
                    ? "produto salvo"
                    : "produtos salvos"}
                </span>
              </div>
            </div>
          </div>
        </header>

        {favoriteCount === 0 ? (
          <div className="favoritos-empty">
            <div className="favoritos-empty-decoration">
              <span className="empty-line empty-line-1" />
              <span className="empty-line empty-line-2" />

              <div className="favoritos-empty-heart">
                <FaRegHeart />
              </div>

              <span className="empty-dot empty-dot-1" />
              <span className="empty-dot empty-dot-2" />
              <span className="empty-dot empty-dot-3" />
            </div>

            <div className="favoritos-empty-content">
              <span className="favoritos-empty-eyebrow">
                SUA COLEÇÃO ESTÁ VAZIA
              </span>

              <h2>
                Ainda não há nada
                <br />
                salvo por aqui.
              </h2>

              <p>
                Quando encontrar um produto que combina com
                você, toque no coração para adicioná-lo aos
                favoritos. Assim, você poderá encontrá-lo
                novamente quando quiser.
              </p>

              <button
                type="button"
                className="favoritos-empty-primary"
                onClick={handleBack}
              >
                <FaShoppingBag />

                <span>Explorar produtos</span>

                <FaArrowRight />
              </button>

              <button
                type="button"
                className="favoritos-empty-secondary"
                onClick={handleBack}
              >
                Voltar ao catálogo
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="favoritos-toolbar">
              <div className="favoritos-toolbar-info">
                <span>PRODUTOS SALVOS</span>

                <p>
                  {favoriteCount === 1
                    ? "1 produto na sua coleção"
                    : `${favoriteCount} produtos na sua coleção`}
                </p>
              </div>

              <button
                type="button"
                className="favoritos-continue"
                onClick={handleBack}
              >
                <span>Continuar comprando</span>
                <FaArrowRight />
              </button>
            </div>

            <div className="favoritos-grid">
              {favorites.map((product) => (
                <article
                  key={product.id}
                  className="favorito-card"
                >
                  <div className="favorito-image-area">
                    <button
                      type="button"
                      className="favorito-image-button"
                      onClick={() =>
                        handleProductClick(product.slug)
                      }
                      aria-label={`Ver detalhes de ${product.name}`}
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                      />

                      <span className="favorito-image-overlay">
                        <span>Ver produto</span>
                        <FaArrowRight />
                      </span>
                    </button>

                    <span className="favorito-status">
                      <FaHeart />
                      <span>Favoritado</span>
                    </span>
                  </div>

                  <div className="favorito-card-content">
                    <span className="favorito-category">
                      {product.category}
                    </span>

                    <button
                      type="button"
                      className="favorito-product-name"
                      onClick={() =>
                        handleProductClick(product.slug)
                      }
                    >
                      {product.name}
                    </button>

                    <div className="favorito-product-price">
                      <span>Preço</span>

                      <strong>
                        R${" "}
                        {product.price
                          .toFixed(2)
                          .replace(".", ",")}
                      </strong>
                    </div>

                    <div className="favorito-actions">
                      <button
                        type="button"
                        className="favorito-view-button"
                        onClick={() =>
                          handleProductClick(product.slug)
                        }
                      >
                        <span>Ver produto</span>
                        <FaArrowRight />
                      </button>

                      <button
                        type="button"
                        className="favorito-remove-button"
                        onClick={() =>
                          removeFavorite(product.id)
                        }
                        aria-label={`Remover ${product.name} dos favoritos`}
                      >
                        <FaTrash />
                        <span>Remover favorito</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </>
        )}

        {removedProduct && (
          <div
            className="favoritos-toast"
            role="status"
            aria-live="polite"
          >
            <div className="favoritos-toast-icon">
              <FaHeart />
            </div>

            <div className="favoritos-toast-content">
              <strong>Favorito removido</strong>

              <span>
                {removedProduct.name} foi removido da sua
                coleção.
              </span>
            </div>

            <button
              type="button"
              className="favoritos-toast-undo"
              onClick={undoRemove}
            >
              <FaUndo />
              <span>Desfazer</span>
            </button>

            <button
              type="button"
              className="favoritos-toast-close"
              onClick={() => setRemovedProduct(null)}
              aria-label="Fechar aviso"
            >
              ×
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default Favoritos;