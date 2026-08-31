import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { products } from "../../data/products";
import { categories } from "../../data/categories";

import ProductCard from "./ProductCard";

import "./Catalogo.css";

function Catalogo() {
  const navigate = useNavigate();

  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredProducts =
    selectedCategory === "Todos"
      ? products
      : products.filter(
          (product) => product.category === selectedCategory
        );

  return (
    <section className="catalogo">
      <button
        className="catalogo-back"
        onClick={() => navigate("/dashboard")}
      >
        ← Voltar ao Dashboard
      </button>

      <div className="catalogo-header">
        <div>
          <span className="catalogo-eyebrow">
            COLEÇÃO NOIR
          </span>

          <h1>Explore nossa coleção</h1>

          <p>
            Descubra peças selecionadas para composições
            urbanas, contemporâneas e atemporais.
          </p>
        </div>

        <span className="catalogo-count">
          {filteredProducts.length}{" "}
          {filteredProducts.length === 1 ? "produto" : "produtos"}
        </span>
      </div>

      <div className="catalogo-categories">
        <button
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
            key={category}
            className={
              selectedCategory === category
                ? "catalogo-category active"
                : "catalogo-category"
            }
            onClick={() => setSelectedCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="catalogo-grid">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}

export default Catalogo;