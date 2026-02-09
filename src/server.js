import "dotenv/config";
import express from "express";
import salesRoutes from "./routes/salesRoutes.js";
import leaderboardRoutes from "./routes/leaderboardRoutes.js";
import { connectDB } from "./config/db.js";

const app = express();
app.use(express.json());

await connectDB();

app.use("/api/sales", salesRoutes);
app.use("/api/leaderboard", leaderboardRoutes);

app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: err.message || "Server error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
