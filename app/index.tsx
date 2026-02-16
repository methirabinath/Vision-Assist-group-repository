import { Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Dimensions, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();

    return (
        <View className="flex-1 bg-slate-50">
            <StatusBar barStyle="dark-content" />

            {/* ── Header ── */}
            <View className="bg-white border-b border-slate-100 pt-14 pb-5 px-6">
                <View className="flex-row justify-between items-center mb-5">

                    {/* Menu */}
                    <TouchableOpacity
                        onPress={() => setMenuOpen(!menuOpen)}
                        className="w-10 h-10 rounded-full border border-slate-100 bg-slate-50 items-center justify-center"
                        activeOpacity={0.7}
                    >
                        {menuOpen
                            ? <Entypo name="cross" size={20} color="#475569" />
                            : <Entypo name="menu" size={20} color="#475569" />
                        }
                    </TouchableOpacity>

                    {/* Logo */}
                    <View className="flex-row items-center gap-x-2">
                        <View className="w-8 h-8 bg-blue-500 rounded-full items-center justify-center">
                            <MaterialCommunityIcons name="hat-fedora" size={16} color="#ffffff" />
                        </View>
                        <Text className="text-slate-900 text-lg font-bold tracking-tight">
                            Vision<Text className="text-blue-500">Assist</Text>
                        </Text>
                    </View>

                    {/* Notifications */}
                    <TouchableOpacity
                        className="w-10 h-10 rounded-full border border-slate-100 bg-slate-50 items-center justify-center"
                        activeOpacity={0.7}
                    >
                        <Ionicons name="notifications-outline" size={20} color="#475569" />
                    </TouchableOpacity>

                </View>

                {/* Welcome */}
                <Text className="text-slate-400 text-xs font-semibold tracking-widest uppercase mb-1">
                    Welcome back
                </Text>
            </View>

            {/* ── Dropdown Menu ── */}
            {menuOpen && (
                <View className="absolute top-32 left-4 right-4 bg-white border border-slate-100 shadow-lg z-50 rounded-2xl overflow-hidden">

                    {[
                        { icon: 'settings-outline', label: 'Settings', color: '#3b82f6', onPress: () => { setMenuOpen(false); router.push('/settingsScreen'); } },
                        { icon: 'help-circle-outline', label: 'Help & Support', color: '#3b82f6', onPress: () => { setMenuOpen(false); router.push('/support'); } },
                        { icon: 'information-circle-outline', label: 'About', color: '#3b82f6', onPress: () => { setMenuOpen(false); router.push('/aboutus'); } },
                    ].map((item) => (
                        <View key={item.label}>
                            <TouchableOpacity
                                className="py-4 px-5 flex-row items-center"
                                onPress={item.onPress}
                                activeOpacity={0.7}
                            >
                                <View className="w-8 h-8 rounded-full bg-blue-50 items-center justify-center mr-4">
                                    <Ionicons name={item.icon as any} size={16} color={item.color} />
                                </View>
                                <Text className="text-slate-900 text-sm font-semibold">{item.label}</Text>
                                <Ionicons name="chevron-forward" size={14} color="#94a3b8" style={{ marginLeft: 'auto' }} />
                            </TouchableOpacity>
                            <View className="h-px bg-slate-100 mx-5" />
                        </View>
                    ))}

                </View>
            )}

            {/* ── Scrollable Content ── */}
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

                {/* Device Status Card */}
                <View className="px-6 mt-6 mb-4">
                    <Text className="text-slate-500 text-xs font-semibold tracking-widest uppercase mb-3">
                        Device Status
                    </Text>
                    <View className="bg-white border border-slate-100 rounded-2xl p-5">

                        <View className="flex-row items-center justify-between mb-4">
                            <View className="flex-row items-center gap-x-2">
                                <View className="w-2 h-2 rounded-full bg-green-400" />
                                <Text className="text-slate-900 text-base font-bold">Connected</Text>
                            </View>
                            <View className="bg-blue-50 px-3 py-1 rounded-full">
                                <Text className="text-blue-500 text-xs font-bold">#VAH-1023</Text>
                            </View>
                        </View>

                        <View className="h-px bg-slate-100 mb-4" />

                        <View className="flex-row justify-between">

                            <View className="flex-row items-center gap-x-2">
                                <View className="w-8 h-8 rounded-full bg-green-50 items-center justify-center">
                                    <Ionicons name="battery-half" size={16} color="#22c55e" />
                                </View>
                                <View>
                                    <Text className="text-slate-400 text-xs">Battery</Text>
                                    <Text className="text-slate-900 text-sm font-bold">85%</Text>
                                </View>
                            </View>

                            <View className="flex-row items-center gap-x-2">
                                <View className="w-8 h-8 rounded-full bg-green-50 items-center justify-center">
                                    <Ionicons name="wifi" size={16} color="#22c55e" />
                                </View>
                                <View>
                                    <Text className="text-slate-400 text-xs">Signal</Text>
                                    <Text className="text-slate-900 text-sm font-bold">Stable</Text>
                                </View>
                            </View>

                            <View className="flex-row items-center gap-x-2">
                                <View className="w-8 h-8 rounded-full bg-blue-50 items-center justify-center">
                                    <Ionicons name="location" size={16} color="#3b82f6" />
                                </View>
                                <View>
                                    <Text className="text-slate-400 text-xs">GPS</Text>
                                    <Text className="text-slate-900 text-sm font-bold">Active</Text>
                                </View>
                            </View>

                        </View>
                    </View>
                </View>

                {/* Quick Actions */}
                <View className="px-6 mb-4">
                    <Text className="text-slate-500 text-xs font-semibold tracking-widest uppercase mb-3">
                        Quick Actions
                    </Text>

                    {/* Navigation */}
                    <TouchableOpacity
                        className="bg-blue-500 rounded-2xl p-5 mb-3 flex-row items-center justify-between"
                        activeOpacity={0.85}
                    >
                        <View className="flex-row items-center flex-1">
                            <View className="w-11 h-11 bg-white/20 rounded-xl items-center justify-center">
                                <Ionicons name="navigate" size={22} color="#ffffff" />
                            </View>
                            <View className="ml-4">
                                <Text className="text-white text-base font-bold">Start Navigation</Text>
                                <Text className="text-blue-100 text-xs mt-0.5">Begin guided walking</Text>
                            </View>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color="#ffffff" />
                    </TouchableOpacity>

                    {/* SOS */}
                    <TouchableOpacity
                        className="bg-red-500 rounded-2xl p-5 flex-row items-center justify-between"
                        activeOpacity={0.85}
                    >
                        <View className="flex-row items-center flex-1">
                            <View className="w-11 h-11 bg-white/20 rounded-xl items-center justify-center">
                                <MaterialIcons name="emergency" size={24} color="#ffffff" />
                            </View>
                            <View className="ml-4">
                                <Text className="text-white text-base font-bold">Emergency SOS</Text>
                                <Text className="text-red-100 text-xs mt-0.5">Send alert to contacts</Text>
                            </View>
                        </View>
                        <Ionicons name="chevron-forward" size={18} color="#ffffff" />
                    </TouchableOpacity>
                </View>

                {/* Feature Grid */}
                <View className="px-6 mb-4">
                    <Text className="text-slate-500 text-xs font-semibold tracking-widest uppercase mb-3">
                        Features
                    </Text>
                    <View className="flex-row flex-wrap justify-between">

                        {[
                            { icon: 'location', bg: 'bg-blue-50', color: '#3b82f6', label: 'Live Tracking', sub: 'Real-time location', route: '/map' },
                            { icon: 'notifications', bg: 'bg-orange-50', color: '#f97316', label: 'View Alerts', sub: 'Recent notifications', route: '/alerts' },
                            { icon: 'stats-chart', bg: 'bg-purple-50', color: '#9333ea', label: 'Activity Log', sub: 'Daily summary', route: null },
                            { icon: 'people', bg: 'bg-green-50', color: '#16a34a', label: 'Contacts', sub: 'Emergency list', route: null },
                        ].map((item) => (
                            <TouchableOpacity
                                key={item.label}
                                className="bg-white border border-slate-100 rounded-2xl p-4 mb-3"
                                style={{ width: (width - 52) / 2 }}
                                onPress={() => item.route && router.push(item.route as any)}
                                activeOpacity={0.7}
                            >
                                <View className={`w-11 h-11 ${item.bg} rounded-xl items-center justify-center mb-3`}>
                                    <Ionicons name={item.icon as any} size={22} color={item.color} />
                                </View>
                                <Text className="text-slate-900 text-sm font-bold mb-0.5">{item.label}</Text>
                                <Text className="text-slate-400 text-xs">{item.sub}</Text>
                            </TouchableOpacity>
                        ))}

                    </View>
                </View>

            </ScrollView>
        </View>
    );
}