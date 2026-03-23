import { getHatStatus } from '@/services/hatApi';
import { Entypo, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width } = Dimensions.get('window');



export default function HomeScreen() {
    const [menuOpen, setMenuOpen] = useState(false);
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [battery, setBattery] = useState<number | null>(null);


    // Check login status on mount
    useEffect(() => {
        const checkLoginStatus = async () => {
            const token = await AsyncStorage.getItem("authToken");
            if (token) {
                setIsLoggedIn(true);
            } else {
                setIsLoggedIn(false);
            }
        };

        checkLoginStatus();
    }, []);

    useEffect(() => {
        const fetchBattery = async () => {
            try {
                const data = await getHatStatus();
                if (data?.battery !== undefined) setBattery(data.battery);
            } catch (err) {
                console.log('Error fetching battery:', err);
            }
        };

        fetchBattery(); // immediate fetch
        const interval = setInterval(fetchBattery, 5000); // TS infers type as number

        return () => clearInterval(interval); // cleanup
    }, []);

    // Logout function
    const handleLogout = async () => {
        await AsyncStorage.removeItem("authToken");
        await AsyncStorage.removeItem("userRole");

        setIsLoggedIn(false);
        setMenuOpen(false);

        router.replace("/login");
    };

    return (
        <View className="flex-1 bg-slate-100">
            <StatusBar barStyle="light-content" />

            {/*  Header*/}
            <View className="bg-white border-b border-slate-100 pt-14 pb-5 px-6">
                <View className="flex-row justify-between items-center mb-5">

                    {/* Menu */}
                    <TouchableOpacity
                        onPress={() => setMenuOpen(!menuOpen)}
                        className="w-10 h-10 mt-10 rounded-full border border-slate-100 bg-slate-50 items-center justify-center"
                        activeOpacity={0.7}
                    >
                        {menuOpen
                            ? <Entypo name="cross" size={20} color="#475569" />
                            : <Entypo name="menu" size={20} color="#475569" />
                        }
                    </TouchableOpacity>

                    {/* Logo */}
                    <View className="flex-row mt-10 items-center gap-x-2">
                        <View className="w-8 h-8 bg-blue-500 rounded-full items-center justify-center">
                            <MaterialCommunityIcons name="hat-fedora" size={16} color="#ffffff" />
                        </View>
                        <Text className="text-slate-900 text-3xl font-bold tracking-tight">
                            Vision<Text className="text-blue-500">Assist</Text>
                        </Text>
                    </View>

                    {/* Notifications */}
                    <TouchableOpacity
                        className="w-10 h-10 mt-10 rounded-full border border-slate-100 bg-slate-50 items-center justify-center"
                        activeOpacity={0.7}
                    >
                        <Ionicons name="notifications-outline" size={20} color="#475569" />
                    </TouchableOpacity>

                </View>

                {/* Welcome */}
                <Text className="text-slate-400 mt-3 text-xs font-semibold tracking-widest uppercase mb-1">
                    Welcome back
                </Text>
            </View>

            {/* ── Dropdown Menu ── */}
            {menuOpen && (
                <View className="absolute top-36 left-6 right-6 bg-white border border-slate-200 shadow-xl z-50 rounded-2xl overflow-hidden">

                    {[
                        { icon: 'settings-outline', label: 'Settings', color: '#2563eb', bg: 'bg-blue-50', onPress: () => { setMenuOpen(false); router.push('/settingsScreen'); } },
                        { icon: 'help-circle-outline', label: 'Help & Support', color: '#7c3aed', bg: 'bg-purple-50', onPress: () => { setMenuOpen(false); router.push('/support'); } },
                        { icon: 'information-circle-outline', label: 'About', color: '#059669', bg: 'bg-emerald-50', onPress: () => { setMenuOpen(false); router.push('/aboutus'); } },
                        {
                            icon: 'qr-code-outline',
                            label: 'QR Code',
                            color: '#0ea5e9',
                            bg: 'bg-sky-50',
                            onPress: () => {
                                setMenuOpen(false);
                                router.push('/scan');
                            }
                        },
                        // Logout appears only if logged in
                        ...(isLoggedIn ? [{
                            icon: 'log-out-outline',
                            label: 'Logout',
                            color: '#dc2626',
                            bg: 'bg-red-50',
                            onPress: handleLogout
                        }] : [])
                    ]
                        .map((item) => (
                            <View key={item.label}>
                                <TouchableOpacity
                                    className="py-4 px-5 flex-row items-center"
                                    onPress={item.onPress}
                                    activeOpacity={0.7}
                                >
                                    <View className={`w-8 h-8 rounded-full ${item.bg} items-center justify-center mr-4`}>
                                        <Ionicons name={item.icon as any} size={16} color={item.color} />
                                    </View>
                                    <Text className="text-slate-800 text-sm font-semibold">{item.label}</Text>
                                    <Ionicons name="chevron-forward" size={14} color="#94a3b8" style={{ marginLeft: 'auto' }} />
                                </TouchableOpacity>
                                <View className="h-px bg-slate-100 mx-5" />
                            </View>
                        ))}

                </View>
            )}


            {/* ── Scrollable Content ── */}
            <ScrollView
                className="flex-1"
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingBottom: insets.bottom + 120
                }}
            >

                {/* Device Status Card */}
                <View className="px-6 mt-6 mb-4">
                    <Text className="text-slate-500 text-xs font-semibold tracking-widest uppercase mb-3">
                        Device Status
                    </Text>
                    <View className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

                        <View className="flex-row items-center justify-between mb-4">
                            <View className="flex-row items-center gap-x-2">
                                <View className="w-2 h-2 rounded-full bg-emerald-400" />
                                <Text className="text-slate-900 text-base font-bold">Connected</Text>
                            </View>
                            <View className="bg-blue-600 px-3 py-1 rounded-full">
                                <Text className="text-white text-xs font-bold">#VAH-1023</Text>
                            </View>
                        </View>

                        <View className="h-px bg-slate-100 mb-4" />

                        <View className="flex-row justify-between">

                            <View className="flex-row items-center gap-x-2">
                                <View className="w-8 h-8 rounded-full bg-emerald-100 items-center justify-center">
                                    <Ionicons name="battery-half" size={16} color="#10b981" />
                                </View>
                                <View>
                                    <Text className="text-slate-400 text-xs">Battery</Text>
                                    <Text className="text-emerald-600 text-sm font-bold">
                                        {battery !== null ? `${battery}%` : '...'}
                                    </Text>
                                </View>
                            </View>

                            <View className="flex-row items-center gap-x-2">
                                <View className="w-8 h-8 rounded-full bg-blue-100 items-center justify-center">
                                    <Ionicons name="wifi" size={16} color="#2563eb" />
                                </View>
                                <View>
                                    <Text className="text-slate-400 text-xs">Signal</Text>
                                    <Text className="text-blue-600 text-sm font-bold">Stable</Text>
                                </View>
                            </View>

                            <View className="flex-row items-center gap-x-2">
                                <View className="w-8 h-8 rounded-full bg-violet-100 items-center justify-center">
                                    <Ionicons name="location" size={16} color="#7c3aed" />
                                </View>
                                <View>
                                    <Text className="text-slate-400 text-xs">GPS</Text>
                                    <Text className="text-violet-600 text-sm font-bold">Active</Text>
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

                    {/* SOS */}
                    <TouchableOpacity
                        className="bg-red-500 rounded-2xl p-5 flex-row items-center justify-between shadow-sm"
                        activeOpacity={0.85}
                        onPress={() => router.push('/sosAlert')}
                    >
                        <View className="flex-row items-center flex-1">
                            <View className="w-11 h-11 bg-red-400 rounded-xl items-center justify-center">
                                <MaterialIcons name="emergency" size={24} color="#ffffff" />
                            </View>
                            <View className="ml-4">
                                <Text className="text-white text-base font-bold">Emergency SOS</Text>
                                <Text className="text-red-100 text-xs mt-0.5">Send alert to contacts</Text>
                            </View>
                        </View>
                        <View className="w-8 h-8 bg-red-400 rounded-full items-center justify-center">
                            <Ionicons name="chevron-forward" size={18} color="#ffffff" />
                        </View>
                    </TouchableOpacity>
                </View>

                {/* Feature Grid */}
                <View className="px-6 mb-4">
                    <Text className="text-slate-500 text-xs font-semibold tracking-widest uppercase mb-3">
                        Features
                    </Text>
                    <View className="flex-row flex-wrap justify-between">

                        {[
                            {
                                icon: 'location',
                                bg: 'bg-blue-600',
                                iconBg: 'bg-blue-500',
                                color: '#ffffff',
                                label: 'Live Tracking',
                                sub: 'Real-time location',
                                labelColor: 'text-white',
                                subColor: 'text-blue-200',
                                route: '/map'
                            },
                            {
                                icon: 'notifications',
                                bg: 'bg-orange-500',
                                iconBg: 'bg-orange-400',
                                color: '#ffffff',
                                label: 'View Alerts',
                                sub: 'Recent notifications',
                                labelColor: 'text-white',
                                subColor: 'text-orange-100',
                                route: '/alerts'
                            },
                            {
                                icon: 'stats-chart',
                                bg: 'bg-violet-600',
                                iconBg: 'bg-violet-500',
                                color: '#ffffff',
                                label: 'Activity Log',
                                sub: 'Daily summary',
                                labelColor: 'text-white',
                                subColor: 'text-violet-200',
                                route: null
                            },
                            {
                                icon: 'people',
                                bg: 'bg-emerald-500',
                                iconBg: 'bg-emerald-400',
                                color: '#ffffff',
                                label: 'Contacts',
                                sub: 'Emergency list',
                                labelColor: 'text-white',
                                subColor: 'text-emerald-100',
                                route: null
                            },
                        ].map((item) => (
                            <TouchableOpacity
                                key={item.label}
                                className={`${item.bg} rounded-2xl p-4 mb-3 shadow-sm`}
                                style={{ width: (width - 52) / 2 }}
                                onPress={() => item.route && router.push(item.route as any)}
                                activeOpacity={0.8}
                            >
                                <View className={`w-11 h-11 ${item.iconBg} rounded-xl items-center justify-center mb-3`}>
                                    <Ionicons name={item.icon as any} size={22} color={item.color} />
                                </View>
                                <Text className={`${item.labelColor} text-sm font-bold mb-0.5`}>{item.label}</Text>
                                <Text className={`${item.subColor} text-xs`}>{item.sub}</Text>
                            </TouchableOpacity>
                        ))}

                    </View>
                </View>

            </ScrollView>
        </View>
    );
}