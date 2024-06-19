import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StackScreenProps } from "@react-navigation/stack";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { RootStackParamList, TabNavigatorParamList } from ".";
import InventoryStack from "./inventory-stack";
import MoreStack from "./more-stack";

import Home from "~/screens/tab/home";
import ItemNotifications from "~/screens/tab/inventory/ItemNotifications";
import { useUser } from "~/store/authStore";
import { useRouteName } from "~/store/route.store";

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

function TabBarIcon(props: { name: React.ComponentProps<typeof Feather>["name"]; color: string }) {
  const { styles } = useStyles(stylesheet);

  return <Feather size={28} style={styles.tabBarIcon} {...props} />;
}

type Props = StackScreenProps<RootStackParamList, "TabNavigator">;

export default function TabLayout({ navigation }: Props) {
  const user = useUser();
  const currentRouteName = useRouteName();

  const hide = !["Home", "Inventory", "Notification", "More"].includes(currentRouteName ?? "");

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "black",
        headerShown: false,
        tabBarStyle: { display: hide ? "none" : "flex" },
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "Poppins_500Medium",
        },
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tab.Screen
        name="InventoryTab"
        component={InventoryStack}
        options={{
          title: "Inventory",
          tabBarIcon: ({ color }) => <TabBarIcon name="package" color={color} />,
        }}
      />
      {user?.labels.includes("admin") && (
        <Tab.Screen
          name="Notification"
          component={ItemNotifications}
          options={{
            title: "Notification",
            tabBarIcon: ({ color }) => <TabBarIcon name="bell" color={color} />,
          }}
        />
      )}
      <Tab.Screen
        name="MoreTab"
        component={MoreStack}
        options={{
          title: "Notification",
          tabBarIcon: ({ color }) => <TabBarIcon name="menu" color={color} />,
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
