import { z } from "zod";

import { DocumentSchema } from "./appwriteSchema";
import { ProductSchema } from "./product.schema";

export const notificationBaseSchema = z.object({
  type: z.enum(["low-stock", "expired-drug", "review", "out-of-stock"]),
  isAdmin: z.boolean(),
  quantity: z.number(),
  expiredDate: z.string().optional().nullable(),
  product: ProductSchema,
});

export type NotificationBaseSchema = z.infer<typeof notificationBaseSchema>;

export const NotificationSchema = DocumentSchema.extend(notificationBaseSchema.shape);

export type NotificationSchema = z.infer<typeof NotificationSchema>;
