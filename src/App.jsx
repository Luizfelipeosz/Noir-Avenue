import "./App.css";
import { Routes, Route } from "react-router-dom";

import Login from "./components/Login/Login";
import Cadastro from "./components/cadastro/Cadastro";
import Dashboard from "./components/Dashboard/Dashboard";
import PrivateRoute from "./components/Route/PrivateRoute";

// Páginas do Dashboard
import Perfil from "./components/Perfil/Perfil";
import Favoritos from "./components/Favoritos/Favoritos";
import Configuracoes from "./components/Configuracoes/Configuracoes";
import Premium from "./components/Premium/Premium";
import Historico from "./components/Historico/Historico";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Públicas */}
        <Route path="/" element={<Login />} />

        <Route
          path="/cadastro"
          element={<Cadastro />}
        />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Rotas internas */}
        <Route
          path="/dashboard/perfil"
          element={
            <PrivateRoute>
              <Perfil />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/favoritos"
          element={
            <PrivateRoute>
              <Favoritos />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/configuracoes"
          element={
            <PrivateRoute>
              <Configuracoes />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/premium"
          element={
            <PrivateRoute>
              <Premium />
            </PrivateRoute>
          }
        />

        <Route
          path="/dashboard/historico"
          element={
            <PrivateRoute>
              <Historico />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
