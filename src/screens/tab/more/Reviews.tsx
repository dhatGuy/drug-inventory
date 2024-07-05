import { Feather } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { StyledSafeAreaView } from "~/components";
import { Input, Text } from "~/components/ui";
import { H1, H2, H3 } from "~/components/ui/typography";
import { reviewsQueryOptions } from "~/lib/queryOptions";

const Reviews = () => {
  const { data } = useQuery(reviewsQueryOptions);

  return (
    <StyledSafeAreaView>
      <FlatList
        data={data?.documents ?? []}
        ListHeaderComponent={() => (
          <View className="bg-secondary text-primary-foreground py-4 px-6">
            <H1 className="text-2xl font-bold">Drug Reviews</H1>
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
          <View className="bg-background rounded-lg shadow-md p-4">
            <View className="flex-row items-center justify-between">
              <H2 className="text-lg font-bold">{item.product.name}</H2>
              <Text className="text-sm text-muted-foreground">- {item.user.name}</Text>
            </View>
            <View className="flex-row items-center gap-2">
              <Feather name="star" className="w-5 h-5 fill-primary" />
              <Feather name="star" className="w-5 h-5 fill-primary" />
              <Feather name="star" className="w-5 h-5 fill-primary" />
              <Feather name="star" className="w-5 h-5 fill-muted stroke-muted-foreground" />
              <Feather name="star" className="w-5 h-5 fill-muted stroke-muted-foreground" />
              <Text className="text-sm text-muted-foreground">3.2</Text>
            </View>
            <H3 className="text-lg font-bold mt-4">{item.title}</H3>
            <Text className="mt-2 text-muted-foreground">{item.desc}</Text>
          </View>
        )}
      />
    </StyledSafeAreaView>
  );
};
export default Reviews;
