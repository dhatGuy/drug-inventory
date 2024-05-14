import { Feather } from "@expo/vector-icons";
import { ActivityIndicator, FlatList, View } from "react-native";

import { StyledSafeAreaView } from "~/components";
import { Button, Text } from "~/components/ui";
import { Separator } from "~/components/ui/separator";
import { useGetNotificationByProduct } from "~/hooks/notification.hook";

export default function ItemNotifications({ navigation, route }) {
  const { id } = route.params;
  const { data: notifications, isLoading, isError } = useGetNotificationByProduct(id);

  if (isLoading) {
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
            style={{ height: "auto", width: "auto" }}
            className="flex-row items-center p-0.5"
            onPress={() => navigation.goBack()}>
            <Feather name="chevron-left" size={24} />
          </Button>
          <Text className="native:text-lg">Item Notifications</Text>
        </View>

        <Button variant="ghost" size="icon">
          <Feather name="settings" size={20} />
        </Button>
      </View>

      <Separator className="" />

      <View>
        <FlatList
          data={notifications?.documents}
          renderItem={({ item }) => (
            <View className="flex-row gap-4 px-2 py-4">
              <View
                className="size-12 flex-row items-center justify-center gap-1 rounded-full
                  bg-green-400">
                <Feather color="#fff" name="bell" size={20} />
              </View>

              <View className="flex-1">
                <Text className="text-sm text-gray-400">3 minutes ago</Text>
                <Text className="text-lg">Low stock level reached for {route.params?.id}</Text>
              </View>

              <Button variant="ghost" size="icon">
                <Feather name="chevron-right" size={20} />
              </Button>
            </View>
          )}
          ItemSeparatorComponent={() => <Separator />}
        />
      </View>
    </StyledSafeAreaView>
  );
}
