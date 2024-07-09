import { Feather } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StackScreenProps } from "@react-navigation/stack";

import { RootStackParamList, TabNavigatorParamList } from ".";
import InventoryStack from "./inventory-stack";
import MoreStack from "./more-stack";

import { StyleSheet } from "react-native";
import UserInventory from "~/screens/tab/UserInventory";
import ItemNotifications from "~/screens/tab/inventory/ItemNotifications";
import { useUser } from "~/store/authStore";
import { useRouteName } from "~/store/route.store";

const Tab = createBottomTabNavigator<TabNavigatorParamList>();

function TabBarIcon(props: { name: React.ComponentProps<typeof Feather>["name"]; color: string }) {
  return <Feather size={28} style={styles.tabBarIcon} {...props} />;
}

type Props = StackScreenProps<RootStackParamList, "TabNavigator">;

export default function TabLayout({ navigation }: Props) {
  const user = useUser();
  const currentRouteName = useRouteName();

  const hide = !["Home", "Inventory", "Notification", "More", "UserInventory"].includes(
    currentRouteName ?? ""
  );

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
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
        name="InventoryTab"
        component={InventoryStack}
        options={{
          title: "Inventory",
          tabBarIcon: ({ color }) => <TabBarIcon name="package" color={color} />,
        }}
      />
      {!user?.labels.length && (
        <Tab.Screen
          name="UserInventory"
          component={UserInventory}
          options={{
            title: "User Inventory",
            tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
          }}
        />
      )}
      <Tab.Screen
        name="Notification"
        component={ItemNotifications}
        options={{
          title: "Notification",
          tabBarIcon: ({ color }) => <TabBarIcon name="bell" color={color} />,
        }}
      />
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

const styles = StyleSheet.create({
  headerRight: {
    marginRight: 15,
  },
  tabBarIcon: {
    marginBottom: -3,
  },
});
