import "react-native-gesture-handler";
import "~/global.css";

import { Theme, ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

import ErrorBoundary from "~/components/error-boundary";
import { PortalHost } from "~/components/primitives/portal";
import useLoadResources from "~/hooks/useLoadResources";
import { NAV_THEME } from "~/lib/constants";
import { useColorScheme } from "~/lib/useColorScheme";
import RootStack from "~/navigation";
import { useAuthStatus } from "~/store/authStore";

SplashScreen.preventAutoHideAsync();

const LIGHT_THEME: Theme = {
  dark: false,
  colors: NAV_THEME.light,
};
const DARK_THEME: Theme = {
  dark: true,
  colors: NAV_THEME.dark,
};

const queryClient = new QueryClient();
export default function App() {
  const { loaded, error } = useLoadResources();
  const authStatus = useAuthStatus();
  const { isDarkColorScheme } = useColorScheme();

  if (!loaded || authStatus === "idle") {
    return null;
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
      <ErrorBoundary>
        <QueryClientProvider client={queryClient}>
          <RootStack isLoaded={loaded} />
        </QueryClientProvider>
      </ErrorBoundary>
      <PortalHost />
    </ThemeProvider>
  );
}
