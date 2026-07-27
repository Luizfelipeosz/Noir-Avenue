import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";
import "./styles/base/reset.css";
import "./styles/base/globals.css";
import "./styles/themes/noir-theme.css";
import "./styles/animations/animations.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
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