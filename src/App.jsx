import "./App.css";
import { Routes, Route } from "react-router-dom";

import Login from "./components/Login/Login";
import Cadastro from "./components/cadastro/Cadastro";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </div>
  );
}

export default App;