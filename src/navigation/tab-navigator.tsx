import { MaterialIcons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StackScreenProps } from "@react-navigation/stack";
import { Pressable } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { RootStackParamList, TabNavigatorParamList } from ".";
import Two from "../screens/two";

import Home from "~/screens/tab/home";

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

function TabBarIcon(props: {
  name: React.ComponentProps<typeof MaterialIcons>["name"];
  color: string;
}) {
  const { styles } = useStyles(stylesheet);

  return <MaterialIcons size={28} style={styles.tabBarIcon} {...props} />;
}

type Props = StackScreenProps<RootStackParamList, "TabNavigator">;

export default function TabLayout({ navigation }: Props) {
  const { styles } = useStyles(stylesheet);

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "black",
        headerShown: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home-filled" color={color} />,

          headerRight: () => (
            <Pressable onPress={() => navigation.navigate("Modal")}>
              {({ pressed }) => (
                <MaterialIcons
                  name="info"
                  size={25}
                  color="gray"
                  style={[styles.headerRight, { opacity: pressed ? 0.5 : 1 }]}
                />
              )}
            </Pressable>
          ),
        }}
      />
      <Tab.Screen
        name="Inventory"
        component={Two}
        options={{
          title: "Inventory",
          tabBarIcon: ({ color }) => <TabBarIcon name="inventory-2" color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

const stylesheet = createStyleSheet({
  headerRight: {
    marginRight: 15,
  },
  tabBarIcon: {
    marginBottom: -3,
  },
});
