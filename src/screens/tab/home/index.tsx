import FeatherIcon from "@expo/vector-icons/Feather";
import { useFont } from "@shopify/react-native-skia";
import poppins from "assets/fonts/Poppins-Medium.ttf";
import { ScrollView, View } from "react-native";
import { BarGroup, CartesianChart } from "victory-native";

import { InventoryItem, StyledSafeAreaView } from "~/components";
import { Button, Text } from "~/components/ui";
import { H3, H4 } from "~/components/ui/typography";
import { useUser, useUserActions } from "~/store/authStore";

export default function Home() {
  const font = useFont(poppins, 12);
  const { signOut } = useUserActions();
  const user = useUser();

  return (
    <StyledSafeAreaView className="p-1">
      <View className="flex-row items-center justify-between">
        <Text>
          Hello <Text>{user?.name}</Text>
        </Text>

        <View className="flex-row items-center justify-end">
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full border border-[#1e1e1e]"
            onPress={signOut}>
            <FeatherIcon color="#222" name="bell" size={20} />
          </Button>
        </View>
      </View>
      <ScrollView
        className=""
        contentContainerClassName="pb-10"
        showsVerticalScrollIndicator={false}>
        <View>
          <View className="mx-[-10px] flex-row">
            <View className="mx-[6px] mb-3 flex-1 flex-row items-center gap-2 rounded-xl px-4 py-3">
              <View className="size-14 flex-row items-center justify-center rounded-lg bg-[#faad55]">
                <FeatherIcon color="#fff" name="users" size={22} />
              </View>

              <View>
                <Text className="text-[#8e8e93]">Total Items</Text>

                <H4 className="text-2xl text-[#081730]">12</H4>
              </View>
            </View>

            <View className="mx-[6px] mb-3 flex-1 flex-row items-center gap-2 rounded-xl px-4 py-3">
              <View className="size-14 flex-row items-center justify-center rounded-lg bg-[#faad55]">
                <FeatherIcon color="#fff" name="grid" size={22} />
              </View>

              <View>
                <Text className="text-[#8e8e93]">Available Units</Text>

                <H4 className="text-2xl text-[#081730]">150</H4>
              </View>
            </View>
          </View>
        </View>

        <View className="items-stretch justify-center">
          <View className="mx-[-6px] flex-row">
            <View className="mx-[6px] mb-3 flex-1 flex-row items-center gap-2 rounded-xl px-4 py-3">
              <View className="size-14 flex-row items-center justify-center rounded-lg bg-[#faad55]">
                <FeatherIcon color="#fff" name="users" size={22} />
              </View>

              <View>
                <Text className="text-[#8e8e93]">Low Stock</Text>

                <H4 className="text-2xl text-[#081730]">8</H4>
              </View>
            </View>

            <View className="mx-[6px] mb-3 flex-1 flex-row items-center gap-2 rounded-xl px-4 py-3">
              <View className="size-14 flex-row items-center justify-center rounded-lg bg-[#faad55]">
                <FeatherIcon color="#fff" name="grid" size={22} />
              </View>

              <View>
                <Text className="text-[#8e8e93]">Expiring Soon</Text>

                <H4 className="text-2xl text-[#081730]">9</H4>
              </View>
            </View>
          </View>
        </View>

        <View>
          <View className="flex-row items-center justify-between">
            <H3>Items</H3>
            <Button className="!px-0" variant="link">
              <Text>View All</Text>
            </Button>
          </View>
          <View className="gap-3">
            {items.map((item, index) => {
              return <InventoryItem item={item} key={index} />;
            })}
          </View>
        </View>

        <View className="pt-6">
          <H3 className="">Analytics</H3>
          <View className="min-h-[300px]">
            <CartesianChart
              data={DATA}
              xKey="x"
              yKeys={["sales", "purchase"]}
              axisOptions={{ font }}>
              {({ points, chartBounds }) => (
                //👇 pass a PointsArray to the Bar component, as well as options.
                <BarGroup
                  chartBounds={chartBounds}
                  betweenGroupPadding={0.3}
                  withinGroupPadding={0.1}>
                  <BarGroup.Bar points={points.purchase} color="red" />
                  <BarGroup.Bar points={points.sales} color="blue" />
                </BarGroup>
              )}
            </CartesianChart>
          </View>
        </View>
      </ScrollView>
    </StyledSafeAreaView>
  );
}

const DATA = Array.from({ length: 5 }, (_, i) => ({
  x: i + 3,
  sales: 40 + 30 * Math.random(),
  purchase: 40 + 30 * Math.random(),
}));

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
