import { Stack, usePathname } from 'expo-router';
import { View } from 'react-native';
import BottomNav from '../components/BottomNav';
import "../global.css"; // Keep your global styles

export default function Layout() {
  const pathname = usePathname();

  //  BottomNav should not appear
  const hideBottomNav = ['/login', '/register', '/welcomeScreen', '/openVoice', '/'];

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flex: 1 }}>
        <Stack screenOptions={{ headerShown: false }} />
      </View>

      {/* Only render BottomNav on non-auth pages */}
      {!hideBottomNav.includes(pathname) && <BottomNav />}
    </View>
  );
}
