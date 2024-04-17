import { createStyleSheet } from "react-native-unistyles";

export const stylesheet = createStyleSheet({
  container: {
    padding: 10,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 0,
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    color: "#222",
  },
  // search
  headerSearch: {
    position: "relative",
    // flexGrow: 1,
    // flexShrink: 1,
    // flexBasis: 0,
  },
  headerSearchIcon: {
    // borderWidth: 1,
    // borderColor: "red",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  headerSearchInput: {
    backgroundColor: "#fff",
    width: "100%",
    height: 40,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    fontWeight: "500",
    paddingLeft: 40,
    paddingRight: 50,
    shadowColor: "#90a0ca",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
  },
  btnBarcode: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
    width: "auto",
  },

  // addItem
  addItem: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    paddingHorizontal: 0,
    borderRadius: 9999,
    shadowColor: "#90a0ca",
    shadowOffset: {
      width: 4,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 2,
  },

  itemListContent: {
    gap: 15,
    paddingVertical: 30,
  },
  itemList: {},
});
