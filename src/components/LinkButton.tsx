import { useLinkProps } from "@react-navigation/native";

import { To } from "@react-navigation/native/lib/typescript/src/useLinkTo";
import { Button, Text } from "./ui";

type LinkButtonProps = {
  to: To<ReactNavigation.RootParamList>;
  action?:
    | Readonly<{
        type: string;
        payload?: object | undefined;
        source?: string | undefined;
        target?: string | undefined;
      }>
    | undefined;
  children: React.ReactNode;
} & React.ComponentProps<typeof Button>;

const LinkButton = ({ to, action, children, ...rest }: LinkButtonProps) => {
  const { onPress, ...props } = useLinkProps({ to, action });

  return (
    <Button onPress={onPress} {...props} {...rest}>
      <Text>{children}</Text>
    </Button>
  );
};

export default LinkButton;
