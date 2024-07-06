import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { FlatList, View } from "react-native";
import { StyledSafeAreaView } from "~/components";
import { Button, Text } from "~/components/ui";
import { Avatar } from "~/components/ui/avatar";
import { H4 } from "~/components/ui/typography";
import { drugReportQueryOptions } from "~/lib/queryOptions";
import { getAvatarName } from "~/lib/utils";

export default function Reports() {
  const navigation = useNavigation();
  const { data } = useQuery(drugReportQueryOptions);

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
            Drug Reports
          </H4>
          <View />
        </View>
      </View>

      <View className="flex-1">
        <FlatList
          data={data?.documents}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <View className="flex-row gap-4 px-2">
              <Avatar
                alt={item.user.name}
                className="size-12 items-center justify-center border border-gray-400 bg-green-700">
                <Text className="text-2xl text-white">{getAvatarName(item.user.name)}</Text>
              </Avatar>
              <View className="flex-1">
                <View className="flex-row items-center justify-between">
                  <Text className="font-PoppinsSemiBold text-lg">
                    {item.product.name} | {item.masNumber}
                  </Text>
                </View>
                <Text className="text-sm text-gray-500">by {item.user.name}</Text>
                <Text className="text-lg">{item.comment}</Text>
                <Text className="text-gray-500">{new Date(item.$createdAt).toDateString()}</Text>
              </View>
            </View>
          )}
        />
      </View>
    </StyledSafeAreaView>
  );
}
