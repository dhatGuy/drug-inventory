import { MaterialIcons } from "@expo/vector-icons";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@react-navigation/native";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ActivityIndicator, View } from "react-native";
import { AppwriteException } from "react-native-appwrite/src";

import { StyledSafeAreaView } from "~/components";
import RHFInput from "~/components/rhfInput";
import { Button, Text } from "~/components/ui";
import { Label } from "~/components/ui/label";
import { H1, P } from "~/components/ui/typography";
import { useLoginUser } from "~/hooks/auth";
import { LoginSchema } from "~/lib/validation";
import { useUserActions } from "~/store/authStore";

export default function Login({ navigation }) {
  const formMethods = useForm<LoginSchema>({
    resolver: zodResolver(LoginSchema),
  });
  const loginUserMutation = useLoginUser();
  const { hydrate } = useUserActions();

  const [serverError, setServerError] = useState("");

  const onSubmit: SubmitHandler<LoginSchema> = async (data) => {
    setServerError("");

    loginUserMutation.mutate(data, {
      onError: (error) => {
        if (error instanceof AppwriteException) {
          console.log("🚀 ~ onSubmit ~ error:", error.type);
          if (error.type === "user_invalid_credentials") {
            setServerError("Invalid credentials");
          } else if (error.type === "user_session_already_exists") {
            hydrate();
          } else {
            setServerError("An unknown error occurred");
          }
        } else {
          setServerError("An unknown error occurred");
        }
      },
    });
  };

  return (
    <StyledSafeAreaView className="pt-0">
      <View className="my-9">
        <View className="mb-9 size-20 items-center justify-center self-center">
          <MaterialIcons color="#075eec" name="inventory-2" size={44} />
        </View>

        <H1 className="mb-1 text-center text-[#1d1d1d]">
          Welcome to <H1 className="text-blue-900">Emzor Inventory</H1>
        </H1>

        <Text className="text-center text-gray-500">
          Manage your drug inventory with ease and efficiency
        </Text>
      </View>

      <FormProvider {...formMethods}>
        <View className="gap-4">
          <View className="gap-1">
            <Label nativeID="email">Email address</Label>

            <RHFInput
              name="email"
              aria-labelledby="email"
              autoCapitalize="none"
              autoCorrect={false}
              keyboardType="email-address"
              placeholder="Email address"
              className="rounded-xl"
            />
          </View>

          <View className="gap-1">
            <Label nativeID="password">Password</Label>

            <RHFInput
              name="password"
              aria-labelledby="password"
              autoCorrect={false}
              placeholder="*********"
              className="rounded-xl"
              secureTextEntry
            />
          </View>
          {serverError && <P className="text-red-500">{serverError}</P>}

          <View className="mt-6 gap-3">
            <Button
              onPress={formMethods.handleSubmit(onSubmit)}
              className="flex-row items-center justify-center gap-2"
              disabled={loginUserMutation.isPending}>
              {loginUserMutation.isPending && <ActivityIndicator />}
              <Text className="text-white">Sign in</Text>
            </Button>

            <Text className="text-center">
              Don't have an account?{" "}
              <Link to="/Signup">
                <Text className="underline">Sign up</Text>
              </Link>
            </Text>
          </View>
        </View>
      </FormProvider>
    </StyledSafeAreaView>
  );
}
