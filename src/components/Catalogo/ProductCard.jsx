import "./ProductCard.css";

function ProductCard({ product }) {
  const { name, category, price, image, stock } = product;

  const isOutOfStock = stock === 0;

  return (
    <article className="product-card">
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