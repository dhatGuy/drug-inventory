import { z } from "zod";

import { DocumentSchema } from "./appwriteSchema";

const productBaseSchema = z.object({
  name: z.string(),
  price: z.number(),
  minStockLevel: z.number(),
  nafdacNumber: z.string(),
  imageUrl: z.string(),
  imageId: z.string(),
  quantity: z.number(),
  expiryDate: z.string().default(new Date().toISOString()),
  manufactureDate: z.string().default(new Date().toISOString()),
  reviews: z
    .array(
      DocumentSchema.extend(
        z.object({
          title: z.string(),
          desc: z.string(),
        }).shape
      )
    )
    .default([]),
  stockHistory: z
    .array(
      DocumentSchema.extend(
        z.object({
          quantity: z.number(),
          closingStock: z.number(),
        }).shape
      )
    )
    .default([]),
});

export const ProductSchema = DocumentSchema.extend(productBaseSchema.shape);

export type ProductSchema = z.infer<typeof ProductSchema>;

export type ProductUpdateSchema = Partial<z.infer<typeof productBaseSchema>>;
