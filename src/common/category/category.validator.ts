import { z } from "zod";

const categoryBodySchema = z.object({
  name: z
    .string({
      required_error: "Category Name is required",
      invalid_type_error: "Category Name must be a string",
    })
    .trim()
    .min(1, "Category Name cannot be empty"),
  priceConfiguration: z.record(
    z.object({
      priceType: z.enum(["base", "additional"], {
        required_error: "Price type is required",
      }),
      availableOptions: z.array(z.string()),
    }),
  ),
  attributes: z.array(
    z.object({
      name: z.string(),
      widgetType: z.enum(["switch", "radio"]),
      defaultValue: z.string(),
      availableOptions: z.array(z.string()),
    }),
  ),
});

export type CategoryBody = z.infer<typeof categoryBodySchema>;

export const createCategorySchema = z.object({
  body: categoryBodySchema,
});
