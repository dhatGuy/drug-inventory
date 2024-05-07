import FeatherIcon from "@expo/vector-icons/Feather";
import { Link } from "@react-navigation/native";
import { useState } from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { StyledSafeAreaView } from "~/components";
import { Button, Input, Text } from "~/components/ui";
import { Label } from "~/components/ui/label";
import { H2 } from "~/components/ui/typography";

export default function Signup({ navigation }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <StyledSafeAreaView>
      <KeyboardAwareScrollView>
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

        <View className="mb-6 shrink grow basis-0">
          <View className="mb-4">
            <Text nativeID="name" className="native:text-xl mb-2 font-PoppinsSemiBold">
              Full Name
            </Text>

            <Input
              clearButtonMode="while-editing"
              onChangeText={(name) => setForm({ ...form, name })}
              placeholder="John Doe"
              placeholderTextColor="#6b7280"
              value={form.name}
            />
          </View>

          <View className="mb-4">
            <Text nativeID="email" className="native:text-xl mb-2 font-PoppinsSemiBold">
              Email Address
            </Text>

            <Input
              autoCapitalize="none"
              autoCorrect={false}
              clearButtonMode="while-editing"
              keyboardType="email-address"
              onChangeText={(email) => setForm({ ...form, email })}
              placeholder="john@example.com"
              placeholderTextColor="#6b7280"
              value={form.email}
            />
          </View>

          <View className="mb-4">
            <Text nativeID="password" className="native:text-xl mb-2 font-PoppinsSemiBold">
              Password
            </Text>

            <Input
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={(password) => setForm({ ...form, password })}
              placeholder="********"
              placeholderTextColor="#6b7280"
              secureTextEntry
              value={form.password}
            />
          </View>

          <View className="mb-4">
            <Label nativeID="confirmPassword" className="native:text-xl mb-2 font-PoppinsSemiBold">
              Confirm Password
            </Label>

            <Input
              autoCorrect={false}
              clearButtonMode="while-editing"
              onChangeText={(confirmPassword) => setForm({ ...form, confirmPassword })}
              placeholder="********"
              placeholderTextColor="#6b7280"
              secureTextEntry
              value={form.confirmPassword}
            />
          </View>

          <View className="mb-4 mt-1">
            <Button
              onPress={() => {
                // handle onPress
              }}>
              <Text>Get Started</Text>
            </Button>
          </View>
        </View>
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
