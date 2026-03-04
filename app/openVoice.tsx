import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from 'react';
import { Alert, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { startBlindUserTracking, stopBlindUserTracking } from './locationSender';


export default function VoiceOpen() {

    const router = useRouter();
    const [isListening, setIsListening] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    // Start location tracking when component mounts
    useEffect(() => {

        const initTracking = async () => {

            try {

                const token = await AsyncStorage.getItem("authToken");
                if (!token) {
                    console.log("No token found");
                    return;
                }

                let decoded: any;

                try {
                    decoded = jwtDecode(token);
                } catch (error) {
                    console.log("JWT decode error");
                    return;
                }

                const userId = decoded?.id;

                if (!userId) {
                    console.log("User ID missing");
                    return;
                }

                console.log("Decoded User ID:", userId);

                await startBlindUserTracking(userId);

            } catch (error) {
                console.log("Tracking init error:", error);
            }
        };

        initTracking();

        return () => {
            stopBlindUserTracking();
        };

    }, []);

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem("authToken");
            await AsyncStorage.removeItem("userRole");

            console.log("User logged out ✅");

            router.replace("/welcomeScreen");
        } catch (error) {
            console.error("Logout Error:", error);
            Alert.alert("Error", "Failed to logout");
        }
    };

    return (
        <View className="flex-1 bg-slate-50">
            <StatusBar barStyle="dark-content" />

            <View className="bg-white pt-14 pb-5 px-6 border-b border-slate-100">
                <View className="flex-row justify-between items-center">

                    {/* Hamburger */}
                    <TouchableOpacity
                        onPress={() => setMenuOpen(!menuOpen)}
                        className="w-10 h-10 rounded-full bg-slate-100 items-center justify-center"
                    >
                        <Ionicons
                            name={menuOpen ? "close" : "menu"}
                            size={22}
                            color="#475569"
                        />
                    </TouchableOpacity>

                    <Text className="text-xl font-bold">
                        Vision<Text className="text-blue-500">Assist</Text>
                    </Text>

                    <View className="w-10" />
                </View>
            </View>

            {/* Dropdown Menu */}
            {menuOpen && (
                <View className="absolute top-28 left-6 right-6 bg-white border border-slate-200 rounded-2xl shadow-lg z-50">

                    {/* View QR */}
                    <TouchableOpacity
                        onPress={() => {
                            setMenuOpen(false);
                            router.push("/qrPage");
                        }}
                        className="py-4 px-5 flex-row items-center"
                    >
                        <Ionicons
                            name="qr-code-outline"
                            size={18}
                            color="#2563eb"
                            style={{ marginRight: 10 }}
                        />
                        <Text className="font-semibold text-slate-800">
                            View QR Code
                        </Text>
                    </TouchableOpacity>

                    <View className="h-px bg-slate-100 mx-5" />

                    {/* Logout */}
                    <TouchableOpacity
                        onPress={handleLogout}
                        className="py-4 px-5 flex-row items-center"
                    >
                        <Ionicons
                            name="log-out-outline"
                            size={18}
                            color="#dc2626"
                            style={{ marginRight: 10 }}
                        />
                        <Text className="font-semibold text-red-600">
                            Logout
                        </Text>
                    </TouchableOpacity>

                </View>
            )}

            {/* Content Card */}
            <View className="flex-1 bg-white rounded-t-3xl px-8 pt-10">

                {/* Page Title */}
                <Text className="text-slate-900 text-2xl font-bold tracking-tight mb-1">
                    Voice Bridge
                </Text>
                <View className="w-8 h-0.5 bg-blue-500 mb-2" />
                <Text className="text-slate-400 text-sm leading-6 mb-8">
                    Tap the microphone to speak your command. Your device will respond instantly.
                </Text>

                {/* Voice Interface */}
                <View className="flex-1 items-center justify-center">

                    {/* Microphone Button */}
                    <TouchableOpacity
                        onPress={() => setIsListening(!isListening)}
                        activeOpacity={0.85}
                        className={`w-32 h-32 rounded-full items-center justify-center mb-8 ${isListening ? 'bg-blue-500' : 'bg-blue-50 border-2 border-blue-200'
                            }`}
                    >
                        <Ionicons
                            name={isListening ? "mic" : "mic-outline"}
                            size={56}
                            color={isListening ? "#ffffff" : "#3b82f6"}
                        />
                    </TouchableOpacity>

                </View>


                {/* Quick Commands */}
                <Text className="text-slate-400 text-xs font-semibold tracking-widest uppercase mb-3">
                    Quick Commands
                </Text>

                <View className="flex-row flex-wrap gap-2 mb-10">
                    {['Navigate home', 'Call emergency', 'Check battery', 'Where am I'].map((cmd) => (
                        <TouchableOpacity
                            key={cmd}
                            className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-2"
                            activeOpacity={0.7}
                        >
                            <Text className="text-blue-500 text-xs font-semibold">
                                {cmd}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </View>
    );
}