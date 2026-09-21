import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";

import "./Checkout.css";

const INITIAL_FORM = {
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
};

const PROFILE_KEYS = [
  "noiravenue_session",
  "noiravenue_user",
  "noiravenue_profile",
  "currentUser",
  "auth_user",
  "user",
];

const STATES = [
  "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO",
  "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI",
  "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
];

function readStoredProfile() {
  for (const key of PROFILE_KEYS) {
    try {
      const raw = localStorage.getItem(key);

      if (!raw) continue;

      const parsed = JSON.parse(raw);

      if (!parsed || typeof parsed !== "object") continue;

      const candidate =
        parsed.user ||
        parsed.profile ||
        parsed.data?.user ||
        parsed.data?.profile ||
        parsed;

      if (candidate && typeof candidate === "object") {
        return candidate;
      }
    } catch {
      // Ignore malformed or non-JSON localStorage entries.
    }
  }

  return null;
}

function normalizeProfile(profile) {
  if (!profile) return {};

  const address = profile.address || profile.shippingAddress || {};

  return {
    name: profile.name || profile.fullName || "",
    email: profile.email || "",
    phone: profile.phone || profile.telephone || "",
    cpf: profile.cpf || "",
    cep: address.cep || profile.cep || "",
    address: address.address || address.street || profile.address || "",
    number: address.number || profile.number || "",
    complement: address.complement || profile.complement || "",
    neighborhood:
      address.neighborhood || address.district || profile.neighborhood || "",
    city: address.city || profile.city || "",
    state: address.state || profile.state || "",
  };
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

function maskEmail(email) {
  if (!email || !email.includes("@")) return email || "";

  const [name, domain] = email.split("@");

  if (name.length <= 2) {
    return `${name[0] || ""}***@${domain}`;
  }

  return `${name.slice(0, 2)}***@${domain}`;
}

function maskCPF(cpf) {
  if (!cpf) return "";

  const digits = cpf.replace(/\D/g, "");

  if (digits.length !== 11) return cpf;

  return `***.***.${digits.slice(6, 9)}-${digits.slice(9)}`;
}

function getCardLastFour(cardNumber) {
  const digits = cardNumber.replace(/\D/g, "");

  return digits.length >= 4 ? digits.slice(-4) : "";
}

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [currentStep, setCurrentStep] = useState(1);

  const [isLoadingProfile, setIsLoadingProfile] = useState(true);
  const [isLookingUpCep, setIsLookingUpCep] = useState(false);
  const [cepMessage, setCepMessage] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const [orderNumber] = useState(
    () => `NA-${Date.now().toString().slice(-8)}`
  );

  const [form, setForm] = useState(INITIAL_FORM);

  useEffect(() => {
    const profile = normalizeProfile(readStoredProfile());

    setForm((previous) => ({
      ...previous,
      ...Object.fromEntries(
        Object.entries(profile).filter(([, value]) => Boolean(value))
      ),
    }));

    setIsLoadingProfile(false);
  }, []);

  const subtotal = useMemo(
    () =>
      cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      ),
    [cartItems]
  );

  const shipping =
    subtotal === 0
      ? 0
      : shippingMethod === "standard" && subtotal >= 500
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
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (name === "cep") {
      setCepMessage("");
    }
  }

  function handleFormattedChange(event) {
    const { name, value } = event.target;
    let formattedValue = value;

    if (name === "cpf") formattedValue = formatCPF(value);
    if (name === "phone") formattedValue = formatPhone(value);
    if (name === "cep") formattedValue = formatCEP(value);
    if (name === "cardNumber") formattedValue = formatCardNumber(value);
    if (name === "cardExpiry") formattedValue = formatExpiry(value);

    if (name === "cardCvv") {
      formattedValue = value.replace(/\D/g, "").slice(0, 4);
    }

    setForm((previous) => ({
      ...previous,
      [name]: formattedValue,
    }));

    if (name === "cep") {
      setCepMessage("");
    }
  }

  async function handleCepBlur() {
    const cep = form.cep.replace(/\D/g, "");

    if (cep.length !== 8) return;

    setIsLookingUpCep(true);
    setCepMessage("");

    try {
      const response = await fetch(
        `https://viacep.com.br/ws/${cep}/json/`
      );

      if (!response.ok) {
        throw new Error("Falha ao consultar CEP.");
      }

      const data = await response.json();

      if (data.erro) {
        setCepMessage("CEP não encontrado.");
        return;
      }

      setForm((previous) => ({
        ...previous,
        address: previous.address || data.logradouro || "",
        neighborhood:
          previous.neighborhood || data.bairro || "",
        city: previous.city || data.localidade || "",
        state: previous.state || data.uf || "",
      }));

      setCepMessage("Endereço localizado automaticamente.");
    } catch {
      setCepMessage(
        "Não foi possível consultar o CEP. Você pode preencher o endereço manualmente."
      );
    } finally {
      setIsLookingUpCep(false);
    }
  }

  function validateStep(step) {
    if (step === 1) {
      return Boolean(
        form.name.trim() &&
          form.email.trim() &&
          form.phone.replace(/\D/g, "").length >= 10 &&
          form.cpf.replace(/\D/g, "").length === 11
      );
    }

    if (step === 2) {
      return Boolean(
        form.cep.replace(/\D/g, "").length === 8 &&
          form.address.trim() &&
          form.number.trim() &&
          form.neighborhood.trim() &&
          form.city.trim() &&
          form.state
      );
    }

    if (step === 3) {
      if (paymentMethod !== "card") return true;

      return Boolean(
        form.cardNumber.replace(/\D/g, "").length >= 13 &&
          form.cardName.trim() &&
          form.cardExpiry.replace(/\D/g, "").length === 4 &&
          form.cardCvv.replace(/\D/g, "").length >= 3
      );
    }

    return true;
  }

  function goToNextStep() {
    setSubmitError("");

    if (!validateStep(currentStep)) {
      setSubmitError(
        "Revise os campos obrigatórios antes de continuar."
      );
      return;
    }

    setCurrentStep((step) => Math.min(step + 1, 4));
  }

  function goToPreviousStep() {
    setSubmitError("");
    setCurrentStep((step) => Math.max(step - 1, 1));
  }

  function handleSubmit(event) {
    event.preventDefault();

    setSubmitError("");

    // Cada submit avança apenas a etapa atual. Isso faz o Enter funcionar
    // naturalmente dentro dos campos sem disparar ações secundárias.
    if (currentStep < 4) {
      goToNextStep();
      return;
    }

    if (!validateStep(1) || !validateStep(2) || !validateStep(3)) {
      const firstInvalidStep = !validateStep(1)
        ? 1
        : !validateStep(2)
          ? 2
          : 3;

      setCurrentStep(firstInvalidStep);
      setSubmitError(
        "Revise os dados obrigatórios antes de confirmar o pedido."
      );
      return;
    }

    setIsProcessing(true);

    window.setTimeout(() => {
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
            <div className="checkout-empty-icon">🛍</div>

            <span className="checkout-eyebrow">NOIR AVENUE</span>

            <h1>Seu carrinho está vazio.</h1>

            <p>
              Adicione produtos à sua sacola antes de continuar para
              o checkout.
            </p>

            <button
              type="button"
              onClick={() => navigate("/dashboard/catalogo")}
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
            <div className="checkout-success-icon">✓</div>

            <span className="checkout-eyebrow">
              PEDIDO CONFIRMADO
            </span>

            <h1>Obrigado pela sua compra.</h1>

            <p>
              Seu pedido foi recebido com sucesso e já está sendo
              preparado pela Noir Avenue.
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
                  Confirmação enviada para{" "}
                  <strong>{maskEmail(form.email)}</strong>.
                </p>
              </div>

              <div>
                <span>✓</span>
                <p>
                  Entrega estimada:{" "}
                  <strong>
                    {shippingMethod === "express"
                      ? "1 a 3 dias úteis"
                      : "3 a 7 dias úteis"}
                  </strong>
                  .
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate("/dashboard/catalogo")}
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
            onClick={() => navigate("/dashboard/carrinho")}
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

        <div className="checkout-progress" aria-label="Etapas do checkout">
          {[
            ["1", "Identificação"],
            ["2", "Entrega"],
            ["3", "Pagamento"],
            ["4", "Revisão"],
          ].map(([number, label], index) => {
            const step = index + 1;
            const active = currentStep >= step;

            return (
              <div className="checkout-progress-group" key={number}>
                <button
                  type="button"
                  className={`checkout-progress-step ${
                    active ? "active" : ""
                  }`}
                  onClick={() => {
                    if (step < currentStep) setCurrentStep(step);
                  }}
                  disabled={step >= currentStep}
                >
                  <span>{number}</span>
                  <p>{label}</p>
                </button>

                {step < 4 && (
                  <div
                    className={`checkout-progress-line ${
                      currentStep > step ? "completed" : ""
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>

        <form className="checkout-layout" onSubmit={handleSubmit}>
          <div className="checkout-main">
            {currentStep === 1 && (
              <section className="checkout-section">
                <div className="checkout-section-header">
                  <div>
                    <span className="checkout-section-number">01</span>

                    <div>
                      <h2>Seus dados</h2>
                      <p>
                        Dados da sua conta utilizados para a compra.
                      </p>
                    </div>
                  </div>

                  <span className="checkout-section-status">
                    {isLoadingProfile
                      ? "CARREGANDO"
                      : "CONTA IDENTIFICADA"}
                  </span>
                </div>

                {isLoadingProfile ? (
                  <div className="checkout-profile-loading">
                    <span className="checkout-spinner" />
                    Carregando seus dados...
                  </div>
                ) : (
                  <>
                    <div className="checkout-account-card">
                      <div className="checkout-account-avatar">
                        {(form.name || "N").charAt(0).toUpperCase()}
                      </div>

                      <div>
                        <strong>
                          {form.name || "Cliente Noir Avenue"}
                        </strong>

                        <span>
                          {form.email
                            ? maskEmail(form.email)
                            : "Adicione seu e-mail"}
                        </span>
                      </div>

                      <small>Conta</small>
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
                          autoComplete="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Digite seu nome completo"
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
                          autoComplete="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="seu@email.com"
                          required
                        />
                      </div>

                      <div className="checkout-field">
                        <label htmlFor="phone">
                          Celular
                        </label>

                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          inputMode="tel"
                          autoComplete="tel"
                          value={form.phone}
                          onChange={handleFormattedChange}
                          placeholder="(00) 00000-0000"
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
                          inputMode="numeric"
                          autoComplete="off"
                          value={form.cpf}
                          onChange={handleFormattedChange}
                          placeholder="000.000.000-00"
                          required
                        />

                        {form.cpf && (
                          <small className="checkout-field-hint">
                            {maskCPF(form.cpf)}
                          </small>
                        )}
                      </div>
                    </div>

                    <div className="checkout-section-footer">
                      <div className="checkout-section-footer-copy">
                        <span>✓ Dados preenchidos a partir da sua conta</span>
                        <small>Confira as informações antes de continuar.</small>
                      </div>

                      <div className="checkout-section-footer-actions">
                        <button
                          type="button"
                          className="checkout-section-footer-button checkout-profile-action"
                          onClick={() => navigate("/dashboard/perfil")}
                        >
                          Editar perfil
                        </button>

                        <button
                          type="submit"
                          className="checkout-section-footer-button checkout-section-footer-primary"
                          disabled={isLoadingProfile || isProcessing}
                        >
                          Continuar para entrega
                          <span>→</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </section>
            )}

            {currentStep === 2 && (
              <>
                <section className="checkout-section">
                  <div className="checkout-section-header">
                    <div>
                      <span className="checkout-section-number">
                        02
                      </span>

                      <div>
                        <h2>Endereço de entrega</h2>
                        <p>
                          Use seu endereço salvo ou informe um novo.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="checkout-address-summary">
                    <div>
                      <span>DESTINO</span>
                      <strong>
                        {form.address
                          ? `${form.address}, ${form.number || "s/n"}`
                          : "Novo endereço"}
                      </strong>

                      <p>
                        {form.neighborhood
                          ? `${form.neighborhood} · ${form.city || ""}${
                              form.state ? ` / ${form.state}` : ""
                            }`
                          : "Preencha o endereço abaixo."}
                      </p>
                    </div>

                    <span className="checkout-address-badge">
                      {form.cep ? "PRONTO" : "NOVO"}
                    </span>
                  </div>

                  <div className="checkout-fields">
                    <div className="checkout-field cep-field">
                      <label htmlFor="cep">CEP</label>

                      <input
                        id="cep"
                        name="cep"
                        type="text"
                        inputMode="numeric"
                        autoComplete="postal-code"
                        value={form.cep}
                        onChange={handleFormattedChange}
                        onBlur={handleCepBlur}
                        placeholder="00000-000"
                        required
                      />

                      {isLookingUpCep && (
                        <small className="checkout-field-hint">
                          Consultando endereço...
                        </small>
                      )}

                      {!isLookingUpCep && cepMessage && (
                        <small
                          className={`checkout-field-hint ${
                            cepMessage.includes("não")
                              ? "error"
                              : "success"
                          }`}
                        >
                          {cepMessage}
                        </small>
                      )}
                    </div>

                    <div className="checkout-field full">
                      <label htmlFor="address">Endereço</label>

                      <input
                        id="address"
                        name="address"
                        type="text"
                        autoComplete="street-address"
                        value={form.address}
                        onChange={handleChange}
                        placeholder="Rua, avenida..."
                        required
                      />
                    </div>

                    <div className="checkout-field">
                      <label htmlFor="number">Número</label>

                      <input
                        id="number"
                        name="number"
                        type="text"
                        inputMode="numeric"
                        autoComplete="address-line2"
                        value={form.number}
                        onChange={handleChange}
                        placeholder="000"
                        required
                      />
                    </div>

                    <div className="checkout-field">
                      <label htmlFor="complement">
                        Complemento <span>opcional</span>
                      </label>

                      <input
                        id="complement"
                        name="complement"
                        type="text"
                        value={form.complement}
                        onChange={handleChange}
                        placeholder="Apartamento, bloco..."
                      />
                    </div>

                    <div className="checkout-field">
                      <label htmlFor="neighborhood">Bairro</label>

                      <input
                        id="neighborhood"
                        name="neighborhood"
                        type="text"
                        autoComplete="address-level3"
                        value={form.neighborhood}
                        onChange={handleChange}
                        placeholder="Seu bairro"
                        required
                      />
                    </div>

                    <div className="checkout-field">
                      <label htmlFor="city">Cidade</label>

                      <input
                        id="city"
                        name="city"
                        type="text"
                        autoComplete="address-level2"
                        value={form.city}
                        onChange={handleChange}
                        placeholder="Sua cidade"
                        required
                      />
                    </div>

                    <div className="checkout-field small">
                      <label htmlFor="state">Estado</label>

                      <select
                        id="state"
                        name="state"
                        autoComplete="address-level1"
                        value={form.state}
                        onChange={handleChange}
                        required
                      >
                        <option value="">UF</option>

                        {STATES.map((state) => (
                          <option value={state} key={state}>
                            {state}
                          </option>
                        ))}
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
                        <h2>Método de entrega</h2>
                        <p>
                          Escolha quando deseja receber seu pedido.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="shipping-options">
                    <label
                      className={`shipping-option ${
                        shippingMethod === "standard" ? "selected" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="shipping"
                        value="standard"
                        checked={shippingMethod === "standard"}
                        onChange={(event) =>
                          setShippingMethod(event.target.value)
                        }
                      />

                      <span className="shipping-radio" />

                      <div>
                        <strong>Entrega padrão</strong>
                        <p>3 a 7 dias úteis</p>
                      </div>

                      <span className="shipping-price">
                        {subtotal >= 500 ? "Grátis" : formatPrice(29.9)}
                      </span>
                    </label>

                    <label
                      className={`shipping-option ${
                        shippingMethod === "express" ? "selected" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name="shipping"
                        value="express"
                        checked={shippingMethod === "express"}
                        onChange={(event) =>
                          setShippingMethod(event.target.value)
                        }
                      />

                      <span className="shipping-radio" />

                      <div>
                        <strong>Entrega expressa</strong>
                        <p>1 a 3 dias úteis</p>
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
                        <strong>frete grátis</strong> na entrega padrão.
                      </p>
                    </div>
                  )}
                </section>

                <div className="checkout-step-navigation">
                  <button
                    type="button"
                    className="checkout-secondary-button"
                    onClick={goToPreviousStep}
                    disabled={isProcessing}
                  >
                    ← Identificação
                  </button>

                  <button
                    type="submit"
                    className="checkout-submit"
                    disabled={isProcessing}
                  >
                    Continuar para pagamento
                    <span>→</span>
                  </button>
                </div>
              </>
            )}

            {currentStep === 3 && (
              <section className="checkout-section">
                <div className="checkout-section-header">
                  <div>
                    <span className="checkout-section-number">
                      04
                    </span>

                    <div>
                      <h2>Pagamento</h2>
                      <p>
                        Escolha uma forma de pagamento para concluir
                        a compra.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="payment-tabs">
                  <button
                    type="button"
                    className={
                      paymentMethod === "card" ? "active" : ""
                    }
                    onClick={() => setPaymentMethod("card")}
                  >
                    <span>▣</span>
                    Cartão
                  </button>

                  <button
                    type="button"
                    className={
                      paymentMethod === "pix" ? "active" : ""
                    }
                    onClick={() => setPaymentMethod("pix")}
                  >
                    <span>◇</span>
                    PIX
                  </button>

                  <button
                    type="button"
                    className={
                      paymentMethod === "boleto" ? "active" : ""
                    }
                    onClick={() => setPaymentMethod("boleto")}
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

                      <div className="card-chip">◇</div>

                      <strong>
                        {form.cardNumber || "•••• •••• •••• ••••"}
                      </strong>

                      <div className="card-preview-bottom">
                        <span>
                          {form.cardName || "NOME DO TITULAR"}
                        </span>

                        <span>{form.cardExpiry || "MM/AA"}</span>
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
                          autoComplete="cc-number"
                          placeholder="0000 0000 0000 0000"
                          value={form.cardNumber}
                          onChange={handleFormattedChange}
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
                          autoComplete="cc-name"
                          placeholder="Nome como está no cartão"
                          value={form.cardName}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="checkout-field">
                        <label htmlFor="cardExpiry">Validade</label>

                        <input
                          id="cardExpiry"
                          name="cardExpiry"
                          type="text"
                          inputMode="numeric"
                          autoComplete="cc-exp"
                          placeholder="MM/AA"
                          value={form.cardExpiry}
                          onChange={handleFormattedChange}
                          required
                        />
                      </div>

                      <div className="checkout-field">
                        <label htmlFor="cardCvv">CVV</label>

                        <input
                          id="cardCvv"
                          name="cardCvv"
                          type="text"
                          inputMode="numeric"
                          autoComplete="cc-csc"
                          placeholder="000"
                          value={form.cardCvv}
                          onChange={handleFormattedChange}
                          required
                        />
                      </div>
                    </div>
                  </div>
                )}

                {paymentMethod === "pix" && (
                  <div className="payment-info">
                    <div className="payment-info-icon">◇</div>

                    <div>
                      <h3>Pagamento via PIX</h3>
                      <p>
                        Após revisar o pedido, geraremos um QR Code
                        fictício para simular o fluxo de pagamento.
                      </p>
                    </div>
                  </div>
                )}

                {paymentMethod === "boleto" && (
                  <div className="payment-info">
                    <div className="payment-info-icon">▤</div>

                    <div>
                      <h3>Boleto bancário</h3>
                      <p>
                        O boleto será gerado como parte da simulação
                        após a confirmação do pedido.
                      </p>
                    </div>
                  </div>
                )}

                <div className="checkout-demo-notice">
                  <span>i</span>

                  <p>
                    Checkout demonstrativo: nenhum dado de cartão real
                    deve ser utilizado ou armazenado neste projeto.
                  </p>
                </div>

                <div className="checkout-step-navigation">
                  <button
                    type="button"
                    className="checkout-secondary-button"
                    onClick={goToPreviousStep}
                    disabled={isProcessing}
                  >
                    ← Entrega
                  </button>

                  <button
                    type="submit"
                    className="checkout-submit"
                    disabled={isProcessing}
                  >
                    Ir para revisão
                    <span>→</span>
                  </button>
                </div>
              </section>
            )}

            {currentStep === 4 && (
              <section className="checkout-section checkout-review">
                <div className="checkout-section-header">
                  <div>
                    <span className="checkout-section-number">
                      05
                    </span>

                    <div>
                      <h2>Revisar pedido</h2>
                      <p>
                        Confira os dados antes de confirmar sua compra.
                      </p>
                    </div>
                  </div>

                  <span className="checkout-section-status">
                    REVISÃO FINAL
                  </span>
                </div>

                <div className="checkout-review-list">
                  <div className="checkout-review-card">
                    <div>
                      <span>CLIENTE</span>
                      <strong>{form.name}</strong>
                      <p>{form.email}</p>
                      <p>{form.phone}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                    >
                      Editar
                    </button>
                  </div>

                  <div className="checkout-review-card">
                    <div>
                      <span>ENTREGA</span>
                      <strong>
                        {form.address}, {form.number}
                      </strong>
                      <p>
                        {form.neighborhood} · {form.city} / {form.state}
                      </p>
                      <p>CEP {form.cep}</p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                    >
                      Editar
                    </button>
                  </div>

                  <div className="checkout-review-card">
                    <div>
                      <span>FORMA DE ENTREGA</span>
                      <strong>
                        {shippingMethod === "express"
                          ? "Entrega expressa"
                          : "Entrega padrão"}
                      </strong>
                      <p>
                        {shippingMethod === "express"
                          ? "1 a 3 dias úteis"
                          : "3 a 7 dias úteis"}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                    >
                      Editar
                    </button>
                  </div>

                  <div className="checkout-review-card">
                    <div>
                      <span>PAGAMENTO</span>

                      <strong>
                        {paymentMethod === "card"
                          ? `Cartão final •••• ${getCardLastFour(
                              form.cardNumber
                            )}`
                          : paymentMethod === "pix"
                            ? "PIX"
                            : "Boleto bancário"}
                      </strong>

                      <p>
                        {paymentMethod === "card"
                          ? form.cardName
                          : "Pagamento simulado"}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                    >
                      Editar
                    </button>
                  </div>
                </div>

                <div className="checkout-review-total">
                  <div>
                    <span>Total da compra</span>
                    <small>
                      {cartItems.length}{" "}
                      {cartItems.length === 1 ? "item" : "itens"} ·{" "}
                      {shipping === 0 ? "frete grátis" : "frete incluso"}
                    </small>
                  </div>

                  <strong>{formatPrice(total)}</strong>
                </div>

                <div className="checkout-step-navigation checkout-review-navigation">
                  <button
                    type="button"
                    className="checkout-secondary-button"
                    onClick={goToPreviousStep}
                    disabled={isProcessing}
                  >
                    ← Pagamento
                  </button>

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
                        Confirmar pedido
                        <span>→</span>
                      </>
                    )}
                  </button>
                </div>
              </section>
            )}

            {submitError && (
              <div className="checkout-form-error" role="alert">
                <span>!</span>
                {submitError}
              </div>
            )}

            <div className="checkout-final-security">
              <span>✓</span>

              <div>
                <strong>Seus dados estão protegidos</strong>

                <p>
                  Esta é uma simulação de checkout. Nenhum dado de
                  pagamento real é processado ou armazenado.
                </p>
              </div>
            </div>
          </div>

          <aside className="checkout-summary">
            <div className="checkout-summary-header">
              <span>RESUMO DO PEDIDO</span>

              <strong>
                {cartItems.length}{" "}
                {cartItems.length === 1 ? "item" : "itens"}
              </strong>
            </div>

            <div className="checkout-products">
              {cartItems.map((item) => (
                <div className="checkout-product" key={item.id}>
                  <div className="checkout-product-image">
                    <img src={item.image} alt={item.name} />

                    <span>{item.quantity}</span>
                  </div>

                  <div className="checkout-product-info">
                    <strong>{item.name}</strong>

                    <span>
                      {item.category || "Coleção Noir"}
                    </span>
                  </div>

                  <strong className="checkout-product-price">
                    {formatPrice(item.price * item.quantity)}
                  </strong>
                </div>
              ))}
            </div>

            <div className="checkout-summary-lines">
              <div>
                <span>Subtotal</span>
                <strong>{formatPrice(subtotal)}</strong>
              </div>

              <div>
                <span>Frete</span>
                <strong>
                  {shipping === 0 ? "Grátis" : formatPrice(shipping)}
                </strong>
              </div>
            </div>

            <div className="checkout-summary-total">
              <div>
                <span>Total</span>
                <small>
                  {paymentMethod === "card"
                    ? "pagamento no cartão"
                    : `pagamento via ${
                        paymentMethod === "pix" ? "PIX" : "boleto"
                      }`}
                </small>
              </div>

              <strong>{formatPrice(total)}</strong>
            </div>

            <div className="checkout-summary-actions">
              {currentStep > 1 && (
                <button
                  type="button"
                  className="checkout-secondary-button"
                  onClick={goToPreviousStep}
                  disabled={isProcessing}
                >
                  ← Voltar
                </button>
              )}

              {currentStep < 4 ? (
                <button
                  type="submit"
                  className="checkout-submit"
                  disabled={isProcessing || isLoadingProfile}
                >
                  {currentStep === 1
                    ? "Continuar para entrega"
                    : currentStep === 2
                      ? "Continuar para pagamento"
                      : "Ir para revisão"}
                  <span>→</span>
                </button>
              ) : (
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
                      Confirmar pedido
                      <span>→</span>
                    </>
                  )}
                </button>
              )}
            </div>

            <div className="checkout-summary-security">
              <span>✓</span>
              <p>Ambiente seguro e protegido</p>
            </div>

            <div className="checkout-summary-note">
              <span>i</span>

              <p>
                Ao finalizar, você concorda com os termos de compra e
                política de privacidade da Noir Avenue.
              </p>
            </div>
          </aside>
        </form>
      </div>
    </main>
  );
}

export default Checkout;
