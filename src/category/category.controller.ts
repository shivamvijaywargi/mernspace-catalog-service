import { Request, Response } from "express";
import { Logger } from "winston";

import { CategoryService } from "./category.service";
import { CreateCategoryRequest } from "./category.validator";

export class CategoryController {
  constructor(
    private categoryService: CategoryService,
    private logger: Logger,
  ) {
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
  }

  async getAll(req: Request, res: Response) {
    const categories = await this.categoryService.getAll(req.query);

    res.json({
      success: true,
      data: categories,
    });
  }

  async create(req: Request, res: Response) {
    const { name, attributes, priceConfiguration } =
      req.body as CreateCategoryRequest;

    const category = await this.categoryService.create({
      name,
      attributes,
      priceConfiguration,
    });

    this.logger.info(`Created category: `, {
      id: category._id,
    });

    res.json({
      success: true,
      data: category,
    });
  }
}
