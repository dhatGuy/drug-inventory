import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import { ActivityIndicator, Linking, View } from "react-native";

import AuthStack from "./auth-stack";
import TabNavigator from "./tab-navigator";

import { useUser } from "~/store/authStore";

export type RootStackParamList = {
  TabNavigator: undefined;
  AuthStack: undefined;
  Modal: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

export type TabNavigatorParamList = {
  Home: undefined;
  InventoryTab: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const PERSISTENCE_KEY = "NAVIGATION_STATE_V1";

export default function RootStack({ isLoaded }: { isLoaded: boolean }) {
  const [isReady, setIsReady] = React.useState(!__DEV__);
  const [initialState, setInitialState] = React.useState();
  const userState = useUser();

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (initialUrl == null) {
          const savedStateString = await AsyncStorage.getItem(PERSISTENCE_KEY);
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

  return (
    <NavigationContainer
      initialState={initialState}
      onStateChange={(state) => AsyncStorage.setItem(PERSISTENCE_KEY, JSON.stringify(state))}>
      <Stack.Navigator>
        {userState ? (
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
    </NavigationContainer>
  );
}
