import { createStyleSheet } from "react-native-unistyles";

export const stylesheet = createStyleSheet({
  container: {
    padding: 10,
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
  },
  nav: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    gap: 5,
    width: "auto",
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  saveBtn: {
    width: "auto",
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 100,
  },
  title: {
    fontSize: 24,
    fontFamily: "Poppins_700Bold",
    color: "#222",
  },
  imageSection: {
    // gap: 5,
    marginBottom: 16,
  },
  imagePlaceholder: {
    borderWidth: 1,
    borderColor: "#e1e1e1",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },

  /** Input */
  input: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 15,
    fontFamily: "Poppins_600SemiBold",
    color: "#222",
  },

  dropdownButtonStyle: {
    // width: 200,
    height: 55,
    borderWidth: 1,
    borderColor: "#C9D3DB",
    backgroundColor: "#fff",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownButtonArrowStyle: {
    fontSize: 28,
  },
  dropdownMenuStyle: {
    backgroundColor: "#E9ECEF",
    borderRadius: 8,
  },
  dropdownItemStyle: (selected: boolean) => ({
    width: "100%",
    flexDirection: "row",
    paddingHorizontal: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 8,
    backgroundColor: selected ? "#D2D9DF" : "#fff",
  }),
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "500",
    color: "#151E26",
  },
  dropdownSearchTxt: {
    fontSize: 18,
    fontFamily: "Poppins_500Medium",
    color: "#151E26",
  },
});
