import express from "express";

import authMiddleware from "../common/middlewares/auth.middleware";
import { validateRequest } from "../common/middlewares/validateRequest.middleware";
import asyncWrapper from "../common/utils/asyncWrapper";
import { logger } from "../config/logger";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { createCategorySchema } from "./category.validator";

const categoryRouter = express.Router();

const categoryService = new CategoryService();
const categoryController = new CategoryController(categoryService, logger);

/**
 * @Prefix /api/v1/categories
 */
categoryRouter.post(
  "/",
  authMiddleware,
  validateRequest(createCategorySchema),
  asyncWrapper(categoryController.create),
);

export default categoryRouter;
