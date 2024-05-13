import { Feather } from "@expo/vector-icons";
import { FlatList, View } from "react-native";

import { StyledSafeAreaView } from "~/components";
import { Button, Text } from "~/components/ui";
import { Avatar } from "~/components/ui/avatar";
import { Separator } from "~/components/ui/separator";
const Reviews = ({ navigation }) => {
  return (
    <StyledSafeAreaView>
      <View className="flex-row items-center justify-between px-2">
        <View className="flex-row items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            style={{ height: "auto" }}
            className="flex-row items-center p-2"
            onPress={() => navigation.goBack()}>
            <Feather name="chevron-left" size={24} />
          </Button>
          <Text className="native:text-lg">Item Reviews</Text>
        </View>
      </View>

      <Separator className="mb-4" />

      <FlatList
        data={Array.from({ length: 20 }).map((_, i) => i + 1)}
        renderItem={({ item }) => (
          <View className="flex-row gap-2 px-2">
            <Avatar
              alt="Zach Nugent's Avatar"
              className="size-12 items-center justify-center border border-gray-400 bg-green-700">
              <Text className="text-2xl text-white">ZN</Text>
            </Avatar>
            <View>
              <Text className="font-PoppinsSemiBold text-lg">Main title</Text>
              <Text className="text-sm text-gray-500">by Martins Odegaard</Text>
              <Text className="">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt quia quae
                dignissimos rem incidunt, reiciendis aut perspiciatis blanditiis molestias officiis
                ducimus fugiat non nobis distinctio suscipit ea illo odit porro. Sed quisquam esse
                perspiciatis praesentium vitae fugit asperiores, ea, ratione deserunt officiis non
                enim similique dolor fuga necessitatibus, ipsam culpa sunt? Harum quos iure dolorum
                sint voluptatem consequuntur pariatur veritatis, nisi dolor amet. Fuga
                necessitatibus ipsa odit iste tempora consequuntur. Minus nobis expedita quidem.
                Modi dignissimos aut minima accusamus odio.
              </Text>
            </View>
          </View>
        )}
        ItemSeparatorComponent={() => <Separator className="my-2" />}
      />
    </StyledSafeAreaView>
  );
};
export default Reviews;
