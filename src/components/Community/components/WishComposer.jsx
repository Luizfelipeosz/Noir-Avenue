import {
  FaArrowRight,
  FaComments,
  FaLock,
  FaTimes,
} from "react-icons/fa";

function WishComposer({
  open,
  form,
  categories,
  onFormChange,
  onSubmit,
  onClose,
}) {
  if (!open) return null;

  const availableCategories = categories.filter(
    (category) => category !== "Todas"
  );

  const isPrivate = form.visibility === "private";

  return (
    <div
      className="community-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className="community-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="community-composer-title"
      >
        <div className="community-modal-header">
          <div>
            <span className="community-kicker">
              {isPrivate ? "SUGESTÃO RESERVADA" : "NOIR COMMUNITY"}
            </span>

            <h2 id="community-composer-title">
              {isPrivate ? "Fale diretamente com a equipe." : "Compartilhe sua ideia."}
            </h2>
          </div>

          <button
            type="button"
            className="community-modal-close"
            onClick={onClose}
            aria-label="Fechar formulário"
          >
            <FaTimes aria-hidden="true" />
          </button>
        </div>

        <form onSubmit={onSubmit}>
          <label className="community-field">
            Título da ideia
            <input
              type="text"
              maxLength={90}
              required
              value={form.title}
              onChange={(event) => onFormChange("title", event.target.value)}
              placeholder="Dê um título para sua sugestão"
            />
          </label>

          <label className="community-field">
            Categoria
            <select
              value={form.category}
              onChange={(event) => onFormChange("category", event.target.value)}
            >
              {availableCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </label>

          <label className="community-field">
            Conte sua ideia
            <textarea
              required
              maxLength={1200}
              rows={5}
              value={form.body}
              onChange={(event) => onFormChange("body", event.target.value)}
              placeholder="Explique o que gostaria de ver na Noir Avenue..."
            />
            <small className="community-character-count">
              {form.body.length}/1200 caracteres
            </small>
          </label>

          <div className="community-visibility">
            <span>VISIBILIDADE</span>

            <label className={form.visibility === "public" ? "selected" : ""}>
              <input
                type="radio"
                name="visibility"
                value="public"
                checked={form.visibility === "public"}
                onChange={() => onFormChange("visibility", "public")}
              />
              <FaComments aria-hidden="true" />
              <span>
                <strong>Pública</strong>
                <small>Visível para a comunidade</small>
              </span>
            </label>

            <label className={form.visibility === "private" ? "selected" : ""}>
              <input
                type="radio"
                name="visibility"
                value="private"
                checked={form.visibility === "private"}
                onChange={() => onFormChange("visibility", "private")}
              />
              <FaLock aria-hidden="true" />
              <span>
                <strong>Privada</strong>
                <small>Visível somente nesta conta nesta demonstração</small>
              </span>
            </label>
          </div>

          <div className="community-modal-actions">
            <button
              type="button"
              className="community-cancel-btn"
              onClick={onClose}
            >
              Cancelar
            </button>

            <button type="submit" className="community-primary-btn">
              Enviar ideia
              <FaArrowRight aria-hidden="true" />
            </button>
          </div>
        </form>

        <p className="community-modal-disclaimer">
          Demonstração local: o envio não chega à administração e será perdido
          ao recarregar a página.
        </p>
      </section>
    </div>
  );
}

export default WishComposer;
