import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { parseImage } from "./controllers/userQueryController";
import { upload } from "./controllers/userQueryController";

// manually defining __dirname and __filename for CommonJS usage
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

// Handle POST request from frontend
app.post("/api", upload.single('file'), parseImage, (req, res) => {
  console.log("Received message:", req.body);
  res.json({ message: `Message received: ${req.body.text}` });
});
app.use(express.static(path.join(__dirname, "../client")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/index.html"));
});


app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
