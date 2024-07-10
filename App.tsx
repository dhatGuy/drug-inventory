import "~/global.css";

import { Theme, ThemeProvider } from "@react-navigation/native";
import { QueryClient, QueryClientProvider, focusManager } from "@tanstack/react-query";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
  InfoToast,
  SuccessToast,
  ToastConfig,
} from "react-native-toast-message";

import { useMMKVDevTools } from "@dev-plugins/react-native-mmkv";
import { AppStateStatus, Platform } from "react-native";
import ErrorBoundary from "~/components/error-boundary";
import { PortalHost } from "~/components/primitives/portal";
import { useAppState } from "~/hooks/useAppState";
import useLoadResources from "~/hooks/useLoadResources";
import { useOnlineManager } from "~/hooks/useOnlineManager";
import { clientPersister } from "~/lib/clientPersister";
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

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days
      persister: clientPersister,
    },
  },
});

function onAppStateChange(status: AppStateStatus) {
  // React Query already supports in web browser refetch on window focus by default
  if (Platform.OS !== "web") {
    focusManager.setFocused(status === "active");
  }
}

const toastConfig: ToastConfig = {
  success: (props: BaseToastProps) => (
    <SuccessToast
      {...props}
      text1Style={{ fontFamily: "Poppins_700Bold" }}
      text2Style={{ fontFamily: "Poppins_500Medium" }}
    />
  ),
  error: (props: BaseToastProps) => (
    <ErrorToast
      {...props}
      style={{
        zIndex: 100,
      }}
      text1Style={{ fontFamily: "Poppins_700Bold" }}
      text2Style={{ fontFamily: "Poppins_500Medium" }}
    />
  ),
  info: (props: BaseToastProps) => (
    <InfoToast
      {...props}
      text1Style={{ fontFamily: "Poppins_700Bold" }}
      text2Style={{ fontFamily: "Poppins_500Medium" }}
    />
  ),
  base: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      text1Style={{ fontFamily: "Poppins_700Bold" }}
      text2Style={{ fontFamily: "Poppins_500Medium" }}
    />
  ),
};

export default function App() {
  useOnlineManager();
  useMMKVDevTools();
  // useReactQueryDevTools(queryClient);
  useAppState(onAppStateChange);

  const { loaded, error } = useLoadResources();
  const authStatus = useAuthStatus();
  const { isDarkColorScheme } = useColorScheme();

  if (!loaded || authStatus === "idle") {
    return null;
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar style={isDarkColorScheme ? "light" : "dark"} />
        <ErrorBoundary>
          <QueryClientProvider client={queryClient}>
            <RootStack isLoaded={loaded} />
          </QueryClientProvider>
        </ErrorBoundary>
        <PortalHost />
        <Toast config={toastConfig} />
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
