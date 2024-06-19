import { useNavigation } from "@react-navigation/native";
import { Image, View } from "react-native";

import { Button, Text } from "./ui";
import { H4 } from "./ui/typography";

import { ProductSchema } from "~/entities/product.schema";
import { cn } from "~/lib/utils";

type Props = {
  item: ProductSchema;
};
export default function InventoryItem({ item }: Props) {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate("TabNavigator", {
      screen: "InventoryTab",
      params: {
        screen: "ItemDetails",
        params: {
          id: item.$id,
        },
      },
    });
  };

  return (
    <Button
      variant="ghost"
      className="flex-row items-center justify-between gap-3 !px-0 active:bg-transparent"
      style={{ height: "auto" }}
      onPress={onPress}>
      <View className={cn("size-[46px] rounded-xl items-center justify-center")}>
        <Image source={{ uri: item.imageUrl }} className="size-full" />
      </View>

      <View className="">
        <H4 className="mb-1 font-PoppinsSemiBold text-[#131313]">{item.name}</H4>

        <Text className="text-sm text-[#7f7f7f]">
          Expires: {new Date(item.expiryDate).toLocaleDateString()}
        </Text>
      </View>

      <H4 className="ml-auto font-PoppinsBold text-[#2c9d3b]">{item.quantity}</H4>
    </Button>
  );
}
