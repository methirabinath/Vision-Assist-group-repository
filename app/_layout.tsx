import { Stack } from 'expo-router';
import { View } from 'react-native';
import "../global.css"; // Keep your global styles

export default function Layout() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </View>
  );
}
