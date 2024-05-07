import {
  Poppins_100Thin,
  Poppins_200ExtraLight,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
} from "@expo-google-fonts/poppins";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import { useEffect, useState } from "react";

import { useColorScheme } from "~/lib/useColorScheme";
import { useUserActions } from "~/store/authStore";

export default function useLoadResources() {
  const { colorScheme, setColorScheme } = useColorScheme();
  const { hydrate } = useUserActions();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const selectedTheme = async () => {
    const theme = await AsyncStorage.getItem("theme");
    const colorTheme = theme === "dark" ? "dark" : "light";
    if (!theme) {
      await AsyncStorage.setItem("theme", colorScheme);
    } else if (colorTheme !== colorScheme) {
      setColorScheme(colorTheme);
    } else {
      setColorScheme(colorScheme);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        hydrate();

        await Font.loadAsync({
          Poppins_100Thin,
          Poppins_200ExtraLight,
          Poppins_300Light,
          Poppins_400Regular,
          Poppins_500Medium,
          Poppins_600SemiBold,
          Poppins_700Bold,
          Poppins_800ExtraBold,
          Poppins_900Black,
        });

        await selectedTheme();
      } catch (e) {
        console.warn(e);
        setError(true);
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  return { loaded, error };
}
