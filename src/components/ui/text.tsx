import React from "react";
import { Text as RNText } from "react-native";

const TextClassContext = React.createContext({});

const Text = ({ asChild = false, ...props }) => {
  const textStyles = React.useContext(TextClassContext);
  // const Component = asChild ? Slot.Text : RNText;
  return <RNText style={[textStyles, props.style]} {...props} />;
};
Text.displayName = "Text";

export { Text, TextClassContext };
