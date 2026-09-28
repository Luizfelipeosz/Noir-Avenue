import "./App.css";

import { Routes, Route } from "react-router-dom";

import { Toaster } from "sonner";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

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

// Checkout
import Checkout from "./components/Checkout/Checkout";

// Termos e políticas
import TermosdeUso from "./components/TermosdeUso/TermosDeUso";
import PoliticaPrivacidade from "./components/PoliticaDePrivacidade/PoliticaDePrivacidade";

function App() {
  return (
    <div className="App">
      <CartProvider>
        <Routes>

          {/* =========================================
              ROTAS PÚBLICAS
          ========================================= */}

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

          {/* =========================================
              TERMOS E POLÍTICAS
          ========================================= */}

          <Route
            path="/TermosdeUso"
            element={<TermosdeUso />}
          />

          <Route
            path="/PoliticaDePrivacidade"
            element={<PoliticaPrivacidade />}
          />

          {/* =========================================
              DASHBOARD
          ========================================= */}

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

          {/* =========================================
              PERFIL
          ========================================= */}

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

          {/* =========================================
              FAVORITOS
          ========================================= */}

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

          {/* =========================================
              CONFIGURAÇÕES
          ========================================= */}

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

          {/* =========================================
              PREMIUM
          ========================================= */}

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

          {/* =========================================
              HISTÓRICO
          ========================================= */}

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

          {/* =========================================
              CATÁLOGO
          ========================================= */}

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

          {/* =========================================
              DETALHES DO PRODUTO
          ========================================= */}

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

          {/* =========================================
              CARRINHO
          ========================================= */}

          <Route
            path="/dashboard/cart"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Cart />
                </DashboardLayout>
              </PrivateRoute>
            }
          />

          {/* =========================================
              CHECKOUT
          ========================================= */}

          <Route
            path="/dashboard/checkout"
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <Checkout />
                </DashboardLayout>
              </PrivateRoute>
            }
          />

          {/* =========================================
              RECUPERAÇÃO DE SENHA
          ========================================= */}

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

      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default App;