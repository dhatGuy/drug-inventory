import { queryOptions } from "@tanstack/react-query";
import { Query } from "react-native-appwrite";
import { documentListSchema } from "~/entities/appwriteSchema";
import { DrugReportSchema } from "~/entities/drugReport.schema";
import { MasNumberSchema } from "~/entities/masNumberSchema";
import { ProductSchema } from "~/entities/product.schema";
import { ReviewSchema } from "~/entities/review.schema";
import { UserInventorySchema } from "~/entities/userInventory.schema";
import { databases } from "./appWrite";

export const reviewsQueryOptions = queryOptions({
  queryKey: ["reviews"],
  queryFn: async () => {
    const data = await databases.listDocuments("drug-inventory", "review", [
      Query.orderDesc("$createdAt"),
    ]);

    return documentListSchema(ReviewSchema).parse(data);
  },
});

const getProducts = async (searchFilter?: string) => {
  const response = await databases.listDocuments("drug-inventory", "products", [
    Query.orderDesc("$createdAt"),
    ...(searchFilter ? [Query.search("name", searchFilter)] : []),
  ]);
  const result = documentListSchema(ProductSchema).parse(response);
  return result;
};

export const productsQueryOptions = (searchTerm: string) =>
  queryOptions({
    queryKey: ["products", searchTerm],
    queryFn: () => getProducts(searchTerm),
  });

const getDrugReport = async () => {
  const response = await databases.listDocuments("drug-inventory", "drug-report");
  const result = documentListSchema(DrugReportSchema).parse(response);
  return result;
};

export const drugReportQueryOptions = queryOptions({
  queryKey: ["drugReport"],
  queryFn: getDrugReport,
});

const getUserInventory = async () => {
  const response = await databases.listDocuments("drug-inventory", "user-inventory");
  const result = documentListSchema(UserInventorySchema).parse(response);
  return result;
};

export const userInventoryQueryOptions = queryOptions({
  queryKey: ["userInventory"],
  queryFn: getUserInventory,
});

const getUserInventoryById = async (productId: string, userId: string) => {
  const response = await databases.listDocuments("drug-inventory", "user-inventory", [
    Query.equal("productId", productId),
    Query.equal("userId", userId),
  ]);
  const result = documentListSchema(UserInventorySchema).parse(response);
  return result;
};

export const userInventoryQueryByIdOptions = (id: string, userId: string) =>
  queryOptions({
    queryKey: ["userInventory", id, userId],
    queryFn: () => getUserInventoryById(id, userId),
  });

const masNumberByProductId = async (productId: string) => {
  const response = await databases.listDocuments("drug-inventory", "mas-number", [
    Query.equal("productId", productId),
  ]);
  const result = documentListSchema(MasNumberSchema).parse(response);
  return result;
};

export const masNumberQueryByProductIdOptions = (productId: string) =>
  queryOptions({
    queryKey: ["masNumber", productId],
    queryFn: () => masNumberByProductId(productId),
  });
