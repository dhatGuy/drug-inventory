import { createStackNavigator } from "@react-navigation/stack";

import Login from "~/screens/auth/login/login";
import Signup from "~/screens/auth/signup";

const Stack = createStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}

export default AuthStack;
