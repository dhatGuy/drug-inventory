import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { View } from "react-native";

import { StyledSafeAreaView } from "~/components";
import { Button, Input, Text } from "~/components/ui";
import { Label } from "~/components/ui/label";

export default function Login({ navigation }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  return (
    <StyledSafeAreaView>
      <View className="my-9">
        <View className="mb-9 size-20 items-center justify-center self-center">
          <MaterialIcons color="#075eec" name="inventory-2" size={44} />
        </View>

        <Text className="mb-1 text-center font-PoppinsBold text-[27px] text-[#1d1d1d]">
          Welcome to <Text className="text-blue-900">Emzor Inventory</Text>
        </Text>

        <Text className="text-center text-gray-500">
          Manage your drug inventory with ease and efficiency
        </Text>
      </View>

      <View className="gap-4">
        <View className="gap-1">
          <Label nativeID="email">Email address</Label>

          <Input
            aria-labelledby="email"
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            onChangeText={(email) => setForm({ ...form, email })}
            placeholder="Email address"
            className="rounded-xl"
            value={form.email}
          />
        </View>

        <View className="gap-1">
          <Label nativeID="password">Password</Label>

          <Input
            aria-labelledby="password"
            autoCorrect={false}
            onChangeText={(password) => setForm({ ...form, password })}
            placeholder="*********"
            className="rounded-xl"
            secureTextEntry
            value={form.password}
          />
        </View>

        <View className="mt-6 gap-3">
          <Button
            onPress={() => {
              // handle onPress
            }}>
            <Text>Sign in</Text>
          </Button>

          <Button
            variant="outline"
            onPress={() => {
              navigation.navigate("Signup");
            }}>
            <Text>Sign up</Text>
          </Button>
        </View>
      </View>
    </StyledSafeAreaView>
  );
}
