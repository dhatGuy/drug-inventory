import { z } from "zod";

import { DocumentSchema } from "./appwriteSchema";
import { ProductSchema } from "./product.schema";

export const masNumberBaseSchema = z.object({
  product: ProductSchema,
  value: z.string(),
  productId: z.string(),
});

export type MasNumberBaseSchema = z.infer<typeof masNumberBaseSchema>;

export const MasNumberSchema = DocumentSchema.extend(masNumberBaseSchema.shape);

export type MasNumberSchema = z.infer<typeof MasNumberSchema>;
