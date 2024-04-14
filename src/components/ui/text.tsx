import React, { ReactNode } from "react";
import { Text as RNText, TextProps as RNTextProps } from "react-native";
import { useStyles } from "react-native-unistyles";

const TextClassContext = React.createContext({});

interface TextProps extends RNTextProps {
  asChild?: boolean;
  style?: React.ComponentProps<typeof RNText>["style"];
}

/**
 * Renders a text component with specified styles and properties.
 * @param {boolean} asChild - TODO: Flag indicating if the text is a child element.
 * @param {style} style - Custom style for the text.
 * @return {ReactNode} Rendered text component.
 */
const Text = ({ asChild = false, style, ...props }: TextProps): ReactNode => {
  const textStyles = React.useContext(TextClassContext);
  const { theme } = useStyles();

  // const Component = asChild ? Slot.Text : RNText;
  return <RNText style={[theme.components.text, textStyles, style]} {...props} />;
};
Text.displayName = "Text";

export { Text, TextClassContext };
