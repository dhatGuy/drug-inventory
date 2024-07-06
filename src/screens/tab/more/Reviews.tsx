import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { StyledSafeAreaView } from "~/components";
import { Button, Input, Text } from "~/components/ui";
import { Avatar } from "~/components/ui/avatar";
import { H4 } from "~/components/ui/typography";
import { reviewsQueryOptions } from "~/lib/queryOptions";
import { getAvatarName } from "~/lib/utils";

const Reviews = () => {
  const { data } = useQuery(reviewsQueryOptions);
  const navigation = useNavigation();

  return (
    <StyledSafeAreaView className="!px-0">
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
          Drug Reviews
        </H4>
        <View />
      </View>

      <FlatList
        data={data?.documents ?? []}
        ListHeaderComponent={() => (
          <View className="bg-secondary text-primary-foreground py-4 mb-2 px-6">
            <View className="relative mt-4">
              <Feather
                name="search"
                className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground"
              />
              <Input
                placeholder="Search for drugs..."
                className="w-full pl-10 pr-4 py-2 rounded-md bg-primary-foreground/10
                  focus:outline-none focus:ring-2 focus:ring-primary-foreground
                  focus:bg-primary-foreground/20"
              />
            </View>
          </View>
        )}
        renderItem={({ item }) => (
          <View className="flex-row gap-4 px-2">
            <Avatar
              alt={item.user.name}
              className="size-12 items-center justify-center border border-gray-400 bg-green-700">
              <Text className="text-2xl text-white">{getAvatarName(item.user.name)}</Text>
            </Avatar>
            <View className="flex-1">
              <View className="flex-row items-center justify-between">
                <Text className="font-PoppinsSemiBold text-lg">{item.title}</Text>
              </View>
              <Text className="text-sm text-gray-500">by {item.user.name}</Text>
              <Text className="text-lg">{item.desc}</Text>
              <Text className="text-gray-500">{new Date(item.$createdAt).toDateString()}</Text>
            </View>
          </View>
        )}
      />
    </StyledSafeAreaView>
  );
};
export default Reviews;
