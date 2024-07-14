import { useMutation, useQuery } from "@tanstack/react-query";
import { ID, Query } from "react-native-appwrite/src";

import { documentListSchema } from "~/entities/appwriteSchema";
import { NotificationBaseSchema, NotificationSchema } from "~/entities/notification.schema";
import { databases } from "~/lib/appWrite";
import { useUser } from "~/store/authStore";

export function useCreateNotification() {
  const createNotification = async (
    data: Omit<NotificationBaseSchema, "product"> & { product: string }
  ) => {
    const response = await databases.createDocument(
      "drug-inventory",
      "notification",
      ID.unique(),
      data
    );
    return response;
  };

  return useMutation({
    mutationFn: createNotification,
  });
}

export function useGetNotificationByProduct(id: string) {
  const fetchNotifications = async () => {
    const response = await databases.listDocuments("drug-inventory", "notification", [
      Query.equal("product", id),
      Query.orderDesc("$createdAt"),
    ]);

    const result = documentListSchema(NotificationSchema).safeParse(response);
    return result.success ? result.data : ([] as unknown as typeof result.data);
  };

  return useQuery({
    queryKey: ["notifications", id],
    queryFn: fetchNotifications,
  });
}

export function useGetNotifications(isAdmin: boolean) {
  const user = useUser();

  const fetchNotifications = async () => {
    const response = await databases.listDocuments("drug-inventory", "notification", [
      Query.orderDesc("$createdAt"),
      Query.equal("isAdmin", isAdmin),
      Query.greaterThanEqual("$createdAt", new Date(user?.$createdAt ?? new Date()).toISOString()),
    ]);

    const result = documentListSchema(NotificationSchema).safeParse(response);

    return result.success ? result.data : ([] as unknown as typeof result.data);
  };

  return useQuery({
    queryKey: ["notifications", isAdmin],
    queryFn: fetchNotifications,
  });
}
