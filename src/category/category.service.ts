import Category from "./category.model";
import { CreateCategoryRequest } from "./category.validator";

export class CategoryService {
  public async create(category: CreateCategoryRequest) {
    const newCategory = await Category.create(category);

    return newCategory;
  }
}
