import { z } from "zod";

import { DocumentSchema } from "./appwriteSchema";
import { ProductSchema } from "./product.schema";
import { userSchema } from "./user.schema";

export const userInventoryBaseSchema = z.object({
  product: ProductSchema,
  user: userSchema,
});

export type UserInventoryBaseSchema = z.infer<typeof userInventoryBaseSchema>;

export const UserInventorySchema = DocumentSchema.extend(userInventoryBaseSchema.shape);

export type UserInventorySchema = z.infer<typeof UserInventorySchema>;
