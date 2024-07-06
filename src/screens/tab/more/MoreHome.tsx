import { useNavigation } from "@react-navigation/native";
import { ScrollView, TouchableOpacity, View } from "react-native";

import { StyledSafeAreaView } from "~/components";
import LinkButton from "~/components/LinkButton";
import { Button, Text } from "~/components/ui";
import { Avatar } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { getAvatarName } from "~/lib/utils";
import { useUser } from "~/store/authStore";

export default function Settings() {
  const user = useUser();
  const navigation = useNavigation();

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
                  className="size-14 items-center justify-center border border-gray-400 bg-green-700">
                  <Text className="text-2xl text-white">{getAvatarName(user?.name!)}</Text>
                </Avatar>

                <View className="">
                  <Text className="text-xl">{user?.name}</Text>
                  <Badge variant="secondary" className="self-start">
                    <Text>{user?.labels[0] ?? "Customer"}</Text>
                  </Badge>
                  <Text className="text-lg text-gray-500">{user?.email}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>

          <View className="py-3">
            <Text className="m-2 ml-3 font-PoppinsMedium uppercase text-muted-foreground">
              General
            </Text>

            <View className="mx-3 rounded-md flex gap-6">
              <LinkButton
                to="/Settings"
                variant="secondary"
                className="flex-row items-center justify-start gap-2 p-3">
                <Text className="text-xl text-black">Settings</Text>
              </LinkButton>
              <LinkButton
                variant="secondary"
                // to={{ screen: "MoreTab", params: { screen: "Reviews" } }}
                to="/Reviews"
                className="flex-row items-center justify-start gap-2 p-3"
                style={{ flex: 1 }}>
                <Text className="text-xl text-black">Reviews</Text>
              </LinkButton>
              <LinkButton
                to="/Reports"
                variant="secondary"
                className="flex-row items-center justify-start gap-2 p-3">
                <Text className="text-xl text-black">Reports</Text>
              </LinkButton>
              <LinkButton
                to="/NewReport"
                variant="secondary"
                className="flex-row items-center justify-start gap-2 p-3">
                <Text className="text-xl text-black">Report Fake Drug</Text>
              </LinkButton>
              <Button
                onPress={() => {
                  // handle onPress
                }}
                variant="secondary"
                className="flex-row items-center justify-start gap-2 p-3">
                <Text className="text-xl text-black">Log Out</Text>
              </Button>
            </View>
          </View>

          <View className="py-3" />
        </ScrollView>
      </View>
    </StyledSafeAreaView>
  );
}
