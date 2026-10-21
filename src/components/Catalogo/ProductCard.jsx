import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { toast } from "sonner";

import { playSound } from "../../utils/soundEffects";
import { useCart } from "../../context/CartContext";
import { addNotification } from "../../utils/notifications";

import "./ProductCard.css";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const {
    name,
    category,
    price,
    image,
    stock,
    slug,
  } = product;

  const [isFavorite, setIsFavorite] = useState(() => {
    try {
      const savedFavorites = JSON.parse(
        localStorage.getItem("noiravenue_favorites") || "[]"
      );

      return (
        Array.isArray(savedFavorites) &&
        savedFavorites.some(
          (favorite) => favorite.id === product.id
        )
      );
    } catch {
      return false;
    }
  });

  const isOutOfStock = stock <= 0;

  function handleProductClick() {
    navigate(`/dashboard/catalogo/${slug}`);
  }

  function handleFavoriteClick(event) {
    event.stopPropagation();

    try {
      const savedFavorites = JSON.parse(
        localStorage.getItem("noiravenue_favorites") || "[]"
      );

      const favorites = Array.isArray(savedFavorites)
        ? savedFavorites
        : [];

      if (isFavorite) {
        const updatedFavorites = favorites.filter(
          (favorite) => favorite.id !== product.id
        );

        localStorage.setItem(
          "noiravenue_favorites",
          JSON.stringify(updatedFavorites)
        );

        setIsFavorite(false);

        addNotification(
          `${name} foi removido dos favoritos.`,
          "favorite"
        );

        toast.success(`${name} removido dos favoritos.`);

        return;
      }

      const updatedFavorites = [
        ...favorites.filter(
          (favorite) => favorite.id !== product.id
        ),
        product,
      ];

      localStorage.setItem(
        "noiravenue_favorites",
        JSON.stringify(updatedFavorites)
      );

      setIsFavorite(true);

      playSound("favorite");

      addNotification(
        `${name} foi adicionado aos favoritos.`,
        "favorite"
      );

      toast.success(`${name} foi adicionado aos favoritos.`, {
        action: {
          label: "Ver favoritos",
          onClick: () => navigate("/dashboard/favoritos"),
        },
      });
    } catch (error) {
      console.error("Erro ao atualizar favoritos:", error);

      toast.error("Não foi possível atualizar os favoritos.");
    }
  }

  function handleAddToCart(event) {
    event.stopPropagation();

    if (isOutOfStock) {
      toast.error("Produto indisponível.");
      return;
    }

    try {
      // O CartContext registra a notificação somente se a
      // operação for aceita.
      addToCart(product, 1);
    } catch (error) {
      console.error(
        "Erro ao adicionar produto ao carrinho:",
        error
      );

      toast.error("Não foi possível adicionar ao carrinho.");
    }
  }

  return (
    <article
      className="product-card"
      onClick={handleProductClick}
      tabIndex={0}
      role="button"
      onKeyDown={(event) => {
        if (event.target !== event.currentTarget) return;

        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
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
          aria-pressed={isFavorite}
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

        <button
          type="button"
          className="product-card-add-cart"
          disabled={isOutOfStock}
          onClick={handleAddToCart}
        >
          {isOutOfStock
            ? "Produto esgotado"
            : "Adicionar ao carrinho"}
        </button>
      </div>
    </article>
  );
}

export default ProductCard;