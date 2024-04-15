import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import Modal from "../screens/modal";
import AuthStack from "./auth-stack";
import TabNavigator from "./tab-navigator";

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
  Inventory: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="AuthStack"
          options={{
            headerShown: false,
          }}
          component={AuthStack}
        />
        <Stack.Screen
          name="Modal"
          component={Modal}
          options={{ presentation: "modal", headerLeft: () => null }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
