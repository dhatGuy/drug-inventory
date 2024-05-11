import { useMutation } from "@tanstack/react-query";
import { ID } from "react-native-appwrite/src";
import Toast from "react-native-toast-message";

import { databases } from "~/lib/appWrite";
import { type NewItemSchema } from "~/lib/validation";

export const useCreateProduct = () => {
  const createProduct = async (data: NewItemSchema & { imageId: string; imageUrl: URL }) => {
    const response = await databases.createDocument("drug-inventory", "products", ID.unique(), {
      name: data.itemName,
      price: data.price,
      minStockLevel: data.minStockLevel,
      nafdacNumber: data.nafdacNumber,
      imageUrl: data.imageUrl,
      imageId: data.imageId,
      quantity: data.quantity,
      expiryDate: data.expDate.toISOString(),
      manufactureDate: data.manufactureDate.toISOString(),
    });

    return response;
  };

  return useMutation({
    mutationFn: (data: NewItemSchema & { imageId: string; imageUrl: URL }) => createProduct(data),
    onSuccess: (data) => {
      Toast.show({
        type: "success",
        text1: "Product created successfully",
      });
    },
    onError: (error) => {
      console.log("🚀 ~ useCreateProduct ~ error:", error);

      Toast.show({
        type: "error",
        text1: "Error occurred while creating product",
      });
    },
  });
};
