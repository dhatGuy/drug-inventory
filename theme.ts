const colors = {
  white: "#ffffff",
  azureRadiance: "#007AFF",
  limedSpruce: "#38434D",
  cornflowerBlue: "#6366F1",
  astral: "#2E78B7",
  background: "#e8ecf4",
} as const;

export const lightTheme = {
  colors,
  components: {
    container: {
      alignItems: "center",
      flex: 1,
      justifyContent: "center",
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
    text: {
      fontFamily: "Poppins_500Medium",
      color: "#222",
    },
    separator: {
      backgroundColor: "gray",
      height: 1,
      marginVertical: 30,
      opacity: 0.25,
      width: "80%",
    },
  },
  margins: {
    sm: 2,
    md: 4,
    lg: 8,
    xl: 12,
  },
} as const;

export const darkTheme = {
  ...lightTheme,
  components: {
    ...lightTheme.components,
    container: {
      ...lightTheme.components.container,
      backgroundColor: "#1c1c1c",
    },
    text: {
      ...lightTheme.components.text,
      color: "#fff",
    },
  },
  colors: {
    ...colors,
    white: "#000000",
    background: "#1c1c1c",
  },
} as const;
