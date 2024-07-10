import { createStackNavigator } from "@react-navigation/stack";

import { InventoryStackParamList } from ".";

import Inventory from "~/screens/tab/inventory";
import ItemDetails from "~/screens/tab/inventory/ItemDetails";
import NewItem from "~/screens/tab/inventory/NewItem";
import Reviews from "~/screens/tab/inventory/Reviews";
import UpdateItem from "~/screens/tab/inventory/UpdateItem";

const Stack = createStackNavigator<InventoryStackParamList>();
export default function InventoryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="Inventory">
      <Stack.Screen name="Inventory" component={Inventory} />
      <Stack.Screen name="ItemDetails" component={ItemDetails} />
      <Stack.Screen name="UpdateItem" component={UpdateItem} />
      <Stack.Screen name="Reviews" component={Reviews} />
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
