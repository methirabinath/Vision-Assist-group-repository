// splash.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from 'react';
import { StatusBar, Text, View } from 'react-native';

export default function SplashScreen() {

    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const init = async () => {
            // Wait 2 seconds for splash screen
            await new Promise(resolve => setTimeout(resolve, 5000));

            // Check auth
            const token = await AsyncStorage.getItem("authToken");
            const role = await AsyncStorage.getItem("userRole");

            if (token && role) {
                // Navigate based on role
                if (role === "blindUser") router.replace("/openVoice");
                else router.replace("/home");
            } else {
                router.replace("/login");
            }
        };

        init();
    }, []);

    return (
        <View className="flex-1 bg-slate-50 items-center justify-center">

            <StatusBar barStyle="dark-content" />

            {/* Logo */}
            <View className="items-center">

                {/* App Name */}
                <Text className="text-slate-900 text-5xl font-bold tracking-tight">
                    Vision
                    <Text className="text-blue-500">Assist</Text>
                </Text>

                {/* Divider line */}
                <View className="w-12 h-0.5 bg-blue-500 mt-5 mb-5" />

                {/* Tagline */}
                <Text className="text-slate-400 text-xs font-semibold tracking-[4px] uppercase">
                    Smart Vision. Smart Living.
                </Text>

            </View>

        </View>
    );
}