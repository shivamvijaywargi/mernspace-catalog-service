import { Response } from "express";
import { Request } from "express-jwt";

import { ProductService } from "./product.service";
import { CreateProductRequest } from "./product.validator";

export class ProductController {
  // eslint-disable-next-line no-empty-function
  constructor(private productService: ProductService) {}

  create = async (req: Request, res: Response) => {
    const {
      name,
      description,
      attributes,
      categoryId,
      priceConfiguration,
      tenantId,
      isPublished,
      image = "image.jpeg", // FIXME
    } = req.body as CreateProductRequest;

    const newProduct = await this.productService.create({
      name,
      description,
      attributes,
      categoryId,
      image,
      priceConfiguration,
      tenantId,
      isPublished,
    });

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: newProduct,
    });
  };
}
