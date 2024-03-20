const colors = {
  white: '#ffffff',
  azureRadiance: '#007AFF',
  limedSpruce: '#38434D',
  cornflowerBlue: '#6366F1',
  astral: '#2E78B7',
} as const;

export const lightTheme = {
  colors,
  components: {
    container: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
    },

    separator: {
      backgroundColor: 'gray',
      height: 1,
      marginVertical: 30,
      opacity: 0.25,
      width: '80%',
    },
  },
  margins: {
    sm: 2,
    md: 4,
    lg: 8,
    xl: 12,
  },
} as const;
