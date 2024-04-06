import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
import createHttpError from "http-errors";

import { validateRequest } from "../common/middlewares/validateRequest.middleware";
import { logger } from "../config/logger";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
import { createCategorySchema } from "./category.validator";

const categoryRouter = express.Router();

const asyncWrapper = (requestHandler: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err: unknown) => {
      if (err instanceof Error) {
        return next(createHttpError(500, err.message));
      }

      return next(createHttpError(500, "Internal server error"));
    });
  };
};

const categoryService = new CategoryService();
const categoryController = new CategoryController(categoryService, logger);

/**
 * @Prefix /api/v1/categories
 */
categoryRouter.post(
  "/",
  validateRequest(createCategorySchema),
  asyncWrapper(categoryController.create),
);

export default categoryRouter;
