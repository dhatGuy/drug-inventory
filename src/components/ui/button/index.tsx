import { ReactNode } from "react";
import {
  Pressable,
  PressableStateCallbackType,
  TextStyle,
  TouchableOpacityProps,
} from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { TextClassContext } from "../text";

type Variant = "primary" | "secondary" | "ghost" | "outline" | "destructive" | "link";

interface ButtonProps extends TouchableOpacityProps {
  variant?: Variant;
  style?: TouchableOpacityProps["style"];
  labelStyle?: TextStyle;
}

/**
 * Button component with variant, style, and labelStyle props.
 *
 * @param {Variant} variant - The button variant style.
 * @param {TouchableOpacityProps["style"]} style - The custom style for the button.
 * @param {TextStyle} labelStyle - The style for the button label.
 * @returns {ReactNode} The Button component.
 */
const Button = ({ variant = "primary", style, labelStyle, ...rest }: ButtonProps): ReactNode => {
  const { styles } = useStyles(stylesheet, {
    bg: variant,
  });
  const buttonStyles = ({ pressed }: PressableStateCallbackType) => [
    styles.button,
    style,
    pressed && { opacity: 0.5 },
  ];
  const textStyles = [styles.text, labelStyle];

  return (
    <TextClassContext.Provider value={textStyles}>
      <Pressable {...rest} style={buttonStyles}>
        {rest.children}
      </Pressable>
    </TextClassContext.Provider>
  );
};

const stylesheet = createStyleSheet({
  button: {
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: "center",
    alignItems: "center",
    variants: {
      bg: {
        primary: {
          backgroundColor: "#000",
        },
        secondary: {
          backgroundColor: "#DEDEDE",
        },
        destructive: {
          backgroundColor: "#FF0000",
        },
        outline: {
          backgroundColor: "transparent",
          borderWidth: 1,
          borderColor: "#000",
        },
        ghost: {
          backgroundColor: "transparent",
        },
        link: {
          backgroundColor: "transparent",
        },
      },
    },
  },
  text: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    variants: {
      bg: {
        primary: {
          color: "#FFF",
        },
        secondary: {
          color: "#333",
        },
        destructive: {
          color: "#FFF",
        },
        outline: {
          color: "#000",
        },
        ghost: {
          color: "#000",
        },
        link: {
          color: "#3399FF",
          textDecorationLine: "underline",
        },
      },
    },
  },
});

export { Button };
