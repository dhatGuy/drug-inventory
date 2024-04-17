import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { BackHandler } from "react-native";

export function useBackHandler(handler: () => boolean, deps: any[] = []) {
  useFocusEffect(
    useCallback(() => {
      const sub = BackHandler.addEventListener("hardwareBackPress", handler);

      return () => sub.remove();
    }, deps)
  );
}
