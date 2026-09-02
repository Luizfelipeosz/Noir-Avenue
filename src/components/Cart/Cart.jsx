import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

import "./Cart.css";

function Cart() {
  const navigate = useNavigate();

  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping = subtotal >= 500 || subtotal === 0 ? 0 : 29.9;

  const total = subtotal + shipping;

  const formatPrice = (value) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  if (cartItems.length === 0) {
    return (
      <main className="cart">
        <div className="cart-container">
          <button
            className="cart-back"
            onClick={() => navigate("/dashboard/catalogo")}
          >
            ← Continuar comprando
          </button>

          <section className="cart-empty">
            <div className="cart-empty-icon">🛍</div>

            <span className="cart-empty-label">SEU CARRINHO</span>

            <h1>Seu carrinho está vazio.</h1>

            <p>
              Explore a coleção Noir Avenue e encontre peças
              selecionadas para você.
            </p>

            <button
              className="cart-empty-button"
              onClick={() => navigate("/dashboard/catalogo")}
            >
              Explorar coleção
            </button>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="cart">
      <div className="cart-container">
        <button
          className="cart-back"
          onClick={() => navigate("/dashboard/catalogo")}
        >
          ← Continuar comprando
        </button>

        <header className="cart-header">
          <div>
            <span className="cart-eyebrow">NOIR AVENUE</span>

            <h1>Seu carrinho</h1>

            <p>
              {cartItems.length}{" "}
              {cartItems.length === 1 ? "item selecionado" : "itens selecionados"}
            </p>
          </div>

          <button
            className="cart-clear"
            onClick={clearCart}
          >
            Limpar carrinho
          </button>
        </header>

        <div className="cart-content">
          <section className="cart-items">
            {cartItems.map((item) => (
              <article className="cart-item" key={item.id}>
                <div className="cart-item-image">
                  <img
                    src={item.image}
                    alt={item.name}
                  />
                </div>

                <div className="cart-item-info">
                  <span className="cart-item-category">
                    {item.category}
                  </span>

                  <h2>{item.name}</h2>

                  <span className="cart-item-price">
                    {formatPrice(item.price)}
                  </span>

                  <button
                    className="cart-item-remove mobile-remove"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remover
                  </button>
                </div>

                <div className="cart-item-actions">
                  <div className="cart-quantity">
                    <button
                      aria-label={`Diminuir quantidade de ${item.name}`}
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          Math.max(1, item.quantity - 1)
                        )
                      }
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      aria-label={`Aumentar quantidade de ${item.name}`}
                      onClick={() =>
                        updateQuantity(
                          item.id,
                          item.quantity + 1
                        )
                      }
                    >
                      +
                    </button>
                  </div>

                  <strong className="cart-item-total">
                    {formatPrice(item.price * item.quantity)}
                  </strong>

                  <button
                    className="cart-item-remove desktop-remove"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remover
                  </button>
                </div>
              </article>
            ))}
          </section>

          <aside className="cart-summary">
            <div className="cart-summary-header">
              <span>RESUMO DO PEDIDO</span>
            </div>

            <div className="cart-summary-lines">
              <div>
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>

              <div>
                <span>Frete</span>

                <strong>
                  {shipping === 0
                    ? "Grátis"
                    : formatPrice(shipping)}
                </strong>
              </div>
            </div>

            {subtotal > 0 && subtotal < 500 && (
              <div className="cart-shipping-message">
                <span>
                  Faltam{" "}
                  <strong>{formatPrice(500 - subtotal)}</strong>{" "}
                  para você ganhar frete grátis.
                </span>
              </div>
            )}

            <div className="cart-summary-total">
              <span>Total</span>
              <strong>{formatPrice(total)}</strong>
            </div>

            <button
              className="cart-checkout"
              onClick={() => navigate("/checkout")}
            >
              Finalizar compra
              <span>→</span>
            </button>

            <div className="cart-security">
              <span>✓</span>
              <p>Compra segura e protegida</p>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}

export default Cart;

