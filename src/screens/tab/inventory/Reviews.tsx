import { Feather, MaterialIcons } from "@expo/vector-icons";
import { BottomSheetView } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { cssInterop } from "nativewind";
import { useEffect, useRef } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ActivityIndicator, FlatList, View } from "react-native";

import { StyledSafeAreaView } from "~/components";
import { CustomBottomSheet } from "~/components/CustomBottomSheet";
import RHFInput from "~/components/rhfInput";
import { Button, Text } from "~/components/ui";
import { Avatar } from "~/components/ui/avatar";
import { Label } from "~/components/ui/label";
import { Separator } from "~/components/ui/separator";
import { H3, H4 } from "~/components/ui/typography";
import { useCreateReview, useDeleteReview, useGetReviewsByProductId } from "~/hooks/review.hook";
import { useBottomSheetBackHandler } from "~/hooks/useBSBackHandler";
import { getAvatarName } from "~/lib/utils";
import { CreateReviewSchema } from "~/lib/validation";
import { useUser } from "~/store/authStore";

cssInterop(BottomSheetView, {
  className: "style",
});

const Reviews = ({ navigation, route }) => {
  const sheetRef = useRef<BottomSheetModalMethods>(null);
  const mutation = useCreateReview();
  const deleteMutation = useDeleteReview();
  const id = route.params.id;
  const { data: reviews, isPending, isError } = useGetReviewsByProductId(id);
  const user = useUser();
  const { handleSheetPositionChange } = useBottomSheetBackHandler(sheetRef);

  const userReview = reviews?.documents.find((review) => review.user.$id === user?.$id);

  useEffect(() => {
    if (userReview) {
      formMethods.reset({
        title: userReview.title,
        desc: userReview.desc,
      });
    }
  }, [userReview]);

  const formMethods = useForm<CreateReviewSchema>({
    resolver: zodResolver(CreateReviewSchema),
    defaultValues: {
      title: "",
      desc: "",
    },
  });

  const { handleSubmit } = formMethods;

  const onDelete = () => {
    deleteMutation.mutate(userReview?.$id!, {
      onSuccess: () => {
        formMethods.reset({
          title: "",
          desc: "",
        });
      },
    });
  };

  const onSubmit: SubmitHandler<CreateReviewSchema> = (data) => {
    mutation.mutate(
      {
        data,
        userId: user?.$id!,
        productId: id!,
        reviewId: userReview?.$id,
      },
      {
        onSuccess: (data) => {
          formMethods.reset({
            title: data.title,
            desc: data.desc,
          });

          sheetRef.current?.close();
        },
      }
    );
  };

  if (isPending) {
    return (
      <StyledSafeAreaView className="flex-1 items-center justify-center">
        <ActivityIndicator size="large" />
      </StyledSafeAreaView>
    );
  }

  if (isError) {
    return (
      <StyledSafeAreaView className="flex-1 items-center justify-center">
        <Text>Something went wrong</Text>
      </StyledSafeAreaView>
    );
  }

  return (
    <StyledSafeAreaView>
      <View className="flex-row items-center justify-between px-2">
        <View className="flex-row items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            style={{ height: "auto" }}
            className="flex-row items-center p-2"
            onPress={() => navigation.goBack()}>
            <Feather name="chevron-left" size={24} />
          </Button>
          <Text className="native:text-lg">Item Reviews</Text>
        </View>
      </View>

      <Separator className="" />

      {reviews?.total === 0 ? (
        <View className="flex-1 items-center justify-center">
          <MaterialIcons color="#94A3B8" name="inventory-2" size={36} />

          <H4>No Reviews</H4>

          <Text>Be the first to review this item</Text>

          <Button
            className="flex-row items-center gap-3 p-2"
            onPress={() => sheetRef.current?.present()}>
            <Text>Add Review</Text>
            <Feather name="plus" size={24} color="#fff" />
          </Button>
        </View>
      ) : (
        <>
          <FlatList
            data={reviews?.documents}
            className="pt-4"
            renderItem={({ item }) => (
              <View className="flex-row gap-4 px-2">
                <Avatar
                  alt={item.user.name}
                  className="size-12 items-center justify-center border border-gray-400 bg-green-700">
                  <Text className="text-2xl text-white">{getAvatarName(item.user.name)}</Text>
                </Avatar>
                <View className="flex-1">
                  <View className="flex-row items-center justify-between">
                    <Text className="font-PoppinsSemiBold text-lg">{item.title}</Text>
                    {user?.$id === item.user.$id && (
                      <Button
                        variant="ghost"
                        size="sm"
                        style={{ height: "auto" }}
                        onPress={onDelete}>
                        <Feather name="trash-2" size={18} color="red" />
                      </Button>
                    )}
                  </View>
                  <Text className="text-sm text-gray-500">
                    by {item.user.name} {user?.$id === item.user.$id && "(You)"}
                  </Text>
                  <Text className="text-lg">{item.desc}</Text>
                  <Text className="text-gray-500">{new Date(item.$createdAt).toDateString()}</Text>
                </View>
              </View>
            )}
            ItemSeparatorComponent={() => <Separator className="my-2" />}
          />

          <Button onPress={() => sheetRef.current?.present()}>
            <Text className="text-lg">{userReview ? "Update Your Review" : "Add Your Review"}</Text>
          </Button>
        </>
      )}
      <CustomBottomSheet
        ref={sheetRef}
        onChange={handleSheetPositionChange}
        detached
        bottomInset={50}
        enableDynamicSizing
        backgroundStyle={{ backgroundColor: "#fff" }}
        style={{ paddingHorizontal: 20, paddingTop: 10, marginHorizontal: 20 }}
        handleIndicatorStyle={{ display: "none" }}>
        <BottomSheetView className="pb-8">
          <View className="flex-row items-center justify-between">
            <H3 className="text-lg">Add Review</H3>
            <Button variant="ghost" size="icon" onPress={() => sheetRef.current?.close()}>
              <Feather name="x" size={24} />
            </Button>
          </View>
          <Separator className="my-4" />
          <FormProvider {...formMethods}>
            <View className="gap-4">
              <View>
                <Label className="mb-2" nativeID="title">
                  Title
                </Label>
                <RHFInput name="title" placeholder="Enter title" />
              </View>
              <View>
                <Label className="mb-2" nativeID="title">
                  Description
                </Label>
                <RHFInput name="desc" multiline placeholder="Enter description" />
              </View>
              <Button
                onPress={handleSubmit(onSubmit)}
                className="flex-row gap-2"
                disabled={mutation.isPending}>
                {mutation.isPending ? <ActivityIndicator /> : null}
                <Text>{userReview ? "Update" : "Submit"}</Text>
              </Button>
            </View>
          </FormProvider>
        </BottomSheetView>
      </CustomBottomSheet>
    </StyledSafeAreaView>
  );
};
export default Reviews;
