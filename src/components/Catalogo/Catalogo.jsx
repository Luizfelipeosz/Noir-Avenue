import { useNavigate } from "react-router-dom";

import { products } from "../../data/products";
import ProductCard from "./ProductCard";

import "./Catalogo.css";

function Catalogo() {
  const navigate = useNavigate();

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
          {products.length} produtos
        </span>
      </div>

      <div className="catalogo-grid">
        {products.map((product) => (
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