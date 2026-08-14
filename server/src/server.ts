import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3001;
const FRONTEND_URL =
  process.env.FRONTEND_URL || "http://localhost:5173";

app.use(
  cors({
    origin: FRONTEND_URL,
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    message: "Noir Avenue API funcionando.",
  });
});

app.listen(PORT, () => {
  console.log(
    `🚀 Noir Avenue API rodando em http://localhost:${PORT}`
  );
});