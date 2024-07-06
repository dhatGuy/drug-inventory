import { z } from "zod";

import { DocumentSchema } from "./appwriteSchema";

export const drugReportBaseSchema = z.object({
  productId: z.string(),
  masNumber: z.string(),
  comment: z.string(),
});

export type DrugReportBaseSchema = z.infer<typeof drugReportBaseSchema>;

export const DrugReportSchema = DocumentSchema.extend(drugReportBaseSchema.shape);

export type DrugReportSchema = z.infer<typeof DrugReportSchema>;
