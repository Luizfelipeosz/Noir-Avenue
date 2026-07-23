import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "sonner";

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