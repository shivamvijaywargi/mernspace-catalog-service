import { model, Schema } from "mongoose";

export interface IPriceConfiguration {
  priceType: "base" | "additional";
  availableOptions: Record<string, number>;
}

export interface IProduct {
  name: string;
  description: string;
  image: string;
  priceConfiguration: Record<string, IPriceConfiguration>;
  attributes: IAttribute[];
  tenantId: string;
  categoryId: Schema.Types.ObjectId;
  isPublished: boolean;
}

export interface IAttribute {
  name: string;
  value: unknown;
}

const priceConfigurationSchema = new Schema<IPriceConfiguration>({
  priceType: {
    type: String,
    enum: ["base", "additional"],
  },
  availableOptions: {
    type: Map,
    of: Number,
  },
});

const attributeValueSchema = new Schema<IAttribute>({
  name: {
    type: String,
  },
  value: {
    type: Schema.Types.Mixed,
  },
});

const productSchema = new Schema<IProduct>(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    priceConfiguration: {
      type: Map,
      of: priceConfigurationSchema,
      required: true,
    },
    attributes: [attributeValueSchema],
    tenantId: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
    },
    isPublished: {
      type: Boolean,
      default: false,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Product = model<IProduct>("Product", productSchema);

export default Product;
