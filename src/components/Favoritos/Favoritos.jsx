import { FaHeart } from "react-icons/fa";

function Favoritos() {
  const favorites =
    JSON.parse(
      localStorage.getItem(
        "noiravenue_favorites"
      )
    ) || [];

  return (
    <div style={{ padding: "40px", color: "#fff" }}>
      <h1>
        <FaHeart /> Favoritos
      </h1>

      <br />

      {favorites.length === 0 ? (
        <p>
          Você ainda não possui itens
          favoritados.
        </p>
      ) : (
        <ul>
          {favorites.map((item) => (
            <li
              key={item.id}
              style={{
                marginBottom: "15px",
              }}
            >
              {item.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Favoritos;

