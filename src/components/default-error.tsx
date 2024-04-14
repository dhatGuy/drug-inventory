import FeatherIcon from "@expo/vector-icons/Feather";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function DefaultError() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f6f6f6" }}>
      <View style={styles.container}>
        <Text style={styles.title}>Messages</Text>

        <View style={styles.empty}>
          <FeatherIcon color="#94A3B8" name="alert-circle" size={36} />

          <Text style={styles.emptyTitle}>Oops!</Text>

          <Text style={styles.emptyDescription}>Something went wrong. Please try again.</Text>

          <TouchableOpacity
            onPress={() => {
              // handle onPress
            }}>
            <View style={styles.btn}>
              <Text style={styles.btnText}>Go back</Text>

              <FeatherIcon color="#fff" name="arrow-right" size={18} style={{ marginLeft: 12 }} />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    paddingBottom: 140,
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    color: "#1d1d1d",
    marginBottom: 12,
  },
  /** Empty */
  empty: {
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  emptyTitle: {
    fontSize: 21,
    fontWeight: "600",
    color: "#000",
    marginBottom: 8,
    marginTop: 16,
  },
  emptyDescription: {
    fontSize: 15,
    fontWeight: "500",
    color: "#878787",
    marginBottom: 24,
  },
  /** Button */
  btn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    backgroundColor: "#2b64e3",
    borderColor: "#2b64e3",
  },
  btnText: {
    fontSize: 17,
    lineHeight: 24,
    fontWeight: "600",
    color: "#fff",
  },
});
