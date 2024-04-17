import { SafeAreaView } from "react-native-safe-area-context";
import { useStyles } from "react-native-unistyles";

interface StyledSafeAreaViewProps extends React.ComponentProps<typeof SafeAreaView> {
  children: React.ReactNode;
}
export const StyledSafeAreaView = ({ children, ...props }: StyledSafeAreaViewProps) => {
  const { theme } = useStyles();
  const style = [{ flex: 1, backgroundColor: theme.colors.background }, props.style];

  return <SafeAreaView style={style}>{children}</SafeAreaView>;
};
