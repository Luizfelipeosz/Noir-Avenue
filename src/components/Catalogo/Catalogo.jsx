import { useState } from "react";
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

  const filteredProducts =
    selectedCategory === "Todos"
      ? products
      : products.filter(
          (product) =>
            product.category === selectedCategory
        );

  const cartQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <section className="catalogo">
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
                    cartQuantity === 1
                      ? "item"
                      : "itens"
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
                {cartQuantity > 99
                  ? "99+"
                  : cartQuantity}
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
              COLEÇÃO
            </span>

            <span className="catalogo-count">
              {filteredProducts.length}{" "}
              {filteredProducts.length === 1
                ? "produto"
                : "produtos"}
            </span>
          </div>
        </header>

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

        <div className="catalogo-grid">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Catalogo;

