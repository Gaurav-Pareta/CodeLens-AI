import express from "express";
import aiRoutes from "./src/routes/ai.routes.js";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health / root route
app.get("/", (req, res) => {
  res.send("CodeLens backend running 🚀");
});

// API routes
app.use("/ai", aiRoutes);

// ✅ IMPORTANT: Render dynamic port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});