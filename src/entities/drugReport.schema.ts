import { z } from "zod";

import { DocumentSchema } from "./appwriteSchema";
import { ProductSchema } from "./product.schema";
import { userSchema } from "./user.schema";

export const drugReportBaseSchema = z.object({
  product: ProductSchema,
  user: userSchema,
  masNumber: z.string(),
  comment: z.string(),
});

export type DrugReportBaseSchema = z.infer<typeof drugReportBaseSchema>;

export const DrugReportSchema = DocumentSchema.extend(drugReportBaseSchema.shape);

export type DrugReportSchema = z.infer<typeof DrugReportSchema>;
