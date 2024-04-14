import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { StyledSafeAreaView } from "~/components";
import { Button, Input, Text } from "~/components/ui";

export default function Login({ navigation }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { styles } = useStyles(stylesheet);

  return (
    <StyledSafeAreaView>
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerIcon}>
            <MaterialIcons color="#075eec" name="inventory-2" size={44} />
          </View>

          <Text style={styles.title}>
            Welcome to <Text style={{ color: "#0742fc" }}>Emzor Inventory</Text>
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
      </View>
    </StyledSafeAreaView>
  );
}

const stylesheet = createStyleSheet({
  container: {
    padding: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  title: {
    fontSize: 27,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 6,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    fontWeight: "500",
    color: "#929292",
    textAlign: "center",
  },
  /** Header */
  header: {
    marginVertical: 36,
  },
  headerIcon: {
    alignSelf: "center",
    width: 80,
    height: 80,
    marginBottom: 36,
    backgroundColor: "#fff",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
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
    fontWeight: "700",
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
