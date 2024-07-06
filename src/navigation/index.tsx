import { NavigationContainer, createNavigationContainerRef } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import { ActivityIndicator, Linking, View } from "react-native";

import AuthStack from "./auth-stack";
import TabNavigator from "./tab-navigator";

import { useReactNavigationDevTools } from "@dev-plugins/react-navigation/build/useReactNavigationDevTools";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { mmkvStorage } from "~/lib/utils";
import { useAuthStatus } from "~/store/authStore";
import { useRouteActions } from "~/store/route.store";

export type RootStackParamList = {
  TabNavigator: TabNavigatorParamList;
  AuthStack: AuthStackParamList;
};

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

export type NotificationStackParamList = {
  Notification: undefined;
};

export type TabNavigatorParamList = {
  Home: undefined;
  InventoryTab: InventoryStackParamList;
  Notification: NotificationStackParamList;
  MoreTab: MoreStackParamList;
};

export type MoreStackParamList = {
  More: undefined;
};

export type InventoryStackParamList = {
  ItemDetails: {
    id: string;
  };
  UpdateItem: {
    id: string;
  };
  Reviews: {
    id: string;
  };
  ItemNotifications: {
    id: string;
  };
  NewItem: undefined;
  Inventory: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const PERSISTENCE_KEY = "NAVIGATION_STATE_V1";
const ref = createNavigationContainerRef();

export default function RootStack({ isLoaded }: { isLoaded: boolean }) {
  useReactNavigationDevTools(ref);
  const [isReady, setIsReady] = React.useState(!__DEV__);
  const [initialState, setInitialState] = React.useState();
  const status = useAuthStatus();
  const { setRouteName } = useRouteActions();

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (initialUrl == null) {
          const savedStateString = mmkvStorage.getString(PERSISTENCE_KEY);
          const state = savedStateString ? JSON.parse(savedStateString) : undefined;

          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        setIsReady(true);
      }
    };

    if (!isReady) {
      restoreState();
    }

    if (isLoaded && isReady) {
      setRouteName(ref.getCurrentRoute()?.name);
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 100);
    }
  }, [isReady]);

  if (!isReady) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  const onStateChange = (state) => {
    // const previousRouteName = routeName;
    const currentRouteName = ref.getCurrentRoute()?.name;
    setRouteName(currentRouteName);
    __DEV__ && mmkvStorage.set(PERSISTENCE_KEY, JSON.stringify(state));
  };

  return (
    <NavigationContainer ref={ref} initialState={initialState} onStateChange={onStateChange}>
      <BottomSheetModalProvider>
        <Stack.Navigator>
          {status === "authenticated" ? (
            <Stack.Screen
              name="TabNavigator"
              component={TabNavigator}
              options={{ headerShown: false }}
            />
          ) : (
            <Stack.Screen
              name="AuthStack"
              options={{
                headerShown: false,
              }}
              component={AuthStack}
            />
          )}
        </Stack.Navigator>
      </BottomSheetModalProvider>
    </NavigationContainer>
  );
}
