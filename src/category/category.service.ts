import createHttpError from "http-errors";
import { isValidObjectId } from "mongoose";

import Category from "./category.model";
import {
  CreateCategoryRequest,
  GetCategoryRequest,
  UpdateCategoryRequest,
} from "./category.validator";

export class CategoryService {
  async getAll(query: GetCategoryRequest) {
    const { queryObj, sortObj } = this.filterObject(query);

    const limit = query.limit || 10;
    const page = query.page || 1;
    const skip = (page - 1) * limit;

    const [totalCount, categories] = await Promise.all([
      Category.countDocuments(queryObj),
      Category.find(queryObj).sort(sortObj).skip(skip).limit(limit),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return { totalCount, totalPages, currentPage: +page, categories };
  }

  async getById(id: string) {
    if (!isValidObjectId(id)) {
      throw createHttpError(400, "Invalid category id");
    }

    const category = await Category.findById(id);

    if (!category) {
      throw createHttpError(404, "Category not found");
    }

    return category;
  }

  async create(category: CreateCategoryRequest) {
    const newCategory = await Category.create(category);

    return newCategory;
  }

  filterObject(object: GetCategoryRequest) {
    const { search, fromDate, toDate, order, sortBy } = object;

    const queryObj: Record<string, unknown> = {};
    const sortObj: { [key: string]: "asc" | "desc" } = {};

    if (fromDate && toDate) {
      if (fromDate > toDate) {
        throw createHttpError(400, "fromDate cannot be greater than toDate");
      }

      if (sortBy === "createdAt" || sortBy === "updatedAt") {
        queryObj[sortBy] = { $gte: fromDate, $lt: toDate };
      } else {
        queryObj.createdAt = { $gte: fromDate, $lt: toDate };
      }
    }

    if (search) {
      queryObj.name = { $regex: search, $options: "i" };
    }

    if (sortBy) {
      sortObj[sortBy] = order || "desc";
    }

    return { queryObj, sortObj };
  }

  async update(id: string, category: UpdateCategoryRequest) {
    if (!isValidObjectId(id)) {
      throw createHttpError(400, "Invalid category id");
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      { $set: category },
      {
        new: true,
      },
    );

    return updatedCategory;
  }
}
