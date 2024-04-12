import createHttpError from "http-errors";
import mongoose from "mongoose";

import Product from "./product.model";
import {
  CreateProductRequest,
  GetProductRequest,
  UpdateProductRequest,
} from "./product.validator";

export class ProductService {
  async getAll(query: GetProductRequest) {
    const { queryObj, sortObj } = this.filterObject(query);

    const limit = Number(query.limit) || 10;
    const page = Number(query.page) || 1;
    const skip = (page - 1) * limit;

    const aggregate = [
      { $match: queryObj },
      {
        $lookup: {
          from: "categories",
          localField: "categoryId",
          foreignField: "_id",
          as: "category",
          pipeline: [
            {
              $project: {
                _id: 1,
                name: 1,
                priceConfiguration: 1,
                attributes: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: "$category",
      },
    ];

    const [totalCount, products] = await Promise.all([
      Product.countDocuments(queryObj),
      Product.aggregate(aggregate).sort(sortObj).skip(skip).limit(limit),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return { totalCount, totalPages, currentPage: +page, products };
  }

  async create(product: CreateProductRequest) {
    return await Product.create(product);
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

  filterObject(object: GetProductRequest) {
    const {
      search,
      fromDate,
      toDate,
      order,
      sortBy,
      isPublished,
      categoryId,
      tenantId,
    } = object;

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
    } else {
      sortObj["createdAt"] = "desc";
    }

    if (categoryId) {
      queryObj.categoryId = new mongoose.Types.ObjectId(categoryId);
    }

    if (tenantId) {
      queryObj.tenantId = tenantId;
    }

    if (isPublished !== undefined) {
      const published = isPublished.toString() === "true" ? true : false;
      queryObj.isPublished = published;
    }

    return { queryObj, sortObj };
  }
}
