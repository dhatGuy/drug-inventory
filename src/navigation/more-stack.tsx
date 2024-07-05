import { createStackNavigator } from "@react-navigation/stack";

import { MoreStackParamList } from ".";

import MoreHome from "~/screens/tab/more/MoreHome";
import Reviews from "~/screens/tab/more/Reviews";

const Stack = createStackNavigator<MoreStackParamList>();
export default function MoreStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="More" component={MoreHome} />
      <Stack.Screen name="Reviews" component={Reviews} />
    </Stack.Navigator>
  );
}
