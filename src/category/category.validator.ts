import { z } from "zod";

const categoryBodySchema = z.object({
  name: z
    .string({
      required_error: "Category Name is required",
      invalid_type_error: "Category Name must be a string",
    })
    .trim()
    .min(1, "Category Name cannot be empty"),
  priceConfiguration: z
    .record(
      z.object({
        priceType: z.enum(["base", "additional"], {
          required_error: "Price type is required",
        }),
        availableOptions: z
          .array(
            z.string({
              required_error: "Available options are required",
              invalid_type_error:
                "Available options must be an array of strings",
            }),
            {
              required_error: "Available options are required",
            },
          )
          .refine(
            (availableOptions) => availableOptions.length > 0,
            "Available options cannot be empty",
          ),
      }),
    )
    .refine(
      (priceConfiguration) => Object.keys(priceConfiguration).length > 0,
      "priceConfiguration cannot be empty",
    ),
  attributes: z
    .array(
      z.object({
        name: z.string({
          required_error: "Attribute name is required",
          invalid_type_error: "Attribute name must be a string",
        }),
        widgetType: z.enum(["switch", "radio"], {
          required_error: "Widget type is required",
        }),
        defaultValue: z.string({
          required_error: "Default value is required",
        }),
        availableOptions: z
          .array(z.string(), {
            required_error: "Available options are required",
          })
          .min(1, "Available options cannot be empty"),
      }),
    )
    .refine(
      (attributes) => attributes.length > 0,
      "attributes cannot be empty",
    ),
});

const categoryQuerySchema = z.object({
  search: z.string().optional(),
  fromDate: z.number({ coerce: true }).optional(),
  toDate: z.number({ coerce: true }).optional(),
  sortBy: z
    .enum(["createdAt", "updatedAt"]) // Add fields to sort by
    .optional(),
  order: z.enum(["asc", "desc"]).optional(),
  page: z.number({ coerce: true }).min(1).optional(),
  limit: z.number({ coerce: true }).min(1).optional(),
});

export type CreateCategoryRequest = z.infer<typeof categoryBodySchema>;
export type GetCategoryRequest = z.infer<typeof categoryQuerySchema>;
export type UpdateCategoryRequest = z.infer<typeof updateCategorySchema>;

export const createCategorySchema = z.object({
  body: categoryBodySchema,
});

export const updateCategorySchema = z.object({
  body: categoryBodySchema.deepPartial(),
});

export const getCategorySchema = z.object({
  query: categoryQuerySchema,
});
