// splash.tsx
import { useRouter } from "expo-router";
import { useEffect } from 'react';
import { StatusBar, Text, View } from 'react-native';

export default function SplashScreen() {

    const router = useRouter();

    useEffect(() => {
        setTimeout(() => {
            router.replace("/welcomeScreen");
        }, 2000);
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