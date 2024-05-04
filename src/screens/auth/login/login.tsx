import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { Text, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { StyledSafeAreaView } from "~/components";
import { Button, Input } from "~/components/ui";

export default function Login({ navigation }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { styles } = useStyles(stylesheet);

  return (
    <StyledSafeAreaView>
      <View className="my-9">
        <View className="mb-9 size-20 items-center justify-center self-center">
          <MaterialIcons color="#075eec" name="inventory-2" size={44} />
        </View>

        <Text className="text-center text-[27px] font-bold">
          Welcome to <Text className="text-blue-900">Emzor Inventory</Text>
        </Text>

        <Text style={styles.subtitle}>Manage your drug inventory with ease and efficiency</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.input}>
          <Text style={styles.inputLabel}>Email address</Text>

          <Input
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            onChangeText={(email) => setForm({ ...form, email })}
            placeholder=""
            placeholderTextColor="#6b7280"
            style={styles.inputControl}
            value={form.email}
          />
        </View>

        <View style={styles.input}>
          <Text style={styles.inputLabel}>Password</Text>

          <Input
            autoCorrect={false}
            onChangeText={(password) => setForm({ ...form, password })}
            placeholder=""
            placeholderTextColor="#6b7280"
            style={styles.inputControl}
            secureTextEntry
            value={form.password}
          />
        </View>

        <View style={styles.formAction}>
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

const stylesheet = createStyleSheet({
  title: {
    fontSize: 27,
    fontFamily: "Poppins_700Bold",
    color: "#1d1d1d",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#929292",
    textAlign: "center",
  },
  /** Form */
  form: {
    gap: 15,
  },
  /** Input */
  input: {
    gap: 5,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: "Poppins_600SemiBold",
  },
  inputControl: {
    height: 80,
    backgroundColor: "#fff",
    paddingLeft: 10,
    borderRadius: 12,
    fontWeight: "500",
    color: "#222",
  },
  /** Action */
  formAction: {
    marginTop: 24,
    gap: 10,
  },
});
