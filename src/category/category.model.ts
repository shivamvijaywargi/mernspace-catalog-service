import mongoose from "mongoose";

interface IPriceConfiguration {
  [key: string]: {
    priceType: "base" | "additional";
    availableOptions: string[];
  };
}

interface IAttribute {
  name: string;
  widgetType: "switch" | "radio";
  defaultValue: string;
  availableOptions: string[];
}

export interface ICategory {
  name: string;
  priceConfiguration: IPriceConfiguration;
  attributes: IAttribute[];
}

const priceConfigurationSchema = new mongoose.Schema<IPriceConfiguration>({
  priceType: {
    type: String,
    enum: ["base", "additional"],
    required: true,
  },
  availableOptions: {
    type: [String],
    required: true,
  },
});

const attributeSchema = new mongoose.Schema<IAttribute>({
  name: {
    type: String,
    required: true,
  },
  widgetType: {
    type: String,
    enum: ["switch", "radio"],
    required: true,
  },
  defaultValue: {
    type: mongoose.Schema.Types.Mixed,
    required: true,
  },
  availableOptions: {
    type: [String],
    required: true,
  },
});

const categorySchema = new mongoose.Schema<ICategory>(
  {
    name: {
      type: String,
      required: true,
    },
    priceConfiguration: {
      type: Map,
      of: priceConfigurationSchema,
      required: true,
    },
    attributes: {
      type: [attributeSchema],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Category = mongoose.model<ICategory>("Category", categorySchema);

export default Category;
