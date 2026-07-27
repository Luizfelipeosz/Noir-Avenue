import { FaCrown } from "react-icons/fa";

function Premium() {
  const user = JSON.parse(
    localStorage.getItem("noiravenue_user")
  ) || {};

  const isPremium =
    user.isPremium || false;

  return (
    <div style={{ padding: "40px", color: "#fff" }}>
      <h1>
        <FaCrown /> Noir Premium
      </h1>

      <br />

      <p>
        Status atual:
        <strong>
          {" "}
          {isPremium
            ? "Ativo"
            : "Inativo"}
        </strong>
      </p>

      <br />

      {!isPremium && (
        <button
          onClick={() => {
            const updatedUser = {
              ...user,
              isPremium: true,
            };

            localStorage.setItem(
              "noiravenue_user",
              JSON.stringify(
                updatedUser
              )
            );

            alert(
              "Plano Premium ativado!"
            );

            window.location.reload();
          }}
          style={{
            padding:
              "12px 20px",
            cursor: "pointer",
            border: "none",
            borderRadius: "10px",
          }}
        >
          Ativar Premium
        </button>
      )}
    </div>
  );
}

export default Premium;