import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ID, Query } from "react-native-appwrite/src";
import Toast from "react-native-toast-message";

import { documentListSchema } from "~/entities/appwriteSchema";
import { ReviewSchema } from "~/entities/review.schema";
import { databases } from "~/lib/appWrite";
import { CreateReviewSchema } from "~/lib/validation";
import { useUser } from "~/store/authStore";

export function useCreateReview() {
  const queryClient = useQueryClient();
  const createReview = async ({
    data,
    productId,
    userId,
    reviewId,
  }: {
    data: CreateReviewSchema;
    productId: string;
    userId: string;
    reviewId?: string;
  }) => {
    if (reviewId) {
      const response = databases.updateDocument("drug-inventory", "review", reviewId, {
        ...data,
      });

      return response;
    }
    const response = databases.createDocument("drug-inventory", "review", ID.unique(), {
      ...data,
      user: userId,
      product: productId,
    });

    return response;
  };

  return useMutation({
    mutationFn: ({
      data,
      productId,
      userId,
      reviewId,
    }: {
      data: CreateReviewSchema;
      productId: string;
      userId: string;
      reviewId?: string;
    }) =>
      createReview({
        data,
        productId,
        userId,
        reviewId,
      }),
    onSuccess: (_data, variables) => {
      Toast.show({
        type: "success",
        text1: variables.reviewId ? "Review updated successfully" : "Review created successfully",
      });

      queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
    onError: (error) => {
      console.log("🚀 ~ useCreateReview ~ error:", error);
      Toast.show({
        type: "error",
        text1: "Error occurred while creating review",
      });
    },
  });
}

export function useGetReviews() {
  const getReviews = async () => {
    const response = await databases.listDocuments("drug-inventory", "review", [
      Query.orderDesc("$createdAt"),
    ]);
    return documentListSchema(ReviewSchema).parse(response);
  };

  return useQuery({
    queryKey: ["reviews"],
    queryFn: getReviews,
  });
}

export function useGetReviewsByProductId(productId: string) {
  const user = useUser();
  const getReviewsByProductId = async () => {
    const response = await databases.listDocuments("drug-inventory", "review", [
      Query.equal("product", productId),
      Query.orderDesc("$createdAt"),
    ]);
    return documentListSchema(ReviewSchema).parse(response);
  };

  return useQuery({
    queryKey: ["reviews", productId],
    queryFn: getReviewsByProductId,
    select(data) {
      // put the user's review at the top if it exists
      const userReview = data.documents.find((review) => review.user.$id === user?.$id);
      if (userReview) {
        return {
          ...data,
          documents: [
            userReview,
            ...data.documents.filter((review) => review.$id !== userReview.$id),
          ],
        };
      }
      return data;
    },
  });
}

export function useDeleteReview() {
  const queryClient = useQueryClient();
  const deleteReview = async (reviewId: string) => {
    const response = await databases.deleteDocument("drug-inventory", "review", reviewId);
    return response;
  };

  return useMutation({
    mutationFn: (reviewId: string) => deleteReview(reviewId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["reviews"] });

      Toast.show({
        type: "success",
        text1: "Review deleted successfully",
      });
    },
    onError: (error) => {
      console.log("🚀 ~ useDeleteReview ~ error:", error);
      Toast.show({
        type: "error",
        text1: "Error occurred while deleting review",
      });
    },
  });
}
