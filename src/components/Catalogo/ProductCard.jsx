import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import "./ProductCard.css";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const {
    name,
    category,
    price,
    image,
    stock,
    slug,
  } = product;

  const [isFavorite, setIsFavorite] = useState(false);

  const isOutOfStock = stock === 0;

  useEffect(() => {
    const savedFavorites = JSON.parse(
      localStorage.getItem("noiravenue_favorites") || "[]"
    );

    const alreadyFavorite = savedFavorites.some(
      (favorite) => favorite.id === product.id
    );

    setIsFavorite(alreadyFavorite);
  }, [product.id]);

  function handleProductClick() {
    navigate(`/dashboard/catalogo/${slug}`);
  }

  function handleFavoriteClick(event) {
    event.stopPropagation();

    const savedFavorites = JSON.parse(
      localStorage.getItem("noiravenue_favorites") || "[]"
    );

    if (isFavorite) {
      const updatedFavorites = savedFavorites.filter(
        (favorite) => favorite.id !== product.id
      );

      localStorage.setItem(
        "noiravenue_favorites",
        JSON.stringify(updatedFavorites)
      );

      setIsFavorite(false);

      return;
    }

    const updatedFavorites = [
      ...savedFavorites.filter(
        (favorite) => favorite.id !== product.id
      ),
      product,
    ];

    localStorage.setItem(
      "noiravenue_favorites",
      JSON.stringify(updatedFavorites)
    );

    setIsFavorite(true);

    navigate("/dashboard/favoritos");
  }

  return (
    <article
      className="product-card"
      onClick={handleProductClick}
      tabIndex={0}
      role="button"
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          handleProductClick();
        }
      }}
    >
      <div className="product-card-image">
        <img src={image} alt={name} />

        <button
          type="button"
          className={`product-card-favorite ${
            isFavorite ? "active" : ""
          }`}
          onClick={handleFavoriteClick}
          aria-label={
            isFavorite
              ? `Remover ${name} dos favoritos`
              : `Adicionar ${name} aos favoritos`
          }
          title={
            isFavorite
              ? "Remover dos favoritos"
              : "Adicionar aos favoritos"
          }
        >
          {isFavorite ? <FaHeart /> : <FaRegHeart />}
        </button>

        {isOutOfStock && (
          <span className="product-card-stock">
            Esgotado
          </span>
        )}
      </div>

      <div className="product-card-content">
        <span className="product-card-category">
          {category}
        </span>

        <h3>{name}</h3>

        <strong className="product-card-price">
          R$ {price.toFixed(2).replace(".", ",")}
        </strong>
      </div>
    </article>
  );
}

export default ProductCard;