import { z } from "zod";

import { DocumentSchema } from "./appwriteSchema";

const userBaseSchema = z.object({
  name: z.string(),
  email: z.string(),
});

export type UserBaseSchema = z.infer<typeof userBaseSchema>;

export const userSchema = DocumentSchema.extend(userBaseSchema.shape);

export type UserSchema = z.infer<typeof userSchema>;

export type ProductUpdateSchema = Partial<z.infer<typeof userBaseSchema>>;
