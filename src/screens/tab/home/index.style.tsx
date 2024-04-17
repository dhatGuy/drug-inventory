import { createStyleSheet } from "react-native-unistyles";

export const stylesheet = createStyleSheet({
  container: {
    padding: 10,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  scrollViewContainer: {
    paddingBottom: 50,
  },
  /** Header */
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 0,
    padding: 10,
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
  itemListTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: "#222",
  },
  // #End Region
  // Analytics
  analytics: {
    paddingTop: 25,
  },
  analyticsTitle: {
    fontSize: 18,
    fontFamily: "Poppins_600SemiBold",
    color: "#222",
    marginBottom: 12,
  },

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
