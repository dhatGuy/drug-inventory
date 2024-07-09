import { Feather } from "@expo/vector-icons";
import { ActivityIndicator, FlatList, Pressable, View } from "react-native";

import { StyledSafeAreaView } from "~/components";
import { Button, Text } from "~/components/ui";
import { Separator } from "~/components/ui/separator";
import { H2, H3, H4, P } from "~/components/ui/typography";
import { NotificationSchema } from "~/entities/notification.schema";
import { useGetNotifications } from "~/hooks/notification.hook";
import { cn, formattedDate } from "~/lib/utils";
import { useUser } from "~/store/authStore";

const Item = ({ item }) => (
  <Pressable className="flex-row gap-4 px-2 py-4">
    <View
      className={cn("size-12 flex-row items-center justify-center gap-1 rounded-full", {
        "bg-blue-500": item.type === "low-stock",
        "bg-red-500": item.type === "out-of-stock",
        "bg-gray-500": item.type === "expired-drug",
        "bg-green-500": item.type === "review",
      })}>
      <Feather color="#fff" name={getNotificationIcon(item.type)} size={20} />
    </View>

    <View className="flex-1">
      <View className="flex-row items-center justify-between">
        <H2 className="text-lg">{getNotificationTitle(item.type)}</H2>
        <Text className="text-sm text-gray-400">{formattedDate(new Date(item.$createdAt))}</Text>
      </View>
      <View>{getNotificationMessage(item)}</View>
    </View>
  </Pressable>
);

export default function ItemNotifications() {
  const user = useUser();
  const isAdmin = user?.labels.includes("admin") ?? false;

  const { data: notifications, isPending, isError, refetch } = useGetNotifications(isAdmin);

  if (isError) {
    return (
      <StyledSafeAreaView className="flex-1 items-center justify-center">
        <Text>Something went wrong</Text>
        <Button onPress={() => refetch()} size="icon" variant="secondary">
          <Feather name="refresh-cw" size={24} />
        </Button>
      </StyledSafeAreaView>
    );
  }

  return (
    <StyledSafeAreaView>
      <View className="flex-row items-center justify-between">
        <H3>Notifications</H3>
      </View>

      <Separator className="" />

      <View>
        <FlatList
          data={notifications?.documents}
          ListEmptyComponent={
            <View className="items-center flex-1 justify-center">
              {isPending ? (
                <ActivityIndicator size="large" />
              ) : (
                <>
                  <H4 className="text-lg font-PoppinsSemiBold text-center">
                    Your inventory is empty
                  </H4>
                  <P className="text-center text-gray-500">
                    Once you add an item to your inventory, it will appear here
                  </P>
                </>
              )}
            </View>
          }
          renderItem={({ item }) => <Item item={item} />}
          ItemSeparatorComponent={() => <Separator />}
        />
      </View>
    </StyledSafeAreaView>
  );
}

const getNotificationMessage = (notification: NotificationSchema) => {
  const { product } = notification;
  switch (notification.type) {
    case "low-stock":
      return (
        <Text>
          <Text className="font-PoppinsSemiBold">{product.name}</Text> is running low. Please
          consider placing a reorder.
        </Text>
      );
    case "expired-drug":
      return (
        <Text>
          The drug <Text className="font-PoppinsSemiBold">{product.name}</Text> has expired on{" "}
          {new Date(notification.expiredDate ?? product.expiryDate).toLocaleDateString()}.
        </Text>
      );
    case "review":
      return (
        <Text>
          <Text className="font-PoppinsSemiBold">{product.name}</Text> has received a review.
        </Text>
      );
    case "out-of-stock":
      return (
        <Text>
          <Text className="font-PoppinsSemiBold">{product.name}</Text> is out of stock. Please
          update inventory or consider placing an order.
        </Text>
      );
    default:
      return <Text />;
  }
};
const getNotificationTitle = (type: NotificationSchema["type"]) => {
  const messages = {
    "low-stock": "Low Stock",
    "expired-drug": "Expired Drug",
    review: "Review",
    "out-of-stock": "Out of Stock",
  };

  return messages[type];
};

const getNotificationIcon = (type: NotificationSchema["type"]) => {
  const icons: Record<NotificationSchema["type"], React.ComponentProps<typeof Feather>["name"]> = {
    "low-stock": "arrow-down",
    "expired-drug": "alert-octagon",
    review: "user-check",
    "out-of-stock": "x-square",
  };
  return icons[type];
};
