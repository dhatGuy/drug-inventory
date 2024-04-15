import FeatherIcon from "@expo/vector-icons/Feather";
import { ScrollView, View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { StyledSafeAreaView } from "~/components";
import { Button, Text } from "~/components/ui";

export default function Home() {
  const { styles } = useStyles(stylesheet);

  return (
    <StyledSafeAreaView>
      <ScrollView style={styles.container}>
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
            <Text>Items</Text>
            <Button variant="link">
              <Text>View All</Text>
            </Button>
          </View>
          <View style={styles.cardList}>
            {items.map(({ icon, label, exp, color, unitLeft }, index) => {
              return (
                <View key={index} style={styles.card}>
                  <View style={[styles.cardIcon, { backgroundColor: color }]}>
                    <FeatherIcon color="#131313" name={icon} size={20} />
                  </View>

                  <View style={styles.cardBody}>
                    <Text style={styles.cardTitle}>{label}</Text>

                    <Text style={styles.cardCategory}>Expires: {exp}</Text>
                  </View>

                  <Text style={styles.cardPrice}>{unitLeft}</Text>
                </View>
              );
            })}
          </View>
        </View>
      </ScrollView>
    </StyledSafeAreaView>
  );
}

const stylesheet = createStyleSheet({
  container: {
    padding: 10,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  /** Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "400",
    color: "#222",
  },
  headerActions: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  headerNotifications: {
    width: 42,
    height: 42,
    borderRadius: 9999,
    borderWidth: 1,
    borderColor: "#e1e1e1",
    marginRight: 12,
    alignItems: "center",
    paddingHorizontal: 0,
    paddingVertical: 0,
    justifyContent: "center",
  },
  /** Stats */
  stats: {
    flexDirection: "column",
    alignItems: "stretch",
    justifyContent: "center",
  },
  statsRow: {
    flexDirection: "row",
    marginHorizontal: -6,
  },
  statsItem: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "#fff",
    marginHorizontal: 6,
    marginBottom: 12,
  },
  statsItemIcon: {
    backgroundColor: "#faad55",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 46,
    height: 46,
    marginRight: 8,
    borderRadius: 8,
  },
  statsItemLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: "#8e8e93",
    marginBottom: 2,
  },
  statsItemValue: {
    fontSize: 22,
    fontWeight: "600",
    color: "#081730",
  },
  // #Region Item List
  itemListHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  // #End Region
  /** Card */
  cardList: {
    gap: 10,
  },
  card: {
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  cardIcon: {
    width: 46,
    height: 46,
    borderRadius: 12,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  cardBody: {
    marginLeft: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#131313",
    marginBottom: 4,
  },
  cardCategory: {
    fontSize: 14,
    fontWeight: "500",
    color: "#7f7f7f",
  },
  cardPrice: {
    marginLeft: "auto",
    fontSize: 17,
    fontWeight: "700",
    color: "#2c9d3b",
  },
});

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
