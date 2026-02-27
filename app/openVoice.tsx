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

    // Start location tracking when component mounts
    useEffect(() => {

        const initTracking = async () => {

            const token = await AsyncStorage.getItem("authToken");

            if (token) {

                const decoded: any = jwtDecode(token);

                const userId = decoded.id; // ✅ extract real ID

                console.log("Decoded User ID:", userId);

                startBlindUserTracking(userId);
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

            router.replace("/welcomeScreen"); // go to welcome screen
        } catch (error) {
            console.error("Logout Error:", error);
            Alert.alert("Error", "Failed to logout");
        }
    };

    return (
        <View className="flex-1 bg-slate-50">
            <StatusBar barStyle="dark-content" />

            {/* Top Section */}
            <View className="pt-16 pb-10 px-6">

                {/* Header Row */}
                <View className="relative items-center justify-center mb-6">

                    {/* Centered Text */}
                    <Text className="text-slate-400 text-xs font-semibold tracking-[4px] uppercase">
                        Voice Assistant
                    </Text>

                </View>

                {/* Main Title */}
                <Text className="text-slate-900 text-5xl font-bold tracking-tight text-center">
                    Vision<Text className="text-blue-500">Assist</Text>
                </Text>

                <View className="w-12 h-0.5 bg-blue-500 mt-5 mb-5 self-center" />

                <Text className="text-slate-400 text-sm tracking-widest font-medium uppercase text-center">
                    Smart Vision. Smart Living.
                </Text>

            </View>

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

                <TouchableOpacity
                    onPress={handleLogout}
                    className="bg-red-500 rounded-xl py-3 items-center mt-4 mb-10"
                    activeOpacity={0.8}
                >
                    <Text className="text-white font-semibold">
                        Logout
                    </Text>
                </TouchableOpacity>

            </View>
        </View>
    );
}