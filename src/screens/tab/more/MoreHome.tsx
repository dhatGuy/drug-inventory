import { ScrollView, TouchableOpacity, View } from "react-native";

import { StyledSafeAreaView } from "~/components";
import { Text } from "~/components/ui";
import { Avatar } from "~/components/ui/avatar";
import { getAvatarName } from "~/lib/utils";
import { useUser } from "~/store/authStore";

export default function Example() {
  const user = useUser();

  return (
    <StyledSafeAreaView className="!p-0">
      <View>
        <ScrollView>
          <View>
            <Text className="m-2 ml-3 font-PoppinsMedium uppercase text-muted-foreground">
              Account
            </Text>
            <View className="mx-3 rounded-md">
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                className="flex-row items-center justify-start gap-2 p-3">
                <Avatar
                  alt="Profile"
                  className="size-12 items-center justify-center border border-gray-400 bg-green-700">
                  <Text className="text-2xl text-white">{getAvatarName(user?.name!)}</Text>
                </Avatar>

                <View className="">
                  <Text className="text-xl">{user?.name}</Text>

                  <Text className="text-lg text-gray-500">{user?.email}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View className="py-3">
            <Text className="m-2 ml-3 font-PoppinsMedium uppercase text-muted-foreground">
              General
            </Text>
          </View>

          <View className="py-3" />
        </ScrollView>
      </View>
    </StyledSafeAreaView>
  );
}
