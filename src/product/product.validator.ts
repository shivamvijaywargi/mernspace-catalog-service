import { z } from "zod";

const productBodySchema = z.object({
  name: z
    .string({
      required_error: "Product Name is required",
      invalid_type_error: "Product Name must be a string",
    })
    .trim()
    .min(1, "Product Name cannot be empty"),
  description: z
    .string({
      required_error: "Description is required",
      invalid_type_error: "Description must be a string",
    })
    .trim()
    .min(1, "Description cannot be empty"),
  priceConfiguration: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        return JSON.parse(val);
      }

      return val;
    },
    z.record(
      z.object({
        priceType: z.enum(["base", "additional"]),
        availableOptions: z.record(z.number()),
      }),
    ),
  ),
  attributes: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        return JSON.parse(val);
      }

      return val;
    },
    z
      .array(
        z.object({
          name: z.string({
            required_error: "Attribute name is required",
            invalid_type_error: "Attribute name must be a string",
          }),
          value: z.unknown(),
        }),
      )
      .nonempty(),
  ),
  tenantId: z.string({
    required_error: "Tenant ID is required",
    invalid_type_error: "Tenant ID must be a string",
  }),
  categoryId: z
    .string({
      required_error: "Category ID is required",
      invalid_type_error: "Category ID must be a string",
    })
    .regex(/^(?=[a-f\d]{24}$)(\d+[a-f]|[a-f]+\d)/i, {
      message: "Course ID must be a valid MongoDB ObjectId",
    })
    .trim(),
  image: z.string({
    required_error: "Image is required",
    invalid_type_error: "Image must be a string",
  }),
  isPublished: z.boolean({ coerce: true }).optional(),
});

export type CreateProductRequest = z.infer<typeof productBodySchema>;

export const createProductSchema = z.object({
  body: productBodySchema,
});
