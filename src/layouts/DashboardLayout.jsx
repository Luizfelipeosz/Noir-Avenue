import { useEffect } from "react";
import "./DashboardLayout.css";

function DashboardLayout({ children }) {
  useEffect(() => {
    let session;

    try {
      session = JSON.parse(
        localStorage.getItem("noiravenue_session") || "{}"
      );
    } catch {
      session = {};
    }

    // A sessão salva é a fonte principal; o tema local serve como fallback.
    const savedTheme =
      session.theme ||
      (localStorage.getItem("noiravenue_theme") === "light"
        ? "Light"
        : "Dark");

    const isLight = savedTheme === "Light";
    const root = document.documentElement;

    root.dataset.theme = isLight ? "light" : "dark";
    root.classList.toggle("theme-light", isLight);
    localStorage.setItem(
      "noiravenue_theme",
      isLight ? "light" : "dark"
    );
  }, []);

  return (
    <div className="dashboard-layout">
      {children}
    </div>
  );
}

export default DashboardLayout;
