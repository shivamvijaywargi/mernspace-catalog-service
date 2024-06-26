import express from "express";

import { Roles } from "../common/constants";
import authMiddleware from "../common/middlewares/auth.middleware";
import { canAccess } from "../common/middlewares/canAccess.middleware";
import { validateRequest } from "../common/middlewares/validateRequest.middleware";
import asyncWrapper from "../common/utils/asyncWrapper";
import { logger } from "../config/logger";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import {
  createCategorySchema,
  getCategorySchema,
  updateCategorySchema,
} from "./category.validator";

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

categoryRouter.get("/:id", asyncWrapper(categoryController.getById));

categoryRouter.post(
  "/",
  authMiddleware,
  canAccess([Roles.ADMIN]),
  validateRequest(createCategorySchema),
  asyncWrapper(categoryController.create),
);

categoryRouter.patch(
  "/:id",
  authMiddleware,
  canAccess([Roles.ADMIN]),
  validateRequest(updateCategorySchema),
  asyncWrapper(categoryController.update),
);

categoryRouter.delete(
  "/:id",
  authMiddleware,
  canAccess([Roles.ADMIN]),
  asyncWrapper(categoryController.delete),
);

export default categoryRouter;
