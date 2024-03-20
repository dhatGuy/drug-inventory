import { Text, View } from 'react-native';
import { useStyles } from 'react-native-unistyles';

import EditScreenInfo from '../components/edit-screen-info';

export default function TabTwoScreen() {
  const { theme } = useStyles();
  return (
    <View style={theme.components.container}>
      <Text style={theme.components.title}>Tab Two</Text>
      <View style={theme.components.separator} />
      <EditScreenInfo path="src/screens/two.tsx" />
    </View>
  );
}
