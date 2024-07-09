import { Feather, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { CameraView, PermissionStatus, useCameraPermissions } from "expo-camera";
import { cssInterop } from "nativewind";
import React, { useState } from "react";
import { ActivityIndicator, Alert, FlatList, Input as RNInput, View } from "react-native";

import { InventoryItem, StyledSafeAreaView } from "~/components";
import { Button, Input, Text } from "~/components/ui";
import { H2, H3, H4 } from "~/components/ui/typography";
import { useBackHandler } from "~/hooks/useBackHandler";
import useDebounce from "~/hooks/useDebounce";
import { productsQueryOptions } from "~/lib/queryOptions";

cssInterop(CameraView, {
  className: "style",
});
export default function Inventory({ navigation }) {
  const [showScanner, setShowScanner] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [permission, requestPermission] = useCameraPermissions();
  const searchRef = React.useRef<typeof RNInput>(null);
  const debouncedSearchText = useDebounce(searchText, 500);
  const { data, isPending, isError, error, refetch } = useQuery({
    ...productsQueryOptions(debouncedSearchText),
    placeholderData: (prev) => prev,
  });
  const [focused, setFocused] = useState(false);
  useBackHandler(() => {
    if (showScanner) {
      setShowScanner(false);
      return true;
    }
    return false;
  }, [showScanner]);

  const onBtnCodePressed = () => {
    if (permission?.granted === false || permission?.status === PermissionStatus.UNDETERMINED) {
      requestPermission().then((res) => {
        if (res.granted) {
          setShowScanner(true);
        } else {
          Alert.alert("Camera permission denied");
        }
      });
    } else if (permission?.granted) {
      setShowScanner(true);
    }
  };
  const onBarcodeScanned = ({ data, ...rest }) => {
    console.log(rest);

    setSearchText(data);
    setShowScanner(false);
  };

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
        <Button variant="ghost" size="icon">
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
          placeholder="Item name, NAFDAC number, etc."
          placeholderTextColor="#778599"
          clearButtonMode="always"
          inputMode="search"
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
        ) : (
          <Button
            variant="ghost"
            onPress={onBtnCodePressed}
            size="icon"
            className="absolute inset-y-0 right-0 my-auto h-full">
            <MaterialCommunityIcons name="barcode-scan" size={24} />
          </Button>
        )}
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
          contentContainerClassName="gap-4 py-8"
          renderItem={({ item }) => <InventoryItem item={item} />}
          keyExtractor={(item) => item.$id}
        />
      )}

      {showScanner && (
        <CameraView
          facing="back"
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "code128", "ean13"],
          }}
          onBarcodeScanned={showScanner ? onBarcodeScanned : undefined}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 11,
          }}
        />
      )}

      <Button
        className="absolute bottom-6 right-6 size-12 rounded-full shadow-lg"
        size="icon"
        onPress={() => navigation.navigate("NewItem")}>
        <Feather name="plus" color="white" size={26} />
      </Button>
    </StyledSafeAreaView>
  );
}

const items = [
  {
    icon: "clock",
    label: "Aspirin",
    exp: "10-01-2023",
    color: "#d9edf7",
    unitLeft: 32,
  },
  {
    icon: "thermometer",
    label: "Ibuprofen",
    exp: "05-03-2024",
    color: "#f0f9fa",
    unitLeft: 80,
  },
  {
    icon: "droplet",
    label: "Saline Solution",
    exp: "15-06-2024",
    color: "#d0e3f0",
    unitLeft: 45,
  },
  {
    icon: "alert-triangle",
    label: "Penicillin (Caution)",
    exp: "28-02-2024",
    color: "#ffe3e3",
    unitLeft: 12,
  },
];
