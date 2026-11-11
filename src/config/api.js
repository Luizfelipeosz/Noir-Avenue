
const API_URL =
  import.meta.env.VITE_API_URL ||
  (import.meta.env.DEV
    ? "http://localhost:3001/api"
    : "https://noir-avenue-api.onrender.com/api");

export default API_URL;
