import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

// Handle POST request from frontend
app.post("/api", (req, res) => {
  console.log("Received message:", req.body);
  res.json({ message: `Message received: ${req.body.text}` });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
