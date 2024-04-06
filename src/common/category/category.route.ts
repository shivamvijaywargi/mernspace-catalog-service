import express from "express";

import { validateRequest } from "../middlewares/validateRequest.middleware";
import categoryController from "./category.controller";
import { createCategorySchema } from "./category.validator";

const router = express.Router();

router.post(
  "/",
  validateRequest(createCategorySchema),
  categoryController.create,
);

export default router;
