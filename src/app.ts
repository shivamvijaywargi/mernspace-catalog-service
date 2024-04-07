import "dotenv/config";

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import categoryRouter from "./category/category.route";
import { errorHandler } from "./common/middlewares/errorHandler.middleware";
import swaggerDocument from "./config/swagger-output.json";

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));
app.use(cookieParser());

// Other middlewares

// Routes
// Health Check Route
app.get("/health-check", (req, res) => {
  res.status(200).json({
    success: true,
    status: "OK",
    message: "Catalog service is up",
  });
});

app.use("/api/v1/categories", categoryRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

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
