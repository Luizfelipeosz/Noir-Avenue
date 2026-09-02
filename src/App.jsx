import "./App.css";

import { Routes, Route } from "react-router-dom";
import { Toaster } from "sonner";

// Autenticação
import Login from "./components/Login/Login";
import Cadastro from "./components/cadastro/Cadastro";

// Dashboard
import Dashboard from "./components/Dashboard/Dashboard";
import PrivateRoute from "./components/Route/PrivateRoute";

// Layouts
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";

// Páginas do Dashboard
import Perfil from "./components/Perfil/Perfil";
import Favoritos from "./components/Favoritos/Favoritos";
import Configuracoes from "./components/Configuracoes/Configurações";
import Premium from "./components/Premiun/Premiun";
import Historico from "./components/Historico/Historico";
import Catalogo from "./components/Catalogo/Catalogo";
import ProductDetails from "./components/ProductDetails/ProductDetails";
import Cart from "./components/Cart/Cart";

// Recuperar senha
import RecuperarSenha from "./components/RecuperarSenha/RecuperarSenha";
import RedefinirSenha from "./components/RecuperarSenha/RedefinirSenha";

// Carrinho
import { CartProvider } from "./context/CartContext";

function App() {
  return (
    <div className="App">
      <CartProvider>
        <Routes>
          {/* Rotas Públicas */}

          <Route
            path="/"
            element={
              <AuthLayout>
                <Login />
              </AuthLayout>
            }
          />

          <Route
            path="/cadastro"
            element={
              <AuthLayout>
                <Cadastro />
              </AuthLayout>
            }
          />

          {/* Dashboard */}

          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Dashboard />
                </DashboardLayout>
              </PrivateRoute>
            }
          />

          {/* Rotas internas */}

          <Route
            path="/dashboard/perfil"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Perfil />
                </DashboardLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/dashboard/favoritos"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Favoritos />
                </DashboardLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/dashboard/configuracoes"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Configuracoes />
                </DashboardLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/dashboard/premium"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Premium />
                </DashboardLayout>
              </PrivateRoute>
            }
          />

          <Route
            path="/dashboard/historico"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Historico />
                </DashboardLayout>
              </PrivateRoute>
            }
          />

          {/* Catálogo */}

          <Route
            path="/dashboard/catalogo"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Catalogo />
                </DashboardLayout>
              </PrivateRoute>
            }
          />

          {/* Detalhes do produto */}

          <Route
            path="/dashboard/catalogo/:slug"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <ProductDetails />
                </DashboardLayout>
              </PrivateRoute>
            }
          />

          <Route
  path="/dashboard/cart"
  element={<Cart />}
/>

          {/* Recuperar senha */}

          <Route
            path="/recuperar-senha"
            element={<RecuperarSenha />}
          />

          <Route
            path="/redefinir-senha"
            element={<RedefinirSenha />}
          />
        </Routes>
      </CartProvider>
     <Toaster position="top-right" />
    </div>
  );
}

export default App;

