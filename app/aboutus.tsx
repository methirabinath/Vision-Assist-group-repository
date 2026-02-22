import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Linking, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AboutUsScreen() {
    const insets = useSafeAreaInsets();
    const router = useRouter();

    // Function to open external URL
    const openURL = (url: string) => {
        Linking.openURL(url).catch(err => console.error("Failed to open URL:", err));
    }

    return (
        <View className="flex-1 bg-slate-50">
            <StatusBar barStyle="dark-content" />

            {/*  Logo */}
            <View className="pt-14 pb-8 px-6">

                {/* Header Row */}
                <View className="flex-row items-center justify-between mb-6">

                    {/* Back Button */}
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="w-10 h-10 rounded-full border border-slate-200 bg-white items-center justify-center"
                        activeOpacity={0.7}
                    >
                        <Ionicons name="arrow-back" size={18} color="#475569" />
                    </TouchableOpacity>

                    {/* Learn More Title */}
                    <Text className="text-slate-400 text-xs font-semibold tracking-[4px] uppercase">
                        Learn More
                    </Text>

                    {/* Spacer for symmetry */}
                    <View className="w-10" />

                </View>

                {/* Logo Section */}
                <View className="items-center">

                    <Text className="text-slate-900 text-5xl font-bold tracking-tight">
                        Vision<Text className="text-blue-500">Assist</Text>
                    </Text>

                    <View className="w-12 h-0.5 bg-blue-500 mt-5 mb-5" />

                    <Text className="text-slate-400 text-sm tracking-widest font-medium uppercase">
                        Smart Vision. Smart Living.
                    </Text>

                </View>

            </View>

            {/* Content Card */}
            <ScrollView
                className="flex-1 bg-white rounded-t-3xl px-8 pt-10"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: insets.bottom + 100
                }}
            >
                {/* About Us heading */}
                <Text className="text-slate-900 text-2xl font-bold tracking-tight mb-1">
                    About Us
                </Text>
                <View className="w-8 h-0.5 bg-blue-500 mb-8" />

                {/* Version Info */}
                <View className="border border-slate-100 rounded-2xl p-5 mb-6 bg-slate-50">
                    <Text className="text-slate-500 text-xs font-semibold tracking-widest uppercase mb-3">
                        App Info
                    </Text>
                    <Text className="text-slate-900 font-semibold text-base mb-1">
                        Version 1.0.0
                    </Text>
                    <Text className="text-slate-400 text-sm">
                        Developed by the VisionAssist Team
                    </Text>
                </View>

                {/* Mission */}
                <View className="border border-slate-100 rounded-2xl p-5 mb-6 bg-slate-50">
                    <Text className="text-slate-500 text-xs font-semibold tracking-widest uppercase mb-3">
                        Our Mission
                    </Text>
                    <Text className="text-slate-600 text-sm text-justify leading-6">
                        To empower caregivers to protect visually impaired loved ones through smart, reliable technology making every day safer and more connected.
                    </Text>
                </View>

                {/* Links */}
                <View className="border border-slate-100 rounded-2xl p-5 mb-10 bg-slate-50">
                    <Text className="text-slate-500 text-xs font-semibold tracking-widest uppercase mb-4">
                        Links
                    </Text>

                    {/* External Website */}
                    <TouchableOpacity
                        className="bg-blue-500 rounded-2xl py-4 items-center mb-4"
                        activeOpacity={0.8}
                        onPress={() => openURL('https://www.visionassistcare.com')}
                    >
                        <Text className="text-white text-sm font-bold tracking-widest uppercase">
                            www.visionassistcare.com
                        </Text>
                    </TouchableOpacity>

                    <View className="flex-row justify-between">
                        <TouchableOpacity activeOpacity={0.6} onPress={() => openURL('https://visionassistcare.com/terms')}>
                            <Text className="text-blue-500 text-sm font-semibold">
                                Terms of Use
                            </Text>
                        </TouchableOpacity>

                        <View className="w-0.5 bg-slate-200" />

                        <TouchableOpacity activeOpacity={0.6} onPress={() => openURL('https://visionassistcare.com/privacy')}>
                            <Text className="text-blue-500 text-sm font-semibold">
                                Privacy Policy
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}
