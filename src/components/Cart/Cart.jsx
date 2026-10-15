import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaCheck, FaLock, FaMinus, FaPlus, FaShoppingBag, FaTrash, FaTruck, FaShieldAlt } from "react-icons/fa";
import { useCart } from "../../context/CartContext";

import "./Cart.css";

const FREE_SHIPPING_THRESHOLD = 500;
const SHIPPING_FEE = 29.9;

function formatPrice(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(Number(value) || 0);
}

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
    (total, item) => total + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shipping;
  const totalItems = cartItems.reduce((sum, item) => sum + (Number(item.quantity) || 0), 0);
  const shippingProgress = Math.min((subtotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remainingForFreeShipping = Math.max(FREE_SHIPPING_THRESHOLD - subtotal, 0);

  useEffect(() => {
    if (!showClearModal) return undefined;

    function handleKeyDown(event) {
      if (event.key === "Escape") setShowClearModal(false);
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [showClearModal]);

  function goToCatalog() {
    navigate("/dashboard/catalogo");
  }

  function goToCheckout() {
    navigate("/dashboard/checkout");
  }

  function handleClearCart() {
    clearCart();
    setShowClearModal(false);
  }

  if (cartItems.length === 0) {
    return (
      <main className="cart cart--empty">
        <div className="cart-shell">
          <nav className="cart-nav" aria-label="Navegação do carrinho">
            <button type="button" className="cart-back-link" onClick={goToCatalog}>
              <FaArrowLeft aria-hidden="true" />
              <span>Voltar ao catálogo</span>
            </button>
            <span className="cart-nav-label">NOIR AVENUE <span>/</span> CARRINHO</span>
          </nav>

          <section className="cart-empty-state">
            <div className="cart-empty-mark" aria-hidden="true">
              <FaShoppingBag />
            </div>
            <span className="cart-kicker">SUA PRÓXIMA ESCOLHA COMEÇA AQUI</span>
            <h1>Seu carrinho está <em>vazio.</em></h1>
            <p>
              Explore a coleção Noir Avenue e encontre peças que combinam
              com o seu estilo.
            </p>
            <button type="button" className="cart-button cart-button--primary" onClick={goToCatalog}>
              <span>Explorar coleção</span>
              <FaArrowRight aria-hidden="true" />
            </button>
          </section>

          <footer className="cart-footer">
            <span>NOIR AVENUE</span>
            <span>ESTILO EM CADA DETALHE</span>
          </footer>
        </div>
      </main>
    );
  }

  return (
    <main className="cart">
      <div className="cart-shell">
        <nav className="cart-nav" aria-label="Navegação do carrinho">
          <button type="button" className="cart-back-link" onClick={goToCatalog}>
            <FaArrowLeft aria-hidden="true" />
            <span>Continuar comprando</span>
          </button>
          <div className="cart-nav-label">
            <span>NOIR AVENUE</span>
            <span className="cart-nav-divider">/</span>
            <span>CARRINHO</span>
          </div>
        </nav>

        <header className="cart-heading">
          <div>
            <span className="cart-kicker">SUA SELEÇÃO, COM CUIDADO</span>
            <h1>Seu carrinho<span>.</span></h1>
            <p>
              {totalItems} {totalItems === 1 ? "item selecionado" : "itens selecionados"}
              <span className="cart-heading-dot" aria-hidden="true">•</span>
              Revise sua seleção antes de continuar.
            </p>
          </div>
          <button
            type="button"
            className="cart-clear-link"
            onClick={() => setShowClearModal(true)}
          >
            <FaTrash aria-hidden="true" />
            <span>Limpar carrinho</span>
          </button>
        </header>

        <div className="cart-layout">
          <section className="cart-products" aria-label="Produtos no carrinho">
            <div className="cart-section-title">
              <div>
                <span className="cart-section-kicker">SELEÇÃO</span>
                <h2>Seus produtos</h2>
              </div>
              <span className="cart-product-count">
                {cartItems.length.toString().padStart(2, "0")} {cartItems.length === 1 ? "PRODUTO" : "PRODUTOS"}
              </span>
            </div>

            <div className="cart-items">
              {cartItems.map((item) => (
                <article className="cart-item" key={item.id}>
                  <div className="cart-item-media">
                    <img src={item.image} alt={item.name} loading="lazy" />
                  </div>

                  <div className="cart-item-main">
                    <div className="cart-item-copy">
                      <span className="cart-item-category">{item.category || "Coleção Noir"}</span>
                      <h3>{item.name}</h3>
                      <p className="cart-unit-price">
                        {formatPrice(item.price)} <span>/ unidade</span>
                      </p>
                    </div>

                    <div className="cart-item-controls">
                      <div className="cart-quantity-block">
                        <span className="cart-control-label">QUANTIDADE</span>
                        <div className="cart-quantity" aria-label={`Quantidade de ${item.name}`}>
                          <button
                            type="button"
                            aria-label={`Diminuir quantidade de ${item.name}`}
                            disabled={item.quantity <= 1}
                            onClick={() => decreaseQuantity(item.id)}
                          >
                            <FaMinus aria-hidden="true" />
                          </button>
                          <span aria-live="polite">{item.quantity}</span>
                          <button
                            type="button"
                            aria-label={`Aumentar quantidade de ${item.name}`}
                            disabled={Number.isFinite(Number(item.stock)) && item.quantity >= Number(item.stock)}
                            onClick={() => increaseQuantity(item.id)}
                          >
                            <FaPlus aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="cart-item-total">
                        <span className="cart-control-label">TOTAL DO ITEM</span>
                        <strong>{formatPrice((Number(item.price) || 0) * (Number(item.quantity) || 0))}</strong>
                      </div>
                    </div>

                    <button
                      type="button"
                      className="cart-remove-link"
                      aria-label={`Remover ${item.name} do carrinho`}
                      onClick={() => removeFromCart(item.id)}
                    >
                      <FaTrash aria-hidden="true" />
                      <span>Remover</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>

            <button type="button" className="cart-continue-link" onClick={goToCatalog}>
              <FaArrowLeft aria-hidden="true" />
              <span>Adicionar mais produtos</span>
            </button>

            <div className="cart-service-notes">
              <div className="cart-service-note">
                <span className="cart-service-icon"><FaTruck aria-hidden="true" /></span>
                <div>
                  <strong>Entrega calculada com transparência</strong>
                  <p>Frete grátis em pedidos a partir de {formatPrice(FREE_SHIPPING_THRESHOLD)}.</p>
                </div>
              </div>
              <div className="cart-service-note">
                <span className="cart-service-icon"><FaShieldAlt aria-hidden="true" /></span>
                <div>
                  <strong>Você no controle</strong>
                  <p>Revise os itens e as quantidades antes de finalizar.</p>
                </div>
              </div>
            </div>
          </section>

          <aside className="cart-summary" aria-labelledby="cart-summary-title">
            <div className="cart-summary-heading">
              <div>
                <span className="cart-section-kicker">NOIR AVENUE</span>
                <h2 id="cart-summary-title">Resumo do pedido</h2>
              </div>
              <span className="cart-summary-bag" aria-hidden="true"><FaShoppingBag /></span>
            </div>

            <div className="cart-shipping-progress">
              {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                <div className="cart-shipping-success">
                  <span className="cart-status-icon"><FaCheck aria-hidden="true" /></span>
                  <div>
                    <strong>Você desbloqueou o frete grátis</strong>
                    <p>Seu pedido atingiu o valor mínimo.</p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="cart-shipping-copy">
                    <span>FRETE GRÁTIS</span>
                    <strong>{Math.round(shippingProgress)}%</strong>
                  </div>
                  <div
                    className="cart-progress-track"
                    role="progressbar"
                    aria-label="Progresso para frete grátis"
                    aria-valuemin={0}
                    aria-valuemax={FREE_SHIPPING_THRESHOLD}
                    aria-valuenow={Math.min(subtotal, FREE_SHIPPING_THRESHOLD)}
                  >
                    <span style={{ width: `${shippingProgress}%` }} />
                  </div>
                  <p>
                    Faltam <strong>{formatPrice(remainingForFreeShipping)}</strong> para você ganhar frete grátis.
                  </p>
                </>
              )}
            </div>

            <div className="cart-summary-lines">
              <div className="cart-summary-line">
                <span>Subtotal <small>({totalItems} {totalItems === 1 ? "item" : "itens"})</small></span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>
              <div className="cart-summary-line">
                <span>Frete</span>
                <strong className={shipping === 0 ? "is-free" : ""}>
                  {shipping === 0 ? "Grátis" : formatPrice(shipping)}
                </strong>
              </div>
            </div>

            <div className="cart-summary-total">
              <div>
                <span>Total do pedido</span>
                <small>Impostos incluídos quando aplicável</small>
              </div>
              <strong>{formatPrice(total)}</strong>
            </div>

            <button type="button" className="cart-button cart-button--checkout" onClick={goToCheckout}>
              <span>Continuar para o checkout</span>
              <FaArrowRight aria-hidden="true" />
            </button>

            <div className="cart-summary-assurance">
              <FaLock aria-hidden="true" />
              <span>Você poderá revisar os dados na próxima etapa.</span>
            </div>

            <div className="cart-summary-footnote">
              <span>NOIR AVENUE</span>
              <span>ESTILO EM CADA DETALHE</span>
            </div>
          </aside>
        </div>
      </div>

      {showClearModal && (
        <div
          className="cart-modal-backdrop"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setShowClearModal(false);
          }}
        >
          <section
            className="cart-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cart-modal-title"
            aria-describedby="cart-modal-description"
          >
            <span className="cart-modal-icon"><FaTrash aria-hidden="true" /></span>
            <span className="cart-section-kicker">NOIR AVENUE</span>
            <h2 id="cart-modal-title">Limpar seu carrinho?</h2>
            <p id="cart-modal-description">
              Todos os produtos serão removidos da sua seleção. Essa ação não poderá ser desfeita.
            </p>
            <div className="cart-modal-actions">
              <button type="button" className="cart-modal-cancel" onClick={() => setShowClearModal(false)}>
                Manter produtos
              </button>
              <button type="button" className="cart-modal-confirm" onClick={handleClearCart}>
                Sim, limpar
              </button>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

export default Cart;
