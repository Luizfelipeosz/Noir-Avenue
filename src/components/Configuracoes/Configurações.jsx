import { FaCog } from "react-icons/fa";

function Configuracoes() {
  const user =
    JSON.parse(
      localStorage.getItem(
        "noiravenue_user"
      )
    ) || {};

  return (
    <div style={{ padding: "40px", color: "#fff" }}>
      <h1>
        <FaCog /> Configurações
      </h1>

      <br />

      <p>
        <strong>Notificações:</strong>{" "}
        {user.notifications
          ? "Ativadas"
          : "Desativadas"}
      </p>

      <p>
        <strong>Tema:</strong>{" "}
        {user.theme || "Dark"}
      </p>

      <p>
        <strong>Idioma:</strong>{" "}
        {user.language || "Português"}
      </p>

      <br />

      <button
        onClick={() =>
          alert(
            "Funcionalidade em desenvolvimento."
          )
        }
        style={{
          padding: "12px 20px",
          border: "none",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        Editar Configurações
      </button>
    </div>
  );
}

export default Configuracoes;

