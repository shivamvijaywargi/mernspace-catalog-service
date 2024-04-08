import "dotenv/config";

import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import morgan from "morgan";

import categoryRouter from "./category/category.route";
import { errorHandler } from "./common/middlewares/errorHandler.middleware";
import productRouter from "./product/product.route";

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
app.use("/api/v1/products", productRouter);

// CatchAll - 404
app.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: `Not Found - ${req.method} ${req.originalUrl}`,
  });
});

// Global error middleware
app.use(errorHandler);

export default app;
