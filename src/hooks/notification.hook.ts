import { useQuery } from "@tanstack/react-query";
import { Query } from "react-native-appwrite/src";

import { documentListSchema } from "~/entities/appwriteSchema";
import { NotificationSchema } from "~/entities/notification.schema";
import { databases } from "~/lib/appWrite";

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
