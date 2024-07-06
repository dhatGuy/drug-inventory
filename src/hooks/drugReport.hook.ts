import { useMutation } from "@tanstack/react-query";
import { ID } from "react-native-appwrite";
import { databases } from "~/lib/appWrite";
import { NewReportSchema } from "~/lib/validation";
import { useUser } from "~/store/authStore";

export function useCreateDrugReport() {
  const user = useUser();
  const createDrugReport = async (data: NewReportSchema) => {
    try {
      const response = await databases.createDocument(
        "drug-inventory",
        "drug-report",
        ID.unique(),
        {
          productID: data.product.id,
          masNumber: data.masNumber,
          comment: data.comment,
          userId: user?.$id,
        }
      );

      return response;
    } catch (error) {
      throw error;
    }
  };

  return useMutation({
    mutationFn: createDrugReport,
  });
}
