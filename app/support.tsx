import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

export default function HelpSupportScreen() {
    const router = useRouter();

    return (
        <View className="flex-1 bg-slate-50">

            <StatusBar barStyle="dark-content" />

            {/* Top Section: Logo */}
            <View className="pt-14 pb-8 px-6">

                {/* Header Row */}
                <View className="flex-row items-center justify-between">

                    {/* Back Button */}
                    <TouchableOpacity
                        onPress={() => router.back()}
                        className="w-10 h-10 rounded-full border border-slate-200 bg-white items-center justify-center"
                        activeOpacity={0.7}
                    >
                        <Ionicons name="arrow-back" size={18} color="#475569" />
                    </TouchableOpacity>

                    {/* Support Title */}
                    <Text className="text-slate-400 text-xs font-semibold tracking-[4px] mb-4 uppercase">
                        Support
                    </Text>

                    {/* Spacer for symmetry */}
                    <View className="w-10" />

                </View>

                {/* Logo Section */}
                <View className="items-center mt-6">

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
            >

                {/* Page Title */}
                <Text className="text-slate-900 text-2xl font-bold tracking-tight mb-1">
                    Help & Support
                </Text>
                <View className="w-8 h-0.5 bg-blue-500 mb-8" />

                {/* ── Contact Us ── */}
                <Text className="text-slate-500 text-xs font-semibold tracking-widest uppercase mb-3">
                    Contact Us
                </Text>

                <View className="border border-slate-100 rounded-2xl mb-8 overflow-hidden">

                    <View className="flex-row items-center px-5 py-4 bg-slate-50">
                        <View className="w-8 h-8 rounded-full bg-blue-50 items-center justify-center mr-4">
                            <Ionicons name="call-outline" size={16} color="#3b82f6" />
                        </View>
                        <View>
                            <Text className="text-slate-400 text-xs font-semibold tracking-widest uppercase mb-0.5">
                                Phone
                            </Text>
                            <Text className="text-slate-900 text-sm font-semibold">
                                +94 70 345 6789
                            </Text>
                        </View>
                    </View>

                    <View className="h-px bg-slate-100" />

                    <View className="flex-row items-center px-5 py-4 bg-slate-50">
                        <View className="w-8 h-8 rounded-full bg-blue-50 items-center justify-center mr-4">
                            <Ionicons name="mail-outline" size={16} color="#3b82f6" />
                        </View>
                        <View>
                            <Text className="text-slate-400 text-xs font-semibold tracking-widest uppercase mb-0.5">
                                Email
                            </Text>
                            <Text className="text-slate-900 text-sm font-semibold">
                                support@visionassist.com
                            </Text>
                        </View>
                    </View>

                </View>

                {/* ── Quick Actions ── */}
                <Text className="text-slate-500 text-xs font-semibold tracking-widest uppercase mb-3">
                    Quick Actions
                </Text>

                <View className="border border-slate-100 rounded-2xl mb-8 overflow-hidden">

                    <TouchableOpacity
                        className="flex-row items-center justify-between px-5 py-4 bg-slate-50"
                        activeOpacity={0.7}
                    >
                        <View className="flex-row items-center">
                            <View className="w-8 h-8 rounded-full bg-blue-50 items-center justify-center mr-4">
                                <Ionicons name="help-circle-outline" size={16} color="#3b82f6" />
                            </View>
                            <Text className="text-slate-900 text-sm font-semibold">
                                Common Questions
                            </Text>
                        </View>
                        <Ionicons name="chevron-forward" size={16} color="#94a3b8" />
                    </TouchableOpacity>

                    <View className="h-px bg-slate-100" />

                </View>

                {/* ── Connected Device ── */}
                <Text className="text-slate-500 text-xs font-semibold tracking-widest uppercase mb-3">
                    Connected Device
                </Text>

                <View className="border border-slate-100 rounded-2xl px-5 py-4 mb-8 flex-row items-center justify-between bg-slate-50">
                    <View className="flex-row items-center">
                        <View className="w-8 h-8 rounded-full bg-blue-50 items-center justify-center mr-4">
                            <Ionicons name="hardware-chip-outline" size={16} color="#3b82f6" />
                        </View>
                        <View>
                            <Text className="text-slate-400 text-xs font-semibold tracking-widest uppercase mb-1">
                                Device ID
                            </Text>
                            <Text className="text-slate-900 text-base font-bold">
                                #VAH-1023
                            </Text>
                        </View>
                    </View>
                    <View className="flex-row items-center gap-x-2">
                        <View className="w-2 h-2 rounded-full bg-green-400" />
                        <Text className="text-green-500 text-xs font-semibold">
                            Live
                        </Text>
                    </View>
                </View>

            </ScrollView>

        </View>
    );
}