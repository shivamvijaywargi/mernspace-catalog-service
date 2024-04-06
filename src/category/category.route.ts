import express from "express";

import { Roles } from "../common/constants";
import authMiddleware from "../common/middlewares/auth.middleware";
import { canAccess } from "../common/middlewares/canAccess.middleware";
import { validateRequest } from "../common/middlewares/validateRequest.middleware";
import asyncWrapper from "../common/utils/asyncWrapper";
import { logger } from "../config/logger";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { createCategorySchema, getCategorySchema } from "./category.validator";

const categoryRouter = express.Router();

const categoryService = new CategoryService();
const categoryController = new CategoryController(categoryService, logger);

/**
 * @Prefix /api/v1/categories
 */
categoryRouter.get(
  "/",
  validateRequest(getCategorySchema),
  asyncWrapper(categoryController.getAll),
);

categoryRouter.post(
  "/",
  authMiddleware,
  canAccess([Roles.ADMIN]),
  validateRequest(createCategorySchema),
  asyncWrapper(categoryController.create),
);

export default categoryRouter;
