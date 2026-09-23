import "dotenv/config";

import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";

const app = express();

const PORT = process.env.PORT || 3001;

const allowedOrigins = [
  "http://localhost:5173",
  "https://luizfelipeosz.github.io",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(
        new Error("Origem não permitida pelo CORS.")
      );
    },
  })
);

app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/api/health", (_req, res) => {
  return res.status(200).json({
    status: "ok",
    message: "Noir Avenue API funcionando.",
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Noir Avenue API rodando na porta ${PORT}`);
});