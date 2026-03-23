import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Animated, ScrollView, StatusBar, Text, TouchableOpacity, View, } from 'react-native';

export default function SettingsScreen() {
    const router = useRouter();

    const [fallAlerts, setFallAlerts] = useState(true);
    const [sosAlerts, setSosAlerts] = useState(true);
    const [batteryLow, setBatteryLow] = useState(true);
    const [backButtonScale] = useState(new Animated.Value(1));

    const handleBackPress = () => {
        Animated.sequence([
            Animated.timing(backButtonScale, { toValue: 0.85, duration: 100, useNativeDriver: true }),
            Animated.timing(backButtonScale, { toValue: 1, duration: 100, useNativeDriver: true }),
        ]).start(() => router.push('/'));
    };

    // --- Toggle Component ---
    const Toggle = ({ value, onToggle }: { value: boolean; onToggle: () => void }) => (
        <TouchableOpacity
            onPress={onToggle}
            activeOpacity={0.8}
            className={`w-12 h-6 rounded-full justify-center px-1 ${value ? 'bg-blue-500' : 'bg-slate-200'}`}
        >
            <View className={`w-4 h-4 bg-white rounded-full ${value ? 'self-end' : 'self-start'}`} />
        </TouchableOpacity>
    );

    // --- Section Label ---
    const SectionLabel = ({ label }: { label: string }) => (
        <Text className="text-slate-500 text-xs font-semibold tracking-widest uppercase mb-3">
            {label}
        </Text>
    );

    return (
        <View className="flex-1 bg-slate-50">
            <StatusBar barStyle="dark-content" />

            {/* Top Header Section */}
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

                    {/* Preferences Title */}
                    <Text className="text-slate-400 text-xs font-semibold tracking-[4px] uppercase">
                        Preferences
                    </Text>

                    {/* Spacer */}
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
            <View className="flex-1 bg-white rounded-t-3xl">
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, paddingBottom: 40 }}
                    className="flex-1 px-8 pt-10"
                    showsVerticalScrollIndicator={false}
                >
                    {/* Notifications */}
                    <SectionLabel label="Notifications" />

                    <View className="border border-slate-100 rounded-2xl mb-8 overflow-hidden">
                        {[
                            { label: 'Fall Alerts', value: fallAlerts, setter: setFallAlerts },
                            { label: 'SOS Alerts', value: sosAlerts, setter: setSosAlerts },
                            { label: 'Battery Low', value: batteryLow, setter: setBatteryLow },
                        ].map((item, index, arr) => (
                            <View key={item.label}>
                                <View className="flex-row items-center justify-between px-5 py-4">
                                    <Text className="text-slate-900 text-sm font-semibold">{item.label}</Text>
                                    <Toggle value={item.value} onToggle={() => item.setter(!item.value)} />
                                </View>
                                {index < arr.length - 1 && <View className="h-px mx-5 bg-slate-100" />}
                            </View>
                        ))}
                    </View>

                    {/* Footer */}
                    <View className="border border-slate-100 rounded-2xl px-5 py-4 mb-12 flex-row items-center justify-between">
                        <View>
                            <Text className="text-slate-400 text-xs font-semibold tracking-widest uppercase mb-1">
                                Connected Device
                            </Text>
                            <Text className="text-slate-900 text-base font-bold">#VAH-1023</Text>
                        </View>
                        <View className="w-2 h-2 rounded-full bg-green-400" />
                    </View>
                </ScrollView>
            </View>
        </View>
    );
}
