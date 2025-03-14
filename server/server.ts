import express from "express";
import { fetchCalNinjaApi , calorieNinjaParseData, } from "./controllers/fetchCalNinjaApi.ts";
import cors from "cors";
import multer from 'multer';
import dotenv from "dotenv";
import { parseImage } from "./controllers/userQueryController.ts";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { openAIFoodBreakdown } from "./controllers/openaiController.ts";
import { upload } from "./controllers/userQueryController.ts";
import { getNutritionAnalysis } from "./controllers/userQueryController.ts";


dotenv.config();
// manually defining __dirname and __filename for CommonJS usage
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log("Current directory:", __dirname);
console.log("Resolved path:", path.resolve(__dirname, "./controllers/userQueryController"));

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello from Express!");
});

// Handle POST request from frontend
app.post('/api', upload.single('image') ,parseImage, openAIFoodBreakdown, (req, res) => {
  console.log("🍖 food image ");
  console.log("🚀 Received Multer File:", req.file); // Logs the uploaded file object
  console.log("📦 Multer Config:", upload);
  res.status(200).json(res.locals.foodAnalysis);
});

app.post('/calorieninja', fetchCalNinjaApi, calorieNinjaParseData, (req, res) => {
  res.status(200).json(res.locals.foodTotals);
});

app.post('/suggestion', getNutritionAnalysis, (req, res) => {
  res.status(200).json(res.locals.suggestion);
})
app.use(express.static(path.join(__dirname, "../client")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../client/index.html"));
// });

// const errorHandler: ErrorRequestHandler = (
//   err: ServerError,
//   _req,
//   res,
//   _next
// ) => {
//   const defaultErr: ServerError = {
//     log: 'Express error handler caught unknown middleware error',
//     status: 500,
//     message: { err: 'An error occurred' },
//   };
//   const errorObj: ServerError = { ...defaultErr, ...err };
//   console.log(errorObj.log);
//   res.status(errorObj.status).json(errorObj.message);
// };

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});