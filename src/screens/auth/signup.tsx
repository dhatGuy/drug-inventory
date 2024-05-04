import FeatherIcon from "@expo/vector-icons/Feather";
import { useState } from "react";
import { View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { StyledSafeAreaView } from "~/components";
import { Button, Input, Text } from "~/components/ui";

export default function Signup({ navigation }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { styles } = useStyles(stylesheet);

  return (
    <StyledSafeAreaView>
      <View style={styles.container}>
        <KeyboardAwareScrollView>
          <View style={styles.header}>
            <Button variant="ghost" style={styles.headerBack} onPress={() => navigation.goBack()}>
              <FeatherIcon color="#1D2A32" name="chevron-left" size={30} />
            </Button>

            <Text style={styles.title}>Let's Get Started!</Text>

            <Text style={styles.subtitle}>
              Fill in the fields below to get started with your new account.
            </Text>
          </View>

          <View style={styles.form}>
            <View style={styles.input}>
              <Text style={styles.inputLabel}>Full Name</Text>

              <Input
                clearButtonMode="while-editing"
                onChangeText={(name) => setForm({ ...form, name })}
                placeholder="John Doe"
                placeholderTextColor="#6b7280"
                value={form.name}
              />
            </View>

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Email Address</Text>

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

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Password</Text>

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

            <View style={styles.input}>
              <Text style={styles.inputLabel}>Confirm Password</Text>

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

            <View style={styles.formAction}>
              <Button
                onPress={() => {
                  // handle onPress
                }}>
                <Text>Get Started</Text>
              </Button>
            </View>
          </View>
        </KeyboardAwareScrollView>

        <Button
          variant="link"
          onPress={() => navigation.navigate("Login")}
          style={{ marginTop: "auto" }}>
          <Text style={styles.formFooter}>
            Already have an account?{" "}
            <Text style={{ textDecorationLine: "underline" }}>Sign in</Text>
          </Text>
        </Button>
      </View>
    </StyledSafeAreaView>
  );
}

const stylesheet = createStyleSheet({
  // container: {
  //   paddingVertical: 24,
  //   paddingHorizontal: 0,
  //   flexGrow: 1,
  //   flexShrink: 1,
  //   flexBasis: 0,
  // },
  title: {
    fontSize: 31,
    fontFamily: "Poppins_700Bold",
    color: "#1D2A32",
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 15,
    color: "#929292",
  },
  /** Header */
  header: {
    alignItems: "flex-start",
    justifyContent: "flex-start",
    marginBottom: 24,
    paddingHorizontal: 24,
  },
  headerBack: {
    paddingVertical: 8,
    paddingHorizontal: 8,
    borderColor: "black",
    padding: 8,
    marginLeft: -16,
    marginBottom: 6,
  },
  /** Form */
  form: {
    marginBottom: 24,
    paddingHorizontal: 24,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  formAction: {
    marginTop: 4,
    marginBottom: 16,
  },
  formFooter: {
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
    color: "#222",
    textAlign: "center",
    letterSpacing: 0.15,
  },
  /** Input */
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 17,
    fontFamily: "Poppins_600SemiBold",
    color: "#222",
    marginBottom: 8,
  },
});
