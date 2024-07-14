import { Feather, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useQuery } from "@tanstack/react-query";
import { CameraView } from "expo-camera";
import { cssInterop } from "nativewind";
import React, { useRef, useState } from "react";
import { ActivityIndicator, FlatList, Input as RNInput, View } from "react-native";

import { InventoryItem, StyledSafeAreaView } from "~/components";
import { CustomBottomSheet } from "~/components/CustomBottomSheet";
import { Button, Input, Text } from "~/components/ui";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";
import { Separator } from "~/components/ui/separator";
import { H2, H3, H4 } from "~/components/ui/typography";
import { useBottomSheetBackHandler } from "~/hooks/useBSBackHandler";
import useDebounce from "~/hooks/useDebounce";
import { productsQueryOptions } from "~/lib/queryOptions";
import { useUser } from "~/store/authStore";

cssInterop(CameraView, {
  className: "style",
});
export default function Inventory({ navigation }) {
  const [searchText, setSearchText] = useState("");
  const searchRef = React.useRef<typeof RNInput>(null);
  const [value, setValue] = useState<"Product Name" | "Mas Number">("Product Name");
  const user = useUser();
  const isAdmin = user?.labels.includes("admin");
  const debouncedSearchText = useDebounce(searchText, 500);
  const { data, isPending, isError, error, refetch } = useQuery({
    ...productsQueryOptions(debouncedSearchText, value),
    placeholderData: (prev) => prev,
    enabled:
      value === "Product Name" ||
      !debouncedSearchText ||
      (value === "Mas Number" && debouncedSearchText.length >= 11),
  });
  const [focused, setFocused] = useState(false);
  const sheetRef = useRef<BottomSheetModalMethods>(null);
  const { handleSheetPositionChange } = useBottomSheetBackHandler(sheetRef);

  function onLabelPress(label: "Product Name" | "Mas Number") {
    return () => {
      setValue(label);
      sheetRef.current?.dismiss();
      setSearchText("");
      searchRef.current?.focus();
    };
  }

  if (isError) {
    return (
      <StyledSafeAreaView className="flex-1 items-center justify-center">
        <H2>Error</H2>
        <Button onPress={() => refetch()}>Reload</Button>
      </StyledSafeAreaView>
    );
  }

  return (
    <StyledSafeAreaView>
      <View className="flex-row items-center justify-between">
        <H3 className="pb-0">Inventory</H3>
        <Button variant="ghost" size="icon" onPress={() => sheetRef.current?.present()}>
          <MaterialCommunityIcons name="sort" size={24} />
        </Button>
      </View>

      <View className="relative">
        <View className="absolute inset-y-0 left-0 z-10 size-[40] h-full items-center justify-center">
          <Feather color="#121A26" name="search" size={19} />
        </View>

        <Input
          ref={searchRef}
          autoCapitalize="words"
          placeholder={
            value === "Product Name" ? "Enter drug name..." : "Enter 11 digit mas number..."
          }
          placeholderTextColor="#778599"
          clearButtonMode="always"
          inputMode={value === "Product Name" ? "text" : "numeric"}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          value={searchText}
          onChangeText={setSearchText}
          className="rounded-lg bg-white pl-10 pr-11 shadow-lg shadow-black/5"
        />

        {focused ? (
          <Button
            variant="ghost"
            onPress={() => {
              searchRef.current?.blur();
              setSearchText("");
            }}
            size="icon"
            className="absolute inset-y-0 right-0 my-auto h-full">
            <MaterialCommunityIcons name="close" size={24} />
          </Button>
        ) : null}
      </View>
      {isPending && (
        <View className="mt-4">
          <ActivityIndicator color="#94A3B8" />
        </View>
      )}

      {!data?.documents.length && !debouncedSearchText ? (
        <View className="flex-1 items-center justify-center">
          <MaterialIcons color="#94A3B8" name="inventory-2" size={36} />

          <H4>No products</H4>

          <Text>Click the + button to add new item</Text>
        </View>
      ) : (
        <FlatList
          data={data?.documents}
          contentContainerClassName="gap-4 py-8 flex-1"
          renderItem={({ item }) => <InventoryItem item={item} />}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center">
              <MaterialIcons color="#94A3B8" name="inventory-2" size={36} />
              <H4>No products found</H4>
              {value === "Mas Number" && !user?.labels.length ? (
                <Button
                  variant="destructive"
                  onPress={() =>
                    navigation.navigate("MoreTab", {
                      screen: "NewReport",
                      params: { masNumber: searchText },
                    })
                  }>
                  <Text>Report Drug</Text>
                </Button>
              ) : null}
            </View>
          }
          keyExtractor={(item) => item.$id}
        />
      )}

      {isAdmin && (
        <Button
          className="absolute bottom-6 right-6 size-12 rounded-full shadow-lg"
          size="icon"
          onPress={() => navigation.navigate("NewItem")}>
          <Feather name="plus" color="white" size={26} />
        </Button>
      )}

      <CustomBottomSheet
        ref={sheetRef}
        onChange={handleSheetPositionChange}
        bottomInset={50}
        // snapPoints={snapPoints}
        enableDynamicSizing
        backgroundStyle={{ backgroundColor: "#fff" }}
        style={{ paddingHorizontal: 20, paddingTop: 10, marginHorizontal: 20 }}
        handleIndicatorStyle={{ display: "none" }}>
        <BottomSheetScrollView contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30 }}>
          <H3 className="mb-5">Search By</H3>

          <View className="flex-1 gap-12">
            <RadioGroup value={value} onValueChange={setValue} className="gap-3">
              <RadioGroupItemWithLabel
                value="Product Name"
                onLabelPress={onLabelPress("Product Name")}
              />
              <Separator />
              <RadioGroupItemWithLabel
                value="Mas Number"
                onLabelPress={onLabelPress("Mas Number")}
              />
            </RadioGroup>
          </View>
        </BottomSheetScrollView>
      </CustomBottomSheet>
    </StyledSafeAreaView>
  );
}

function RadioGroupItemWithLabel({
  value,
  onLabelPress,
}: {
  value: string;
  onLabelPress: () => void;
}) {
  return (
    <View className={"flex-row gap-2 items-center"}>
      <RadioGroupItem aria-labelledby={`label-for-${value}`} value={value} />
      <Label nativeID={`label-for-${value}`} onPress={onLabelPress}>
        {value}
      </Label>
    </View>
  );
}
