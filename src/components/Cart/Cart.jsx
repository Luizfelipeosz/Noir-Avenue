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
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shipping =
    subtotal >= 500 || subtotal === 0 ? 0 : 29.9;

  const total = subtotal + shipping;

  const shippingProgress = Math.min(
    (subtotal / 500) * 100,
    100
  );

  const remainingForFreeShipping = Math.max(
    500 - subtotal,
    0
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const formatPrice = (value) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  function handleClearCart() {
    clearCart();
    setShowClearModal(false);
  }

  function goToCatalog() {
    navigate("/dashboard/catalogo");
  }

  function goToCheckout() {
    navigate("/dashboard/checkout");
  }

  if (cartItems.length === 0) {
    return (
      <main className="cart cart-empty-page">
        <div className="cart-container">
          {/* BRAND */}
          <div className="cart-brand">
            <button
              type="button"
              className="cart-brand-button"
              onClick={goToCatalog}
              aria-label="Voltar para o catálogo Noir Avenue"
            >
              <img
                src="/src/assets/logo.png"
                alt="Noir Avenue"
              />
            </button>
          </div>

          {/* TOP NAVIGATION */}
          <div className="cart-topbar cart-topbar-empty">
            <button
              type="button"
              className="cart-continue-button"
              onClick={goToCatalog}
            >
              <span className="cart-continue-arrow">
                ←
              </span>

              <span>
                Continuar comprando
              </span>
            </button>
          </div>

          {/* EMPTY STATE */}
          <section className="cart-empty">
            <div
              className="cart-empty-icon"
              aria-hidden="true"
            >
              <span>🛍</span>
            </div>

            <span className="cart-empty-label">
              SEU CARRINHO
            </span>

            <h1>
              Seu carrinho
              <br />
              está vazio.
            </h1>

            <p>
              Você ainda não adicionou nenhum produto.
              Explore nossa coleção e encontre peças
              selecionadas para você.
            </p>

            <button
              type="button"
              className="cart-primary-action cart-empty-button"
              onClick={goToCatalog}
            >
              <span>Explorar coleção</span>
              <span aria-hidden="true">→</span>
            </button>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="cart">
      <div className="cart-container">
        {/* BRAND */}
        <div className="cart-brand">
          <button
            type="button"
            className="cart-brand-button"
            onClick={goToCatalog}
            aria-label="Voltar para o catálogo Noir Avenue"
          >
            <img
              src="/src/assets/logo.png"
              alt="Noir Avenue"
            />
          </button>
        </div>

        {/* TOP NAVIGATION */}
        <div className="cart-topbar">
          <button
            type="button"
            className="cart-continue-button"
            onClick={goToCatalog}
          >
            <span className="cart-continue-arrow">
              ←
            </span>

            <span>
              Continuar comprando
            </span>
          </button>

          <span className="cart-page-indicator">
            CARRINHO
          </span>
        </div>

        {/* HEADER */}
        <header className="cart-header">
          <div className="cart-header-content">
            <span className="cart-eyebrow">
              SUA SELEÇÃO
            </span>

            <h1>Seu carrinho</h1>

            <p>
              {totalItems}{" "}
              {totalItems === 1
                ? "item selecionado"
                : "itens selecionados"}
            </p>
          </div>

          <button
            type="button"
            className="cart-clear-button"
            onClick={() => setShowClearModal(true)}
          >
            <span
              className="cart-clear-icon"
              aria-hidden="true"
            >
              ×
            </span>

            <span>Limpar carrinho</span>
          </button>
        </header>

        {/* CONTENT */}
        <div className="cart-content">
          {/* PRODUCTS */}
          <section
            className="cart-products-section"
            aria-label="Produtos no carrinho"
          >
            <div className="cart-section-heading">
              <span>PRODUTOS</span>

              <span>
                {cartItems.length}{" "}
                {cartItems.length === 1
                  ? "produto"
                  : "produtos"}
              </span>
            </div>

            <div className="cart-items">
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
                      {item.category ||
                        "Coleção Noir"}
                    </span>

                    <h2>{item.name}</h2>

                    <span className="cart-item-unit-price">
                      {formatPrice(item.price)}{" "}
                      <span>/ unidade</span>
                    </span>

                    <button
                      type="button"
                      className="cart-remove-mobile"
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                    >
                      <span aria-hidden="true">
                        ×
                      </span>

                      Remover produto
                    </button>
                  </div>

                  <div className="cart-item-actions">
                    <div className="cart-quantity-wrapper">
                      <span className="cart-action-label">
                        QUANTIDADE
                      </span>

                      <div
                        className="cart-quantity"
                        aria-label={`Quantidade de ${item.name}`}
                      >
                        <button
                          type="button"
                          aria-label={`Diminuir quantidade de ${item.name}`}
                          disabled={
                            item.quantity <= 1
                          }
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
                            item.quantity >=
                            item.stock
                          }
                          onClick={() =>
                            increaseQuantity(item.id)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <div className="cart-item-price-block">
                      <span className="cart-action-label">
                        TOTAL
                      </span>

                      <strong className="cart-item-total">
                        {formatPrice(
                          item.price * item.quantity
                        )}
                      </strong>
                    </div>

                    <button
                      type="button"
                      className="cart-remove-button"
                      aria-label={`Remover ${item.name} do carrinho`}
                      onClick={() =>
                        removeFromCart(item.id)
                      }
                    >
                      <span aria-hidden="true">
                        ×
                      </span>

                      Remover
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* CONTINUE SHOPPING */}
            <button
              type="button"
              className="cart-secondary-action"
              onClick={goToCatalog}
            >
              <span className="cart-secondary-arrow">
                ←
              </span>

              <span>
                Continuar comprando
              </span>
            </button>
          </section>

          {/* ORDER SUMMARY */}
          <aside className="cart-summary">
            <div className="cart-summary-top">
              <div>
                <span className="cart-summary-eyebrow">
                  NOIR AVENUE
                </span>

                <h2>Resumo do pedido</h2>
              </div>

              <span className="cart-summary-count">
                {totalItems}
              </span>
            </div>

            {/* SHIPPING PROGRESS */}
            {subtotal < 500 && (
              <div className="cart-free-shipping">
                <div className="cart-free-shipping-header">
                  <span>
                    FRETE GRÁTIS
                  </span>

                  <strong>
                    {Math.round(
                      shippingProgress
                    )}
                    %
                  </strong>
                </div>

                <div className="cart-progress-track">
                  <div
                    className="cart-progress-bar"
                    style={{
                      width: `${shippingProgress}%`,
                    }}
                  />
                </div>

                <p>
                  Faltam{" "}
                  <strong>
                    {formatPrice(
                      remainingForFreeShipping
                    )}
                  </strong>{" "}
                  para ganhar frete grátis.
                </p>
              </div>
            )}

            {subtotal >= 500 && (
              <div className="cart-free-shipping-success">
                <span
                  className="cart-success-check"
                  aria-hidden="true"
                >
                  ✓
                </span>

                <div>
                  <strong>
                    Frete grátis desbloqueado
                  </strong>

                  <span>
                    Seu pedido já atingiu o valor
                    necessário.
                  </span>
                </div>
              </div>
            )}

            {/* VALUES */}
            <div className="cart-summary-details">
              <div className="cart-summary-row">
                <span>
                  Subtotal
                </span>

                <strong>
                  {formatPrice(subtotal)}
                </strong>
              </div>

              <div className="cart-summary-row">
                <span>
                  Frete
                </span>

                <strong
                  className={
                    shipping === 0
                      ? "cart-free-value"
                      : ""
                  }
                >
                  {shipping === 0
                    ? "Grátis"
                    : formatPrice(shipping)}
                </strong>
              </div>
            </div>

            {/* TOTAL */}
            <div className="cart-summary-total">
              <div>
                <span>
                  TOTAL DO PEDIDO
                </span>

                <small>
                  Incluindo frete
                </small>
              </div>

              <strong>
                {formatPrice(total)}
              </strong>
            </div>

            {/* CHECKOUT */}
            <button
              type="button"
              className="cart-checkout-button"
              onClick={goToCheckout}
            >
              <span>
                Finalizar compra
              </span>

              <span
                className="cart-checkout-arrow"
                aria-hidden="true"
              >
                →
              </span>
            </button>

            {/* TRUST */}
            <div className="cart-trust">
              <div className="cart-trust-item">
                <span
                  className="cart-trust-icon"
                  aria-hidden="true"
                >
                  ✓
                </span>

                <div>
                  <strong>
                    Compra segura
                  </strong>

                  <span>
                    Seus dados protegidos
                  </span>
                </div>
              </div>

              <div className="cart-trust-item">
                <span
                  className="cart-trust-icon"
                  aria-hidden="true"
                >
                  ✓
                </span>

                <div>
                  <strong>
                    Checkout protegido
                  </strong>

                  <span>
                    Processo seguro
                  </span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* CLEAR CART MODAL */}
      {showClearModal && (
        <div
          className="cart-modal-overlay"
          role="presentation"
          onMouseDown={(event) => {
            if (
              event.target ===
              event.currentTarget
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
                Manter produtos
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