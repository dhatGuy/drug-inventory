import { z } from "zod";

import { DocumentSchema } from "./appwriteSchema";

const stockHistoryBaseSchema = z.object({
  quantity: z.number(),
  closingStock: z.number(),
  product: z.string(),
});

export type StockHistoryBaseSchema = z.infer<typeof stockHistoryBaseSchema>;

export const StockHistorySchema = DocumentSchema.extend(stockHistoryBaseSchema.shape);

export type StockHistorySchema = z.infer<typeof StockHistorySchema>;

export type ProductUpdateSchema = Partial<z.infer<typeof stockHistoryBaseSchema>>;
