import { z } from "zod";

import { DocumentSchema } from "./appwriteSchema";
import { ProductSchema } from "./product.schema";
import { userSchema } from "./user.schema";

const reviewBaseSchema = z.object({
  title: z.string(),
  desc: z.string(),
  user: userSchema,
  userId: z.string(),
  product: ProductSchema,
  productId: z.string(),
});

export type ReviewBaseSchema = z.infer<typeof reviewBaseSchema>;

export const ReviewSchema = DocumentSchema.extend(reviewBaseSchema.shape);

export type ReviewSchema = z.infer<typeof ReviewSchema>;

export type ProductUpdateSchema = Partial<z.infer<typeof reviewBaseSchema>>;
