import { Request, Response } from "express";
import { Logger } from "winston";

import { CategoryService } from "./category.service";
import {
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "./category.validator";

export class CategoryController {
  constructor(
    private categoryService: CategoryService,
    private logger: Logger,
  ) {
    this.create = this.create.bind(this);
    this.getAll = this.getAll.bind(this);
    this.getById = this.getById.bind(this);
    this.update = this.update.bind(this);
  }

  async getAll(req: Request, res: Response) {
    const categories = await this.categoryService.getAll(req.query);

    res.status(200).json({
      success: true,
      data: categories,
    });
  }

  async getById(req: Request, res: Response) {
    const { id } = req.params;

    const category = await this.categoryService.getById(id);

    res.status(200).json({
      success: true,
      data: category,
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

    res.status(201).json({
      success: true,
      data: category,
    });
  }

  async update(req: Request, res: Response) {
    const { id } = req.params;

    const category = await this.categoryService.update(
      id,
      req.body as UpdateCategoryRequest,
    );

    res.status(200).json({
      success: true,
      data: category,
    });
  }
}
