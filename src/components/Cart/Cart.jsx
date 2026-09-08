import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

import "./Cart.css";

function Cart() {
  const navigate = useNavigate();

  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [showClearModal, setShowClearModal] = useState(false);

  const subtotal = cartItems.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const shipping =
    subtotal >= 500 || subtotal === 0
      ? 0
      : 29.9;

  const total = subtotal + shipping;

  const formatPrice = (value) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  function handleClearCart() {
    clearCart();
    setShowClearModal(false);
  }

  if (cartItems.length === 0) {
    return (
      <main className="cart">
        <div className="cart-container">
          <button
            type="button"
            className="cart-back"
            onClick={() =>
              navigate("/dashboard/catalogo")
            }
          >
            <span aria-hidden="true">←</span>

            <span>Continuar comprando</span>
          </button>

          <section className="cart-empty">
            <div
              className="cart-empty-icon"
              aria-hidden="true"
            >
              🛍
            </div>

            <span className="cart-empty-label">
              SEU CARRINHO
            </span>

            <h1>Seu carrinho está vazio.</h1>

            <p>
              Explore a coleção Noir Avenue e encontre
              peças selecionadas para você.
            </p>

            <button
              type="button"
              className="cart-empty-button"
              onClick={() =>
                navigate("/dashboard/catalogo")
              }
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
          type="button"
          className="cart-back"
          onClick={() =>
            navigate("/dashboard/catalogo")
          }
        >
          <span aria-hidden="true">←</span>

          <span>Continuar comprando</span>
        </button>

        <header className="cart-header">
          <div>
            <span className="cart-eyebrow">
              NOIR AVENUE
            </span>

            <h1>Seu carrinho</h1>

            <p>
              {cartItems.length}{" "}
              {cartItems.length === 1
                ? "item selecionado"
                : "itens selecionados"}
            </p>
          </div>

          <button
            type="button"
            className="cart-clear"
            onClick={() =>
              setShowClearModal(true)
            }
          >
            <span aria-hidden="true">×</span>

            <span>Limpar carrinho</span>
          </button>
        </header>

        <div className="cart-content">
          <section
            className="cart-items"
            aria-label="Produtos no carrinho"
          >
            {cartItems.map((item) => (
              <article
                className="cart-item"
                key={item.id}
              >
                <div className="cart-item-image">
                  <img
                    src={item.image}
                    alt={item.name}
                  />
                </div>

                <div className="cart-item-info">
                  <span className="cart-item-category">
                    {item.category || "Coleção Noir"}
                  </span>

                  <h2>{item.name}</h2>

                  <span className="cart-item-price">
                    {formatPrice(item.price)}
                  </span>

                  <button
                    type="button"
                    className="cart-item-remove mobile-remove"
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                  >
                    <span aria-hidden="true">×</span>
                    Remover
                  </button>
                </div>

                <div className="cart-item-actions">
                  <div
                    className="cart-quantity"
                    aria-label={`Quantidade de ${item.name}`}
                  >
                    <button
                      type="button"
                      aria-label={`Diminuir quantidade de ${item.name}`}
                      disabled={item.quantity <= 1}
                      onClick={() =>
                        decreaseQuantity(item.id)
                      }
                    >
                      −
                    </button>

                    <span aria-live="polite">
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      aria-label={`Aumentar quantidade de ${item.name}`}
                      disabled={
                        item.quantity >= item.stock
                      }
                      onClick={() =>
                        increaseQuantity(item.id)
                      }
                    >
                      +
                    </button>
                  </div>

                  <strong className="cart-item-total">
                    {formatPrice(
                      item.price * item.quantity
                    )}
                  </strong>

                  <button
                    type="button"
                    className="cart-item-remove desktop-remove"
                    onClick={() =>
                      removeFromCart(item.id)
                    }
                  >
                    <span aria-hidden="true">×</span>
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

                <strong>
                  {formatPrice(subtotal)}
                </strong>
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
                  <strong>
                    {formatPrice(500 - subtotal)}
                  </strong>{" "}
                  para você ganhar frete grátis.
                </span>
              </div>
            )}

            {subtotal >= 500 && (
              <div className="cart-shipping-success">
                <span
                  className="cart-shipping-success-icon"
                  aria-hidden="true"
                >
                  ✓
                </span>

                <p>
                  Você ganhou{" "}
                  <strong>frete grátis!</strong>
                </p>
              </div>
            )}

            <div className="cart-summary-total">
              <span>Total</span>

              <strong>
                {formatPrice(total)}
              </strong>
            </div>

            <button
              type="button"
              className="cart-checkout"
              onClick={() =>
                navigate("/dashboard/checkout")
              }
            >
              <span>Finalizar compra</span>

              <span
                className="cart-checkout-arrow"
                aria-hidden="true"
              >
                →
              </span>
            </button>

            <div className="cart-security">
              <span
                className="cart-security-icon"
                aria-hidden="true"
              >
                ✓
              </span>

              <p>
                Compra segura e protegida
              </p>
            </div>
          </aside>
        </div>
      </div>

      {showClearModal && (
        <div
          className="cart-modal-overlay"
          role="presentation"
          onMouseDown={(event) => {
            if (
              event.target === event.currentTarget
            ) {
              setShowClearModal(false);
            }
          }}
        >
          <div
            className="cart-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-modal-title"
            aria-describedby="cart-modal-description"
          >
            <div
              className="cart-modal-icon"
              aria-hidden="true"
            >
              !
            </div>

            <span className="cart-modal-eyebrow">
              NOIR AVENUE
            </span>

            <h2 id="cart-modal-title">
              Limpar carrinho?
            </h2>

            <p id="cart-modal-description">
              Todos os produtos adicionados serão
              removidos do seu carrinho. Essa ação
              não poderá ser desfeita.
            </p>

            <div className="cart-modal-actions">
              <button
                type="button"
                className="cart-modal-cancel"
                onClick={() =>
                  setShowClearModal(false)
                }
              >
                Cancelar
              </button>

              <button
                type="button"
                className="cart-modal-confirm"
                onClick={handleClearCart}
              >
                Limpar carrinho
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default Cart;