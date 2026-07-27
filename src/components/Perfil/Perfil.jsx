import { FaUser } from "react-icons/fa";
import "./Perfil.css";

function Perfil() {
  const user = JSON.parse(
    localStorage.getItem("noiravenue_user")
  ) || {};

  return (
    <div style={{ padding: "40px", color: "#fff" }}>
      <h1>
        <FaUser /> Meu Perfil
      </h1>

      <br />

      <p>
        <strong>Nome:</strong>{" "}
        {user.nome || "Não informado"}
      </p>

      <p>
        <strong>Email:</strong>{" "}
        {user.email || "Não informado"}
      </p>

      <p>
        <strong>Telefone:</strong>{" "}
        {user.telefone || "Não informado"}
      </p>

      <p>
        <strong>Endereço:</strong>{" "}
        {user.endereco || "Não informado"}
      </p>
    </div>
  );
}

export default Perfil;