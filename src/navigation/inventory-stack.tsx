import { createStackNavigator } from "@react-navigation/stack";

import Inventory from "~/screens/tab/inventory";

const Stack = createStackNavigator();
export default function InventoryStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Inventory" component={Inventory} />
    </Stack.Navigator>
  );
}
