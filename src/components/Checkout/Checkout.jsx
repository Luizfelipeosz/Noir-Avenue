import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

import "./Checkout.css";

function Checkout() {
  const navigate = useNavigate();

  const { cartItems, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [shippingMethod, setShippingMethod] = useState("standard");

  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const [orderNumber] = useState(
    () =>
      `NA-${Date.now().toString().slice(-8)}`
  );

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    cpf: "",

    cep: "",
    address: "",
    number: "",
    complement: "",
    neighborhood: "",
    city: "",
    state: "",

    cardName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCvv: "",

    billingSame: true,
  });

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) =>
          total + item.price * item.quantity,
        0
      ),
    [cartItems]
  );

  const shipping =
    subtotal === 0
      ? 0
      : subtotal >= 500
        ? 0
        : shippingMethod === "express"
          ? 49.9
          : 29.9;

  const total = subtotal + shipping;

  const formatPrice = (value) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function formatCPF(value) {
    return value
      .replace(/\D/g, "")
      .slice(0, 11)
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  }

  function formatPhone(value) {
    return value
      .replace(/\D/g, "")
      .slice(0, 11)
      .replace(/^(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  }

  function formatCEP(value) {
    return value
      .replace(/\D/g, "")
      .slice(0, 8)
      .replace(/(\d{5})(\d)/, "$1-$2");
  }

  function formatCardNumber(value) {
    return value
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(\d{4})(?=\d)/g, "$1 ");
  }

  function formatExpiry(value) {
    return value
      .replace(/\D/g, "")
      .slice(0, 4)
      .replace(/(\d{2})(\d)/, "$1/$2");
  }

  function handleFormattedChange(event) {
    const { name, value } = event.target;

    let formattedValue = value;

    if (name === "cpf") {
      formattedValue = formatCPF(value);
    }

    if (name === "phone") {
      formattedValue = formatPhone(value);
    }

    if (name === "cep") {
      formattedValue = formatCEP(value);
    }

    if (name === "cardNumber") {
      formattedValue = formatCardNumber(value);
    }

    if (name === "cardExpiry") {
      formattedValue = formatExpiry(value);
    }

    if (name === "cardCvv") {
      formattedValue = value
        .replace(/\D/g, "")
        .slice(0, 4);
    }

    setForm((previous) => ({
      ...previous,
      [name]: formattedValue,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setIsCompleted(true);
      clearCart();
    }, 1800);
  }

  if (cartItems.length === 0 && !isCompleted) {
    return (
      <main className="checkout">
        <div className="checkout-container">
          <section className="checkout-empty">
            <div className="checkout-empty-icon">
              🛍
            </div>

            <span className="checkout-eyebrow">
              NOIR AVENUE
            </span>

            <h1>
              Seu carrinho está vazio.
            </h1>

            <p>
              Adicione produtos à sua sacola antes
              de continuar para o checkout.
            </p>

            <button
              type="button"
              onClick={() =>
                navigate("/dashboard/catalogo")
              }
            >
              Voltar para a coleção
            </button>
          </section>
        </div>
      </main>
    );
  }

  if (isCompleted) {
    return (
      <main className="checkout">
        <div className="checkout-container">
          <section className="checkout-success">
            <div className="checkout-success-icon">
              ✓
            </div>

            <span className="checkout-eyebrow">
              PEDIDO CONFIRMADO
            </span>

            <h1>
              Obrigado pela sua compra.
            </h1>

            <p>
              Seu pedido foi recebido com sucesso e
              já está sendo preparado pela Noir Avenue.
            </p>

            <div className="checkout-order-card">
              <div>
                <span>NÚMERO DO PEDIDO</span>
                <strong>{orderNumber}</strong>
              </div>

              <div>
                <span>TOTAL</span>
                <strong>{formatPrice(total)}</strong>
              </div>
            </div>

            <div className="checkout-success-info">
              <div>
                <span>✓</span>
                <p>
                  Uma confirmação foi enviada para
                  <strong>
                    {" "}
                    {form.email || "seu e-mail"}
                  </strong>.
                </p>
              </div>

              <div>
                <span>✓</span>
                <p>
                  Previsão de entrega:
                  <strong> 3 a 7 dias úteis</strong>.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() =>
                navigate("/dashboard/catalogo")
              }
            >
              Continuar comprando
              <span>→</span>
            </button>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="checkout">
      <div className="checkout-container">
        <header className="checkout-header">
          <button
            type="button"
            className="checkout-back"
            onClick={() =>
              navigate("/dashboard/carrinho")
            }
          >
            <span>←</span>
            Voltar ao carrinho
          </button>

          <div className="checkout-brand">
            <span>NOIR</span>
            <small>AVENUE</small>
          </div>

          <div className="checkout-secure">
            <span>✓</span>
            Compra segura
          </div>
        </header>

        <div className="checkout-progress">
          <div className="checkout-progress-step active">
            <span>1</span>
            <p>Identificação</p>
          </div>

          <div className="checkout-progress-line" />

          <div className="checkout-progress-step active">
            <span>2</span>
            <p>Entrega</p>
          </div>

          <div className="checkout-progress-line" />

          <div className="checkout-progress-step active">
            <span>3</span>
            <p>Pagamento</p>
          </div>

          <div className="checkout-progress-line" />

          <div className="checkout-progress-step active">
            <span>4</span>
            <p>Revisão</p>
          </div>
        </div>

        <form
          className="checkout-layout"
          onSubmit={handleSubmit}
        >
          <div className="checkout-main">
            <section className="checkout-section">
              <div className="checkout-section-header">
                <div>
                  <span className="checkout-section-number">
                    01
                  </span>

                  <div>
                    <h2>
                      Seus dados
                    </h2>

                    <p>
                      Informe seus dados para continuar.
                    </p>
                  </div>
                </div>
              </div>

              <div className="checkout-fields">
                <div className="checkout-field full">
                  <label htmlFor="name">
                    Nome completo
                  </label>

                  <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Digite seu nome completo"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="checkout-field">
                  <label htmlFor="email">
                    E-mail
                  </label>

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="checkout-field">
                  <label htmlFor="phone">
                    Telefone
                  </label>

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="(00) 00000-0000"
                    value={form.phone}
                    onChange={handleFormattedChange}
                    required
                  />
                </div>

                <div className="checkout-field">
                  <label htmlFor="cpf">
                    CPF
                  </label>

                  <input
                    id="cpf"
                    name="cpf"
                    type="text"
                    placeholder="000.000.000-00"
                    value={form.cpf}
                    onChange={handleFormattedChange}
                    required
                  />
                </div>
              </div>
            </section>

            <section className="checkout-section">
              <div className="checkout-section-header">
                <div>
                  <span className="checkout-section-number">
                    02
                  </span>

                  <div>
                    <h2>
                      Endereço de entrega
                    </h2>

                    <p>
                      Onde devemos entregar seu pedido?
                    </p>
                  </div>
                </div>
              </div>

              <div className="checkout-fields">
                <div className="checkout-field cep-field">
                  <label htmlFor="cep">
                    CEP
                  </label>

                  <input
                    id="cep"
                    name="cep"
                    type="text"
                    placeholder="00000-000"
                    value={form.cep}
                    onChange={handleFormattedChange}
                    required
                  />
                </div>

                <div className="checkout-field full">
                  <label htmlFor="address">
                    Endereço
                  </label>

                  <input
                    id="address"
                    name="address"
                    type="text"
                    placeholder="Rua, avenida..."
                    value={form.address}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="checkout-field">
                  <label htmlFor="number">
                    Número
                  </label>

                  <input
                    id="number"
                    name="number"
                    type="text"
                    placeholder="000"
                    value={form.number}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="checkout-field">
                  <label htmlFor="complement">
                    Complemento
                    <span>opcional</span>
                  </label>

                  <input
                    id="complement"
                    name="complement"
                    type="text"
                    placeholder="Apartamento, bloco..."
                    value={form.complement}
                    onChange={handleChange}
                  />
                </div>

                <div className="checkout-field">
                  <label htmlFor="neighborhood">
                    Bairro
                  </label>

                  <input
                    id="neighborhood"
                    name="neighborhood"
                    type="text"
                    placeholder="Seu bairro"
                    value={form.neighborhood}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="checkout-field">
                  <label htmlFor="city">
                    Cidade
                  </label>

                  <input
                    id="city"
                    name="city"
                    type="text"
                    placeholder="Sua cidade"
                    value={form.city}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="checkout-field small">
                  <label htmlFor="state">
                    Estado
                  </label>

                  <select
                    id="state"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    required
                  >
                    <option value="">
                      UF
                    </option>

                    <option value="AC">AC</option>
                    <option value="AL">AL</option>
                    <option value="AP">AP</option>
                    <option value="AM">AM</option>
                    <option value="BA">BA</option>
                    <option value="CE">CE</option>
                    <option value="DF">DF</option>
                    <option value="ES">ES</option>
                    <option value="GO">GO</option>
                    <option value="MA">MA</option>
                    <option value="MT">MT</option>
                    <option value="MS">MS</option>
                    <option value="MG">MG</option>
                    <option value="PA">PA</option>
                    <option value="PB">PB</option>
                    <option value="PR">PR</option>
                    <option value="PE">PE</option>
                    <option value="PI">PI</option>
                    <option value="RJ">RJ</option>
                    <option value="RN">RN</option>
                    <option value="RS">RS</option>
                    <option value="RO">RO</option>
                    <option value="RR">RR</option>
                    <option value="SC">SC</option>
                    <option value="SP">SP</option>
                    <option value="SE">SE</option>
                    <option value="TO">TO</option>
                  </select>
                </div>
              </div>
            </section>

            <section className="checkout-section">
              <div className="checkout-section-header">
                <div>
                  <span className="checkout-section-number">
                    03
                  </span>

                  <div>
                    <h2>
                      Método de entrega
                    </h2>

                    <p>
                      Escolha como deseja receber seu pedido.
                    </p>
                  </div>
                </div>
              </div>

              <div className="shipping-options">
                <label
                  className={`shipping-option ${
                    shippingMethod === "standard"
                      ? "selected"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="shipping"
                    value="standard"
                    checked={
                      shippingMethod === "standard"
                    }
                    onChange={(event) =>
                      setShippingMethod(
                        event.target.value
                      )
                    }
                  />

                  <span className="shipping-radio" />

                  <div>
                    <strong>
                      Entrega padrão
                    </strong>

                    <p>
                      3 a 7 dias úteis
                    </p>
                  </div>

                  <span className="shipping-price">
                    {subtotal >= 500
                      ? "Grátis"
                      : formatPrice(29.9)}
                  </span>
                </label>

                <label
                  className={`shipping-option ${
                    shippingMethod === "express"
                      ? "selected"
                      : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="shipping"
                    value="express"
                    checked={
                      shippingMethod === "express"
                    }
                    onChange={(event) =>
                      setShippingMethod(
                        event.target.value
                      )
                    }
                  />

                  <span className="shipping-radio" />

                  <div>
                    <strong>
                      Entrega expressa
                    </strong>

                    <p>
                      1 a 3 dias úteis
                    </p>
                  </div>

                  <span className="shipping-price">
                    {formatPrice(49.9)}
                  </span>
                </label>
              </div>

              {subtotal >= 500 && (
                <div className="checkout-free-shipping">
                  <span>✓</span>

                  <p>
                    Seu pedido possui{" "}
                    <strong>
                      frete grátis
                    </strong>{" "}
                    para a entrega padrão.
                  </p>
                </div>
              )}
            </section>

            <section className="checkout-section">
              <div className="checkout-section-header">
                <div>
                  <span className="checkout-section-number">
                    04
                  </span>

                  <div>
                    <h2>
                      Pagamento
                    </h2>

                    <p>
                      Escolha sua forma de pagamento.
                    </p>
                  </div>
                </div>
              </div>

              <div className="payment-tabs">
                <button
                  type="button"
                  className={
                    paymentMethod === "card"
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setPaymentMethod("card")
                  }
                >
                  <span>▣</span>
                  Cartão
                </button>

                <button
                  type="button"
                  className={
                    paymentMethod === "pix"
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setPaymentMethod("pix")
                  }
                >
                  <span>◇</span>
                  PIX
                </button>

                <button
                  type="button"
                  className={
                    paymentMethod === "boleto"
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setPaymentMethod("boleto")
                  }
                >
                  <span>▤</span>
                  Boleto
                </button>
              </div>

              {paymentMethod === "card" && (
                <div className="payment-content">
                  <div className="checkout-card-preview">
                    <div className="card-preview-top">
                      <span>NOIR</span>
                      <span>AVENUE</span>
                    </div>

                    <div className="card-chip">
                      ◇
                    </div>

                    <strong>
                      {form.cardNumber ||
                        "•••• •••• •••• ••••"}
                    </strong>

                    <div className="card-preview-bottom">
                      <span>
                        {form.cardName ||
                          "NOME DO TITULAR"}
                      </span>

                      <span>
                        {form.cardExpiry || "MM/AA"}
                      </span>
                    </div>
                  </div>

                  <div className="checkout-fields">
                    <div className="checkout-field full">
                      <label htmlFor="cardNumber">
                        Número do cartão
                      </label>

                      <input
                        id="cardNumber"
                        name="cardNumber"
                        type="text"
                        inputMode="numeric"
                        placeholder="0000 0000 0000 0000"
                        value={form.cardNumber}
                        onChange={
                          handleFormattedChange
                        }
                        required
                      />
                    </div>

                    <div className="checkout-field full">
                      <label htmlFor="cardName">
                        Nome impresso no cartão
                      </label>

                      <input
                        id="cardName"
                        name="cardName"
                        type="text"
                        placeholder="Nome como está no cartão"
                        value={form.cardName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="checkout-field">
                      <label htmlFor="cardExpiry">
                        Validade
                      </label>

                      <input
                        id="cardExpiry"
                        name="cardExpiry"
                        type="text"
                        inputMode="numeric"
                        placeholder="MM/AA"
                        value={form.cardExpiry}
                        onChange={
                          handleFormattedChange
                        }
                        required
                      />
                    </div>

                    <div className="checkout-field">
                      <label htmlFor="cardCvv">
                        CVV
                      </label>

                      <input
                        id="cardCvv"
                        name="cardCvv"
                        type="text"
                        inputMode="numeric"
                        placeholder="000"
                        value={form.cardCvv}
                        onChange={
                          handleFormattedChange
                        }
                        required
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === "pix" && (
                <div className="payment-info">
                  <div className="payment-info-icon">
                    ◇
                  </div>

                  <div>
                    <h3>
                      Pagamento via PIX
                    </h3>

                    <p>
                      Após confirmar o pedido,
                      exibiremos um QR Code para
                      simulação do pagamento.
                    </p>
                  </div>
                </div>
              )}

              {paymentMethod === "boleto" && (
                <div className="payment-info">
                  <div className="payment-info-icon">
                    ▤
                  </div>

                  <div>
                    <h3>
                      Boleto bancário
                    </h3>

                    <p>
                      O boleto será disponibilizado
                      após a confirmação do pedido.
                    </p>
                  </div>
                </div>
              )}
            </section>

            <div className="checkout-final-security">
              <span>✓</span>

              <div>
                <strong>
                  Seus dados estão protegidos
                </strong>

                <p>
                  Esta é uma simulação de checkout.
                  Nenhum dado de pagamento real é
                  processado ou armazenado.
                </p>
              </div>
            </div>
          </div>

          <aside className="checkout-summary">
            <div className="checkout-summary-header">
              <span>
                RESUMO DO PEDIDO
              </span>

              <strong>
                {cartItems.length}{" "}
                {cartItems.length === 1
                  ? "item"
                  : "itens"}
              </strong>
            </div>

            <div className="checkout-products">
              {cartItems.map((item) => (
                <div
                  className="checkout-product"
                  key={item.id}
                >
                  <div className="checkout-product-image">
                    <img
                      src={item.image}
                      alt={item.name}
                    />

                    <span>
                      {item.quantity}
                    </span>
                  </div>

                  <div className="checkout-product-info">
                    <strong>
                      {item.name}
                    </strong>

                    <span>
                      {item.category ||
                        "Coleção Noir"}
                    </span>
                  </div>

                  <strong className="checkout-product-price">
                    {formatPrice(
                      item.price *
                        item.quantity
                    )}
                  </strong>
                </div>
              ))}
            </div>

            <div className="checkout-summary-lines">
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

            <div className="checkout-summary-total">
              <div>
                <span>Total</span>
                <small>
                  em até 12x no cartão
                </small>
              </div>

              <strong>
                {formatPrice(total)}
              </strong>
            </div>

            <button
              type="submit"
              className="checkout-submit"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <>
                  <span className="checkout-spinner" />
                  Processando pedido...
                </>
              ) : (
                <>
                  Finalizar pedido
                  <span>→</span>
                </>
              )}
            </button>

            <div className="checkout-summary-security">
              <span>✓</span>

              <p>
                Ambiente seguro e protegido
              </p>
            </div>

            <div className="checkout-summary-note">
              <span>i</span>

              <p>
                Ao finalizar, você concorda com
                nossos termos de compra e política
                de privacidade.
              </p>
            </div>
          </aside>
        </form>
      </div>
    </main>
  );
}

export default Checkout;