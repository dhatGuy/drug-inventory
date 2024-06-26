import { z } from "zod";

export function documentListSchema<T extends z.AnyZodObject>(schema: T) {
  return z.object({
    documents: z.array(schema),
    total: z.number(),
  });
}

export const DocumentSchema = z.object({
  $id: z.string(),
  $createdAt: z.string(),
  $updatedAt: z.string(),
  $permissions: z.array(z.string()),
  $collectionId: z.string(),
  $databaseId: z.string(),
});

export type DocumentSchema<T extends z.AnyZodObject> = z.infer<typeof DocumentSchema> & z.infer<T>;
