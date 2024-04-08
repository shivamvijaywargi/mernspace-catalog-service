import express from "express";

import { Roles } from "../common/constants";
import authMiddleware from "../common/middlewares/auth.middleware";
import { canAccess } from "../common/middlewares/canAccess.middleware";
import asyncWrapper from "../common/utils/asyncWrapper";
import { ProductController } from "./product.controller";

const productRouter = express.Router();

const productController = new ProductController();

/**
 * @Prefix /api/v1/products
 */
// productRouter.get(
//   "/",
//   validateRequest(getCategorySchema),
//   asyncWrapper(categoryController.getAll),
// );

// productRouter.get("/:id", asyncWrapper(categoryController.getById));

productRouter.post(
  "/",
  authMiddleware,
  canAccess([Roles.ADMIN, Roles.MANAGER]),
  // validateRequest(createCategorySchema),
  asyncWrapper(productController.create),
);

// productRouter.patch(
//   "/:id",
//   authMiddleware,
//   canAccess([Roles.ADMIN]),
//   validateRequest(updateCategorySchema),
//   asyncWrapper(categoryController.update),
// );

// productRouter.delete(
//   "/:id",
//   authMiddleware,
//   canAccess([Roles.ADMIN]),
//   asyncWrapper(categoryController.delete),
// );

export default productRouter;
