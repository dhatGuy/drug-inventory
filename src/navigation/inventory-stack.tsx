import { createStackNavigator } from "@react-navigation/stack";

import Inventory from "~/screens/tab/inventory";
import NewItem from "~/screens/tab/inventory/NewItem";

const Stack = createStackNavigator();
export default function InventoryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Inventory" component={Inventory} />
      <Stack.Screen
        name="NewItem"
        component={NewItem}
        options={{
          transitionSpec: {
            open: {
              animation: "timing",
              config: {
                duration: 500,
              },
            },
            close: {
              animation: "timing",
              config: {
                duration: 500,
              },
            },
          },
          cardStyleInterpolator: ({ layouts, current: { progress } }) => ({
            cardStyle: {
              transform: [
                {
                  translateX: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                  }),
                },
              ],
            },
          }),
        }}
      />
    </Stack.Navigator>
  );
}
