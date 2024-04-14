import "./unistyles";

import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

import "react-native-gesture-handler";
import ErrorBoundary from "~/components/error-boundary";
import useLoadResources from "~/hooks/useLoadResources";
import RootStack from "~/navigation";

SplashScreen.preventAutoHideAsync();
export default function App() {
  const { loaded, error } = useLoadResources();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ErrorBoundary>
      <RootStack />
    </ErrorBoundary>
  );
}
