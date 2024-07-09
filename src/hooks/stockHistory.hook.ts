import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ID, Query } from "react-native-appwrite/src";
import Toast from "react-native-toast-message";

import { documentListSchema } from "~/entities/appwriteSchema";
import { StockHistoryBaseSchema, StockHistorySchema } from "~/entities/stockHistory.schema";
import { databases } from "~/lib/appWrite";

export function useCreateStockHistory() {
  const queryClient = useQueryClient();

  const createStockHistory = async (data: StockHistoryBaseSchema) => {
    const response = await databases.createDocument(
      "drug-inventory",
      "stock_history",
      ID.unique(),
      data
    );

    await databases.updateDocument("drug-inventory", "products", data.product, {
      quantity: data.closingStock + data.quantity,
    });
    return response;
  };

  return useMutation({
    mutationFn: (data: StockHistoryBaseSchema) => createStockHistory(data),
    onSuccess: (_, variables) => {
      Toast.show({
        type: "success",
        text1: "Stock history created successfully",
        text2: "The product's stock has been updated",
      });

      queryClient.invalidateQueries({ queryKey: ["stock-history"] });

      queryClient.invalidateQueries({ queryKey: ["product", variables.product] });

      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      Toast.show({
        type: "error",
        text1: "Error occurred while creating stock history",
      });
    },
  });
}

export function useGetStockHistory() {
  const getStockHistory = async () => {
    const response = await databases.listDocuments("drug-inventory", "stock_history", [
      Query.orderDesc("$createdAt"),
    ]);
    return documentListSchema(StockHistorySchema).parse(response);
  };

  return useQuery({
    queryKey: ["stock-history"],
    queryFn: getStockHistory,
  });
}
