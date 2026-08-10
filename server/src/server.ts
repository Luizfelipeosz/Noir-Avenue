import express from "express";
import cors from "cors";

const app = express();

const PORT = 3001;

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    success: true,
    message: "Noir Avenue API online.",
  });
});

app.listen(PORT, () => {
  console.log(`Noir Avenue API running on http://localhost:${PORT}`);
});