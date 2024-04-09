import Product from "./product.model";
import { CreateProductRequest } from "./product.validator";

export class ProductService {
  async create(product: CreateProductRequest) {
    return await Product.create(product);
  }
}
