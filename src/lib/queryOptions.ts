import { queryOptions } from "@tanstack/react-query";
import { Query } from "react-native-appwrite";
import { documentListSchema } from "~/entities/appwriteSchema";
import { DrugReportSchema } from "~/entities/drugReport.schema";
import { ProductSchema } from "~/entities/product.schema";
import { ReviewSchema } from "~/entities/review.schema";
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
