import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Image } from 'expo-image';
import { useColorScheme } from 'react-native';

export default function HomeScreen() {
  const colorScheme = useColorScheme(); // Detect light or dark mode

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          className="w-[290px] h-[178px] absolute bottom-0 left-0"
        />
      }
    >
      {/* Background color test boxes */}
      <ThemedView className="p-4 space-y-4">
        {/* Light/Dark mode adaptive box */}
        <ThemedView
          className={`p-6 rounded-lg ${colorScheme === 'dark' ? 'bg-gray-800' : 'bg-yellow-400'
            }`}
        >
          <ThemedText
            className={`text-center font-bold ${colorScheme === 'dark' ? 'text-white' : 'text-black'
              }`}
          >
            {colorScheme === 'dark' ? 'Dark Mode Active' : 'Light Mode Active'}
          </ThemedText>
        </ThemedView>

        {/* Fixed color boxes */}
        <ThemedView className="p-6 rounded-lg bg-red-500">
          <ThemedText className="text-white text-center font-bold">Red Background</ThemedText>
        </ThemedView>

        <ThemedView className="p-6 rounded-lg bg-green-500">
          <ThemedText className="text-white text-center font-bold">Green Background</ThemedText>
        </ThemedView>

        <ThemedView className="p-6 rounded-lg bg-blue-500">
          <ThemedText className="text-white text-center font-bold">Blue Background</ThemedText>
        </ThemedView>

        <ThemedView className="p-6 rounded-lg bg-purple-500">
          <ThemedText className="text-white text-center font-bold">Purple Background</ThemedText>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}
