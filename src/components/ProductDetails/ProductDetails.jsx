import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { products } from "../../data/products";
import { useCart } from "../../context/CartContext";
import { toast } from "sonner";

import "./ProductDetails.css";

function ProductDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useCart();

  const product = products.find(
    (item) => item.slug === slug
  );

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <section className="product-details-not-found">
        <h1>Produto não encontrado</h1>

        <button onClick={() => navigate("/dashboard/catalogo")}>
          Voltar ao catálogo
        </button>
      </section>
    );
  }

  const isOutOfStock = product.stock === 0;

  function increaseQuantity() {
    setQuantity((current) =>
      Math.min(current + 1, product.stock)
    );
  }

  function decreaseQuantity() {
    setQuantity((current) =>
      Math.max(current - 1, 1)
    );
  }

  function handleAddToCart() {
  if (isOutOfStock) return;

  try {
    addToCart(product, quantity);

    toast.success("Produto adicionado ao carrinho", {
      description: `${quantity} unidade${quantity > 1 ? "s" : ""} de ${product.name}.`,
    });
  } catch (error) {
    console.error("Erro ao adicionar produto ao carrinho:", error);

    toast.error("Não foi possível adicionar ao carrinho", {
      description: "Tente novamente em alguns instantes.",
    });
  }
}

  return (
    <section className="product-details">
      <button
        className="product-details-back"
        onClick={() => navigate("/dashboard/catalogo")}
      >
        ← Voltar ao catálogo
      </button>

      <div className="product-details-container">
        <div className="product-details-image">
          <img
            src={product.image}
            alt={product.name}
          />

          {isOutOfStock && (
            <span className="product-details-stock">
              Esgotado
            </span>
          )}
        </div>

        <div className="product-details-info">
          <span className="product-details-category">
            {product.category}
          </span>

          <h1>{product.name}</h1>

          <strong className="product-details-price">
            R$ {product.price.toFixed(2).replace(".", ",")}
          </strong>

          <div className="product-details-divider" />

          <p className="product-details-description">
            {product.description}
          </p>

          {!isOutOfStock && (
            <div className="product-details-purchase">
              <div className="product-details-quantity">
                <span>Quantidade</span>

                <div className="quantity-control">
                  <button
                    type="button"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                    aria-label="Diminuir quantidade"
                  >
                    −
                  </button>

                  <span>{quantity}</span>

                  <button
                    type="button"
                    onClick={increaseQuantity}
                    disabled={quantity >= product.stock}
                    aria-label="Aumentar quantidade"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                className="product-details-cart"
                onClick={handleAddToCart}
              >
                Adicionar ao carrinho
              </button>

              <span className="product-details-available">
                {product.stock} unidades disponíveis
              </span>
            </div>
          )}

          {isOutOfStock && (
            <button
              className="product-details-disabled"
              disabled
            >
              Produto esgotado
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;