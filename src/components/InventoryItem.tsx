import { Feather } from "@expo/vector-icons";
import { View } from "react-native";

import { Text } from "./ui";
import { H4 } from "./ui/typography";

import { cn } from "~/lib/utils";

type Item = {
  icon: string;
  color: string;
  label: string;
  exp: string;
  unitLeft: string;
};

type Props = {
  item: Item;
};
export default function InventoryItem({ item }: Props) {
  const { icon, color, label, exp, unitLeft } = item;

  return (
    <View className="flex-row items-center justify-start gap-3 rounded-xl py-3">
      <View
        className={cn("size-[46px] rounded-xl items-center justify-center")}
        style={{ backgroundColor: color }}>
        <Feather color="#131313" name={icon} size={20} />
      </View>

      <View className="">
        <Text className="mb-1 font-PoppinsSemiBold text-[#131313]">{label}</Text>

        <Text className="text-sm text-[#7f7f7f]">Expires: {exp}</Text>
      </View>

      <H4 className="ml-auto font-PoppinsBold text-[#2c9d3b]">{unitLeft}</H4>
    </View>
  );
}
