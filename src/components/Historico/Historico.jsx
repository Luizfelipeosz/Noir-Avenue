import { FaClock } from "react-icons/fa";
import { timeAgo } from "../../utils/timeAgo";

function Historico() {
  const activities =
    JSON.parse(
      localStorage.getItem(
        "noiravenue_activities"
      )
    ) || [];

  return (
    <div style={{ padding: "40px", color: "#fff" }}>
      <h1>
        <FaClock /> Histórico
      </h1>

      <br />

      {activities.length === 0 ? (
        <p>
          Nenhuma atividade
          registrada.
        </p>
      ) : (
        <ul>
          {activities.map((item) => (
            <li
              key={item.id}
              style={{
                marginBottom: "15px",
              }}
            >
              {item.message}
              {" • "}
              {timeAgo(item.createdAt)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Historico;