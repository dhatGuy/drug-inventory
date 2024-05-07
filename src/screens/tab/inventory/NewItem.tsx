import { Feather } from "@expo/vector-icons";
import { remapProps } from "nativewind";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import SelectDropdown from "react-native-select-dropdown";

import { StyledSafeAreaView } from "~/components";
import { Button, Input, Text } from "~/components/ui";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { H2 } from "~/components/ui/typography";

remapProps(SelectDropdown, {
  className: "dropdownStyle",
  inputTxtClassName: "searchInputTxtStyle",
});
export default function NewItem({ navigation }) {
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  return (
    <StyledSafeAreaView className="!p-4">
      <View className="mb-3 flex-row items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          className="flex-row items-center gap-1 p-0"
          onPress={() => navigation.goBack()}>
          <Feather name="chevron-left" size={24} />

          <Text>Back</Text>
        </Button>

        <Button className="rounded-full" size="sm">
          <Text className="text-white">Save</Text>
        </Button>
      </View>

      <H2>New Item</H2>

      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View className="mb-4">
          <Label nativeID="image">Item Image</Label>
          <Button
            variant="secondary"
            className="border border-gray-400 bg-white py-4"
            style={{ height: "auto" }}>
            <Feather name="plus-circle" size={28} />
            <Text>Choose an image</Text>
          </Button>
        </View>

        <View className="mb-4">
          <Label nativeID="itemName">Item Name</Label>

          <Input />
        </View>

        <View className="mb-4">
          <Label nativeID="nafdac">NAFDAC Number</Label>

          <Input />
        </View>

        <View style={{ flexDirection: "row", gap: 15 }}>
          <View className="mb-4 flex-1">
            <Label nativeID="qty">Quantity</Label>
            <Input />
          </View>
          <View className="mb-4 flex-1">
            <Label nativeID="minLevel">Min Level (Low Stock)</Label>
            <Input />
          </View>
        </View>

        <View style={{ flexDirection: "row", gap: 15 }}>
          <View className="mb-4 flex-1">
            <Label nativeID="price">Price</Label>
            <Input />
          </View>
          <View className="mb-4 flex-1">
            <Label nativeID="totalValue">Total Value</Label>
            <Input />
          </View>
        </View>

        <View className="mb-4">
          <Label nativeID="expDate">Expiry Date</Label>
          <Input />
        </View>

        <View className="mb-4">
          <Label nativeID="Category">Category</Label>
          {/* <SelectDropdown
          data={emojisWithIcons}
          onSelect={(selectedItem, index) => {
            console.log(selectedItem, index);
          }}
          renderButton={(selectedItem, isOpened) => {
            return (
              <View
                className="h-[40] flex-row items-center justify-center rounded-xl border
                  border-[#c9d3db] px-3">
                <Text className="flex-1 text-lg">{selectedItem?.title || "Select your mood"}</Text>
                <Icon name={isOpened ? "chevron-up" : "chevron-down"} size={28} />
              </View>
            );
          }}
          renderItem={(item, index, isSelected) => {
            return (
              <View style={styles.dropdownItemStyle(isSelected)}>
                <Text style={styles.dropdownItemTxtStyle}>{item.title}</Text>
                {isSelected ? <Feather name="check-circle" size={24} /> : null}
              </View>
            );
          }}
          search
          searchPlaceHolder="Search here"
          searchInputTxtStyle={styles.dropdownSearchTxt}
          dropdownStyle={styles.dropdownMenuStyle}
          renderSearchInputLeftIcon={() => <Feather name="search" size={20} />}
        /> */}
        </View>

        <Select>
          <SelectTrigger className="">
            <SelectValue
              className="native:text-lg font-PoppinsMedium text-sm text-foreground"
              placeholder="Select category"
            />
          </SelectTrigger>
          <SelectContent className="w-full" insets={contentInsets}>
            <SelectGroup>
              <SelectLabel>Fruits</SelectLabel>
              <SelectSeparator />
              {emojisWithIcons.map((item) => (
                <SelectItem key={item.title} label={item.title} value={item.value}>
                  {item.title}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </KeyboardAwareScrollView>
    </StyledSafeAreaView>
  );
}

const emojisWithIcons = [
  { title: "Pain Reliever", value: "pain-reliever" },
  { title: "Anti-Relaxants", value: "anti-relaxants" },
  { title: "Antibiotics", value: "antibiotics" },
  { title: "Hormonal Medications", value: "hormonal-medications" },
  { title: "Vitamins", value: "vitamins" },
  { title: "Other", value: "other" },
];
