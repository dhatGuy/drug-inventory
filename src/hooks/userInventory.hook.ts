import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ID } from "react-native-appwrite";
import Toast from "react-native-toast-message";
import { z } from "zod";
import { documentListSchema } from "~/entities/appwriteSchema";
import { UserInventorySchema } from "~/entities/userInventory.schema";
import { databases } from "~/lib/appWrite";
import { userInventoryQueryOptions } from "~/lib/queryOptions";

const schema = documentListSchema(UserInventorySchema);
type UserInventory = z.infer<typeof schema>;

export function useAddUserInventory() {
  const queryClient = useQueryClient();

  const addUserInventory = async (data) => {
    const { action, id, ...rest } = data;
    if (action === "create") {
      const response = await databases.createDocument(
        "drug-inventory",
        "user-inventory",
        ID.unique(),
        rest
      );

      return response;
    } else {
      const response = await databases.deleteDocument("drug-inventory", "user-inventory", id);

      return response;
    }
  };

  return useMutation({
    mutationFn: addUserInventory,
    onMutate(variables) {
      queryClient.cancelQueries({
        queryKey: ["userInventory", variables.productId, variables.userId],
      });

      const previousUserInventory = queryClient.getQueryData<UserInventory>([
        "userInventory",
        variables.productId,
        variables.userId,
      ]);

      if (variables.action === "create") {
        queryClient.setQueryData<UserInventory>(
          ["userInventory", variables.productId, variables.userId],
          {
            total: 1,
            documents: [],
          }
        );
        Toast.show({
          type: "success",
          text1: "Added to your inventory",
        });
      } else {
        queryClient.setQueryData<UserInventory>(
          ["userInventory", variables.productId, variables.userId],
          {
            total: 0,
            documents: [],
          }
        );

        Toast.show({
          type: "success",
          text1: "Removed from your inventory",
        });
      }

      return { previousUserInventory };
    },
    onError(_error, variables, context) {
      Toast.show({
        type: "error",
        text1: "Error occurred",
      });
      queryClient.setQueryData(
        ["userInventory", variables.productId, variables.userId],
        context?.previousUserInventory
      );
    },
    onSettled(_data, _error, variables) {
      queryClient.invalidateQueries({
        queryKey: ["userInventory", variables.productId, variables.userId],
      });
      queryClient.invalidateQueries(userInventoryQueryOptions);
    },
  });
}
