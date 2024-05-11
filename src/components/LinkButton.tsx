import { useLinkProps } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { Text } from "./ui";

const LinkButton = ({ to, action, children, ...rest }) => {
  const { onPress, ...props } = useLinkProps({ to, action });

  return (
    <TouchableOpacity onPress={onPress} {...props} {...rest}>
      <Text>{children}</Text>
    </TouchableOpacity>
  );
};

export default LinkButton;
