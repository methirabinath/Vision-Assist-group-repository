import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

export default function AlertsScreen() {
    const router = useRouter();
    return (
        <View className="flex-1 bg-slate-50">

            <StatusBar barStyle="dark-content" />

            {/* Top Section: Logo */}
            <View className="items-center pt-16 pb-10">

                {/* Back Button */}
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="absolute left-6 top-4 w-10 h-10 rounded-full border border-slate-200 bg-white items-center justify-center"
                    activeOpacity={0.7}
                >
                    <Ionicons name="arrow-back" size={18} color="#475569" />
                </TouchableOpacity>

                <Text className="text-slate-400 text-xs font-semibold tracking-[4px] mb-4 uppercase">
                    Monitoring
                </Text>

                <Text className="text-slate-900 text-5xl font-bold tracking-tight">
                    Vision<Text className="text-blue-500">Assist</Text>
                </Text>

                <View className="w-12 h-0.5 bg-blue-500 mt-5 mb-5" />

                <Text className="text-slate-400 text-sm tracking-widest font-medium uppercase">
                    Smart Vision. Smart Living.
                </Text>

            </View>

            {/* Content Card */}
            <ScrollView
                className="flex-1 bg-white rounded-t-3xl px-8 pt-10"
                showsVerticalScrollIndicator={false}
            >

                {/* Page Title */}
                <Text className="text-slate-900 text-2xl font-bold tracking-tight mb-1">
                    Alerts
                </Text>
                <View className="w-8 h-0.5 bg-blue-500 mb-8" />

                {/* Connected Device */}
                <Text className="text-slate-500 text-xs font-semibold tracking-widest uppercase mb-3">
                    Connected Device
                </Text>

                <View className="border border-slate-100 rounded-2xl px-5 py-4 mb-8 flex-row items-center justify-between bg-slate-50">
                    <View>
                        <Text className="text-slate-400 text-xs font-semibold tracking-widest uppercase mb-1">
                            Device ID
                        </Text>
                        <Text className="text-slate-900 text-base font-bold">
                            #VAH-1023
                        </Text>
                    </View>
                    <View className="flex-row items-center gap-x-2">
                        <View className="w-2 h-2 rounded-full bg-green-400" />
                        <Text className="text-green-500 text-xs font-semibold">
                            Live
                        </Text>
                    </View>
                </View>

                {/* Alerts Section Label */}
                <Text className="text-slate-500 text-xs font-semibold tracking-widest uppercase mb-3">
                    Recent Alerts
                </Text>

                {/* Empty State */}
                <View className="border border-slate-100 rounded-2xl px-5 py-12 items-center bg-slate-50 mb-10">
                    <View className="w-12 h-12 rounded-full bg-blue-50 items-center justify-center mb-4">
                        <Text className="text-blue-400 text-xl">🔔</Text>
                    </View>
                    <Text className="text-slate-900 text-sm font-semibold mb-1">
                        No Alerts Yet
                    </Text>
                    <Text className="text-slate-400 text-xs text-center leading-5">
                        When an alert is triggered, it will appear here.
                    </Text>
                </View>

            </ScrollView>

        </View>
    );
}