import "./App.css";
import { Routes, Route } from "react-router-dom";

import Login from "./components/Login/Login";
import Cadastro from "./components/cadastro/Cadastro";
import Dashboard from "./components/Dashboard/Dashboard";
import PrivateRoute from "./components/Route/PrivateRoute";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Login />} />

        <Route path="/cadastro" element={<Cadastro />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;