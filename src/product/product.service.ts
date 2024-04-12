import Product from "./product.model";
import {
  CreateProductRequest,
  UpdateProductRequest,
} from "./product.validator";

export class ProductService {
  async create(product: CreateProductRequest) {
    return await Product.create(product);
  }

  async getProductImage(productId: string) {
    const product = await Product.findById(productId);

    return product?.image;
  }

  async update(productId: string, productPayload: UpdateProductRequest) {
    const product = await Product.findByIdAndUpdate(
      productId,
      {
        $set: productPayload,
      },
      {
        new: true,
      },
    );

    return product;
  }

  async getProduct(productId: string) {
    return await Product.findById({ _id: productId });
  }
}
