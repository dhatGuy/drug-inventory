import FeatherIcon from "@expo/vector-icons/Feather";
import { useFont } from "@shopify/react-native-skia";
import poppins from "assets/fonts/Poppins-Medium.ttf";
import { ScrollView, View } from "react-native";
import { useStyles } from "react-native-unistyles";
import { BarGroup, CartesianChart } from "victory-native";

import { stylesheet } from "./index.style";

import { InventoryItem, StyledSafeAreaView } from "~/components";
import { Button, Text } from "~/components/ui";

export default function Home() {
  const { styles } = useStyles(stylesheet);
  const font = useFont(poppins, 12);

  return (
    <StyledSafeAreaView>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>
          Hello <Text style={{ fontFamily: "Poppins_700Bold" }}>Randy</Text>
        </Text>

        <View style={styles.headerActions}>
          <Button
            variant="ghost"
            style={styles.headerNotifications}
            onPress={() => {
              // handle onPress
            }}>
            <FeatherIcon color="#222" name="bell" size={20} />
          </Button>
        </View>
      </View>
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.stats}>
          <View style={styles.statsRow}>
            <View style={styles.statsItem}>
              <View style={styles.statsItemIcon}>
                <FeatherIcon color="#fff" name="users" size={22} />
              </View>

              <View>
                <Text style={styles.statsItemLabel}>Total Items</Text>

                <Text style={styles.statsItemValue}>12</Text>
              </View>
            </View>

            <View style={styles.statsItem}>
              <View style={styles.statsItemIcon}>
                <FeatherIcon color="#fff" name="grid" size={22} />
              </View>

              <View>
                <Text style={styles.statsItemLabel}>Available Units</Text>

                <Text style={styles.statsItemValue}>150</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.stats}>
          <View style={styles.statsRow}>
            <View style={styles.statsItem}>
              <View style={styles.statsItemIcon}>
                <FeatherIcon color="#fff" name="users" size={22} />
              </View>

              <View>
                <Text style={styles.statsItemLabel}>Low Stock</Text>

                <Text style={styles.statsItemValue}>4</Text>
              </View>
            </View>

            <View style={styles.statsItem}>
              <View style={styles.statsItemIcon}>
                <FeatherIcon color="#fff" name="grid" size={22} />
              </View>

              <View>
                <Text style={styles.statsItemLabel}>Expiring Soon</Text>

                <Text style={styles.statsItemValue}>9</Text>
              </View>
            </View>
          </View>
        </View>

        <View>
          <View style={styles.itemListHeader}>
            <Text style={styles.itemListTitle}>Items</Text>
            <Button variant="link">
              <Text>View All</Text>
            </Button>
          </View>
          <View style={styles.cardList}>
            {items.map((item, index) => {
              return <InventoryItem item={item} key={index} />;
            })}
          </View>
        </View>

        <View style={styles.analytics}>
          <Text style={styles.analyticsTitle}>Analytics</Text>
          <View style={{ height: 300 }}>
            <CartesianChart
              data={DATA}
              xKey="x"
              yKeys={["sales", "purchase"]}
              axisOptions={{ font }}>
              {({ points, chartBounds }) => (
                //👇 pass a PointsArray to the Bar component, as well as options.
                <BarGroup
                  chartBounds={chartBounds}
                  betweenGroupPadding={0.3}
                  withinGroupPadding={0.1}>
                  <BarGroup.Bar points={points.purchase} color="red" />
                  <BarGroup.Bar points={points.sales} color="blue" />
                </BarGroup>
              )}
            </CartesianChart>
          </View>
        </View>
      </ScrollView>
    </StyledSafeAreaView>
  );
}

const DATA = Array.from({ length: 5 }, (_, i) => ({
  x: i + 3,
  sales: 40 + 30 * Math.random(),
  purchase: 40 + 30 * Math.random(),
}));

const items = [
  {
    icon: "clock",
    label: "Aspirin",
    exp: "10-01-2023",
    color: "#d9edf7",
    unitLeft: 32,
  },
  {
    icon: "thermometer",
    label: "Ibuprofen",
    exp: "05-03-2024",
    color: "#f0f9fa",
    unitLeft: 80,
  },
  {
    icon: "droplet",
    label: "Saline Solution",
    exp: "15-06-2024",
    color: "#d0e3f0",
    unitLeft: 45,
  },
  {
    icon: "alert-triangle",
    label: "Penicillin (Caution)",
    exp: "28-02-2024",
    color: "#ffe3e3",
    unitLeft: 12,
  },
];
