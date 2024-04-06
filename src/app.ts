import cors from "cors";
import { config } from "dotenv";
import express from "express";
import morgan from "morgan";

import { errorHandler } from "./common/middlewares/errorHandler.middleware";

config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// Other middlewares

// Routes
// Health Check Route
app.get("/health-check", (req, res) => {
  res.status(200).json({
    success: true,
    status: "OK",
    message: "Server is up",
  });
});

// CatchAll - 404
app.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Not Found - ${req.method} ${req.originalUrl}`,
  });
});

// Gloabl error middleware
app.use(errorHandler);

export default app;
