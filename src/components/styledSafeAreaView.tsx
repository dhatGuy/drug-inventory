import { SafeAreaView } from "react-native-safe-area-context";
import { useStyles } from "react-native-unistyles";

export const StyledSafeAreaView = ({ children }: any) => {
  const { theme } = useStyles();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.colors.background }}>
      {children}
    </SafeAreaView>
  );
};
