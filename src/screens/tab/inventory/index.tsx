import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
import { CameraView, PermissionStatus, useCameraPermissions } from "expo-camera/next";
import { useState } from "react";
import { FlatList, View } from "react-native";
import { useStyles } from "react-native-unistyles";

import { stylesheet } from "./index.style";

import { InventoryItem, StyledSafeAreaView } from "~/components";
import { Button, Input, Text } from "~/components/ui";
import { useBackHandler } from "~/hooks/useBackHandler";
export default function Inventory() {
  const { styles } = useStyles(stylesheet);
  const [showScanner, setShowScanner] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [permission, requestPermission] = useCameraPermissions();

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

  return (
    <StyledSafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Inventory</Text>
        <Button variant="ghost">
          <MaterialCommunityIcons name="sort" size={24} />
        </Button>
      </View>

      <View style={styles.headerSearch}>
        <View style={styles.headerSearchIcon}>
          <Feather color="#121A26" name="search" size={19} />
        </View>

        <Input
          autoCapitalize="words"
          placeholder="Item name, NAFDAC number, etc."
          placeholderTextColor="#778599"
          clearButtonMode="always"
          value={searchText}
          onChangeText={setSearchText}
          style={styles.headerSearchInput}
        />

        <Button variant="ghost" onPress={onBtnCodePressed} style={styles.btnBarcode}>
          <MaterialCommunityIcons name="barcode-scan" size={24} />
        </Button>
      </View>

      <FlatList
        data={items}
        style={styles.itemList}
        contentContainerStyle={styles.itemListContent}
        renderItem={({ item }) => <InventoryItem item={item} />}
        keyExtractor={(item) => item.label}
      />

      {showScanner && (
        <CameraView
          facing="back"
          barcodeScannerSettings={{
            barcodeTypes: ["qr", "code128"],
          }}
          onBarcodeScanned={showScanner ? onBarcodeScanned : undefined}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 5,
          }}
        />
      )}

      <Button style={styles.addItem}>
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
