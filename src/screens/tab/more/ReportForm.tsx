import { Feather } from "@expo/vector-icons";
import {
  BottomSheetFlatList,
  BottomSheetModal,
  BottomSheetView as GBottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetViewProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetView/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { StyleSheet } from "nativewind";
import { useCallback, useMemo, useRef, useState } from "react";
import { Controller, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ActivityIndicator, Image, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import { StyledSafeAreaView } from "~/components";
import { CustomBottomSheet } from "~/components/CustomBottomSheet";
import RHFInput from "~/components/rhfInput";
import { Button, Input, Text } from "~/components/ui";
import { Label } from "~/components/ui/label";
import { H4, P } from "~/components/ui/typography";
import { useCreateDrugReport } from "~/hooks/drugReport.hook";
import { useBottomSheetBackHandler } from "~/hooks/useBSBackHandler";
import useDebounce from "~/hooks/useDebounce";
import { productsQueryOptions } from "~/lib/queryOptions";
import { cn } from "~/lib/utils";
import { NewReportSchema } from "~/lib/validation";

function BottomSheetView(props: BottomSheetViewProps) {
  return (
    <GBottomSheetView style={props.style} {...props}>
      {props.children}
    </GBottomSheetView>
  );
}

export default function ReportForm() {
  const navigation = useNavigation();
  const mutation = useCreateDrugReport();
  const { params } = useRoute();
  const formMethods = useForm({
    resolver: zodResolver(NewReportSchema),
    defaultValues: {
      masNumber: params?.masNumber ?? "",
    },
  });

  const {
    formState: { errors },
    setValue,
    handleSubmit,
    control,
    reset,
  } = formMethods;

  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const { handleSheetPositionChange } = useBottomSheetBackHandler(bottomSheetModalRef);

  // variables
  const snapPoints = useMemo(() => ["50%", "90%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const onDismiss = useCallback(() => {
    setSearchText("");
  }, []);

  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);
  const { data, isFetching } = useQuery({
    ...productsQueryOptions(debouncedSearchText, "Product Name"),
    queryKey: ["products", "search", debouncedSearchText],
    enabled: debouncedSearchText.length > 0,
    persister: undefined,
  });

  const onSubmit: SubmitHandler<NewReportSchema> = async (data) => {
    if (mutation.isPending) return;
    mutation.mutate(data, {
      onSuccess: () => {
        reset();
        Toast.show({
          text1: "Drug report submitted successfully",
        });
      },
      onError: (error) => {
        Toast.show({
          text1: "Error occurred while creating drug report",
        });
      },
    });
  };

  return (
    <StyledSafeAreaView className="flex-1 gap-4">
      <View className="">
        <View className="flex-row items-center justify-between px-4">
          <View className="size-10 items-start justify-center">
            <Button
              size="icon"
              variant="ghost"
              onPress={() => {
                navigation.goBack();
              }}>
              <Feather color="#000" name="arrow-left" size={24} />
            </Button>
          </View>
          <H4 numberOfLines={1} className="flex-1 text-center">
            Report Fake Drug
          </H4>
          <View />
        </View>
      </View>

      <FormProvider {...formMethods}>
        <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
          <View className="mb-4">
            <Label nativeID="itemName">Choose Drug</Label>

            <Controller
              control={control}
              name="product.name"
              render={({ field: { onChange, value } }) => (
                <TouchableOpacity className="relative" onPress={handlePresentModalPress}>
                  <Input
                    value={value}
                    onChangeText={onChange}
                    placeholder="Search drug"
                    editable={false}
                    className={cn(errors.product?.name && "border-red-600")}
                  />
                  <Button className="absolute inset-y-0 right-2 h-full" variant="ghost" size="icon">
                    <Feather size={18} name="chevron-down" />
                  </Button>
                </TouchableOpacity>
              )}
            />
            {errors.product?.name ? (
              <P className="pl-1 text-red-500">{errors["product"]?.name.message}</P>
            ) : null}
          </View>

          <View className="mb-4">
            <Label nativeID="masNo">Drug MAS Number</Label>

            <RHFInput name="masNumber" keyboardType="number-pad" />
          </View>

          <View className="mb-4">
            <Label nativeID="comment">Additional Comments</Label>

            <RHFInput multiline name="comment" />
          </View>

          <Button
            onPress={handleSubmit(onSubmit)}
            className="flex-row items-center justify-center gap-2">
            {mutation.isPending && <ActivityIndicator color="#94A3B8" />}
            <Text className="uppercase">Save</Text>
          </Button>

          <CustomBottomSheet
            ref={bottomSheetModalRef}
            index={1}
            handleStyle={{ display: "none" }}
            snapPoints={snapPoints}
            onDismiss={onDismiss}
            // keyboardBehavior="fillParent"
            // keyboardBlurBehavior="restore"
            // android_keyboardInputMode="adjustResize"
            onChange={handleSheetPositionChange}>
            <BottomSheetView style={{ flex: 1, padding: 12 }}>
              <SafeAreaView style={{ flex: 1 }}>
                <BottomSheetFlatList
                  ListHeaderComponent={
                    <>
                      <Text>Search Drug</Text>
                      <Input
                        autoCapitalize="none"
                        // autoFocus
                        autoCorrect={false}
                        clearButtonMode="while-editing"
                        onChangeText={(val) => setSearchText(val)}
                        placeholder="Start searching.."
                        // placeholderTextColor="#848484"
                        returnKeyType="done"
                        style={styles.input}
                      />

                      {isFetching && <ActivityIndicator color="#94A3B8" />}
                    </>
                  }
                  data={data?.documents}
                  contentContainerStyle={{
                    flex: 1,
                  }}
                  renderItem={({ item }) => (
                    <Button
                      variant="ghost"
                      className="flex-row items-center justify-start gap-3 !px-0
                        active:bg-transparent"
                      style={{ height: "auto" }}
                      onPress={() => {
                        setValue(
                          "product",
                          {
                            id: item.$id,
                            name: item.name,
                          },
                          {
                            shouldDirty: true,
                            shouldValidate: true,
                          }
                        );

                        bottomSheetModalRef.current?.close();
                        setSearchText("");
                      }}>
                      <View className={cn("size-[46px] rounded-xl items-center justify-center")}>
                        <Image source={{ uri: item.imageUrl }} className="size-full" />
                      </View>

                      <View className="">
                        <H4 className="mb-1 font-PoppinsSemiBold text-[#131313]">{item.name}</H4>

                        <Text className="text-sm text-[#7f7f7f]">
                          Expires: {new Date(item.expiryDate).toLocaleDateString()}
                        </Text>
                      </View>
                    </Button>
                  )}
                />
              </SafeAreaView>
            </BottomSheetView>
          </CustomBottomSheet>
        </KeyboardAwareScrollView>
      </FormProvider>
    </StyledSafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
  input: {
    marginTop: 8,
    marginBottom: 10,
    borderRadius: 10,
    fontSize: 16,
    lineHeight: 20,
    padding: 8,
    backgroundColor: "rgba(151, 151, 151, 0.25)",
  },
});
