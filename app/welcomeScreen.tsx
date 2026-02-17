// welcome.tsx
import { useRouter } from 'expo-router';
import { StatusBar, Text, TouchableOpacity, View } from 'react-native';
export default function WelcomeScreen() {
    const router = useRouter();
    return (
        <View className="flex-1 bg-slate-50 justify-between px-8 py-20">

            <StatusBar barStyle="dark-content" />

            {/*  Logo */}
            <View className="items-center mt-12">

                {/* Small label above logo */}
                <Text className="text-slate-400 text-xs font-semibold tracking-[4px] mb-4 uppercase">
                    Welcome to
                </Text>

                {/* App Name */}
                <Text className="text-slate-900 text-5xl font-bold tracking-tight">
                    Vision
                    <Text className="text-blue-500">Assist</Text>
                </Text>

                {/* Divider line */}
                <View className="w-12 h-0.5 bg-blue-500 mt-5 mb-5" />

                {/* Tagline */}
                <Text className="text-slate-400 text-sm tracking-widest font-medium uppercase">
                    Smart Vision. Smart Living.
                </Text>

            </View>

            {/*  Description */}
            <View className="items-center px-4">
                <Text className="text-slate-500 text-base text-center leading-7">
                    Your intelligent visual companion helping you see the world more clearly, every day.
                </Text>
            </View>

            {/* Buttons */}
            <View className="gap-y-4">

                {/* SIGN IN */}
                <TouchableOpacity
                    className="bg-blue-500 rounded-2xl py-4 items-center shadow-sm"
                    activeOpacity={0.8}
                    onPress={() => router.push("/register")}
                >
                    <Text className="text-white text-base font-bold tracking-widest uppercase"
                    >
                        Sign In
                    </Text>
                </TouchableOpacity>

                {/* CREATE ACCOUNT */}
                <TouchableOpacity
                    className="border border-slate-300 rounded-2xl py-4 items-center"
                    activeOpacity={0.8}
                    onPress={() => router.push("/login")}
                >
                    <Text className="text-slate-600 text-base font-semibold tracking-widest uppercase">
                        Create Account
                    </Text>
                </TouchableOpacity>

            </View>

        </View>
    );
}