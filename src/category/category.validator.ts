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

export type CreateCategoryRequest = z.infer<typeof categoryBodySchema>;

export const createCategorySchema = z.object({
  body: categoryBodySchema,
});
