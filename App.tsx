import "~/global.css";

import { Theme, ThemeProvider } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-gesture-handler";

import ErrorBoundary from "~/components/error-boundary";
import useLoadResources from "~/hooks/useLoadResources";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import RootStack from "~/navigation";

SplashScreen.preventAutoHideAsync();

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};
export default function App() {
  const { loaded, error } = useLoadResources();
  const { isDarkColorScheme } = useColorScheme();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
      <ErrorBoundary>
        <RootStack />
      </ErrorBoundary>
    </ThemeProvider>
  );
}
