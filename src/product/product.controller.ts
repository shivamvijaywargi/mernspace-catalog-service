import { randomUUID } from "node:crypto";

import { NextFunction, Response } from "express";
import { UploadedFile } from "express-fileupload";
import { Request } from "express-jwt";
import createHttpError from "http-errors";

import { IAuthRequest } from "../common/types";
import { IFileStorage } from "../common/types/storage";
import { ProductService } from "./product.service";
import {
  CreateProductRequest,
  UpdateProductRequest,
} from "./product.validator";

export class ProductController {
  constructor(
    private productService: ProductService,
    private storage: IFileStorage,
    // eslint-disable-next-line no-empty-function
  ) {}

  create = async (req: Request, res: Response) => {
    const rawImage = req.files?.image as UploadedFile;

    const imageName = randomUUID();

    await this.storage.uploadFile({
      filename: imageName,
      fileData: rawImage.data.buffer,
    });

    const {
      name,
      description,
      attributes,
      categoryId,
      priceConfiguration,
      tenantId,
      isPublished,
    } = req.body as CreateProductRequest;

    const newProduct = await this.productService.create({
      name,
      description,
      attributes,
      categoryId,
      image: imageName,
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

  update = async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;

    const product = await this.productService.getProduct(productId);

    if (!product) {
      return next(createHttpError(404, "Product not found"));
    }

    if ((req as IAuthRequest).auth.role !== "admin") {
      const tenant = (req as IAuthRequest).auth.tenant;

      if (product.tenantId !== String(tenant)) {
        return next(
          createHttpError(403, "You are not allowed to update this product"),
        );
      }
    }

    let imageName: string | undefined;

    if (req.files?.image) {
      const oldImage = product.image;

      const image = req.files.image as UploadedFile;
      imageName = randomUUID();

      await this.storage.uploadFile({
        filename: imageName,
        fileData: image.data.buffer,
      });

      if (oldImage) {
        await this.storage.deleteFile(oldImage);
      }
    }

    const {
      name,
      description,
      attributes,
      categoryId,
      priceConfiguration,
      tenantId,
      isPublished,
    } = req.body as UpdateProductRequest;

    const updatedProduct = await this.productService.update(productId, {
      name,
      description,
      attributes,
      categoryId,
      image: imageName,
      priceConfiguration,
      tenantId,
      isPublished,
    });

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  };
}
