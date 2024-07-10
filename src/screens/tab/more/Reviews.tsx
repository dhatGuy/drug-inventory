import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { ActivityIndicator, TextInput, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { StyledSafeAreaView } from "~/components";
import { Button, Input, Text } from "~/components/ui";
import { Avatar } from "~/components/ui/avatar";
import { Separator } from "~/components/ui/separator";
import { H4 } from "~/components/ui/typography";
import { reviewsQueryOptions } from "~/lib/queryOptions";
import { formattedDate, getAvatarName } from "~/lib/utils";

const Reviews = () => {
  const { data, isPending } = useQuery(reviewsQueryOptions);
  const searchRef = React.useRef<TextInput>(null);
  const [search, setSearch] = React.useState("");
  const [focused, setFocused] = React.useState(false);
  const navigation = useNavigation();

  const renderItem = ({ item }) => {
    return (
      <View className="flex-row gap-4 px-2">
        <Avatar
          alt={item.user.name}
          className="size-12 items-center justify-center border border-gray-400 bg-green-700">
          <Text className="text-2xl text-white">{getAvatarName(item.user.name)}</Text>
        </Avatar>
        <View className="flex-1">
          <Text className="font-PoppinsSemiBold text-lg">{item.title}</Text>
          <Text className="text-gray-600">{item.desc}</Text>
          <View className="flex-row items-center justify-between gap-2 mt-2">
            <H4 className="text-base">
              by {item.user.name} on {item.product.name}
            </H4>

            <H4 className="text-gray-500 text-base">
              {formattedDate(new Date(item.$createdAt), true)}
            </H4>
          </View>
        </View>
      </View>
    );
  };

  const ListHeader = () => {
    return (
      <View className="relative mb-4">
        <View className="absolute inset-y-0 left-0 z-10 size-[40] h-full items-center justify-center">
          <Feather color="#121A26" name="search" size={19} />
        </View>

        <Input
          ref={searchRef}
          autoCapitalize="words"
          placeholder="Item name..."
          placeholderTextColor="#778599"
          clearButtonMode="always"
          inputMode="search"
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          value={search}
          onChangeText={setSearch}
          className="rounded-lg bg-white pl-10 pr-11 shadow-lg shadow-black/5"
        />

        {focused ? (
          <Button
            variant="ghost"
            onPress={() => {
              searchRef.current?.blur();
              setSearch("");
            }}
            size="icon"
            className="absolute inset-y-0 right-0 my-auto h-full">
            <Feather name="x" size={24} />
          </Button>
        ) : null}
      </View>
    );
  };

  return (
    <StyledSafeAreaView className="!px-2 gap-3">
      <View className="flex-row items-center justify-between">
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
      <Separator />
      <FlatList
        data={data?.documents ?? []}
        // ListHeaderComponent={ListHeader}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <Separator className="my-2" />}
        ListEmptyComponent={
          <View className="items-center flex-1 justify-center">
            {isPending ? (
              <ActivityIndicator size="large" />
            ) : (
              <>
                <H4 className="text-lg font-PoppinsSemiBold text-center">No reviews yet</H4>
              </>
            )}
          </View>
        }
      />
    </StyledSafeAreaView>
  );
};
export default Reviews;
