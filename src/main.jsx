import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

import "./styles/base/reset.css";
import "./styles/base/globals.css";
import "./styles/themes/noir-theme.css";
import "./styles/animations/animations.css";

// Recupera uma rota salva pelo GitHub Pages (404.html)
const redirect = sessionStorage.getItem("redirect");

if (redirect) {
  sessionStorage.removeItem("redirect");

  window.history.replaceState(
    null,
    "",
    `${import.meta.env.BASE_URL}${redirect}`
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <App />

    <Toaster
      position="top-right"
      richColors
      closeButton
      duration={2500}
      theme="dark"
    />
  </BrowserRouter>
);

