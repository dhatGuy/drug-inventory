import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ActivityIndicator, ScrollView, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";

import { StyledSafeAreaView } from "~/components";
import LinkButton from "~/components/LinkButton";
import { Button, Text } from "~/components/ui";
import { Avatar } from "~/components/ui/avatar";
import { Badge } from "~/components/ui/badge";
import { getAvatarName } from "~/lib/utils";
import { useUser, useUserActions } from "~/store/authStore";

export default function Settings() {
  const user = useUser();
  const { signOut } = useUserActions();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: signOut,
    onSuccess: () => {
      queryClient.clear();
    },
    onError: () => {
      Toast.show({
        text1: "Error occurred while signing out",
        type: "error",
      });
    },
  });

  const handleSignOut = () => {
    if (!mutation.isPending) mutation.mutate();
  };

  return (
    <StyledSafeAreaView className="!p-0">
      <View>
        <ScrollView>
          <View>
            <Text className="m-2 ml-3 font-PoppinsMedium uppercase text-muted-foreground">
              Account
            </Text>
            <View className="mx-3 rounded-md">
              <TouchableOpacity className="flex-row items-center justify-start gap-2 p-3">
                <Avatar
                  alt="Profile"
                  className="size-14 items-center justify-center border border-gray-400 bg-green-700">
                  <Text className="text-2xl text-white">{getAvatarName(user?.name!)}</Text>
                </Avatar>

                <View className="">
                  <Text className="text-xl">{user?.name}</Text>
                  <Badge variant="secondary" className="self-start">
                    <Text>{user?.labels[0]?.toUpperCase() ?? "CUSTOMER"}</Text>
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
                variant="secondary"
                to="/Reviews"
                className="flex-row items-center justify-start gap-2 p-3"
                style={{ flex: 1 }}>
                <Text className="text-xl text-black">Reviews</Text>
              </LinkButton>
              {user?.labels.includes("admin") || user?.labels.includes("nafdac") ? (
                <LinkButton
                  to="/Reports"
                  variant="secondary"
                  className="flex-row items-center justify-start gap-2 p-3">
                  <Text className="text-xl text-black">Reports</Text>
                </LinkButton>
              ) : (
                <LinkButton
                  to="/NewReport"
                  variant="secondary"
                  className="flex-row items-center justify-start gap-2 p-3">
                  <Text className="text-xl text-black">Report Fake Drug</Text>
                </LinkButton>
              )}
              <Button
                onPress={handleSignOut}
                variant="secondary"
                className="flex-row items-center justify-start gap-2 p-3">
                {mutation.isPending && <ActivityIndicator color="black" />}
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
