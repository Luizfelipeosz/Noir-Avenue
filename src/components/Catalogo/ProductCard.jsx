import { useNavigate } from "react-router-dom";

import "./ProductCard.css";

function ProductCard({ product }) {
  const navigate = useNavigate();

  const { name, category, price, image, stock, slug } = product;

  const isOutOfStock = stock === 0;

  function handleProductClick() {
    navigate(`/dashboard/catalogo/${slug}`);
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