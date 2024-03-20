import { useStyles } from 'react-native-unistyles';
import { Platform, Text, View } from 'react-native';

import { StatusBar } from 'expo-status-bar';

import EditScreenInfo from '../components/edit-screen-info';

export default function Modal() {
  const { theme } = useStyles();
  return (
    <View style={theme.components.container}>
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
      <Text style={theme.components.title}>Modal</Text>
      <View style={theme.components.separator} />
      <EditScreenInfo path="src/screens/modal.tsx" />
    </View>
  );
}
