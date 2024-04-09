import express from "express";
import fileUpload from "express-fileupload";

import { Roles } from "../common/constants";
import authMiddleware from "../common/middlewares/auth.middleware";
import { canAccess } from "../common/middlewares/canAccess.middleware";
import { validateRequest } from "../common/middlewares/validateRequest.middleware";
import asyncWrapper from "../common/utils/asyncWrapper";
import { ProductController } from "./product.controller";
import { ProductService } from "./product.service";
import { createProductSchema } from "./product.validator";

const productRouter = express.Router();

const productService = new ProductService();

const productController = new ProductController(productService);

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
  fileUpload(),
  validateRequest(createProductSchema),
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
