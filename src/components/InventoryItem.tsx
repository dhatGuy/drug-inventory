import { Feather } from "@expo/vector-icons";
import { View } from "react-native";
import { createStyleSheet, useStyles } from "react-native-unistyles";

import { Text } from "./ui";

type Item = {
  icon: string;
  color: string;
  label: string;
  exp: string;
  unitLeft: string;
};

type Props = {
  item: Item;
};
export default function InventoryItem({ item }: Props) {
  const { styles } = useStyles(stylesheet);

  const { icon, color, label, exp, unitLeft } = item;

  return (
    <View style={styles.card}>
      <View style={[styles.cardIcon, { backgroundColor: color }]}>
        <Feather color="#131313" name={icon} size={20} />
      </View>

      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{label}</Text>

        <Text style={styles.cardCategory}>Expires: {exp}</Text>
      </View>

      <Text style={styles.cardPrice}>{unitLeft}</Text>
    </View>
  );
}

const stylesheet = createStyleSheet({
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
