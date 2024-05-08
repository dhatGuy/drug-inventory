import FeatherIcon from "@expo/vector-icons/Feather";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "@react-navigation/native";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ActivityIndicator, View } from "react-native";
import { AppwriteException } from "react-native-appwrite/src";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { StyledSafeAreaView } from "~/components";
import RHFInput from "~/components/rhfInput";
import { Button, Text } from "~/components/ui";
import { Label } from "~/components/ui/label";
import { H2, P } from "~/components/ui/typography";
import { useCreateUser } from "~/hooks/auth";
import { SignupSchema } from "~/lib/validation";

export default function Signup({ navigation }) {
  const [serverError, setServerError] = useState("");
  const formMethods = useForm<SignupSchema>({
    resolver: zodResolver(SignupSchema),
  });

  const createUserMutation = useCreateUser();

  const onSubmit: SubmitHandler<SignupSchema> = async (data) => {
    setServerError("");

    const { confirmPassword, ...formValues } = data;
    createUserMutation.mutate(formValues, {
      // onSuccess: (data) => console.log("🚀 ~ onSubmit ~ data:", data),
      onError: (error) => {
        if (error instanceof AppwriteException) {
          if (error.type === "user_already_exists") {
            formMethods.setError("email", { message: "User already exists" });
          }
        } else {
          setServerError("An unknown error occurred");
        }
      },
    });
  };

  return (
    <StyledSafeAreaView className="pt-0">
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View className="mb-6 items-start justify-start">
          <Button
            variant="ghost"
            className="native:p-2 -ml-6 mb-2"
            onPress={() => navigation.goBack()}>
            <FeatherIcon color="#1D2A32" name="chevron-left" size={30} />
          </Button>

          <H2>Let's Get Started!</H2>

          <Text className="text-gray-500">
            Fill in the fields below to get started with your new account.
          </Text>
        </View>

        <FormProvider {...formMethods}>
          <View className="mb-6 shrink grow basis-0">
            <View className="mb-4">
              <Text nativeID="name" className="native:text-xl mb-2 font-PoppinsSemiBold">
                Full Name
              </Text>

              <RHFInput
                name="name"
                clearButtonMode="while-editing"
                placeholder="John Doe"
                placeholderTextColor="#6b7280"
              />
            </View>

            <View className="mb-4">
              <Text nativeID="email" className="native:text-xl mb-2 font-PoppinsSemiBold">
                Email Address
              </Text>

              <RHFInput
                name="email"
                autoCapitalize="none"
                autoCorrect={false}
                clearButtonMode="while-editing"
                keyboardType="email-address"
                placeholder="john@example.com"
                placeholderTextColor="#6b7280"
              />
            </View>

            <View className="mb-4">
              <Text nativeID="password" className="native:text-xl mb-2 font-PoppinsSemiBold">
                Password
              </Text>

              <RHFInput
                name="password"
                autoCorrect={false}
                clearButtonMode="while-editing"
                placeholder="********"
                placeholderTextColor="#6b7280"
                secureTextEntry
              />
            </View>

            <View className="mb-4">
              <Label
                nativeID="confirmPassword"
                className="native:text-xl mb-2 font-PoppinsSemiBold">
                Confirm Password
              </Label>

              <RHFInput
                name="confirmPassword"
                autoCorrect={false}
                clearButtonMode="while-editing"
                placeholder="********"
                placeholderTextColor="#6b7280"
                secureTextEntry
              />
            </View>

            {serverError && <P className="text-red-500">{serverError}</P>}

            <View className="mb-4 mt-1">
              <Button
                onPress={formMethods.handleSubmit(onSubmit)}
                className="flex-row items-center justify-center gap-2"
                disabled={createUserMutation.isPending}>
                {createUserMutation.isPending && <ActivityIndicator />}
                <Text className="text-white">Get Started</Text>
              </Button>
            </View>
          </View>
        </FormProvider>
      </KeyboardAwareScrollView>

      <Text className="mt-auto text-center font-PoppinsSemiBold">
        Already have an account?{" "}
        <Link to="/Login" style={{ textDecorationLine: "underline" }}>
          Sign in
        </Link>
      </Text>
    </StyledSafeAreaView>
  );
}
