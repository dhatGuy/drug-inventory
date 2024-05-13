import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ID, Query } from "react-native-appwrite/src";
import Toast from "react-native-toast-message";

import { documentListSchema } from "~/entities/appwriteSchema";
import { ProductSchema, ProductUpdateSchema } from "~/entities/product.schema";
import { databases, storage } from "~/lib/appWrite";
import { type NewItemSchema } from "~/lib/validation";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
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
      ...(data.quantity > 0 && {
        stockHistory: [
          {
            quantity: data.quantity,
            closingStock: 0,
          },
        ],
      }),
    });

    return response;
  };

  return useMutation({
    mutationFn: (data: NewItemSchema & { imageId: string; imageUrl: URL }) => createProduct(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
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

export const useGetProducts = (searchFilter?: string) => {
  const getProducts = async () => {
    const response = await databases.listDocuments("drug-inventory", "products", [
      Query.orderDesc("$createdAt"),
    ]);
    const result = documentListSchema(ProductSchema).parse(response);
    return result;
  };

  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};

export const useGetProduct = (id: string) => {
  const queryClient = useQueryClient();

  const getProduct = async () => {
    const response = await databases.getDocument("drug-inventory", "products", id);
    return response as ProductSchema;
  };

  return useQuery({
    queryKey: ["product", id],
    queryFn: getProduct,
    initialData: () => {
      return queryClient.getQueryData(["product", id]) as ProductSchema;
    },
    select(data) {
      // order the stock history in descending order
      return {
        ...data,
        stockHistory: data.stockHistory.sort(
          (a, b) => new Date(b.$createdAt).getTime() - new Date(a.$createdAt).getTime()
        ),
      };
    },
  });
};

export const useUpdateProduct = (id: string) => {
  const queryClient = useQueryClient();
  const updateProduct = async (data: Partial<ProductUpdateSchema>) => {
    const response = await databases.updateDocument("drug-inventory", "products", id, data);
    return response;
  };

  return useMutation({
    mutationFn: (data: Partial<ProductUpdateSchema>) => updateProduct(data),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["product", id] });
      queryClient.invalidateQueries({ queryKey: ["products"] });

      Toast.show({
        type: "success",
        text1: "Product updated successfully",
      });
    },
    onError: (error) => {
      console.log("🚀 ~ useUpdateProduct ~ error:", error);

      Toast.show({
        type: "error",
        text1: "Error occurred while updating product",
      });
    },
  });
};

export const useDeleteProduct = (id: string) => {
  const queryClient = useQueryClient();
  const deleteProduct = async () => {
    const response = await databases.deleteDocument("drug-inventory", "products", id);
    return response;
  };

  return useMutation({
    mutationFn: ({ imageId }: { imageId: string }) => deleteProduct(),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      Toast.show({
        type: "success",
        text1: "Product deleted successfully",
      });

      //delete image
      if (variables.imageId) {
        storage.deleteFile("images", variables.imageId);
      }
    },
    onError: (error) => {
      console.log("🚀 ~ useDeleteProduct ~ error:", error);

      Toast.show({
        type: "error",
        text1: "Error occurred while deleting product",
      });
    },
  });
};
