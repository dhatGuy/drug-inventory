import { Button, Text, View } from 'react-native';
import { UnistylesRuntime, createStyleSheet, useStyles } from 'react-native-unistyles';

import EditScreenInfo from '../components/edit-screen-info';

export default function TabOneScreen() {
  const { styles, theme } = useStyles(stylesheet);
  const { themeName } = UnistylesRuntime;
  return (
    <View style={styles.container}>
      <Text style={theme.components.title}>Tab One</Text>
      <View style={theme.components.separator} />
      <Button
        title="Change theme"
        onPress={() => UnistylesRuntime.setTheme(themeName === 'dark' ? 'light' : 'dark')}
      />
      <EditScreenInfo path="src/screens/one.tsx" />
    </View>
  );
}

const stylesheet = createStyleSheet((theme) => ({
  container: {
    ...theme.components.container,
    backgroundColor: theme.colors.background,
  },
}));
