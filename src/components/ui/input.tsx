import { MaterialCommunityIcons } from "@expo/vector-icons";
import { forwardRef, useState } from "react";
import { TextInput, View, ViewStyle } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { Button } from "./button";

type Variant = "default" | "error";
export interface InputProps extends React.ComponentPropsWithoutRef<typeof TextInput> {
  style?: TextInput["props"]["style"];
  containerStyles?: ViewStyle;
}
const Input = forwardRef<React.ElementRef<typeof TextInput>, InputProps>(
  ({ style, containerStyles, ...props }, ref) => {
    const { styles } = useStyles(stylesheet, {});
    const parentStyle = [styles.container, containerStyles];

    const [show, setShow] = useState(false);

    return (
      <View style={parentStyle}>
        <TextInput style={[style, styles.input]} ref={ref} {...props} secureTextEntry={!show} />
        {props.secureTextEntry && (
          <Button
            variant="ghost"
            style={{
              position: "absolute",
              right: 3,
              top: 0,
              bottom: 0,
              paddingHorizontal: 8,
            }}
            onPress={() => {
              setShow(!show);
            }}>
            {show ? (
              <MaterialCommunityIcons size={18} color="gray" name="eye-off" />
            ) : (
              <MaterialCommunityIcons size={18} color="gray" name="eye" />
            )}
          </Button>
        )}
      </View>
    );
  }
);

const stylesheet = createStyleSheet((theme) => ({
  container: {
    flexDirection: "column",
    gap: 8,
    justifyContent: "center",
  },
  input: {
    height: "auto",
    fontFamily: "Poppins_500Medium",
    paddingVertical: 12,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 12,
    fontSize: 15,
    fontWeight: "500",
    color: "#222",
    borderWidth: 1,
    borderColor: "#C9D3DB",
    borderStyle: "solid",
    variants: {
      input: {
        outlined: {
          backgroundColor: "transparent",
          borderColor: "#c0c0c0",
          borderRadius: 12,
          borderWidth: 1,
        },
      },
    },
  },
}));

export { Input };
